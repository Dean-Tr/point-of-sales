import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useState } from "react";

const DeleteExpense = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ id }) => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/expenses/${id}`, {
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
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      if (data.status === 200) {
        toast.success(`Pengeluaran berhasil dihapus!`, { position: "bottom-right" });
      } else {
        toast.error(`Pengeluaran gagal dihapus!`, { position: "bottom-right" });
      }
    },
  });

  return (
    <div>
      {loading && (
        <Modal
          isOpen={true}
          ariaHideApp={false}
          contentLabel="Hapus Pengeluaran"
          overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
          className={
            "absolute top-1/3 left-0 right-0 md:left-0 md:right-0 lg:left-44 lg:right-44 border-2 bg-white overflow-auto outline-none p-3 z-50"
          }
          closeTimeoutMS={300}
        >
          <p className="text-center items-center">Menghapus Pengeluaran...</p>
        </Modal>
      )}
      <button
        onClick={() => mutation.mutate({ id })}
        className="mx-1 p-2 px-2 bg-red-500 rounded-md text-white flex gap-1 items-center"
      >
        <div className="hidden md:flex">
          <Image src="/delete.png" alt="" width={20} height={20} />
        </div>
        <p>Hapus</p>
      </button>
    </div>
  );
};

export default DeleteExpense;
