"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { id: 1, title: "Kasir", url: "/", img: "/kasir.png" },
  { id: 2, title: "Laporan", url: "/laporan", img: "/laporan.png" },
  { id: 3, title: "Stok", url: "/stok", img: "/stok.png" },
  { id: 4, title: "Transaksi", url: "/transaksi", img: "/transaksi.png" },
  { id: 5, title: "Logout", url: "/logout", img: "/logout.png" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="h-12 md:h-screen w-[3rem] absolute md:static bg-blue-600 flex flex-col items-center ">
      <div onClick={() => setOpen(!open)} className=" cursor-pointer p-3 hover:bg-blue-500">
        <Image src="/navbar.png" alt="" width={25} height={25} />
      </div>

      <div
        className={`flex flex-col justify-start w-full text-white bg-blue-600 ${
          open &&
          "absolute left-0 top-12 h-[calc(100vh-48px)] w-screen md:w-44 justify-normal text-xl md:text-base z-50"
        }`}
      >
        {links.map((link) => (
          <Link
            href={link.url}
            key={link.id}
            className={`md:flex gap-4 pl-3 py-6 md:py-4 hover:bg-blue-500 
            ${open ? `flex` : `hidden`} 
            ${pathname === link.url && "bg-blue-500"}
            `}
          >
            <Image src={link.img} alt="" width={25} height={25} />
            {open && <p>{link.title}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
