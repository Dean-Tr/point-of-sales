import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
  }
};

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const POST = async (req) => {
  try {
    let id;
    do {
      id = `C${generateRandomNumber(100000, 999999)}`;
      // Check if the ID already exists in the database
      const existingCategory = await prisma.category.findUnique({
        where: { id },
      });
      if (existingCategory) {
        id = null; // Reset ID if it already exists
      }
    } while (!id);

    const body = await req.json();
    const category = await prisma.category.upsert({
      where: { id },
      update: {},
      create: { id, ...body },
    });
    return new NextResponse(JSON.stringify(category), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Kategori gagal ditambahkan!" }), {
      status: 500,
    });
  }
};
