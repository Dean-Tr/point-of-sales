import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  const { id } = params;

  try {
    const body = await req.json();

    const { newProducts, ...restBody } = body;

    // update purchase from database
    await prisma.purchase.update({
      where: { id },
      data: { ...restBody },
    });

    // update product stock with purchase quantity
    newProducts.map(async (p) => {
      const stockProduct = await prisma.product.findUnique({
        where: { id: p.id },
      });

      let newStock = stockProduct.stock + p.quantity;

      if (newStock < 0) {
        newStock = 0;
      }

      return await prisma.product.update({
        where: { id: p.id },
        data: { stock: newStock },
      });
    });

    return new NextResponse(JSON.stringify({ message: "Pembelian berhasil dirubah!" }), {
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
    const body = await req.json();

    // delete purchase from database
    await prisma.purchase.delete({
      where: { id },
    });

    // update product stock with purchase quantity
    body.products.map(async (p) => {
      const stockProduct = await prisma.product.findUnique({
        where: { id: p.id },
      });

      let newStock = stockProduct.stock - p.quantity;

      if (newStock < 0) {
        newStock = 0;
      }

      return await prisma.product.update({
        where: { id: p.id },
        data: { stock: newStock },
      });
    });

    return new NextResponse(JSON.stringify({ message: "Pembelian berhasil dihapus!" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan!" }), { status: 500 });
  }
};
