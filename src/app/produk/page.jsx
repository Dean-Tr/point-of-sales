import SearchBar from "@/components/SearchBar";
import ModalProduct from "@/components/Product/ModalProduct";
import TableProduct from "@/components/Product/TableProduct";

const getDataProduct = async () => {
  const res = await fetch(`${process.env.URL}/api/products`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const getDataCategory = async () => {
  const res = await fetch(`${process.env.URL}/api/categories`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed!");
  }

  return res.json();
};

const ProdukPage = async () => {
  const product = await getDataProduct();
  const category = await getDataCategory();

  return (
    <div className=" bg-white h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] p-6">
      <h1 className="text-3xl font-bold uppercase">Daftar Produk</h1>

      <div className="flex gap-6 justify-between my-8 items-center ">
        <ModalProduct category={category} />
        <SearchBar placeholder={"Cari Produk..."} />
      </div>

      <div>
        <TableProduct product={product} />
      </div>
    </div>
  );
};

export default ProdukPage;
