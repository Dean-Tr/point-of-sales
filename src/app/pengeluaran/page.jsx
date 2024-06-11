"use client";

import PaginationControls from "@/components/PaginationControls";
import SearchBar from "@/components/SearchBar";
import useSearchAndPagination from "@/utils/useSearchAndPagination";
import AddExpense from "@/components/Expense/AddExpense";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/LoadingSpinner";
import { currencyToNumber } from "@/utils/convertToCurrency";
import ShowExpense from "@/components/Expense/ShowExpense";
import DeleteExpense from "@/components/Expense/DeleteExpense";
import EditExpense from "@/components/Expense/EditExpense";
import baseURL from "@/utils/baseURL";
import { Suspense } from "react";

const PengeluaranPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => fetch(`${baseURL}/api/expenses`).then((res) => res.json()),
  });

  const { paginatedItems, currentPage, totalPages, itemsPerPage } = useSearchAndPagination(
    data || []
  );

  if (isPending)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)]">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className=" bg-white h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] p-6">
      <h1 className="text-3xl font-bold uppercase">Daftar Pengeluaran</h1>

      <div className="flex gap-6 justify-between my-8 items-center ">
        <AddExpense />
        <Suspense>
          <SearchBar placeholder={"Cari Pengeluaran..."} />
        </Suspense>
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
            <Suspense>
              {paginatedItems.map((item, index) => (
                <tr className="border-b border-neutral-200" key={item.id}>
                  <td className="whitespace-nowrap px-6 py-1">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="whitespace-nowrap px-6 py-1">
                    {new Date(item.date).toLocaleString("id-ID", {
                      dateStyle: "full",
                    })}
                  </td>
                  <td className="whitespace-pre px-6 py-1 overflow-auto">
                    {item.desc.length > 12 ? item.desc.substring(0, 12) + "..." : item.desc}
                  </td>
                  <td className="whitespace-nowrap px-6 py-1">
                    {currencyToNumber(item.nominal).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-1 h-20 md:h-24 w-56 md:w-full flex justify-center items-center">
                    <ShowExpense item={item} />
                    <EditExpense item={item} />
                    <DeleteExpense id={item.id} />
                  </td>
                </tr>
              ))}
            </Suspense>
          </tbody>
        </table>
      </div>
      <Suspense>
        {totalPages > 1 && <PaginationControls currentPage={currentPage} totalPages={totalPages} />}
      </Suspense>
    </div>
  );
};

export default PengeluaranPage;
