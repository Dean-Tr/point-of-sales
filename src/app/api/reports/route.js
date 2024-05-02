import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();

    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);

    const reports = await prisma.report.findMany({
      where: {
        date: {
          gte: startDate, // greater than or equal to startDate
          lte: endDate, // less than or equal to endDate
        },
      },
      include: {
        transaction: true,
        expense: true,
      },
    });

    return new NextResponse(JSON.stringify(reports), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan!" }), { status: 500 });
  }
};
