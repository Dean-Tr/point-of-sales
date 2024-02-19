import Image from "next/image";

const ProductBuy = ({ product }) => {
  return (
    <div className="w-full px-6 py-3 flex gap-2 rounded-lg shadow-md justify-between items-center bg-white">
      <div className="w-[20%]">
        <Image src={product.img} alt="product image" width={60} height={60} />
      </div>
      <div className="w-[35%]">
        <p className="text-sm lg:text-base font-bold">{product.title} </p>
        <span className="text-xs lg:text-sm font-bold text-slate-400">
          {product.sellPrice.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          })}
        </span>
      </div>
      <div className="w-[35%] flex gap-2 justify-evenly items-center">
        <button className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 flex justify-center items-center bg-blue-300 rounded-lg text-xl md:text-base lg:text-xl text-white shadow-md">
          {"-"}
        </button>
        <input
          type="number"
          inputMode="numeric"
          className="w-8 h-8 md:w-6 md:h-6 lg:w-10 lg:h-8 text-sm py-1 text-center outline-none border rounded-lg shadow-md"
        />
        <button className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 flex justify-center items-center bg-blue-300 rounded-lg text-xl md:text-base lg:text-xl text-white shadow-md">
          {"+"}
        </button>
      </div>
      <button className="w-[10%] flex justify-end items-center cursor-pointer">
        <Image src="/close.png" alt="" width={20} height={20} />
      </button>
    </div>
  );
};

export default ProductBuy;
