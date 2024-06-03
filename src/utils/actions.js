"use server";

import { signIn, signOut } from "@/utils/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import prisma from "./connect";

export const handleRegister = async (previousState, formData) => {
  const { nama, username, email, password } = Object.fromEntries(formData);

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return { error: "Email sudah ada" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        name: nama,
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log("saved to db");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Terjadi kesalahan!" };
  }
};

export const handleLogin = async (prevState, formData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    console.log("Error in handleLogin:", error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email atau password salah" };
        case "CredentialsSignin":
          throw error;
        default:
          return { error: "Terjadi kesalahan!" };
      }
    }

    throw error;
  }
};

export const handleLogout = async () => {
  await signOut();
};
