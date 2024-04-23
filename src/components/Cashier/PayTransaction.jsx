"use client";

import Modal from "react-modal";
import { currencyToNumber, numberToCurrency } from "@/utils/convertToCurrency";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const PayTransaction = ({ inputs, products, setInputs, setProducts }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleModalClose = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    const change = inputs.cash - inputs.totalTransaction;

    setInputs((prev) => ({
      ...prev,
      change,
    }));
  }, [inputs.cash]);

  const handleInputs = (e) => {
    const { name, value } = e.target;

    const newValue = currencyToNumber(value);
    if (!isNaN(newValue)) {
      setInputs((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:3000/api/transactions/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...inputs,
            products,
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
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      if (data.status === 201) {
        toast.success("Transaksi berhasil!", { position: "bottom-right" });
        setInputs({
          grossProfit: 0,
          totalTransaction: 0,
          cash: 0,
          change: 0,
        });
        setProducts([]);
        setIsOpenModal(false);
      } else {
        toast.error("Transaksi gagal!", { position: "bottom-right" });
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <button
          onClick={() => setIsOpenModal(true)}
          className="w-full h-full bg-green-600 text-white text-xl font-bold"
        >
          Bayar
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
            <p className="text-center items-center">Memproses Transaksi...</p>
          </Modal>
        ) : (
          <Modal
            isOpen={isOpenModal}
            ariaHideApp={false}
            onRequestClose={handleModalClose}
            contentLabel="Bayar Transaksi Baru"
            overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
            className={
              "absolute top-5 left-5 right-5 md:left-32 md:right-32 lg:left-44 lg:right-44 border-2 bg-white outline-none p-3 z-30"
            }
            closeTimeoutMS={300}
          >
            <div className="h-full flex flex-col">
              <div className="flex flex-1 justify-between items-center px-3 pb-2 border-b">
                <h1 className="font-bold text-xl">Bayar Transaksi</h1>
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
                {/* detail product */}
                <div className="my-1">
                  <div className="flex gap-5 justify-center items-center mx-5 md:mx-14">
                    <div className="max-h-[calc(100vh-30rem)] w-full overflow-auto ">
                      <table className="text-center w-full md:text-lg ">
                        <thead className="border-b border-neutral-200 font-medium ">
                          <tr className="sticky top-0 bg-white">
                            <th scope="col" className="px-6 py-1">
                              #
                            </th>
                            <th scope="col" className="px-6 py-1">
                              Nama
                            </th>
                            <th scope="col" className="px-6 py-1">
                              Harga
                            </th>
                            <th scope="col" className="px-6 py-1">
                              Jumlah
                            </th>
                            <th scope="col" className="px-6 py-1">
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((item, index) => (
                            <tr className="border-b border-neutral-200" key={item.id}>
                              <td className="whitespace-nowrap px-6 py-1">{index + 1}</td>
                              <td className="whitespace-nowrap px-6 py-1">{item.title}</td>
                              <td className="whitespace-nowrap px-6 py-1">
                                {item.sellPrice.toLocaleString("id-ID", {
                                  style: "currency",
                                  currency: "IDR",
                                  minimumFractionDigits: 0,
                                })}
                              </td>
                              <td className="whitespace-nowrap px-6 py-1">{item.quantity}</td>
                              <td className="whitespace-nowrap px-6 py-1">
                                {currencyToNumber(item.subTotal.toString()).toLocaleString(
                                  "id-ID",
                                  {
                                    style: "currency",
                                    currency: "IDR",
                                    minimumFractionDigits: 0,
                                  }
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* input total transaction */}
                <div>
                  <div className="h-full flex gap-5 justify-center items-center mx-5 md:mr-14">
                    <label
                      htmlFor="totalTransaction"
                      className={`text-sm md:text-xl text-right font-semibold w-52 `}
                    >
                      Total Harga:
                    </label>
                    <input
                      type="text"
                      name="totalTransaction"
                      id="totalTransaction"
                      required
                      disabled
                      value={numberToCurrency(inputs.totalTransaction)}
                      onChange={handleInputs}
                      className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                    />
                  </div>
                </div>

                {/* input cash */}
                <div>
                  <div className="h-full flex gap-5 justify-center items-center mx-5 md:mr-14">
                    <label
                      htmlFor="cash"
                      className={`text-sm md:text-xl text-right font-semibold w-52 `}
                    >
                      Tunai:
                    </label>
                    <input
                      type="text"
                      name="cash"
                      id="cash"
                      required
                      value={numberToCurrency(inputs.cash)}
                      onChange={handleInputs}
                      className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                    />
                  </div>
                </div>

                {/* input change */}
                <div>
                  <div className="h-full flex gap-5 justify-center items-center mx-5 md:mr-14">
                    <label
                      htmlFor="change"
                      className={`text-sm md:text-xl text-right font-semibold w-52 `}
                    >
                      kembali:
                    </label>
                    <input
                      type="text"
                      name="change"
                      id="change"
                      required
                      disabled
                      value={numberToCurrency(inputs.change)}
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

export default PayTransaction;
