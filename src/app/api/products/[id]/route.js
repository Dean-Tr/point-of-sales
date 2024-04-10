import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const PUT = async (req, { params }) => {
  const { id } = params;

  try {
    const body = await req.json();
    const { publicId, ...productBody } = body;
    const timestamp = Math.floor(Date.now() / 1000);
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // Generate SHA-1 hash
    const signature = crypto
      .createHash("sha1")
      .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("timestamp", timestamp);
    formData.append("api_key", apiKey);
    formData.append("signature", signature);

    await prisma.product.update({
      where: { id },
      data: { ...productBody },
    });

    const responseImg = await fetch("https://api.cloudinary.com/v1_1/dean-tr/image/destroy", {
      method: "POST",
      body: formData,
    });

    const responseData = await responseImg.json();
    console.log(responseData);
    return new NextResponse(JSON.stringify({ responseData, message: "Produk berhasil dirubah!" }), {
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
    const { publicId } = body;
    const timestamp = Math.floor(Date.now() / 1000);
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    // Generate SHA-1 hash
    const signature = crypto
      .createHash("sha1")
      .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    const formData = new FormData();
    formData.append("public_id", body.publicId);
    formData.append("timestamp", timestamp);
    formData.append("api_key", apiKey);
    formData.append("signature", signature);

    await prisma.product.delete({
      where: { id: id },
    });

    const responseImg = await fetch("https://api.cloudinary.com/v1_1/dean-tr/image/destroy", {
      method: "POST",
      body: formData,
    });

    const responseData = await responseImg.json();
    console.log(responseData);
    return new NextResponse(JSON.stringify({ responseData, message: "Produk berhasil dihapus!" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ message: "Terjadi kesalahan!" }), { status: 500 });
  }
};
