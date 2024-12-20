import { useSearchParams } from "next/navigation";

function useSearchAndPagination(Items) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const filteredItems = Array.isArray(Items)
    ? Items.filter((item) => {
        const formattedDate = (dateString) => {
          const date = new Date(dateString);
          return `${days[date.getDay()]} ${date.getDate()} ${
            months[date.getMonth()]
          } ${date.getFullYear()}`;
        };

        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const months = [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ];

        const idMatchesQuery = item.id?.toString().toLowerCase().includes(query.toLowerCase());
        const idWithPrefixMatchesQuery = item.id
          ?.toString()
          .toLowerCase()
          .includes("p" + query.toLowerCase());

        return (
          item.title?.toLowerCase().includes(query.toLowerCase()) ||
          formattedDate(item.date)?.toLowerCase().includes(query.toLowerCase()) ||
          formattedDate(item.createdAt)?.toLowerCase().includes(query.toLowerCase()) ||
          item.catTitle?.toLowerCase().includes(query.toLowerCase()) ||
          item.desc?.toLowerCase().includes(query.toLowerCase()) ||
          idMatchesQuery ||
          idWithPrefixMatchesQuery ||
          item.products?.some((item) => item.title.toLowerCase().includes(query.toLowerCase()))
        );
      })
    : [];

  function compareDates(a, b) {
    if (a.date) {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  }

  function compareCreatedAt(a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  }

  function compareTitles(a, b) {
    const titleA = a.title?.toUpperCase();
    const titleB = b.title?.toUpperCase();

    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }

    return 0;
  }

  function compareStockProduct(a, b) {
    // Sort by items with stock <= minStock appearing first
    if (a.stock <= a.minStock && b.stock > b.minStock) return -1;
    if (a.stock > a.minStock && b.stock <= b.minStock) return 1;
    // Sort by title if both items have the same stock comparison
    return a.title?.localeCompare(b.title);
  }

  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredItems.length);
  const paginatedItems = filteredItems
    .sort(compareTitles)
    .sort(compareDates)
    .sort(compareStockProduct)
    .slice(startIndex, endIndex);

  return { paginatedItems, currentPage, totalPages, itemsPerPage };
}

export default useSearchAndPagination;
