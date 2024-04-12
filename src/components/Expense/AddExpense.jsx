import Button from "../Button";
import Modal from "react-modal";
import { currencyToNumber, numberToCurrency } from "@/utils/convertToCurrency";
import { useState } from "react";

const AddExpense = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    desc: "",
    nominal: 0,
  });

  const handleModalClose = () => {
    setFormData({
      date: "",
      desc: "",
      nominal: 0,
    });
    setIsOpenModal(false);
  };

  const handleInputFormData = (e) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <Button
          color={"green"}
          img={"/tambah.png"}
          title={"Tambah"}
          onClick={() => setIsOpenModal(true)}
        />
      </div>
      <div>
        <Modal
          isOpen={isOpenModal}
          ariaHideApp={false}
          onRequestClose={handleModalClose}
          contentLabel="Tambah Pengeluaran Baru"
          overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
          className={
            "absolute top-5 left-5 right-5 md:left-32 md:right-32 lg:left-44 lg:right-44 border-2 bg-white overflow-auto outline-none p-3 z-50"
          }
          closeTimeoutMS={300}
        >
          <div className="h-full flex flex-col">
            <div className="flex flex-1 justify-between items-center px-3 pb-2 border-b">
              <h1 className="font-bold text-xl">Tambah Pengeluaran</h1>
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
                    value={formData.date}
                    onChange={handleInputFormData}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                  />
                </div>
              </div>

              {/* input stok */}
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
                    value={formData.desc}
                    onChange={handleInputFormData}
                    className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                  ></textarea>
                </div>
              </div>

              {/* input niminal */}
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
                    value={numberToCurrency(formData.nominal)}
                    onChange={handleInputFormData}
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
      </div>
    </div>
  );
};

export default AddExpense;
