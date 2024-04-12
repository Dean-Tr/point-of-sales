"use client";

import { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditCategory = ({ item }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [input, setInput] = useState({
    title: item.title,
  });

  const handleModalClose = () => {
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
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ id }) => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        setLoading(false);
        return response;
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      if (data.status === 200) {
        toast.success("Kategori berhasil diperbarui!", { position: "bottom-right" });
        setIsOpenModal(false);
      } else {
        toast.error("Kategori gagal diperbarui!", { position: "bottom-right" });
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ id: item.id });
    setIsOpenModal(false);
  };

  return (
    <div>
      <div>
        <button
          onClick={() => setIsOpenModal(true)}
          className="mx-1 p-2 px-2 bg-blue-500 rounded-md text-white flex gap-1 items-center"
        >
          <Image src="/edit.png" alt="" width={20} height={20} />
          <p>Edit</p>
        </button>
      </div>
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
          <p className="text-center items-center">Memperbarui Kategori...</p>
        </Modal>
      ) : (
        <Modal
          isOpen={isOpenModal}
          ariaHideApp={false}
          onRequestClose={handleModalClose}
          contentLabel="Edit Kategori"
          overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
          className={
            "absolute top-5 left-5 right-5 md:left-32 md:right-32 lg:left-44 lg:right-44 border-2 bg-white overflow-auto outline-none p-3 z-50"
          }
          closeTimeoutMS={300}
        >
          <div className="h-full flex flex-col">
            <div className="flex flex-1 justify-between items-center px-3 pb-2 border-b">
              <h1 className="font-bold text-xl">Edit Kategori</h1>
              <span
                onClick={handleModalClose}
                className="font-bold text-3xl cursor-pointer text-red-500"
              >
                x
              </span>
            </div>

            <form
              onSubmit={(e) => handleSubmit(e)}
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
      )}
    </div>
  );
};

export default EditCategory;
