"use client";

import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const DeleteCategory = ({ id }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id }) => {
      return fetch(`http://localhost:3000/api/categories/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
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
      <button
        onClick={() => mutation.mutate({ id })}
        className="mx-1 p-2 px-2 bg-red-500 rounded-md text-white flex gap-1 items-center"
      >
        <Image src="/delete.png" alt="" width={20} height={20} />
        <p>Hapus</p>
      </button>
    </div>
  );
};

export default DeleteCategory;
