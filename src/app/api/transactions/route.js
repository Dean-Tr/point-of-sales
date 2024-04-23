import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    let id;
    do {
      id = `T${Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000}`;
      // Check if the ID already exists in the database
      const existingTransaction = await prisma.transaction.findUnique({
        where: { id },
      });
      if (existingTransaction) {
        id = null; // Reset ID if it already exists
      }
    } while (!id);

    // Insert data transaction to database
    const body = await req.json();
    const transaction = await prisma.transaction.upsert({
      where: { id },
      update: {},
      create: { id, ...body },
    });

    // update product stock with transaction quantity
    body.products.map(async (p) => {
      const stockProduct = await prisma.product.findUnique({
        where: { id: p.id },
      });

      const newStock = stockProduct.stock - p.quantity;

      return await prisma.product.update({
        where: { id: p.id },
        data: { stock: newStock },
      });
    });

    return new NextResponse(JSON.stringify(transaction), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan!" }), {
      status: 500,
    });
  }
};
