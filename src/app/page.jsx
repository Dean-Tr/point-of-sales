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
        <div className="w-full h-[calc(100vh-24rem)] md:h-[calc(100vh-7rem)] p-3 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 grid-rows-[13rem_minmax(13rem,13rem)_13rem] justify-items-center items-center overflow-y-scroll">
          {Products.map((item) => (
            <div
              class="w-full h-full max-w-[13rem] max-h-[13rem] flex flex-col justify-between text-slate-700 bg-white border border-gray-200 rounded-lg shadow cursor-pointer"
              key={item.id}
            >
              <div className="p-2 flex h-full items-center justify-center">
                <Image src={item.img} alt="product image" width={120} height={120} />
              </div>
              <div class="px-3 pb-1">
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
      <div className="h-full w-full flex-1 border-t-2 border-t-slate-600 md:border-l-2 md:border-l-slate-400 text-black bg-white">
        <div className="bg-[#40A2E3] h-12 w-full flex flex-row-reverse items-center pr-6 cursor-pointer">
          <Image src="/delete.png" alt="" width={25} height={25} />
        </div>
        <div className="">
          <h1>asdasd</h1>
          <h1>asdasd</h1>
          <h1>asdasd</h1>
          <h1>asdasd</h1>
        </div>
      </div>
    </div>
  );
}
