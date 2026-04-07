export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = await req.json();

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !orderId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Verify Razorpay Signature
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const generated_signature = crypto
      .createHmac("sha256", keySecret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // 2. Atomic Status Update in DB Transaction
    // Update Order to PAID AND Product to SOLD
    // We also clear the reservation timer
    const result = await prisma.$transaction(async (tx) => {
      // Find the order
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { product: true },
      });

      if (!order) {
        throw new Error("Order not found");
      }

      if (order.status === "PAID") {
        return order; // Already processed
      }

      // Update Order
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          status: "PAID",
          razorpayPaymentId: razorpay_payment_id,
        },
      });

      // Update Product to SOLD
      await tx.product.update({
        where: { id: order.productId },
        data: {
          status: "SOLD",
          reservationExpiresAt: null, // Clear expiry
        },
      });

      return updatedOrder;
    });

    return NextResponse.json({
      success: true,
      order: result,
    });

  } catch (error: any) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json({ error: "Failed to verify payment." }, { status: 500 });
  }
}
