"use client";

import Image from "next/image";
import { Products, Category } from "@/data.js";
import useSearchAndPagination from "@/utils/useSearchAndPagination";
import SearchBar from "@/components/SearchBar";
import PaginationControls from "@/components/PaginationControls";
import Button from "@/components/Button";
import Modal from "react-modal";
import { useState } from "react";

const ProdukPage = () => {
  const { paginatedItems, currentPage, totalPages, itemsPerPage } =
    useSearchAndPagination(Products);

  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className=" bg-white h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] p-6">
      <h1 className="text-3xl font-bold uppercase">Daftar Produk</h1>

      <div className="flex gap-6 justify-between my-8 items-center ">
        <Button
          color={"green"}
          img={"/tambah.png"}
          title={"Tambah"}
          onClick={() => setIsOpenModal(true)}
        />
        <SearchBar placeholder={"Cari Produk..."} />
      </div>

      <div>
        <Modal
          isOpen={isOpenModal}
          onRequestClose={() => setIsOpenModal(false)}
          contentLabel="Tambah Kategori Baru"
          overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
          className={
            "absolute top-5 left-5 right-5 md:left-32 md:right-32 lg:left-44 lg:right-44 border-2 bg-white overflow-auto outline-none p-3 z-50"
          }
          closeTimeoutMS={300}
        >
          <div className="h-full flex flex-col">
            <div className="flex flex-1 justify-between items-center px-3 pb-2 border-b">
              <h1 className="font-bold text-xl">Tambah Produk</h1>
              <span
                onClick={() => setIsOpenModal(false)}
                className="font-bold text-3xl cursor-pointer text-red-500"
              >
                x
              </span>
            </div>

            <form action="" className="flex flex-col gap-3 flex-2 h-full mt-6">
              <div className="h-full gap-5 mx-14">
                <label htmlFor="nama" className="w-36 text-end font-semibold">
                  Nama:
                </label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  className="w-full px-3 md:leading-8 outline-none border-2 rounded-md"
                />
                <span className="text-red-500">asd</span>
              </div>
              <div className="h-full gap-5 mx-14">
                <label htmlFor="kategori" className="w-36 text-end font-semibold">
                  Kategori:
                </label>
                <select
                  name="kategori"
                  id="kategori"
                  className="w-full px-3 py-1 md:leading-8 outline-none border-2 rounded-md"
                >
                  <span className="text-red-500">asd</span>
                  {Category.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="h-full gap-5 mx-14">
                <label htmlFor="stok" className="w-36 text-end font-semibold">
                  Stok:
                </label>
                <input
                  type="number"
                  name="stok"
                  id="stok"
                  className="w-full px-3 md:leading-8 outline-none border-2 rounded-md"
                />
                <span className="text-red-500">asd</span>
              </div>
              <div className="h-full gap-5 mx-14">
                <label htmlFor="harga_beli" className="w-36 text-end font-semibold">
                  Harga Beli:
                </label>
                <input
                  type="number"
                  name="harga_beli"
                  id="harga_beli"
                  className="w-full px-3 md:leading-8 outline-none border-2 rounded-md"
                />
                <span className="text-red-500">asd</span>
              </div>
              <div className="h-full gap-5 mx-14">
                <label htmlFor="harga_jual" className="w-36 text-end font-semibold">
                  Harga Jual:
                </label>
                <input
                  type="number"
                  name="harga_jual"
                  id="harga_jual"
                  className="w-full px-3 md:leading-8 outline-none border-2 rounded-md"
                />
                <span className="text-red-500">asd</span>
              </div>
              <div className="h-full gap-5 mx-14">
                <label htmlFor="gambar" className="w-36 text-end font-semibold">
                  Gambar:
                </label>
                <input
                  type="file"
                  name="gambar"
                  id="gambar"
                  className="w-full px-3 md:leading-8 outline-none border-2 rounded-md"
                />
                <span className="text-red-500">asd</span>
              </div>
              <div className="flex justify-end border-t mt-3 pt-2">
                <button className="bg-blue-600 text-white px-3 py-2 rounded-md">Simpan</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>

      <div className="h-[calc(100vh-21rem)] md:h-[calc(100vh-17rem)] overflow-x-auto">
        <table class="text-center w-full md:text-lg">
          <thead className="border-b border-neutral-200 font-medium">
            <tr className="sticky top-0 bg-white">
              <th scope="col" className="px-6 py-1">
                #
              </th>
              <th scope="col" className="px-6 py-1">
                Kode
              </th>
              <th scope="col" className="px-6 py-1">
                Gambar
              </th>
              <th scope="col" className="px-6 py-1">
                Nama
              </th>
              <th scope="col" className="px-6 py-1">
                Kategori
              </th>
              <th scope="col" className="px-6 py-1">
                Stok
              </th>
              <th scope="col" className="px-6 py-1">
                Harga Beli
              </th>
              <th scope="col" className="px-6 py-1">
                Harga Jual
              </th>
              <th scope="col" className="px-6 py-1">
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
                <td className="whitespace-nowrap px-6 py-1">{item.id}</td>
                <td className="whitespace-nowrap px-6 py-1">
                  <Image src={item.img} alt="" width={50} height={50} className="mx-auto" />
                </td>
                <td className="whitespace-nowrap px-6 py-1">{item.title}</td>
                <td className="whitespace-nowrap px-6 py-1">{item.category}</td>
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
                <td className="whitespace-nowrap px-6 py-1 h-20 md:h-24 w-56 md:w-full flex justify-center items-center">
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

export default ProdukPage;
