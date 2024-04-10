"use client";

import SearchBar from "@/components/SearchBar";
import AddProduct from "@/components/Product/AddProduct";
import Image from "next/image";
import PaginationControls from "@/components/PaginationControls";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/LoadingSpinner";
import useSearchAndPagination from "@/utils/useSearchAndPagination";
import DeleteProduct from "@/components/Product/DeleteProduct";
import EditProduct from "@/components/Product/EditProduct";
import { currencyToNumber } from "@/utils/convertToCurrency";

const ProdukPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch(`http://localhost:3000/api/products`).then((res) => res.json()),
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
      <h1 className="text-3xl font-bold uppercase">Daftar Produk</h1>

      <div className="flex gap-6 justify-between my-8 items-center ">
        <AddProduct />
        <SearchBar placeholder={"Cari Produk..."} />
      </div>

      <div className="h-[calc(100vh-21rem)] md:h-[calc(100vh-17rem)] overflow-x-auto">
        <table className="text-center w-full md:text-lg">
          <thead className="border-b border-neutral-200 font-medium">
            <tr className="sticky top-0 bg-white">
              <th scope="col" className="px-6 py-1">
                #
              </th>
              <th scope="col" className="px-6 py-1">
                Kode
              </th>
              <th scope="col" className="px-6 py-1">
                Gambar
              </th>
              <th scope="col" className="px-6 py-1">
                Nama
              </th>
              <th scope="col" className="px-6 py-1">
                Kategori
              </th>
              <th scope="col" className="px-6 py-1">
                Stok
              </th>
              <th scope="col" className="px-6 py-1">
                Harga Beli
              </th>
              <th scope="col" className="px-6 py-1">
                Harga Jual
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
                <td className="whitespace-nowrap px-6 py-1">{item.id}</td>
                <td className="whitespace-nowrap px-6 py-1">
                  {item.img && (
                    <Image src={item.img} alt="" width={50} height={50} className="mx-auto" />
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-1">{item.title}</td>
                <td className="whitespace-nowrap px-6 py-1">{item.catTitle}</td>
                <td className="whitespace-nowrap px-6 py-1">{item.stock}</td>
                <td className="whitespace-nowrap px-6 py-1">
                  {currencyToNumber(item.buyPrice).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td className="whitespace-nowrap px-6 py-1">
                  {currencyToNumber(item.sellPrice).toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </td>
                <td className="whitespace-nowrap px-6 py-1 h-20 md:h-24 w-56 md:w-full flex justify-center items-center">
                  <EditProduct item={item} />
                  <DeleteProduct id={item.id} img={item.img} />
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

export default ProdukPage;
