import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const purchases = await prisma.purchase.findMany();
    return new NextResponse(JSON.stringify(purchases), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan!" }), { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    let id;
    do {
      id = `PU${Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}`;
      // Check if the ID already exists in the database
      const existingPurchase = await prisma.purchase.findUnique({
        where: { id },
      });
      if (existingPurchase) {
        id = null; // Reset ID if it already exists
      }
    } while (!id);

    // Insert data purchase to database
    const body = await req.json();
    const purchase = await prisma.purchase.upsert({
      where: { id },
      update: {},
      create: { id, ...body },
    });

    // update product stock with purchase quantity
    body.products.map(async (p) => {
      const stockProduct = await prisma.product.findUnique({
        where: { id: p.id },
      });

      const newStock = stockProduct.stock + p.quantity;

      return await prisma.product.update({
        where: { id: p.id },
        data: { stock: newStock },
      });
    });

    return new NextResponse(JSON.stringify(purchase), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan!" }), {
      status: 500,
    });
  }
};
