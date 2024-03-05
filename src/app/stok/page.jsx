import Image from "next/image";
import { Products } from "@/data.js";

const StokPage = () => {
  return (
    <div className=" bg-white h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] p-6">
      <h1 className="text-3xl font-bold uppercase">Stok Barang</h1>

      <div className="flex gap-6 justify-between my-12 items-center ">
        <button className="flex gap-2 justify-center items-center bg-green-600 p-3 px-6 rounded-md  text-white">
          <Image src={"/tambah.png"} alt="" height={20} width={20} />
          Tambah
        </button>
        <div className="relative my-2 mx-3 border rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Image src="/search.png" alt="" height={20} width={20} />
          </div>
          <input
            className="rounded-md w-full py-3 px-10 text-gray-900 placeholder:text-gray-400 md:text-lg md:leading-8 outline-none"
            type="text"
            placeholder="Cari barang..."
          />
        </div>
      </div>

      <div className="h-[calc(100vh-20rem)] overflow-y-scroll p-3">
        <table class="text-center w-full">
          <thead className="border-b border-neutral-200 font-medium">
            <tr>
              <th scope="col" class="px-6 py-4">
                #
              </th>
              <th scope="col" class="px-6 py-4">
                Gambar Barang
              </th>
              <th scope="col" class="px-6 py-4">
                Nama Barang
              </th>
              <th scope="col" class="px-6 py-4">
                Stok
              </th>
              <th scope="col" class="px-6 py-4">
                Harga Beli
              </th>
              <th scope="col" class="px-6 py-4">
                Harga Jual
              </th>
              <th scope="col" class="px-6 py-4">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {Products.map((product) => (
              <tr className="border-b border-neutral-200" key={product.id}>
                <td className="whitespace-nowrap px-6 py-4">{product.id}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Image src={product.img} alt="" width={50} height={50} className="mx-auto" />
                </td>
                <td className="whitespace-nowrap px-6 py-4">{product.title}</td>
                <td className="whitespace-nowrap px-6 py-4">{product.stock}</td>
                <td className="whitespace-nowrap px-6 py-4">{product.buyPrice}</td>
                <td className="whitespace-nowrap px-6 py-4">{product.sellPrice}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <button className="mx-1 p-2 px-2 bg-blue-500 rounded-md text-white ">
                    <Image src="/edit.png" alt="" width={20} height={20} className="inline-block" />
                    <p className="inline-block">Edit</p>
                  </button>
                  <button className="mx-1 p-2 px-2 bg-red-500 rounded-md text-white ">
                    <Image
                      src="/delete.png"
                      alt=""
                      width={20}
                      height={20}
                      className="inline-block"
                    />
                    <p className="inline-block">Hapus</p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StokPage;
