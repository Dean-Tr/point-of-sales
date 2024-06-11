"use client";

import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useState } from "react";
import baseURL from "@/utils/baseURL";

const DeleteProduct = ({ id, img }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      setLoading(true);
      try {
        const publicId = img ? img.match(/\/v\d+\/(.+)\.\w+$/)[1] : "";
        const response = await fetch(`${baseURL}/api/products/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId }),
        });
        setLoading(false);
        return response;
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (data.status === 200) {
        toast.success(`Produk berhasil dihapus!`, { position: "bottom-right" });
      } else {
        toast.error(`Produk gagal dihapus!`, { position: "bottom-right" });
      }
    },
  });

  return (
    <div>
      {loading && (
        <Modal
          isOpen={true}
          ariaHideApp={false}
          contentLabel="Hapus Produk"
          overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
          className={
            "absolute top-1/3 left-0 right-0 md:left-0 md:right-0 lg:left-44 lg:right-44 border-2 bg-white overflow-auto outline-none p-3 z-50"
          }
          closeTimeoutMS={300}
        >
          <p className="text-center items-center">Menghapus Produk...</p>
        </Modal>
      )}
      <button
        onClick={() => setIsOpenModal(true)}
        className="mx-1 p-2 px-2 bg-red-500 rounded-md text-white flex gap-1 items-center"
      >
        <div className="hidden md:flex">
          <Image src="/delete.png" alt="" width={20} height={20} />
        </div>
        <p>Hapus</p>
      </button>
      <Modal
        isOpen={isOpenModal}
        ariaHideApp={false}
        onRequestClose={() => setIsOpenModal(false)}
        contentLabel="Hapus Produk"
        overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
        className={
          "absolute top-5 left-5 right-5 md:left-32 md:right-32 lg:left-44 lg:right-44 border-2 bg-white overflow-auto outline-none p-3 z-50"
        }
        closeTimeoutMS={300}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-center items-center px-3 pt-2 py-6">
            <h1 className="font-bold text-xl">Yakin ingin menghapus produk ini?</h1>
          </div>
          <div className="flex gap-12 justify-center items-center">
            <span
              onClick={() => setIsOpenModal(false)}
              className="w-32 h-12 mx-1 p-2 px-2 text-2xl bg-blue-500 rounded-md text-white flex gap-1 justify-center items-center cursor-pointer"
            >
              Tidak
            </span>
            <span
              onClick={() => mutation.mutate()}
              className="w-32 h-12 mx-1 p-2 px-2 text-2xl bg-red-500 rounded-md text-white flex gap-1 justify-center items-center cursor-pointer"
            >
              Iya
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteProduct;
