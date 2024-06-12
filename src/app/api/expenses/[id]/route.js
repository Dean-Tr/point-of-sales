import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  const { id } = params;

  try {
    const body = await req.json();

    const newExpense = await prisma.expense.findUnique({
      where: { id },
    });

    const existingReportDate = await prisma.report.findFirst({
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
    if (!existingReportDate) {
      // If no existing report found for the date, create a new one
      const newReport = await prisma.report.create({
        data: {
          date: body.date,
          grossProfit: 0,
          netProfit: 0 - body.nominal,
        },
      });
      report = newReport;
    } else {
      const existingObj = existingReportDate.expense.find((obj) => obj.id === id);
      if (existingObj) {
        Object.assign(existingObj, body);
      } else {
        existingReportDate.expense.push(body);
      }

      const totalExpense = existingReportDate.expense.reduce(
        (total, expense) => total + parseFloat(expense.nominal),
        0
      );

      const newReport = await prisma.report.update({
        where: {
          id: existingReportDate.id,
        },
        data: {
          netProfit: existingReportDate.grossProfit - totalExpense,
        },
      });
      report = newReport;
    }

    await prisma.expense.update({
      where: { id },
      data: { ...body, reportId: report.id },
    });

    // update laporan dari id pengeluaran sebelumnya
    const existingReportId = await prisma.report.findUnique({
      where: { id: newExpense.reportId },
      include: {
        transaction: true,
        expense: true,
      },
    });

    let totalExpenseAfterUpdate;
    if (existingReportId.expense) {
      totalExpenseAfterUpdate = existingReportId.expense.reduce(
        (total, expense) => total + parseFloat(expense.nominal),
        0
      );
    } else {
      totalExpenseAfterUpdate = 0;
    }
    await prisma.report.update({
      where: { id: existingReportId.id },
      data: { netProfit: existingReportId.grossProfit - totalExpenseAfterUpdate },
    });

    return new NextResponse(JSON.stringify({ message: "Kategori berhasil dirubah!" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan!" }), { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    const newExpense = await prisma.expense.findUnique({
      where: { id },
    });

    await prisma.expense.delete({
      where: { id },
    });

    const existingReportId = await prisma.report.findUnique({
      where: { id: newExpense.reportId },
      include: {
        transaction: true,
        expense: true,
      },
    });

    let totalExpenseAfterDelete;
    if (existingReportId.expense) {
      totalExpenseAfterDelete = existingReportId.expense.reduce(
        (total, expense) => total + parseFloat(expense.nominal),
        0
      );
    } else {
      totalExpenseAfterDelete = 0;
    }
    await prisma.report.update({
      where: { id: existingReportId.id },
      data: { netProfit: existingReportId.grossProfit - totalExpenseAfterDelete },
    });

    return new NextResponse(JSON.stringify({ message: "Pengeluaran berhasil dihapus!" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan!" }), { status: 500 });
  }
};
