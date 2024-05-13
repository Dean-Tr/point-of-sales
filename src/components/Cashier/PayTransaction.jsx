"use client";

import Modal from "react-modal";
import { currencyToNumber, numberToCurrency } from "@/utils/convertToCurrency";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import LoadingSpinner from "../LoadingSpinner";

const PayTransaction = ({ inputs, products, setInputs, setProducts }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalReceipt, setIsOpenModalReceipt] = useState(false);
  const [receiptLoader, setReceiptLoader] = useState(false);

  const [dataReceipt, setDataReceipt] = useState({
    id: "",
    date: "",
    products: [],
    totalItem: 0,
    totalTransaction: "",
    cash: "",
    change: "",
  });

  const handleModalClose = () => {
    setIsOpenModal(false);
  };

  const handleModalCloseReceipt = () => {
    setInputs({
      totalItem: 0,
      grossProfit: 0,
      totalTransaction: 0,
      cash: 0,
      change: 0,
    });
    setProducts([]);
    setDataReceipt({
      id: "",
      date: "",
      products: [],
      totalItem: 0,
      totalTransaction: "",
      cash: "",
      change: "",
    });

    setIsOpenModalReceipt(false);
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

  const downloadPDF = () => {
    const capture = document.querySelector("#receipt");
    const productsContainer = capture.querySelector(".dataReceipt");

    // Remove height limit and overflow styles
    productsContainer.classList.remove("max-h-[12rem]");
    productsContainer.classList.remove("overflow-auto");

    setReceiptLoader(true);

    html2canvas(capture, { scale: 5 }).then((canvas) => {
      const desiredAspectRatio = 80 / 80;
      const contentWidth = 80; // Desired width in mm
      const calculatedHeight = (contentWidth / desiredAspectRatio) * (canvas.height / canvas.width); // Calculate the height based on the aspect ratio

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [contentWidth, calculatedHeight], // Set the PDF dimensions based on the content height
      });

      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();

      const imgData = canvas.toDataURL("img/png");
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);

      setReceiptLoader(false);

      // Reapply height limit and overflow styles
      productsContainer.classList.add("max-h-[12rem]");
      productsContainer.classList.add("overflow-auto");

      doc.save(`STRUK_${dataReceipt.date.split("T")[0]}_${dataReceipt.id}.pdf`);
    });
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
        const data = await response.json();
        return data;
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      if (data) {
        toast.success("Transaksi berhasil!", { position: "bottom-right" });
        setIsOpenModal(false);
        setIsOpenModalReceipt(true);
        setDataReceipt({
          id: data.id,
          date: data.createdAt,
          products: data.products,
          totalItem: data.totalItem,
          totalTransaction: data.totalTransaction,
          cash: data.cash,
          change: data.change,
        });
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
        <div>
          {/* Struk belanjaan */}
          <Modal
            isOpen={isOpenModalReceipt}
            ariaHideApp={false}
            onRequestClose={handleModalCloseReceipt}
            contentLabel="Struk Belanjaan"
            overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
            className={
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[21rem] max-h-[37rem] border-2 bg-white outline-none p-3 z-30"
            }
            closeTimeoutMS={300}
          >
            <div className="h-full flex flex-col">
              <div className="flex flex-1 justify-between items-center px-3 pb-2 border-b ">
                <h1 className="font-bold text-xl">Transaksi Berhasil</h1>
                <span
                  onClick={handleModalCloseReceipt}
                  className="font-bold text-3xl cursor-pointer text-red-500"
                >
                  x
                </span>
              </div>

              {/* Struk yang akan diprint */}
              {!receiptLoader ? (
                <div className="flex flex-col gap-1 p-6" id="receipt">
                  <div className="text-center mb-3">
                    <h1 className="font-bold text-sm">WARUNG IMAS ROSTIKA</h1>
                    <p className="text-xs">JL. BABAKAN CIANJUR DS. SUKAMANAH</p>
                  </div>

                  <div className="text-xs">
                    <div className="flex justify-between items-center">
                      <p>No: {dataReceipt.id}</p>
                      <p>{dataReceipt.date.split("T")[0]}</p>
                    </div>
                    <p>=================================</p>
                  </div>

                  <div className="text-xs max-h-[12rem] overflow-auto dataReceipt">
                    {dataReceipt.products.map((product) => (
                      <div className="flex justify-between items-center mb-2" key={product.id}>
                        <p className="break-anywhere w-24">{product.title}</p>
                        <p className="w-14 text-end">{product.sellPrice.toLocaleString("id-ID")}</p>
                        <p className="w-2 mx-2 text-center">X</p>
                        <p className="w-6 text-start">{product.quantity}</p>
                        <p className="w-20 text-end">{product.subTotal.toLocaleString("id-ID")}</p>
                      </div>
                    ))}
                    <p>-----------------------------------------------</p>
                  </div>

                  <div className="text-xs">
                    <div className="flex justify-between items-center">
                      <p>Total: </p>
                      <p>{parseFloat(dataReceipt.totalTransaction).toLocaleString("id-ID")}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Tunai: </p>
                      <p>{parseFloat(dataReceipt.cash).toLocaleString("id-ID")}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Kembali: </p>
                      <p>{parseFloat(dataReceipt.change).toLocaleString("id-ID")}</p>
                    </div>
                    <p>=================================</p>
                  </div>

                  <div className="text-center mt-3 mb-6">
                    <p className="text-xs">-- TERIMA KASIH --</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center py-3">
                  <LoadingSpinner />
                </div>
              )}

              {/* tombol untuk mencetak struk */}
              <div className="flex justify-end border-t mt-3 pt-2">
                <button
                  onClick={downloadPDF}
                  disabled={!(receiptLoader === false)}
                  className="bg-blue-600 text-white px-3 py-2 rounded-md"
                >
                  {receiptLoader ? <span>Mengunduh</span> : <span>Unduh Struk</span>}
                </button>
              </div>
            </div>
          </Modal>
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
                      Kembali:
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
                  <button className="bg-blue-600 text-white px-3 py-2 rounded-md">Proses</button>
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
