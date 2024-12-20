"use client";

import PaginationControls from "@/components/PaginationControls";
import SearchBar from "@/components/SearchBar";
import useSearchAndPagination from "@/utils/useSearchAndPagination";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/LoadingSpinner";
import { currencyToNumber } from "@/utils/convertToCurrency";
import AddPurchase from "@/components/Purchase/AddPurchase";
import ShowPurchase from "@/components/Purchase/ShowPurchase";
import DeletePurchase from "@/components/Purchase/DeletePurchase";
import EditPurchase from "@/components/Purchase/EditPurchase";
import baseURL from "@/utils/baseURL";
import { Suspense } from "react";

const PembelianPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["purchases"],
    queryFn: () => fetch(`${baseURL}/api/purchases`).then((res) => res.json()),
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
      <h1 className="text-3xl font-bold uppercase">Daftar Pembelian</h1>

      <div className="flex gap-6 justify-between my-8 items-center ">
        <AddPurchase />
        <Suspense>
          <SearchBar placeholder={"Cari Pembelian..."} />
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
                Total Item
              </th>
              <th scope="col" className="px-6 py-1">
                Total harga
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
                  <td className="whitespace-pre px-6 py-1 overflow-auto">{item.totalItem} Item</td>
                  <td className="whitespace-nowrap px-6 py-1">
                    {currencyToNumber(item.totalPrice).toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-1 h-20 md:h-24 w-56 md:w-full flex justify-center items-center">
                    <ShowPurchase item={item} />
                    <EditPurchase item={item} />
                    <DeletePurchase item={item} />
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

export default PembelianPage;
