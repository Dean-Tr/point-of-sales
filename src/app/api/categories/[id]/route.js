import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

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
    return new NextResponse(JSON.stringify({ message: "Kategori gagal dihapus!", id: id }), {
      status: 500,
    });
  }
};
