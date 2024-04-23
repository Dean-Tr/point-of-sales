"use client";

import Image from "next/image";
import ProductCard from "@/components/Cashier/ProductCard";
import ProductBuy from "@/components/Cashier/ProductBuy";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/LoadingSpinner";
import { currencyToNumber } from "@/utils/convertToCurrency";
import PayTransaction from "@/components/Cashier/PayTransaction";

export default function KasirPage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch(`http://localhost:3000/api/products`).then((res) => res.json()),
  });

  const [search, setSearch] = useState("");

  const filteredProducts = data?.filter(
    (product) =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.catTitle.toLowerCase().includes(search.toLowerCase())
  );

  const [inputs, setInputs] = useState({
    grossProfit: 0,
    totalTransaction: 0,
    cash: 0,
    change: 0,
  });

  const [products, setProducts] = useState([]);

  const handleAddProducts = (id, title, img, buyPrice, sellPrice) => {
    const existingProductIndex = products.findIndex((p) => p.id === id);

    if (existingProductIndex !== -1) {
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex].quantity += 1;
      updatedProducts[existingProductIndex].subTotal =
        updatedProducts[existingProductIndex].sellPrice *
        updatedProducts[existingProductIndex].quantity;

      setProducts(updatedProducts);
    } else {
      const newProduct = {
        id,
        title,
        img,
        buyPrice: parseFloat(buyPrice),
        sellPrice: parseFloat(sellPrice),
        quantity: 1,
        subTotal: parseFloat(sellPrice),
      };

      setProducts((prevProducts) => [...prevProducts, newProduct]);
    }
  };

  const handleDeleteAllProducts = () => {
    setProducts([]);
  };

  useEffect(() => {
    const totalItem = products.reduce((acc, product) => acc + product.quantity, 0);
    const grossProfit = products.reduce(
      (acc, product) =>
        acc +
        (totalItem * currencyToNumber(product.sellPrice) -
          totalItem * currencyToNumber(product.buyPrice)),
      0
    );

    const totalTransaction = products.reduce(
      (acc, product) => acc + currencyToNumber(product.subTotal),
      0
    );

    setInputs((prev) => ({
      ...prev,
      grossProfit: parseFloat(grossProfit),
      totalTransaction: parseFloat(totalTransaction),
    }));
  }, [products]);

  if (isPending)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)]">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="bg-white h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] flex flex-col md:flex-row">
      {/* LEFT PART */}
      <div className="h-full w-full flex-[1.5]">
        {/* SEARCH BAR */}
        <div className="relative my-2 mx-3 border rounded-md shadow-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Image src="/search.png" alt="" height={20} width={20} />
          </div>
          <input
            className="rounded-md w-full py-3 px-10 text-gray-900 placeholder:text-gray-400 md:text-lg md:leading-8 outline-none focus:shadow-2xl"
            type="text"
            placeholder="Cari produk..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        {/* PRODUCT LIST */}
        <div className="w-full h-[calc(100vh-24rem)] md:h-[calc(100vh-5rem)] p-3 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 grid-rows-[13rem] justify-items-center items-center overflow-y-scroll">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() =>
                handleAddProducts(
                  product.id,
                  product.title,
                  product.img,
                  product.buyPrice,
                  product.sellPrice
                )
              }
              className="w-full h-full"
            >
              <ProductCard key={product.id} product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PART */}
      <div className="h-full w-full flex-1 flex flex-col items-center justify-between md:border-l-[1px] md:border-l-slate-400 text-black">
        {/* DELETE BUTTON */}
        <div className="bg-blue-600 w-full px-8 py-3 flex justify-between items-center">
          <p className="text-base font-bold text-white">Detail Belanjaan</p>
          <div onClick={handleDeleteAllProducts} className="cursor-pointer">
            <Image src="/delete.png" alt="" width={25} height={25} />
          </div>
        </div>

        {/* BUY PRODUCT */}
        <div className="w-full h-full md:h-[calc(100vh-8rem)] max-h-[10.3rem] md:max-h-full max p-2 flex flex-col justify-start items-center gap-2 overflow-y-scroll">
          {products.map((product) => (
            <ProductBuy
              key={product.id}
              product={product}
              products={products}
              setProducts={setProducts}
            />
          ))}
        </div>

        {/* TOTAL PRICE */}
        <div className="w-full flex justify-between">
          <p className="flex flex-1 justify-center items-center py-4 bg-blue-600 font-bold text-white">
            {inputs.totalTransaction.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            })}
          </p>
          <div className="flex flex-1 justify-center items-center">
            <PayTransaction
              inputs={inputs}
              products={products}
              setInputs={setInputs}
              setProducts={setProducts}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
