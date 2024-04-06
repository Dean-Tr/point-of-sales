"use client";

import { useState } from "react";
import Modal from "react-modal";
import Button from "../Button";
import { toast } from "react-toastify";

const ModalAddCategory = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [input, setInput] = useState({
    title: "",
  });

  const handleModalClose = () => {
    setInput({ title: "" });
    setIsOpenModal(false);
  };

  const handleChange = (e) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/categories`, {
        method: "POST",
        body: JSON.stringify({ ...input }),
      });

      const data = await res.json();
      if (res.status === 201) {
        toast.success("Kategori berhasil ditambahkan", { position: "bottom-right" });
        setInput({ title: "" });
        setIsOpenModal(false);
      } else {
        toast.error(data.message, { position: "bottom-right" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <Button
          img={"/tambah.png"}
          color={"green"}
          title={"Tambah"}
          onClick={() => setIsOpenModal(true)}
        />
      </div>
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
            <h1 className="font-bold text-xl">Tambah Kategori</h1>
            <span
              onClick={handleModalClose}
              className="font-bold text-3xl cursor-pointer text-red-500"
            >
              x
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between flex-2 mt-3 h-full"
          >
            <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
              <label htmlFor="title" className={`text-sm md:text-xl font-semibold `}>
                Nama:
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={input.title}
                onChange={handleChange}
                className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
              />
            </div>
            <div className="flex justify-end border-t mt-3 pt-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-3 py-2 rounded-md cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ModalAddCategory;
