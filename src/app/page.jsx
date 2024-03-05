import Image from "next/image";
import { Products } from "@/data.js";
import ProductCard from "@/components/ProductCard";
import ProductBuy from "@/components/ProductBuy";

export default function KasirPage() {
  return (
    <div className="bg-slate-100 h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] flex flex-col md:flex-row">
      {/* LEFT PART */}
      <div className="h-full w-full flex-[1.5]">
        {/* SEARCH BAR */}
        <div className="relative my-2 mx-3 border rounded-md shadow-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Image src="/search.png" alt="" height={20} width={20} />
          </div>
          <input
            className="rounded-md w-full py-3 px-10 text-gray-900 placeholder:text-gray-400 md:text-lg md:leading-8 outline-none focus:shadow-2xl"
            type="text"
            placeholder="Cari barang..."
          />
        </div>

        {/* PRODUCT LIST */}
        <div className="w-full h-[calc(100vh-24rem)] md:h-[calc(100vh-5rem)] p-3 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 grid-rows-[13rem] justify-items-center items-center overflow-y-scroll">
          {Products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* RIGHT PART */}
      <div className="h-full w-full flex-1 flex flex-col items-center justify-between md:border-l-[1px] md:border-l-slate-400 text-black">
        {/* DELETE BUTTON */}
        <div className="bg-blue-600 w-full px-8 py-3 flex justify-between items-center">
          <p className="text-base font-bold text-white">Detail Belanjaan</p>
          <button className="cursor-pointer">
            <Image src="/delete.png" alt="" width={25} height={25} />
          </button>
        </div>

        {/* BUY PRODUCT */}
        <div className="w-full h-full md:h-[calc(100vh-8rem)] max-h-[10.3rem] md:max-h-full max p-2 flex flex-col justify-start items-center gap-2 overflow-y-scroll">
          {Products.map((product) => (
            <ProductBuy key={product.id} product={product} />
          ))}
        </div>

        {/* TOTAL PRICE */}
        <div className="w-full flex justify-between">
          <p className="flex justify-center items-center w-full h-full py-4 bg-blue-600 font-bold text-white">
            Rp 150.000
          </p>
          <button className="w-full h-full bg-green-600 text-white text-xl font-bold ">
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
}
