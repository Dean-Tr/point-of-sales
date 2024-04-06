"use client";

import React from "react";
import Image from "next/image";
import PaginationControls from "../PaginationControls";
import useSearchAndPagination from "@/utils/useSearchAndPagination";
import { toast } from "react-toastify";

const TableCategory = ({ category }) => {
  const { paginatedItems, currentPage, totalPages, itemsPerPage } =
    useSearchAndPagination(category);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/api/categories/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (res.status === 200) {
      toast.success(data.message, { position: "bottom-right" });
    } else {
      toast.error(data.message, { position: "bottom-right" });
    }
  };

  return (
    <div>
      <div className="h-[calc(100vh-21rem)] md:h-[calc(100vh-17rem)] overflow-x-auto">
        <table className="text-center w-full md:text-lg">
          <thead className="border-b border-neutral-200 font-medium">
            <tr className="sticky top-0 bg-white">
              <th scope="col" className="px-6 py-1">
                #
              </th>
              <th scope="col" className="px-6 py-1">
                Nama
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
                <td className="whitespace-nowrap px-6 py-1">{item.title}</td>
                <td className="whitespace-nowrap px-6 py-1 h-20 md:h-24 w-56 md:w-full flex justify-center items-center">
                  <button className="mx-1 p-2 px-2 bg-blue-500 rounded-md text-white flex gap-1 items-center">
                    <Image src="/edit.png" alt="" width={20} height={20} />
                    <p>Edit</p>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="mx-1 p-2 px-2 bg-red-500 rounded-md text-white flex gap-1 items-center"
                  >
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

export default TableCategory;
