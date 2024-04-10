"use client";

import Button from "@/components/Button";
import PaginationControls from "@/components/PaginationControls";
import SearchBar from "@/components/SearchBar";
import { Expenses } from "@/data";
import useSearchAndPagination from "@/utils/useSearchAndPagination";
import Image from "next/image";
import { currencyToNumber, numberToCurrency } from "@/utils/convertToCurrency";
import { useState } from "react";
import Modal from "react-modal";

const PengeluaranPage = () => {
  const { paginatedItems, currentPage, totalPages, itemsPerPage } =
    useSearchAndPagination(Expenses);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    desc: "",
    nominal: 0,
  });

  const handleModalClose = () => {
    setFormData({
      date: "",
      desc: "",
      nominal: 0,
    });
    setIsOpenModal(false);
  };

  const handleInputFormData = (e) => {
    const { name, value } = e.target;

    // If the input value is not empty
    if (value !== "") {
      // Convert the Indonesian Rupiah to a number
      const newValue = currencyToNumber(value);
      if (!isNaN(newValue) && name === "nominal") {
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
    } else {
      // If input value is empty, set it to an empty string
      setFormData((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert the buyPrice and sellPrice back to numeric values
    const numericBuyPrice = currencyToNumber(formData.nominal);
  };

  return (
    <div className=" bg-white h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] p-6">
      <h1 className="text-3xl font-bold uppercase">Daftar Pengeluaran</h1>

      <div className="flex gap-6 justify-between my-8 items-center ">
        <Button
          color={"green"}
          img={"/tambah.png"}
          title={"Tambah"}
          onClick={() => setIsOpenModal(true)}
        />
        <SearchBar placeholder={"Cari Pengeluaran..."} />
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
              <h1 className="font-bold text-xl">Tambah Pengeluaran</h1>
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
              {/* input tanggal */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="date"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Tanggal:
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={handleInputFormData}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                  />
                </div>
              </div>

              {/* input stok */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="desc"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Deskripsi:
                  </label>
                  <textarea
                    name="desc"
                    id="desc"
                    cols="30"
                    rows="10"
                    required
                    value={formData.desc}
                    onChange={handleInputFormData}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                  ></textarea>
                </div>
              </div>

              {/* input niminal */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="nominal"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Nominal:
                  </label>
                  <input
                    type="text"
                    name="nominal"
                    id="nominal"
                    required
                    value={numberToCurrency(formData.nominal)}
                    onChange={handleInputFormData}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
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
        <table className="text-center w-full md:text-lg">
          <thead className="border-b border-neutral-200 font-medium">
            <tr className="sticky top-0 bg-white">
              <th scope="col" className="px-6 py-1">
                #
              </th>
              <th scope="col" className="px-6 py-1">
                Tanggal
              </th>
              <th scope="col" className="px-6 py-1">
                Deskripsi
              </th>
              <th scope="col" className="px-6 py-1">
                Nominal
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
                <td className="whitespace-nowrap px-6 py-1">{item.date}</td>
                <td className="whitespace-nowrap px-6 py-1">{item.desc}</td>
                <td className="whitespace-nowrap px-6 py-1">
                  {item.nominal.toLocaleString("id-ID", {
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

export default PengeluaranPage;
