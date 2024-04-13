import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  const { id } = params;

  try {
    const body = await req.json();

    await prisma.expense.update({
      where: { id },
      data: { ...body },
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
    await prisma.expense.delete({
      where: { id },
    });
    return new NextResponse(JSON.stringify({ message: "Pengeluaran berhasil dihapus!" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan!" }), { status: 500 });
  }
};
