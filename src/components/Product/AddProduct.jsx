"use client";

import { currencyToNumber, numberToCurrency } from "@/utils/convertToCurrency";
import { useEffect, useState } from "react";
import Button from "../Button";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AddProduct = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetch(`http://localhost:3000/api/categories`).then((res) => res.json()),
  });

  // let catData;
  // useEffect(() => {
  //   catData = data;
  // }, [data]);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputs, setInputs] = useState({
    title: "",
    // catTitle: catData[0]?.title,
    catTitle: "",
    buyPrice: 0,
    sellPrice: 0,
    stock: 0,
  });
  const [file, setFile] = useState();

  const handleModalClose = () => {
    setInputs({
      title: "",
      catTitle: "",
      buyPrice: 0,
      sellPrice: 0,
      stock: 0,
    });
    setFile();
    setIsOpenModal(false);
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;

    const newValue = currencyToNumber(value);
    if (!isNaN(newValue) && (name === "buyPrice" || name === "sellPrice")) {
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

  const handleChangeImg = (e) => {
    const target = e.target;
    const item = target.files[0];
    setFile(item);
  };

  const upload = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "point-of-sales");
    const res = await fetch("https://api.cloudinary.com/v1_1/dean-tr/image/upload", {
      method: "POST",
      body: data,
    });

    const resData = await res.json();
    return resData.url;
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => {
      const numericStock = parseInt(inputs.stock);
      let url;
      upload().then((returnedUrl) => (url = returnedUrl));
      return fetch(`http://localhost:3000/api/products/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...inputs,
          img: url,
          stock: numericStock,
        }),
      });
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (data.status === 201) {
        toast.success("Produk berhasil ditambahkan!", { position: "bottom-right" });
        setInput({ title: "" });
        setIsOpenModal(false);
      } else {
        toast.error("Produk gagal ditambahkan!", { position: "bottom-right" });
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
    setIsOpenModal(false);
  };

  console.log(inputs);

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
                    htmlFor="title"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Nama:
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={inputs.title}
                    onChange={handleInputs}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                  />
                </div>
              </div>

              {/* input kategori */}
              <div>
                <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <label
                    htmlFor="catTitle"
                    className={`text-sm md:text-xl text-right font-semibold w-36 `}
                  >
                    Kategori:
                  </label>
                  <select
                    name="catTitle"
                    id="catTitle"
                    value={inputs.catTitle}
                    onChange={handleInputs}
                    className={`w-full text-xs md:text-lg px-3 py-2 md:leading-8 outline-none border-2 rounded-md `}
                  >
                    {data?.map((item) => (
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
                    value={inputs.stock}
                    onChange={handleInputs}
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
                    value={numberToCurrency(inputs.buyPrice)}
                    onChange={handleInputs}
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
                    value={numberToCurrency(inputs.sellPrice)}
                    onChange={handleInputs}
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
                    value={inputs.img}
                    onChange={handleChangeImg}
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

export default AddProduct;
