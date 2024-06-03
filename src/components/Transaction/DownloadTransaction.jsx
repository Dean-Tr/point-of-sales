"use client";

import Modal from "react-modal";
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import LoadingSpinner from "../LoadingSpinner";

const DownloadTransaction = ({ item }) => {
  const [isOpenModalReceipt, setIsOpenModalReceipt] = useState(false);
  const [receiptLoader, setReceiptLoader] = useState(false);

  const handleModalCloseReceipt = () => {
    setIsOpenModalReceipt(false);
  };

  const downloadPDF = () => {
    const capture = document.querySelector("#receipt");
    const productsContainer = capture.querySelector(".dataReceipt");

    // Remove height limit and overflow styles
    productsContainer.classList.remove("max-h-[12rem]");
    productsContainer.classList.remove("overflow-auto");

    setReceiptLoader(true);

    html2canvas(capture, { scale: 3 }).then((canvas) => {
      const desiredAspectRatio = 80 / 80;
      const contentWidth = 80; // Desired width in mm
      const calculatedHeight = (contentWidth / desiredAspectRatio) * (canvas.height / canvas.width); // Calculate the height based on the aspect ratio

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [contentWidth, calculatedHeight], // Set the PDF dimensions based on the content height
        compress: true,
      });

      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();

      const imgData = canvas.toDataURL("img/jpeg", 0.7);
      doc.addImage(imgData, "JPEG", 0, 0, componentWidth, componentHeight);

      setReceiptLoader(false);

      // Reapply height limit and overflow styles
      productsContainer.classList.add("max-h-[12rem]");
      productsContainer.classList.add("overflow-auto");

      doc.save(`STRUK_${item.createdAt.split("T")[0]}_${item.id}.pdf`);
    });
  };

  return (
    <div>
      <div>
        <button
          onClick={() => setIsOpenModalReceipt(true)}
          className="mx-1 p-2 px-2 bg-blue-500 rounded-md text-white flex gap-1 items-center"
        >
          <Image src="/print.png" alt="" width={20} height={20} />
          <p>Unduh</p>
        </button>
      </div>

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
              <h1 className="font-bold text-xl">Struk Belanjaan</h1>
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
                    <p>No: {item.id}</p>
                    <p>{item.createdAt.split("T")[0]}</p>
                  </div>
                  <p>=================================</p>
                </div>

                <div className="text-xs max-h-[12rem] overflow-auto dataReceipt">
                  {item.products.map((product) => (
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
                    <p>{parseFloat(item.totalTransaction).toLocaleString("id-ID")}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Tunai: </p>
                    <p>{parseFloat(item.cash).toLocaleString("id-ID")}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Kembali: </p>
                    <p>{parseFloat(item.change).toLocaleString("id-ID")}</p>
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
    </div>
  );
};

export default DownloadTransaction;
