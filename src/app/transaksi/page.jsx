"use client";

import Image from "next/image";
import { Transactions } from "@/data.js";
import useSearchAndPagination from "@/utils/useSearchAndPagination";
import SearchBar from "@/components/SearchBar";
import PaginationControls from "@/components/PaginationControls";

const TransaksiPage = () => {
  const { paginatedItems, currentPage, totalPages, itemsPerPage } =
    useSearchAndPagination(Transactions);

  return (
    <div className=" bg-white h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] p-6">
      <h1 className="text-3xl font-bold uppercase">Riwayat Transaksi</h1>

      <div className="flex gap-6 justify-center md:justify-end my-8 items-center ">
        <SearchBar placeholder={"Cari Transaksi..."} />
      </div>

      <div className="h-[calc(100vh-21rem)] md:h-[calc(100vh-17rem)] overflow-x-auto">
        <table className="text-center w-full md:text-lg">
          <thead className="border-b border-neutral-200 font-medium">
            <tr className="">
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
                barang
              </th>
              <th scope="col" className="px-3 py-1">
                Total
              </th>
              <th scope="col" className="px-3 py-1">
                Tunai
              </th>
              <th scope="col" className="px-3 py-1">
                Kembalian
              </th>
              <th scope="col" className="px-3 py-1">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item, index) => (
              <tr className="border-b border-neutral-200" key={item.transactionCode}>
                <td className="whitespace-nowrap px-3 py-1">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="whitespace-nowrap px-3 py-1">{item.date}</td>
                <td className="whitespace-nowrap px-3 py-1">{item.id}</td>
                <td className="whitespace-nowrap px-3 py-1">
                  <div className="max-h-[5.4rem] flex justify-center overflow-y-auto overflow-x-hidden">
                    <table className="text-sm text-start">
                      <tbody>
                        {item.products.map((product) => (
                          <tr key={product.title} className="">
                            <td className="whitespace-nowrap px-2 py-1">{product.title}</td>
                            <td className="whitespace-nowrap px-2 py-1">
                              {product.price.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              })}
                            </td>
                            <td className="whitespace-nowrap px-2 py-1">x{product.quantity}</td>
                            <td className="whitespace-nowrap px-2 py-1">
                              {product.totalPrice.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-1">
                  {item.totalTransaction.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td className="whitespace-nowrap px-3 py-1">
                  {item.cash.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td className="whitespace-nowrap px-3 py-1">
                  {item.change.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td className="whitespace-nowrap px-3 py-1 h-20 md:h-24 w-56 md:w-full flex justify-center items-center">
                  <button className="mx-1 p-2 px-2 bg-blue-500 rounded-md text-white flex gap-1 items-center">
                    <Image src="/print.png" alt="" width={20} height={20} />
                    <p>Cetak Struk</p>
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

export default TransaksiPage;
