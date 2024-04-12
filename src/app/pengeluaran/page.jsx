"use client";

import Button from "@/components/Button";
import PaginationControls from "@/components/PaginationControls";
import SearchBar from "@/components/SearchBar";
import { Expenses } from "@/data";
import useSearchAndPagination from "@/utils/useSearchAndPagination";
import Image from "next/image";
import AddExpense from "@/components/Expense/AddExpense";

const PengeluaranPage = () => {
  const { paginatedItems, currentPage, totalPages, itemsPerPage } =
    useSearchAndPagination(Expenses);

  return (
    <div className=" bg-white h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] p-6">
      <h1 className="text-3xl font-bold uppercase">Daftar Pengeluaran</h1>

      <div className="flex gap-6 justify-between my-8 items-center ">
        <AddExpense />
        <SearchBar placeholder={"Cari Pengeluaran..."} />
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
