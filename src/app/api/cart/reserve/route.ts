export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: "Product slug is required" }, { status: 400 });
    }

    // Attempt to reserve the product atomically
    // We only reserve if it's currently AVAILABLE
    // Note: In a real high-traffic scenario, we might use raw SQL for "SELECT FOR UPDATE" 
    // but Prisma's update with a where clause on status handles the row-level lock in PostgreSQL
    
    const now = new Date();
    const expiry = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes from now

    try {
      const updatedProduct = await prisma.product.update({
        where: {
          slug,
          OR: [
            { status: "AVAILABLE" },
            {
              status: "RESERVED",
              reservationExpiresAt: {
                lt: now, // Reservation has expired
              },
            },
          ],
        },
        data: {
          status: "RESERVED",
          reservationExpiresAt: expiry,
        },
      });

      return NextResponse.json({
        success: true,
        product: updatedProduct,
      });
    } catch (error: any) {
      // If P2025 error, it means the product doesn't exist or doesn't match the WHERE clause 
      // i.e., it's already SOLD or actively RESERVED by someone else.
      if (error.code === "P2025") {
        return NextResponse.json({
          error: "This 1-of-1 piece was just claimed by another collector.",
          code: "ALREADY_CLAIMED",
        }, { status: 409 });
      }
      throw error;
    }

  } catch (error: any) {
    console.error("Reservation Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
