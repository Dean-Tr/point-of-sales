import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const expenses = await prisma.expense.findMany();
    return new NextResponse(JSON.stringify(expenses), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan!" }), { status: 500 });
  }
};

export const POST = async (req) => {
  try {
    let id;
    do {
      id = `E${Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000}`;
      // Check if the ID already exists in the database
      const existingExpense = await prisma.expense.findUnique({
        where: { id },
      });
      if (existingExpense) {
        id = null; // Reset ID if it already exists
      }
    } while (!id);

    const body = await req.json();
    const expense = await prisma.expense.upsert({
      where: { id },
      update: {},
      create: { id, ...body },
    });
    return new NextResponse(JSON.stringify(expense), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan!" }), {
      status: 500,
    });
  }
};
