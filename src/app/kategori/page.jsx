import ModalAddCategory from "@/components/Category/ModalAddCategory";
import SearchBar from "@/components/SearchBar";
import TableCategory from "@/components/Category/TableCategory";

const getData = async () => {
  const res = await fetch(`${process.env.URL}/api/categories`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const KategoriPage = async () => {
  const category = await getData();

  return (
    <div className=" bg-white h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] p-6">
      <h1 className="text-3xl font-bold uppercase">Daftar Kategori</h1>

      <div className="flex gap-6 justify-between my-8 items-center ">
        <ModalAddCategory />
        <SearchBar placeholder={"Cari Kategori..."} />
      </div>

      <div>
        <TableCategory category={category} />
      </div>
    </div>
  );
};

export default KategoriPage;
