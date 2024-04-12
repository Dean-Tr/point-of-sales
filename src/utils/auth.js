import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import prisma from "@/utils/connect";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

const login = async (credentials) => {
  try {
    const user = await prisma.User.findUnique({ where: { email: credentials.email } });

    if (!user) throw new Error("User tidak ada!");

    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

    if (!isPasswordCorrect) throw new Error("Email atau password salah!");

    return user;
  } catch (err) {
    console.log("Error in login function:", err);
    throw new Error("Login gagal!");
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          console.log("Error in authorize function:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profil }) {
      return true;
    },
    ...authConfig.callbacks,
  },
});
