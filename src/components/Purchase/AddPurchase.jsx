"use client";

import Button from "../Button";
import Modal from "react-modal";
import { currencyToNumber, numberToCurrency } from "@/utils/convertToCurrency";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

const AddPurchase = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch(`http://localhost:3000/api/products`).then((res) => res.json()),
  });

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [inputs, setInputs] = useState({
    date: "",
    totalItem: 0,
    totalPrice: "",
  });

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const filteredProducts = search
    ? data?.filter(
        (product) =>
          product.id?.toString().toLowerCase().includes(search.toLowerCase()) ||
          product.id
            ?.toString()
            .toLowerCase()
            .includes("p" + search.toLowerCase()) ||
          product.title?.toLowerCase().includes(search.toLowerCase()) ||
          product.catTitle?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handleModalClose = () => {
    setInputs({
      date: "",
      totalItem: 0,
      totalPrice: "",
    });
    setIsOpenModal(false);
  };

  const handleAddProducts = (id, title, buyPrice) => {
    const existingProductIndex = products.findIndex((p) => p.id === id);

    if (existingProductIndex !== -1) {
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex].quantity += 1;
      updatedProducts[existingProductIndex].subTotal =
        updatedProducts[existingProductIndex].buyPrice *
        updatedProducts[existingProductIndex].quantity;

      setProducts(updatedProducts);
    } else {
      const newProduct = {
        id,
        title,
        buyPrice,
        quantity: 1,
        subTotal: buyPrice,
      };

      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }
    setSearch("");
  };

  const handleDeleteProducts = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const handleIncrementQuantity = (id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1,
          subTotal: product.buyPrice * (product.quantity + 1),
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleDecrementQuantity = (id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id && product.quantity > 0) {
        return {
          ...product,
          quantity: product.quantity - 1,
          subTotal: product.buyPrice * (product.quantity - 1),
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleQuantityChange = (newValue, id) => {
    const parsedValue = parseInt(newValue);
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: isNaN(parsedValue) ? 0 : parsedValue,
          subTotal: product.buyPrice * (isNaN(parsedValue) ? 0 : parsedValue),
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;

    const newValue = currencyToNumber(value);
    if (!isNaN(newValue) && name === "totalPrice") {
      setInputs((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    } else {
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const totalItem = products.reduce((acc, product) => acc + product.quantity, 0);

    const totalPrice = products.reduce(
      (acc, product) => acc + currencyToNumber(product.subTotal),
      0
    );

    setInputs((prev) => ({
      ...prev,
      totalItem,
      totalPrice,
    }));
  }, [products]);

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:3000/api/purchases/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...inputs,
            products,
            date: new Date(inputs.date),
          }),
        });
        setLoading(false);
        return response;
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      if (data.status === 201) {
        toast.success("Pembelian berhasil ditambahkan!", { position: "bottom-right" });
        setInputs({
          date: "",
          totalItem: 0,
          totalPrice: "",
        });
        setProducts([]);
        setIsOpenModal(false);
      } else {
        toast.error("Pembelian gagal ditambahkan!", { position: "bottom-right" });
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div>
      <div>
        <Button
          color={"green"}
          img={"/tambah.png"}
          title={"Tambah"}
          onClick={() => setIsOpenModal(true)}
        />
      </div>
      <div>
        {loading ? (
          <Modal
            isOpen={true}
            ariaHideApp={false}
            contentLabel="Loading..."
            overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
            className={
              "absolute top-1/3 left-0 right-0 md:left-0 md:right-0 lg:left-44 lg:right-44 border-2 bg-white overflow-auto outline-none p-3 z-50"
            }
            closeTimeoutMS={300}
          >
            <p className="text-center items-center">Memproses Pembelian...</p>
          </Modal>
        ) : (
          <Modal
            isOpen={isOpenModal}
            ariaHideApp={false}
            onRequestClose={handleModalClose}
            contentLabel="Tambah Pembelian Baru"
            overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
            className={
              "absolute top-5 left-5 right-5 md:left-32 md:right-32 lg:left-44 lg:right-44 border-2 bg-white outline-none p-3 z-30"
            }
            closeTimeoutMS={300}
          >
            <div className="h-full flex flex-col">
              <div className="flex flex-1 justify-between items-center px-3 pb-2 border-b">
                <h1 className="font-bold text-xl">Tambah Pembelian</h1>
                <span
                  onClick={handleModalClose}
                  className="font-bold text-3xl cursor-pointer text-red-500"
                >
                  x
                </span>
              </div>

              <form
                action=""
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 justify-between flex-2 mt-5 h-full"
              >
                {/* input tanggal */}
                <div>
                  <div className="h-full flex gap-5 justify-center items-center mx-5 md:mr-14">
                    <label
                      htmlFor="date"
                      className={`text-sm md:text-xl text-right font-semibold w-52 `}
                    >
                      Tanggal:
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      required
                      value={inputs.date}
                      onChange={handleInputs}
                      className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                    />
                  </div>
                </div>

                {/* input produk */}
                <div className="">
                  {/* search bar */}
                  <div className="relative h-full flex gap-5 justify-center mx-5 md:mx-14">
                    <div className="w-full">
                      <input
                        type="text"
                        name="searchProducts"
                        id="searchProducts"
                        placeholder="Cari produk..."
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                        className="w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md "
                      />
                      {filteredProducts?.length > 0 && (
                        <div className="absolute overflow-auto h-[calc(100vh-17rem)] z-50 w-full">
                          <table className="text-center w-full md:text-lg bg-slate-700 text-white ">
                            <thead className="border-b border-neutral-200 font-medium ">
                              <tr className="sticky top-0 bg-slate-900">
                                <th scope="col" className="px-6 py-1">
                                  #
                                </th>
                                <th scope="col" className="px-6 py-1">
                                  Kode
                                </th>
                                <th scope="col" className="px-6 py-1">
                                  Nama
                                </th>
                                <th scope="col" className="px-6 py-1">
                                  Kategori
                                </th>
                                <th scope="col" className="px-6 py-1">
                                  Stok
                                </th>
                                <th scope="col" className="px-6 py-1">
                                  Harga Beli
                                </th>
                                <th scope="col" className="px-6 py-1">
                                  Aksi
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredProducts.map((item, index) => (
                                <tr className="border-b border-neutral-200" key={item.id}>
                                  <td className="whitespace-nowrap px-6 py-1">{index + 1}</td>
                                  <td className="whitespace-nowrap px-6 py-1">{item.id}</td>
                                  <td className="whitespace-nowrap px-6 py-1">{item.title}</td>
                                  <td className="whitespace-nowrap px-6 py-1">{item.catTitle}</td>
                                  <td className="whitespace-nowrap px-6 py-1">{item.stock}</td>
                                  <td className="whitespace-nowrap px-6 py-1">
                                    {currencyToNumber(item.buyPrice).toLocaleString("id-ID", {
                                      style: "currency",
                                      currency: "IDR",
                                      minimumFractionDigits: 0,
                                    })}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-1 h-20 md:h-24 w-56 md:w-full flex justify-center items-center">
                                    <div
                                      onClick={() =>
                                        handleAddProducts(item.id, item.title, item.buyPrice)
                                      }
                                      className="mx-1 p-2 px-2 cursor-pointer bg-blue-500 rounded-md text-white flex gap-1 items-center"
                                    >
                                      <p>Pilih</p>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* inputed product */}
                <div className="my-1">
                  <div className="flex gap-5 justify-center items-center mx-5 md:mx-14">
                    <div className="max-h-[calc(100vh-30rem)] w-full overflow-auto ">
                      <table className="text-center w-full md:text-lg ">
                        <thead className="border-b border-neutral-200 font-medium ">
                          <tr className="sticky top-0 bg-white">
                            <th scope="col" className="px-6 py-1">
                              #
                            </th>
                            <th scope="col" className="px-6 py-1">
                              Kode
                            </th>
                            <th scope="col" className="px-6 py-1">
                              Nama
                            </th>
                            <th scope="col" className="px-6 py-1">
                              Harga Beli
                            </th>
                            <th scope="col" className="px-6 py-1">
                              Jumlah
                            </th>
                            <th scope="col" className="px-6 py-1">
                              Subtotal
                            </th>
                            <th scope="col" className="px-6 py-1">
                              Aksi
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((item, index) => (
                            <tr className="border-b border-neutral-200" key={item.id}>
                              <td className="whitespace-nowrap px-6 py-1">{index + 1}</td>
                              <td className="whitespace-nowrap px-6 py-1">{item.id}</td>
                              <td className="whitespace-nowrap px-6 py-1">{item.title}</td>
                              <td className="whitespace-nowrap px-6 py-1">
                                {currencyToNumber(item.buyPrice).toLocaleString("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  minimumFractionDigits: 0,
                                })}
                              </td>
                              <td className="whitespace-nowrap px-6 py-1">
                                <div className=" flex gap-2 justify-center items-center">
                                  <div
                                    onClick={() => handleDecrementQuantity(item.id)}
                                    className="w-8 h-8 flex justify-center items-center bg-blue-400 rounded-lg text-xl  text-white cursor-pointer select-none"
                                  >
                                    {"-"}
                                  </div>
                                  <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(e.target.value, item.id)}
                                    className="w-12 h-8 text-sm py-1 text-center outline-none border rounded-lg"
                                  />
                                  <div
                                    onClick={() => handleIncrementQuantity(item.id)}
                                    className="w-8 h-8 flex justify-center items-center bg-blue-400 rounded-lg text-xl  text-white cursor-pointer select-none"
                                  >
                                    {"+"}
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-1">
                                {currencyToNumber(item.subTotal.toString()).toLocaleString(
                                  "id-ID",
                                  {
                                    style: "currency",
                                    currency: "IDR",
                                    minimumFractionDigits: 0,
                                  }
                                )}
                              </td>
                              <td className="whitespace-nowrap px-6 py-1 h-20 md:h-24 w-56 md:w-full flex justify-center items-center">
                                <div
                                  onClick={() => handleDeleteProducts(item.id)}
                                  className="mx-1 p-2 px-2 bg-red-500 rounded-md text-white flex gap-1 items-center cursor-pointer"
                                >
                                  <div className="hidden md:flex">
                                    <Image src="/delete.png" alt="" width={20} height={20} />
                                  </div>
                                  <p>Hapus</p>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* input total item */}
                <div>
                  <div className="h-full flex gap-5 justify-center items-center mx-5 md:mr-14">
                    <label
                      htmlFor="totalItem"
                      className={`text-sm md:text-xl text-right font-semibold w-52 `}
                    >
                      Total item:
                    </label>
                    <input
                      type="number"
                      name="totalItem"
                      id="totalItem"
                      required
                      disabled
                      value={inputs.totalItem}
                      onChange={handleInputs}
                      className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                    />
                  </div>
                </div>

                {/* input total price */}
                <div>
                  <div className="h-full flex gap-5 justify-center items-center mx-5 md:mr-14">
                    <label
                      htmlFor="totalPrice"
                      className={`text-sm md:text-xl text-right font-semibold w-52 `}
                    >
                      Total Harga:
                    </label>
                    <input
                      type="text"
                      name="totalPrice"
                      id="totalPrice"
                      required
                      disabled
                      value={numberToCurrency(inputs.totalPrice)}
                      onChange={handleInputs}
                      className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                    />
                  </div>
                </div>

                <div className="flex justify-end border-t mt-3 pt-2">
                  <button className="bg-blue-600 text-white px-3 py-2 rounded-md">Simpan</button>
                </div>
              </form>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AddPurchase;
