import Modal from "react-modal";
import Image from "next/image";
import { currencyToNumber, numberToCurrency } from "@/utils/convertToCurrency";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditExpense = ({ item }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inputs, setInputs] = useState({
    date: item.date.substring(0, 10),
    desc: item.desc,
    nominal: item.nominal,
  });

  const handleModalClose = () => {
    setIsOpenModal(false);
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;

    const newValue = currencyToNumber(value);
    if (!isNaN(newValue) && name === "nominal") {
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

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ id }) => {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:3000/api/expenses/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...inputs,
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
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      if (data.status === 200) {
        toast.success("Pengeluaran berhasil diperbarui!", { position: "bottom-right" });
        setIsOpenModal(false);
      } else {
        toast.error("Pengeluaran gagal diperbarui!", { position: "bottom-right" });
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ id: item.id });
  };

  return (
    <div>
      <div>
        <button
          onClick={() => setIsOpenModal(true)}
          className="mx-1 p-2 px-2 bg-blue-500 rounded-md text-white flex gap-1 items-center"
        >
          <div className="hidden md:flex">
            <Image src="/edit.png" alt="" width={20} height={20} />
          </div>
          <p>Edit</p>
        </button>
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
            <p className="text-center items-center">Memperbarui Pengeluaran...</p>
          </Modal>
        ) : (
          <Modal
            isOpen={isOpenModal}
            ariaHideApp={false}
            onRequestClose={handleModalClose}
            contentLabel="Edit Pengeluaran"
            overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
            className={
              "absolute top-5 left-5 right-5 md:left-32 md:right-32 lg:left-44 lg:right-44 border-2 bg-white overflow-auto outline-none p-3 z-50"
            }
            closeTimeoutMS={300}
          >
            <div className="h-full flex flex-col">
              <div className="flex flex-1 justify-between items-center px-3 pb-2 border-b">
                <h1 className="font-bold text-xl">Edit Pengeluaran</h1>
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
                  <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                    <label
                      htmlFor="date"
                      className={`text-sm md:text-xl text-right font-semibold w-36 `}
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

                {/* input deskripsi */}
                <div>
                  <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                    <label
                      htmlFor="desc"
                      className={`text-sm md:text-xl text-right font-semibold w-36 `}
                    >
                      Deskripsi:
                    </label>
                    <textarea
                      name="desc"
                      id="desc"
                      cols="30"
                      rows="10"
                      required
                      value={inputs.desc}
                      onChange={handleInputs}
                      className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                    ></textarea>
                  </div>
                </div>

                {/* input nominal */}
                <div>
                  <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                    <label
                      htmlFor="nominal"
                      className={`text-sm md:text-xl text-right font-semibold w-36 `}
                    >
                      Nominal:
                    </label>
                    <input
                      type="text"
                      name="nominal"
                      id="nominal"
                      required
                      value={numberToCurrency(parseFloat(inputs.nominal))}
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

export default EditExpense;
