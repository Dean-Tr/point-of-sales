"use client";

import { currencyToNumber, numberToCurrency } from "@/utils/convertToCurrency";
import React, { useState } from "react";
import Button from "../Button";
import Modal from "react-modal";

const ModalProduct = ({ category }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    img: "",
    name: "",
    category: "",
    buyPrice: 0,
    sellPrice: 0,
    stock: 0,
  });

  const handleModalClose = () => {
    setFormData({
      img: "",
      name: "",
      category: "",
      buyPrice: 0,
      sellPrice: 0,
      stock: 0,
    });
    setIsOpenModal(false);
  };

  const handleInputFormData = (e) => {
    const { name, value } = e.target;

    const newValue = currencyToNumber(value);
    if (!isNaN(newValue) && (name === "buyPrice" || name === "sellPrice")) {
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert the buyPrice and sellPrice back to numeric values
    const numericBuyPrice = currencyToNumber(formData.buyPrice);
    const numericSellPrice = currencyToNumber(formData.sellPrice);
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
        <Modal
          isOpen={isOpenModal}
          ariaHideApp={false}
          onRequestClose={handleModalClose}
          contentLabel="Tambah Kategori Baru"
          overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
          className={
            "absolute top-5 left-5 right-5 md:left-32 md:right-32 lg:left-44 lg:right-44 border-2 bg-white overflow-auto outline-none p-3 z-50"
          }
          closeTimeoutMS={300}
        >
          <div className="h-full flex flex-col">
            <div className="flex flex-1 justify-between items-center px-3 pb-2 border-b">
              <h1 className="font-bold text-xl">Tambah Barang</h1>
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
              {/* input nama */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="name"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Nama:
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleInputFormData}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                  />
                </div>
              </div>

              {/* input kategori */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="category"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Kategori:
                  </label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleInputFormData}
                    className={`w-full text-xs md:text-lg px-3 py-2 md:leading-8 outline-none border-2 rounded-md `}
                  >
                    {category.map((item) => (
                      <option value={item.title} key={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* input stok */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="stock"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Stok:
                  </label>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    value={formData.stock}
                    onChange={handleInputFormData}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                  />
                </div>
              </div>

              {/* input harga beli */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="buyPrice"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Harga Beli:
                  </label>
                  <input
                    type="text"
                    name="buyPrice"
                    id="buyPrice"
                    required
                    value={numberToCurrency(formData.buyPrice)}
                    onChange={handleInputFormData}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                  />
                </div>
              </div>

              {/* input harga jual */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="sellPrice"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Harga Jual:
                  </label>
                  <input
                    type="text"
                    name="sellPrice"
                    id="sellPrice"
                    required
                    value={numberToCurrency(formData.sellPrice)}
                    onChange={handleInputFormData}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                  />
                </div>
              </div>

              {/* input gambar */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="img"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Gambar:
                  </label>
                  <input
                    type="file"
                    name="img"
                    id="img"
                    value={formData.img}
                    onChange={handleInputFormData}
                    className={`w-full text-sm md:text-lg px-3 md:leading-8 outline-none border-2 rounded-md `}
                  />
                </div>
              </div>

              <div className="flex justify-end border-t mt-3 pt-2">
                <button className="bg-blue-600 text-white px-3 py-2 rounded-md">Simpan</button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ModalProduct;
