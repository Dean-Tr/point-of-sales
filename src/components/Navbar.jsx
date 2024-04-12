"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { handleLogout } from "@/utils/actions";

const links = [
  { id: 1, title: "Kasir", url: "/", img: "/kasir.png" },
  { id: 2, title: "Dashboard", url: "/dashboard", img: "/dashboard.png" },
  { id: 3, title: "Kategori", url: "/kategori", img: "/kategori.png" },
  { id: 4, title: "Produk", url: "/produk", img: "/produk.png" },
  { id: 5, title: "Pengeluaran", url: "/pengeluaran", img: "/pengeluaran.png" },
  { id: 6, title: "Transaksi", url: "/transaksi", img: "/transaksi.png" },
  { id: 7, title: "Laporan", url: "/laporan", img: "/laporan.png" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/login") {
    return "";
  }

  return (
    <div className="h-12 md:h-screen w-screen md:w-[3rem] bg-blue-600 flex flex-col md:items-center ">
      <div className="flex h-full md:h-12">
        <div
          onClick={() => setOpen(!open)}
          className="w-[3rem] cursor-pointer p-3 hover:bg-blue-500"
        >
          <Image src="/navbar.png" alt="" width={25} height={25} />
        </div>
        <div
          className={`w-full flex justify-center items-center bg-blue-600 text-white uppercase font-bold md:absolute md:w-[10rem] md:h-12 md:left-12 md:z-50 md:text-sm ${
            open ? "inline" : "md:hidden"
          }`}
        >
          <span className="">Point of Sales</span>
        </div>
      </div>

      <div
        className={`flex flex-col justify-start w-full text-white bg-blue-600 ${
          open &&
          "absolute left-0 top-12 h-[calc(100vh-3rem)] w-screen md:w-52 justify-normal text-xl md:text-base z-50"
        }`}
      >
        {links.map((link) => (
          <Link
            href={link.url}
            key={link.id}
            onClick={() => setOpen(false)}
            className={`w-full md:flex gap-4 pl-3 py-6 md:py-4 hover:bg-blue-500 
            ${open ? `flex` : `hidden`} 
            ${pathname === link.url && "bg-blue-500"}
            `}
          >
            <Image src={link.img} alt="" width={25} height={25} />
            {open && <p>{link.title}</p>}
          </Link>
        ))}
        <form action={handleLogout}>
          <button
            onClick={() => setOpen(false)}
            className={`w-full md:flex gap-4 pl-3 py-6 md:py-4 hover:bg-blue-500 
            ${open ? `flex` : `hidden`} 
            ${pathname === "/logout" && "bg-blue-500"}
            `}
          >
            <Image src={"/logout.png"} alt="" width={25} height={25} />
            {open && <p>{"Logout"}</p>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
