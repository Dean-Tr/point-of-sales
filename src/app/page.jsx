import Image from "next/image";
import { Products } from "@/data.js";

export default function Home() {
  return (
    <div className="bg-white h-[calc(100vh-3rem)] w-screen flex flex-col md:flex-row">
      {/* LEFT PART */}
      <div className="h-full w-full flex-[1.5]">
        {/* SEARCH BAR */}
        <div class="relative my-2 mx-3 rounded-md shadow-sm">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Image src="/search.png" alt="" height={20} width={20} />
          </div>
          <input
            className="rounded-md w-full border-0 py-3 px-10 text-gray-900 ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            type="text"
            placeholder="Cari barang..."
          />
        </div>

        {/* PRODUCT LIST */}
        <div className="w-full h-[calc(100vh-24rem)] md:h-[calc(100vh-7rem)] p-3 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 grid-rows-[13rem] justify-items-center items-center overflow-y-scroll">
          {Products.map((item) => (
            <div
              class="w-full max-w-[13rem] h-[13rem] min-w-[8rem] flex flex-col justify-between text-slate-700 bg-white border border-gray-200 rounded-lg shadow cursor-pointer"
              key={item.id}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image src={item.img} alt="product image" fill objectFit="contain" />
              </div>
              <div class="px-3 py-2">
                <h5 class="text-sm font-semibold tracking-tight">{item.title}</h5>
                <span class="text-sm font-bold text-slate-400">
                  {item.sellPrice.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PART */}
      <div className="h-full w-full flex-1 flex flex-col items-center justify-between border-t-2 border-t-slate-600 md:border-l-2 md:border-l-slate-400 text-black bg-white">
        {/* DELETE BUTTON */}
        <div className="bg-[#40A2E3] w-full px-6 py-3 flex justify-between items-center">
          <p className="text-base font-bold text-white">Detail Pembelian</p>
          <button className="cursor-pointer">
            <Image src="/delete.png" alt="" width={25} height={25} />
          </button>
        </div>

        {/* BUY PRODUCT */}
        <div className="w-full h-full max-h-[10.3rem] md:max-h-full max py-3 flex flex-col justify-start items-center gap-4 overflow-y-scroll">
          {Products.map((item) => (
            <div className="w-full px-6 flex gap-2   justify-between items-center" key={item.id}>
              <div className="w-[25%]">
                <Image src="/temporary/p18.png" alt="product image" width={60} height={60} />
              </div>
              <div className="w-[25%]">
                <p className="text-sm lg:text-xl font-bold">Sicilian </p>
                <span className="text-xs md:text-[0.5rem] lg:text-xs font-bold text-slate-400">
                  Rp 30.000
                </span>
              </div>
              <div className="w-[40%] flex justify-evenly items-center">
                <button className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 flex justify-center items-center bg-blue-300 rounded-full text-xl md:text-base lg:text-xl text-white">
                  {"<"}
                </button>
                <input
                  type="number"
                  inputMode="numeric"
                  className="w-14 md:w-9 text-center outline-none"
                />
                <button className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 flex justify-center items-center bg-blue-300 rounded-full text-xl md:text-base lg:text-xl text-white">
                  {">"}
                </button>
              </div>
              <button className="w-[10%] flex justify-end items-center cursor-pointer">
                <Image src="/close.png" alt="" width={20} height={20} />
              </button>
            </div>
          ))}
        </div>

        {/* TOTAL PRICE */}
        <div className="w-full flex justify-between">
          <p className="flex justify-center items-center w-full h-full py-4 bg-[#40A2E3] font-bold text-white">
            Rp 150.000
          </p>
          <button className="w-full h-full bg-[#0D9276] text-white text-xl font-bold ">
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
}
