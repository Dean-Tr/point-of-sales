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
    return new Date(b.date) - new Date(a.date);
  }

  // Custom comparison function to sort by title
  function compareTitles(a, b) {
    const titleA = a.title?.toUpperCase(); // ignore upper and lowercase
    const titleB = b.title?.toUpperCase(); // ignore upper and lowercase

    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }

    // titles are equal
    return 0;
  }

  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredItems.length);
  const paginatedItems = filteredItems
    .sort(compareTitles)
    .sort(compareDates)
    .slice(startIndex, endIndex);

  return { paginatedItems, currentPage, totalPages, itemsPerPage };
}

export default useSearchAndPagination;
