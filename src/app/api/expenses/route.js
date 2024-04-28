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
    // Create post id
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

    const existingReport = await prisma.report.findFirst({
      where: {
        // Using Prisma's date functions to match records based on the date part only
        AND: [
          {
            date: {
              gte: new Date(body.date), // Greater than or equal to the start of the day
            },
          },
          {
            date: {
              lt: new Date(new Date(body.date).getTime() + 24 * 60 * 60 * 1000), // Less than the start of the next day
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
          date: body.date,
          grossProfit: 0,
          netProfit: 0 - body.nominal,
        },
      });
      // Assign the newly created report to existingReport variable
      report = newReport;
    } else {
      const totalExpense = existingReport.expense.reduce(
        (total, expense) => total + parseFloat(expense.nominal),
        0
      );
      const newExpense = totalExpense + body.nominal;

      const newReport = await prisma.report.update({
        where: {
          id: existingReport.id,
        },
        data: {
          netProfit: existingReport.grossProfit - newExpense,
        },
      });
      report = newReport;
    }

    const expense = await prisma.expense.upsert({
      where: { id },
      update: {},
      create: { id, ...body, reportId: report.id },
    });

    return new NextResponse(JSON.stringify(expense), { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan!" }), {
      status: 500,
    });
  }
};
