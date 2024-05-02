"use client";

import SelectPeriode from "@/components/Report/SelectPeriode";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import { useState } from "react";

const LaporanPage = () => {
  const [reportsData, setReportsData] = useState([]);
  const [receiptLoader, setReceiptLoader] = useState(false);

  function countTotalReports(reports) {
    let totalTransaction = 0;
    let totalExpense = 0;
    let totalGrossProfit = 0;
    let totalNetProfit = 0;

    reports?.forEach((report) => {
      totalTransaction += report.transaction.reduce(
        (acc, t) => acc + parseFloat(t.totalTransaction),
        0
      );
      totalExpense += report.expense.reduce((acc, e) => acc + parseFloat(e.nominal), 0);
    });
    totalGrossProfit += reports.reduce((acc, r) => acc + parseFloat(r.grossProfit), 0);
    totalNetProfit += reports.reduce((acc, r) => acc + parseFloat(r.netProfit), 0);

    return { totalTransaction, totalExpense, totalGrossProfit, totalNetProfit };
  }

  const downloadPDF = () => {
    const capture = document.querySelector("#report");
    setReceiptLoader(true);
    html2canvas(capture, { scale: 5 }).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setReceiptLoader(false);
      doc.save(
        `LAPORAN_${reportsData[0]?.date?.split("T")[0]}_${
          reportsData[reportsData?.length - 1]?.date?.split("T")[0]
        }.pdf`
      );
    });
  };

  function compareDates(a, b) {
    return new Date(a.date) - new Date(b.date);
  }

  const { totalTransaction, totalExpense, totalGrossProfit, totalNetProfit } = countTotalReports(
    reportsData || []
  );

  return (
    <div className=" bg-white h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] p-6">
      <h1 className="text-3xl font-bold uppercase">Laporan Keuangan</h1>

      <div className="flex gap-6 my-8 items-center">
        <SelectPeriode setReportsData={setReportsData} />
        <button
          onClick={downloadPDF}
          disabled={!(receiptLoader === false)}
          className={`flex gap-2 justify-center items-center bg-green-600 py-2 px-6 md:py-3 rounded-md text-xs md:text-base text-white`}
        >
          <Image src={"/unduhLaporan.png"} alt="" height={20} width={20} />
          {receiptLoader ? <span>Mengunduh</span> : <span>Unduh Laporan</span>}
        </button>
      </div>

      <div className="h-[calc(100vh-17rem)] md:h-[calc(100vh-13rem)] overflow-y-auto">
        <table className="text-center w-full md:text-lg" id="report">
          <thead className="border-b-2 border-neutral-200 font-medium">
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
            {reportsData.sort(compareDates).map((item, index) => (
              <tr className="border-b border-neutral-200" key={item.id}>
                <td className="whitespace-nowrap px-6 py-3">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-3">
                  {new Date(item.date.split("T")[0]).toLocaleString("id-ID", {
                    dateStyle: "full",
                  })}
                </td>
                <td className="whitespace-nowrap px-6 py-3">
                  {item.transaction
                    .reduce((acc, t) => acc + parseFloat(t.totalTransaction), 0)
                    .toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                </td>
                <td className="whitespace-nowrap px-6 py-3">
                  {item.expense
                    .reduce((acc, e) => acc + parseFloat(e.nominal), 0)
                    .toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                </td>
                <td className="whitespace-nowrap px-6 py-3">
                  {parseFloat(item.grossProfit).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td className="whitespace-nowrap px-6 py-3">
                  {parseFloat(item.netProfit).toLocaleString("id-ID", {
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
