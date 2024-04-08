import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const products = await prisma.product.findMany();
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan!" }), { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    let id;
    do {
      id = `P${Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}`;
      // Check if the ID already exists in the database
      const existingProduct = await prisma.product.findUnique({
        where: { id },
      });
      if (existingProduct) {
        id = null; // Reset ID if it already exists
      }
    } while (!id);

    const body = await req.json();
    const product = await prisma.product.upsert({
      where: { id },
      update: {},
      create: { id, ...body },
    });
    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan!" }), {
      status: 500,
    });
  }
};
