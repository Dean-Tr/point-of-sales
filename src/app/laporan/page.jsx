"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
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
    const tFoot = document.querySelector("#tableTotal");
    tFoot.classList.remove("sticky");

    const capture = document.querySelector("#report");
    setReceiptLoader(true);
    html2canvas(capture, { scale: 5 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 297; // A4 width in mm (landscape)
      const pageHeight = 210; // A4 height in mm (landscape)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      let position = 0;

      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      setReceiptLoader(false);

      tFoot.classList.add("sticky");

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
          {!(receiptLoader === false) ? (
            <div>
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-200 fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </div>
          ) : (
            <Image src={"/unduhLaporan.png"} alt="" height={20} width={20} />
          )}
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
            <tr className="sticky bottom-0 bg-blue-100" id="tableTotal">
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
