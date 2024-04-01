"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

function PaginationControls({ currentPage, totalPages }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const paginationNumbers = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      paginationNumbers.push(i);
    }
  } else {
    if (currentPage <= 2) {
      paginationNumbers.push(1, 2, 3, 4, 5);
    } else if (currentPage >= totalPages - 2) {
      paginationNumbers.push(
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      paginationNumbers.push(
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2
      );
    }
  }

  return (
    <div className="mt-5 lg:mt-3 flex gap-3 justify-center items-center">
      <button
        onClick={() => {
          const newPage = Math.max(currentPage - 1, 1);
          const params = new URLSearchParams(searchParams);
          params.set("page", newPage.toString());
          replace(`${pathname}?${params.toString()}`);
        }}
        className="text-xl px-3 py-1 border-2 bg-green-600 text-white"
      >
        {"<"}
      </button>
      <div>
        {paginationNumbers.map((page) => (
          <button
            key={page}
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set("page", page.toString());
              replace(`${pathname}?${params.toString()}`);
            }}
            className={`text-xl px-3 py-1 m-[1px] border-2 ${
              page == currentPage ? "bg-blue-600 text-white" : ""
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          const newPage = Math.min(currentPage + 1, totalPages);
          const params = new URLSearchParams(searchParams);
          params.set("page", newPage.toString());
          replace(`${pathname}?${params.toString()}`);
        }}
        className="text-xl px-3 py-1 border-2 bg-green-600 text-white"
      >
        {">"}
      </button>
    </div>
  );
}

export default PaginationControls;
