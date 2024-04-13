import { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { currencyToNumber } from "@/utils/convertToCurrency";

const ShowExpense = ({ item }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleModalClose = () => {
    setIsOpenModal(false);
  };

  return (
    <div>
      <div>
        <button
          onClick={() => setIsOpenModal(true)}
          className="mx-1 p-2 px-2 bg-green-500 rounded-md text-white flex gap-1 items-center"
        >
          <div className="hidden md:flex">
            <Image src="/detail.png" alt="" width={20} height={20} />
          </div>
          <p>Detail</p>
        </button>
      </div>

      <Modal
        isOpen={isOpenModal}
        ariaHideApp={false}
        onRequestClose={handleModalClose}
        contentLabel="Detail Pengeluaran"
        overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
        className={
          "absolute top-5 left-5 right-5 md:left-32 md:right-32 lg:left-44 lg:right-44 border-2 bg-white overflow-auto outline-none p-3 z-50"
        }
        closeTimeoutMS={300}
      >
        <div className="h-full flex flex-col">
          <div className="flex flex-1 justify-between items-center px-3 pb-2 border-b">
            <h1 className="font-bold text-xl">Detail Pengeluaran</h1>
            <span
              onClick={handleModalClose}
              className="font-bold text-3xl cursor-pointer text-red-500"
            >
              x
            </span>
          </div>

          <div className="flex justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center gap-6">
              <p className="mt-3 border-b border-neutral-500">
                {new Date(item.date).toLocaleString("id-ID", {
                  dateStyle: "full",
                })}
              </p>

              <div className="w-full px-6 text-center">
                <strong>DESKRIPSI: </strong>
                <p className="break-words whitespace-pre-wrap">{item.desc}</p>
              </div>

              <p>
                <strong>NOMINAL: </strong>
                {currencyToNumber(item.nominal).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShowExpense;
