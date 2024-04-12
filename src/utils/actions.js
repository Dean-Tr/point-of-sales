"use server";

import { signIn, signOut } from "@/utils/auth";
import { AuthError } from "next-auth";

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
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};

export const handleLogout = async () => {
  await signOut();
};
