import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white h-[calc(100vh-3rem)] w-screen flex flex-col md:flex-row">
      {/* LEFT PART */}
      <div className="h-[60%] md:h-full md:w-[60%]">
        {/* SEARCH BAR */}
        <div class="relative mt-2 mx-16  rounded-md shadow-sm">
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
        <div className="w-full h-[calc(100vh-6.5rem)] flex flex-wrap p-3 gap-6 place-content-start justify-center overflow-y-scroll">
          <div class="w-full max-w-64 h-fit max-h-64 text-slate-700 bg-white border border-gray-200 rounded-lg shadow cursor-pointer">
            <div className="p-4 flex items-center justify-center">
              <Image src="/temporary/p1.png" alt="product image" width={150} height={150} />
            </div>
            <div class="px-5 pb-5">
              <a href="#">
                <h5 class="text-xl font-semibold tracking-tight">Beef and Cheese</h5>
              </a>
              <div class="flex  items-center justify-between">
                <span class="text-xl font-bold text-slate-400">Rp20.000</span>
              </div>
            </div>
          </div>
          <div class="w-full max-w-64 h-fit max-h-64 text-slate-700 bg-white border border-gray-200 rounded-lg shadow cursor-pointer">
            <div className="p-4 flex items-center justify-center">
              <Image src="/temporary/p1.png" alt="product image" width={150} height={150} />
            </div>
            <div class="px-5 pb-5">
              <a href="#">
                <h5 class="text-xl font-semibold tracking-tight">Beef and Cheese</h5>
              </a>
              <div class="flex  items-center justify-between">
                <span class="text-xl font-bold text-slate-400">Rp20.000</span>
              </div>
            </div>
          </div>
          <div class="w-full max-w-64 h-fit max-h-64 text-slate-700 bg-white border border-gray-200 rounded-lg shadow cursor-pointer">
            <div className="p-4 flex items-center justify-center">
              <Image src="/temporary/p1.png" alt="product image" width={150} height={150} />
            </div>
            <div class="px-5 pb-5">
              <a href="#">
                <h5 class="text-xl font-semibold tracking-tight">Beef and Cheese</h5>
              </a>
              <div class="flex  items-center justify-between">
                <span class="text-xl font-bold text-slate-400">Rp20.000</span>
              </div>
            </div>
          </div>
          <div class="w-full max-w-64 h-fit max-h-64 text-slate-700 bg-white border border-gray-200 rounded-lg shadow cursor-pointer">
            <div className="p-4 flex items-center justify-center">
              <Image src="/temporary/p1.png" alt="product image" width={150} height={150} />
            </div>
            <div class="px-5 pb-5">
              <a href="#">
                <h5 class="text-xl font-semibold tracking-tight">Beef and Cheese</h5>
              </a>
              <div class="flex  items-center justify-between">
                <span class="text-xl font-bold text-slate-400">Rp20.000</span>
              </div>
            </div>
          </div>
          <div class="w-full max-w-64 h-fit max-h-64 text-slate-700 bg-white border border-gray-200 rounded-lg shadow cursor-pointer">
            <div className="p-4 flex items-center justify-center">
              <Image src="/temporary/p1.png" alt="product image" width={150} height={150} />
            </div>
            <div class="px-5 pb-5">
              <a href="#">
                <h5 class="text-xl font-semibold tracking-tight">Beef and Cheese</h5>
              </a>
              <div class="flex  items-center justify-between">
                <span class="text-xl font-bold text-slate-400">Rp20.000</span>
              </div>
            </div>
          </div>
          <div class="w-full max-w-64 h-fit max-h-64 text-slate-700 bg-white border border-gray-200 rounded-lg shadow cursor-pointer">
            <div className="p-4 flex items-center justify-center">
              <Image src="/temporary/p1.png" alt="product image" width={150} height={150} />
            </div>
            <div class="px-5 pb-5">
              <a href="#">
                <h5 class="text-xl font-semibold tracking-tight">Beef and Cheese</h5>
              </a>
              <div class="flex  items-center justify-between">
                <span class="text-xl font-bold text-slate-400">Rp20.000</span>
              </div>
            </div>
          </div>
          <div class="w-full max-w-64 h-fit max-h-64 text-slate-700 bg-white border border-gray-200 rounded-lg shadow cursor-pointer">
            <div className="p-4 flex items-center justify-center">
              <Image src="/temporary/p1.png" alt="product image" width={150} height={150} />
            </div>
            <div class="px-5 pb-5">
              <a href="#">
                <h5 class="text-xl font-semibold tracking-tight">Beef and Cheese</h5>
              </a>
              <div class="flex  items-center justify-between">
                <span class="text-xl font-bold text-slate-400">Rp20.000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PART */}
      <div className="h-[40%] md:h-full md:w-[40%] border-t-2 border-t-slate-600 md:border-l-2 md:border-l-slate-400">
        <div className="bg-[#40A2E3] h-12 w-full flex flex-row-reverse items-center pr-6 cursor-pointer">
          <Image src="/delete.png" alt="" width={25} height={25} />
        </div>
      </div>
    </div>
  );
}
