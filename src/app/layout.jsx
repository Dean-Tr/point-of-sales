import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Point of Sales",
  description: "Aplikasi kasir untuk warung sembako",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="md:flex">
          <div>
            <Navbar />
          </div>
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
