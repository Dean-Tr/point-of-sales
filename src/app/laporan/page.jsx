import Button from "@/components/Button";
import PaginationControls from "@/components/PaginationControls";
import { Reports } from "@/data";
import Image from "next/image";
import React from "react";

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

  return (
    <div className=" bg-white h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] p-6">
      <h1 className="text-3xl font-bold uppercase">Laporan Keuangan</h1>

      <div className="flex gap-6 my-8 items-center ">
        <Button color={"blue"} img={"/ubahPeriode.png"} title={"Ubah Periode"} />
        <Button color={"green"} img={"/unduhLaporan.png"} title={"Unduh Laporan"} />
      </div>

      <div className="h-[calc(100vh-17rem)] md:h-[calc(100vh-13rem)] overflow-y-auto">
        <table className="text-center w-full md:text-lg">
          <thead className="border-b border-neutral-200 font-medium">
            <tr className="sticky top-0 z-10 bg-white">
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
            <tr className="sticky bottom-0 z-10 bg-blue-100">
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
