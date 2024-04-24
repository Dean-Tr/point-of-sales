import { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import { currencyToNumber, numberToCurrency } from "@/utils/convertToCurrency";

const ShowTransaction = ({ item }) => {
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
        contentLabel="Detail Transaksi"
        overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
        className={
          "absolute top-5 left-5 right-5 md:left-32 md:right-32 lg:left-44 lg:right-44 border-2 bg-white overflow-auto outline-none p-3 z-50"
        }
        closeTimeoutMS={300}
      >
        <div className="h-full flex flex-col">
          <div className="flex flex-1 justify-between items-center px-3 pb-2 border-b">
            <h1 className="font-bold text-xl">Detail Transaksi</h1>
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
                {new Date(item.createdAt.split("T")[0]).toLocaleString("id-ID", {
                  dateStyle: "full",
                })}
              </p>

              {/* detail product */}
              <div className="my-1 w-full">
                <div className="flex gap-5 justify-center items-center mx-5 md:mx-14">
                  <div className="max-h-[calc(100vh-30rem)] w-full overflow-auto ">
                    <table className="text-center w-full md:text-lg ">
                      <thead className="border-b border-neutral-200 font-medium ">
                        <tr className="sticky top-0 bg-white">
                          <th scope="col" className="px-6 py-1">
                            #
                          </th>
                          <th scope="col" className="px-6 py-1">
                            Kode
                          </th>
                          <th scope="col" className="px-6 py-1">
                            Nama
                          </th>
                          <th scope="col" className="px-6 py-1">
                            Harga Beli
                          </th>
                          <th scope="col" className="px-6 py-1">
                            Harga Jual
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
                        {item.products.map((product, index) => (
                          <tr className="border-b border-neutral-200" key={product.id}>
                            <td className="whitespace-nowrap px-6 py-1">{index + 1}</td>
                            <td className="whitespace-nowrap px-6 py-1">{product.id}</td>
                            <td className="whitespace-nowrap px-6 py-1">{product.title}</td>
                            <td className="whitespace-nowrap px-6 py-1">
                              {product.buyPrice.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              })}
                            </td>
                            <td className="whitespace-nowrap px-6 py-1">
                              {product.sellPrice.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              })}
                            </td>
                            <td className="whitespace-nowrap px-6 py-1">{product.quantity}</td>
                            <td className="whitespace-nowrap px-6 py-1">
                              {product.subTotal.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                minimumFractionDigits: 0,
                              })}
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
                    Total Item:
                  </label>
                  <input
                    type="text"
                    name="totalTransaction"
                    id="totalTransaction"
                    required
                    disabled
                    value={item.totalItem}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                  />
                </div>
              </div>

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
                    value={numberToCurrency(parseFloat(item.totalTransaction))}
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
                    disabled
                    value={numberToCurrency(parseFloat(item.cash))}
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
                    value={numberToCurrency(parseFloat(item.change))}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShowTransaction;
