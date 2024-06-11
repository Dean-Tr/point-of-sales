import { useState } from "react";
import Button from "../Button";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import baseURL from "@/utils/baseURL";

const SelectPeriode = ({ setReportsData }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });

  const handleModalClose = () => {
    setFormData({
      startDate: "",
      endDate: "",
    });
    setIsOpenModal(false);
  };

  const handleInputFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      setLoading(true);

      try {
        const response = await fetch(`${baseURL}/api/reports/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
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
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      if (data.length > 0) {
        setFormData({
          startDate: "",
          endDate: "",
        });
        setReportsData(data);
        setIsOpenModal(false);
      } else {
        toast.error("Laporan tidak ditemukan!", { position: "bottom-right" });
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div>
      <div>
        <Button
          color={"blue"}
          img={"/ubahPeriode.png"}
          title={"Ubah Periode"}
          onClick={() => setIsOpenModal(true)}
        />
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
            <p className="text-center items-center">Mengambil Data...</p>
          </Modal>
        ) : (
          <Modal
            isOpen={isOpenModal}
            ariaHideApp={false}
            onRequestClose={handleModalClose}
            contentLabel="Tambah Kategori Baru"
            overlayClassName={"fixed top-0 left-0 right-0 bottom-0 bg-slate-900/[.6]"}
            className={
              "absolute top-5 left-5 right-5 md:left-32 md:right-32 lg:left-44 lg:right-44 border-2 bg-white overflow-auto outline-none p-3 z-50"
            }
            closeTimeoutMS={300}
          >
            <div className="h-full flex flex-col">
              <div className="flex flex-1 justify-between items-center px-3 pb-2 border-b">
                <h1 className="font-bold text-xl">Periode Laporan</h1>
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
                {/* input tanggal awal */}
                <div>
                  <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                    <label
                      htmlFor="startDate"
                      className={`text-sm md:text-xl text-right font-semibold w-48 `}
                    >
                      Tanggal Awal:
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      required
                      value={formData.startDate}
                      onChange={handleInputFormData}
                      className={`w-full text-sm md:text-lg px-3 py-1 md:leading-8 outline-none border-2 rounded-md `}
                    />
                  </div>
                </div>

                {/* input tanggal akhir */}
                <div>
                  <div className="h-full flex gap-5 justify-center items-center mx-5 md:mx-14">
                    <label
                      htmlFor="endDate"
                      className={`text-sm md:text-xl text-right font-semibold w-48  `}
                    >
                      Tanggal Akhir:
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      required
                      value={formData.endDate}
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
        )}
      </div>
    </div>
  );
};

export default SelectPeriode;
