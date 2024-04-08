"use client";

import AddCategory from "@/components/Category/AddCategory";
import SearchBar from "@/components/SearchBar";
import PaginationControls from "@/components/PaginationControls";
import useSearchAndPagination from "@/utils/useSearchAndPagination";
import { useQuery } from "@tanstack/react-query";
import DeleteCategory from "@/components/Category/DeleteCategory";
import LoadingSpinner from "@/components/LoadingSpinner";
import EditCategory from "@/components/Category/EditCategory";

const KategoriPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetch(`http://localhost:3000/api/categories`).then((res) => res.json()),
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
      <h1 className="text-3xl font-bold uppercase">Daftar Kategori</h1>

      <div className="flex gap-6 justify-between my-8 items-center ">
        <AddCategory />
        <SearchBar placeholder={"Cari Kategori..."} />
      </div>

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
                  <EditCategory item={item} />
                  <DeleteCategory id={item.id} />
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

export default KategoriPage;
