import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const transactions = await prisma.transaction.findMany();
    return new NextResponse(JSON.stringify(transactions), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan!" }), { status: 500 });
  }
};

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

    const body = await req.json();

    const UTCplus7 = new Date(
      new Date(new Date().getTime() + 7 * 60 * 60 * 1000).setUTCHours(0, 0, 0, 0)
    );
    const nextDayUTCplus7 = new Date(new Date(UTCplus7).getTime() + 24 * 60 * 60 * 1000);

    const existingReport = await prisma.report.findFirst({
      where: {
        // Using Prisma's date functions to match records based on the date part only
        AND: [
          {
            date: {
              gte: UTCplus7, // Greater than or equal to the start of the day
            },
          },
          {
            date: {
              lt: nextDayUTCplus7, // Less than the start of the next day
            },
          },
        ],
      },
      include: {
        transaction: true,
        expense: true,
      },
    });

    let report;
    if (!existingReport) {
      // If no existing report found for the date, create a new one
      const newReport = await prisma.report.create({
        data: {
          date: UTCplus7,
          grossProfit: parseFloat(body.grossProfit),
          netProfit: parseFloat(body.grossProfit),
        },
      });
      // Assign the newly created report to existingReport variable
      report = newReport;
    } else {
      const newReport = await prisma.report.update({
        where: {
          id: existingReport.id,
        },
        data: {
          grossProfit: parseFloat(existingReport.grossProfit) + parseFloat(body.grossProfit),
          netProfit: parseFloat(existingReport.netProfit) + parseFloat(body.grossProfit),
        },
      });
      report = newReport;
    }

    // Insert data transaction to database
    const transaction = await prisma.transaction.upsert({
      where: { id },
      update: {},
      create: { id, ...body, reportId: report.id },
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
