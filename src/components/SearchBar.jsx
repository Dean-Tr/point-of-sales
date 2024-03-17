"use client";

import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

function SearchBar({ placeholder }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const query = searchParams.get("q") || "";

  function handleSearch(term) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative my-2 mx-3 border rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Image src="/search.png" alt="" height={20} width={20} />
      </div>
      <input
        className="rounded-md w-full py-3 px-10 text-gray-900 placeholder:text-gray-400 md:text-lg md:leading-8 outline-none"
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("q")?.toString()}
      />
    </div>
  );
}

export default SearchBar;
