export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "",
    });

    const { name, email, phone, address, pincode, city, productSlug } = await req.json();

    if (!productSlug || !name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Fetch product to verify status and get price
    const product = await prisma.product.findUnique({
      where: { slug: productSlug },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.status === "SOLD") {
      return NextResponse.json({ error: "This piece has already been sold." }, { status: 410 });
    }

    // Note: We assume it's RESERVED (from the previous step in the UI)
    // but even if it's AVAILABLE, we proceed as the checkout lock will happen here too.

    // 2. Create Razorpay order
    const amountInPaise = Math.round(product.price * 100);
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        productSlug,
        customerName: name,
      },
    });

    // 3. Create Pending Order in DB
    const order = await prisma.order.create({
      data: {
        productId: product.id,
        customerName: name,
        email,
        phone,
        address: `${address}, ${city} - ${pincode}`,
        razorpayOrderId: razorpayOrder.id,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    });

  } catch (error: any) {
    console.error("Checkout Creation Error:", error);
    return NextResponse.json({ error: "Failed to initiate checkout. Please try again." }, { status: 500 });
  }
}
