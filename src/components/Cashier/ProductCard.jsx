import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div className="relative w-full min-w-[8rem] max-w-[13rem] h-[13rem] flex flex-col justify-between text-slate-700 bg-white border rounded-lg shadow-md hover:shadow-xl cursor-pointer">
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={product.img}
          alt="product image"
          fill
          priority={true}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          style={{ objectFit: "contain", borderTopLeftRadius: "6px", borderTopRightRadius: "6px" }}
        />
      </div>
      <div className="px-3 py-2">
        <h5 className="text-sm font-semibold tracking-tight">{product.title}</h5>
        <span className="text-sm font-bold text-slate-400">
          {parseFloat(product.sellPrice).toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          })}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
