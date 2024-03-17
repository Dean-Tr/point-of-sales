"use client";

import Image from "next/image";
import { Products } from "@/data.js";
import useSearchAndPagination from "@/utils/useSearchAndPagination";
import SearchBar from "@/components/SearchBar";
import PaginationControls from "@/components/PaginationControls";

const StokPage = () => {
  const { paginatedItems, currentPage, totalPages, itemsPerPage } =
    useSearchAndPagination(Products);

  return (
    <div className=" bg-white h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] p-6">
      <h1 className="text-3xl font-bold uppercase">Stok Barang</h1>

      <div className="flex gap-6 justify-between my-8 items-center ">
        <button className="flex gap-2 justify-center items-center bg-green-600 p-3 px-6 rounded-md  text-white">
          <Image src={"/tambah.png"} alt="" height={20} width={20} />
          Tambah
        </button>

        <SearchBar placeholder={"Cari Barang..."} />
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
            {paginatedItems.map((item, index) => (
              <tr className="border-b border-neutral-200" key={item.id}>
                <td className="whitespace-nowrap px-6 py-1">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="whitespace-nowrap px-6 py-1">
                  <Image src={item.img} alt="" width={50} height={50} className="mx-auto" />
                </td>
                <td className="whitespace-nowrap px-6 py-1">{item.title}</td>
                <td className="whitespace-nowrap px-6 py-1">{item.stock}</td>
                <td className="whitespace-nowrap px-6 py-1">
                  {item.buyPrice.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td className="whitespace-nowrap px-6 py-1">
                  {item.sellPrice.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </td>
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

      {totalPages > 1 && <PaginationControls currentPage={currentPage} totalPages={totalPages} />}
    </div>
  );
};

export default StokPage;
