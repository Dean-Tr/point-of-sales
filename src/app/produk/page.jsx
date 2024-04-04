"use client";

import Image from "next/image";
import { Products, Category } from "@/data.js";
import useSearchAndPagination from "@/utils/useSearchAndPagination";
import SearchBar from "@/components/SearchBar";
import PaginationControls from "@/components/PaginationControls";
import Button from "@/components/Button";
import Modal from "react-modal";
import { currencyToNumber, numberToCurrency } from "@/utils/convertToCurrency";
import { useEffect, useState } from "react";

const ProdukPage = () => {
  const { paginatedItems, currentPage, totalPages, itemsPerPage } =
    useSearchAndPagination(Products);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    img: "",
    name: "",
    category: "",
    buyPrice: 0,
    sellPrice: 0,
    stock: 0,
  });

  const handleModalClose = () => {
    setFormData({
      img: "",
      name: "",
      category: "",
      buyPrice: 0,
      sellPrice: 0,
      stock: 0,
    });
    setIsOpenModal(false);
  };

  const handleInputFormData = (e) => {
    const { name, value } = e.target;

    const newValue = currencyToNumber(value);
    if (!isNaN(newValue) && (name === "buyPrice" || name === "sellPrice")) {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert the buyPrice and sellPrice back to numeric values
    const numericBuyPrice = currencyToNumber(formData.buyPrice);
    const numericSellPrice = currencyToNumber(formData.sellPrice);
  };

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
          ariaHideApp={false}
          onRequestClose={handleModalClose}
          contentLabel="Tambah Kategori Baru"
          overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
          className={
            "absolute top-5 left-5 right-5 md:left-32 md:right-32 lg:left-44 lg:right-44 border-2 bg-white overflow-auto outline-none p-3 z-50"
          }
          closeTimeoutMS={300}
        >
          <div className="h-full flex flex-col">
            <div className="flex flex-1 justify-between items-center px-3 pb-2 border-b">
              <h1 className="font-bold text-xl">Tambah Barang</h1>
              <span
                onClick={handleModalClose}
                className="font-bold text-3xl cursor-pointer text-red-500"
              >
                x
              </span>
            </div>

            <form
              action=""
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 justify-between flex-2 mt-5 h-full"
            >
              {/* input nama */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="name"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Nama:
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleInputFormData}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                  />
                </div>
              </div>

              {/* input kategori */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="category"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Kategori:
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleInputFormData}
                    className={`w-full text-xs md:text-lg px-3 py-2 md:leading-8 outline-none border-2 rounded-md `}
                  >
                    {Category.map((item) => (
                      <option value={item.title} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* input stok */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="stock"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Stok:
                  </label>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    value={formData.stock}
                    onChange={handleInputFormData}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                  />
                </div>
              </div>

              {/* input harga beli */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="buyPrice"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Harga Beli:
                  </label>
                  <input
                    type="text"
                    name="buyPrice"
                    id="buyPrice"
                    required
                    value={numberToCurrency(formData.buyPrice)}
                    onChange={handleInputFormData}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                  />
                </div>
              </div>

              {/* input harga jual */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="sellPrice"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Harga Jual:
                  </label>
                  <input
                    type="text"
                    name="sellPrice"
                    id="sellPrice"
                    required
                    value={numberToCurrency(formData.sellPrice)}
                    onChange={handleInputFormData}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                  />
                </div>
              </div>

              {/* input gambar */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="img"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Gambar:
                  </label>
                  <input
                    type="file"
                    name="img"
                    id="img"
                    value={formData.img}
                    onChange={handleInputFormData}
                    className={`w-full text-sm md:text-lg px-3 md:leading-8 outline-none border-2 rounded-md `}
                  />
                </div>
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
