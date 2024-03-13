"use client";

import Image from "next/image";
import { Products } from "@/data.js";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const StokPage = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const query = searchParams.get("q") || "";

  function handleSearch(term) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const filteredProducts = Products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Generate pagination numbers
  const paginationNumbers = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      paginationNumbers.push(i);
    }
  } else {
    if (currentPage <= 2) {
      paginationNumbers.push(1, 2, 3, 4, 5);
    } else if (currentPage >= totalPages - 2) {
      paginationNumbers.push(
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      paginationNumbers.push(
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2
      );
    }
  }

  return (
    <div className=" bg-white h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] p-6">
      <h1 className="text-3xl font-bold uppercase">Stok Barang</h1>

      <div className="flex gap-6 justify-between my-8 items-center ">
        <button className="flex gap-2 justify-center items-center bg-green-600 p-3 px-6 rounded-md  text-white">
          <Image src={"/tambah.png"} alt="" height={20} width={20} />
          Tambah
        </button>
        <div className="relative my-2 mx-3 border rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Image src="/search.png" alt="" height={20} width={20} />
          </div>
          <input
            className="rounded-md w-full py-3 px-10 text-gray-900 placeholder:text-gray-400 md:text-lg md:leading-8 outline-none"
            type="text"
            placeholder="Cari barang..."
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("q")?.toString()}
          />
        </div>
      </div>

      <div className="h-[calc(100vh-21rem)] md:h-[calc(100vh-17rem)] overflow-x-auto">
        <table class="text-center w-full md:text-lg">
          <thead className="border-b border-neutral-200 font-medium">
            <tr className="">
              <th scope="col" class="px-6 py-1">
                #
              </th>
              <th scope="col" class="px-6 py-1">
                Gambar Barang
              </th>
              <th scope="col" class="px-6 py-1">
                Nama Barang
              </th>
              <th scope="col" class="px-6 py-1">
                Stok
              </th>
              <th scope="col" class="px-6 py-1">
                Harga Beli
              </th>
              <th scope="col" class="px-6 py-1">
                Harga Jual
              </th>
              <th scope="col" class="px-6 py-1">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product, index) => (
              <tr className="border-b border-neutral-200" key={product.id}>
                <td className="whitespace-nowrap px-6 py-1">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="whitespace-nowrap px-6 py-1">
                  <Image src={product.img} alt="" width={50} height={50} className="mx-auto" />
                </td>
                <td className="whitespace-nowrap px-6 py-1">{product.title}</td>
                <td className="whitespace-nowrap px-6 py-1">{product.stock}</td>
                <td className="whitespace-nowrap px-6 py-1">{product.buyPrice}</td>
                <td className="whitespace-nowrap px-6 py-1">{product.sellPrice}</td>
                <td className="whitespace-nowrap px-6 py-1 h-20 md:h-24 w-56 xl:w-full flex justify-center items-center">
                  <button className="mx-1 p-2 px-2 bg-blue-500 rounded-md text-white flex gap-1 items-center">
                    <Image src="/edit.png" alt="" width={20} height={20} />
                    <p>Edit</p>
                  </button>
                  <button className="mx-1 p-2 px-2 bg-red-500 rounded-md text-white flex gap-1 items-center">
                    <Image src="/delete.png" alt="" width={20} height={20} />
                    <p>Hapus</p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-5 lg:mt-0 flex gap-3 justify-center items-center">
          <button
            onClick={() => {
              const newPage = Math.max(currentPage - 1, 1);
              const params = new URLSearchParams(searchParams);
              params.set("page", newPage.toString());
              replace(`${pathname}?${params.toString()}`);
            }}
            className="text-xl px-3 py-1 border-2 bg-green-600 text-white"
          >
            {"<"}
          </button>
          <div>
            {paginationNumbers.map((page) => (
              <button
                key={page}
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.set("page", page.toString());
                  replace(`${pathname}?${params.toString()}`);
                }}
                className={`text-xl px-3 py-1 m-[1px] border-2 ${
                  page == currentPage ? "bg-blue-600 text-white" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              const newPage = Math.min(currentPage + 1, totalPages);
              const params = new URLSearchParams(searchParams);
              params.set("page", newPage.toString());
              replace(`${pathname}?${params.toString()}`);
            }}
            className="text-xl px-3 py-1 border-2 bg-green-600 text-white"
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default StokPage;
