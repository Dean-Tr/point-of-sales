import { useSearchParams } from "next/navigation";

function useSearchAndPagination(Items) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredItems = Items.filter(
    (item) =>
      item.title?.toLowerCase().includes(query.toLowerCase()) ||
      item.date?.toLowerCase().includes(query.toLowerCase()) ||
      item.transactionCode?.toString().includes(query.toString()) ||
      item.products?.some((item) => item.title.toLowerCase().includes(query.toLowerCase()))
  );

  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredItems.length);
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return { paginatedItems, currentPage, totalPages, itemsPerPage };
}

export default useSearchAndPagination;