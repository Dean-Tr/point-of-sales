"use client";

import Image from "next/image";
import useSearchAndPagination from "@/utils/useSearchAndPagination";
import SearchBar from "@/components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import PaginationControls from "@/components/PaginationControls";
import LoadingSpinner from "@/components/LoadingSpinner";
import { currencyToNumber } from "@/utils/convertToCurrency";
import ShowTransaction from "@/components/Transaction/ShowTransaction";
import DownloadTransaction from "@/components/Transaction/DownloadTransaction";

const TransaksiPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetch(`http://localhost:3000/api/transactions`).then((res) => res.json()),
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
      <h1 className="text-3xl font-bold uppercase">Riwayat Transaksi</h1>

      <div className="flex gap-6 justify-center md:justify-end my-8 items-center ">
        <SearchBar placeholder={"Cari Transaksi..."} />
      </div>

      <div className="h-[calc(100vh-21rem)] md:h-[calc(100vh-17rem)] overflow-x-auto">
        <table className="text-center w-full md:text-lg">
          <thead className="border-b border-neutral-200 font-medium">
            <tr className="sticky top-0 bg-white">
              <th scope="col" className="px-3 py-1">
                #
              </th>
              <th scope="col" className="px-3 py-1">
                Tanggal
              </th>
              <th scope="col" className="px-3 py-1">
                Kode
              </th>
              <th scope="col" className="px-3 py-1">
                Total Item
              </th>
              <th scope="col" className="px-3 py-1">
                Total Harga
              </th>
              <th scope="col" className="px-3 py-1">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item, index) => (
              <tr className="border-b border-neutral-200" key={item.id}>
                <td className="whitespace-nowrap px-3 py-1">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="whitespace-nowrap px-3 py-1">
                  {new Date(item.createdAt.split("T")[0]).toLocaleString("id-ID", {
                    dateStyle: "full",
                  })}
                </td>
                <td className="whitespace-nowrap px-3 py-1">{item.id}</td>
                <td className="whitespace-nowrap px-3 py-1">{item.totalItem}</td>
                <td className="whitespace-nowrap px-3 py-1">
                  {currencyToNumber(item.totalTransaction).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td className="whitespace-nowrap px-3 py-1 h-20 md:h-24 w-56 md:w-full flex justify-center items-center">
                  <ShowTransaction item={item} />
                  <DownloadTransaction item={item} />
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

export default TransaksiPage;
