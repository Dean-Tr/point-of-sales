"use client";

import Button from "@/components/Button";
import { Reports } from "@/data";
import React, { useState } from "react";
import Modal from "react-modal";

const LaporanPage = () => {
  function countTotalReports(reports) {
    let totalTransaction = 0;
    let totalExpense = 0;
    let totalGrossProfit = 0;
    let totalNetProfit = 0;

    reports.forEach((report) => {
      totalTransaction += report.transaction;
      totalExpense += report.expense;
      totalGrossProfit += report.grossProfit;
      totalNetProfit += report.netProfit;
    });

    return { totalTransaction, totalExpense, totalGrossProfit, totalNetProfit };
  }

  const { totalTransaction, totalExpense, totalGrossProfit, totalNetProfit } =
    countTotalReports(Reports);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });

  const handleModalClose = () => {
    setFormData({
      startDate: "",
      endDate: "",
    });
    setIsOpenModal(false);
  };

  const handleInputFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className=" bg-white h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] p-6">
      <h1 className="text-3xl font-bold uppercase">Laporan Keuangan</h1>

      <div className="flex gap-6 my-8 items-center ">
        <Button
          color={"blue"}
          img={"/ubahPeriode.png"}
          title={"Ubah Periode"}
          onClick={() => setIsOpenModal(true)}
        />
        <Button color={"green"} img={"/unduhLaporan.png"} title={"Unduh Laporan"} />
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
              <h1 className="font-bold text-xl">Periode Laporan</h1>
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
              {/* input tanggal awal */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="startDate"
                    className={`text-sm md:text-xl text-right font-semibold w-48 `}
                  >
                    Tanggal Awal:
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    required
                    value={formData.startDate}
                    onChange={handleInputFormData}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                  />
                </div>
              </div>

              {/* input tanggal akhir */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="endDate"
                    className={`text-sm md:text-xl text-right font-semibold w-48  `}
                  >
                    Tanggal Akhir:
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    required
                    value={formData.endDate}
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

      <div className="h-[calc(100vh-17rem)] md:h-[calc(100vh-13rem)] overflow-y-auto">
        <table className="text-center w-full md:text-lg">
          <thead className="border-b border-neutral-200 font-medium">
            <tr className="sticky top-0 bg-white">
              <th scope="col" className="px-6 py-3 w-[4%]">
                #
              </th>
              <th scope="col" className="px-6 py-3 w-1/6">
                Tanggal
              </th>
              <th scope="col" className="px-6 py-3 w-1/6">
                Penjualan
              </th>
              <th scope="col" className="px-6 py-3 w-1/6">
                Pengeluaran
              </th>
              <th scope="col" className="px-6 py-3 w-1/6">
                Laba Kotor
              </th>
              <th scope="col" className="px-6 py-3 w-1/6">
                Laba Bersih
              </th>
            </tr>
          </thead>
          <tbody>
            {Reports.map((item, index) => (
              <tr className="border-b border-neutral-200" key={item.id}>
                <td className="whitespace-nowrap px-6 py-3">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-3">{item.date}</td>
                <td className="whitespace-nowrap px-6 py-3">
                  {item.transaction.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td className="whitespace-nowrap px-6 py-3">
                  {item.expense.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td className="whitespace-nowrap px-6 py-3">
                  {item.grossProfit.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td className="whitespace-nowrap px-6 py-3">
                  {item.netProfit.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="sticky bottom-0 bg-blue-100">
              <td className="whitespace-nowrap px-6 py-3 w-[4%]"></td>
              <td className="whitespace-nowrap px-6 py-3 font-bold w-1/6">Total</td>
              <td className="whitespace-nowrap px-6 py-3 w-1/6">
                {totalTransaction.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })}
              </td>
              <td className="whitespace-nowrap px-6 py-3 w-1/6">
                {totalExpense.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })}
              </td>
              <td className="whitespace-nowrap px-6 py-3 w-1/6">
                {totalGrossProfit.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })}
              </td>
              <td className="whitespace-nowrap px-6 py-3 w-1/6">
                {totalNetProfit.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default LaporanPage;
