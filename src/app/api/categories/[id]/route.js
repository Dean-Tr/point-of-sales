import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  const { id } = params;

  try {
    const body = await req.json();

    await prisma.category.update({
      where: {
        id: id,
      },
      data: { title: body.title },
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
    await prisma.category.delete({
      where: { id: id },
    });
    return new NextResponse(JSON.stringify({ message: "Kategori berhasil dihapus!" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan!" }), { status: 500 });
  }
};
