"use client";

import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useState } from "react";

const DeleteCategory = ({ id }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/categories/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
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
        toast.success(`Kategori berhasil dihapus!`, { position: "bottom-right" });
      } else {
        toast.error(`Kategori gagal dihapus!`, { position: "bottom-right" });
      }
    },
  });

  return (
    <div>
      {loading && (
        <Modal
          isOpen={true}
          ariaHideApp={false}
          contentLabel="Hapus Kategori"
          overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
          className={
            "absolute top-1/3 left-0 right-0 md:left-0 md:right-0 lg:left-44 lg:right-44 border-2 bg-white overflow-auto outline-none p-3 z-50"
          }
          closeTimeoutMS={300}
        >
          <p className="text-center items-center">Menghapus Kategori...</p>
        </Modal>
      )}
      <button
        onClick={() => setIsOpenModal(true)}
        className="mx-1 p-2 px-2 bg-red-500 rounded-md text-white flex gap-1 items-center"
      >
        <Image src="/delete.png" alt="" width={20} height={20} />
        <p>Hapus</p>
      </button>
      <Modal
        isOpen={isOpenModal}
        ariaHideApp={false}
        onRequestClose={() => setIsOpenModal(false)}
        contentLabel="Hapus Kategori"
        overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
        className={
          "absolute top-5 left-5 right-5 md:left-32 md:right-32 lg:left-44 lg:right-44 border-2 bg-white overflow-auto outline-none p-3 z-50"
        }
        closeTimeoutMS={300}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-center items-center px-3 pt-2 py-6">
            <h1 className="font-bold text-xl">Yakin ingin menghapus kategori ini?</h1>
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

export default DeleteCategory;
