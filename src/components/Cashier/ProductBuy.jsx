import Image from "next/image";

const ProductBuy = ({ product, products, setProducts }) => {
  const handleDeleteProducts = (id) => {
    const updatedProducts = products.filter((prd) => prd.id !== id);
    setProducts(updatedProducts);
  };

  const handleIncrementQuantity = (id) => {
    const updatedProducts = products.map((prd) => {
      if (prd.id === id && prd.quantity < prd.stock) {
        return {
          ...prd,
          quantity: prd.quantity + 1,
          subTotal: prd.sellPrice * (prd.quantity + 1),
        };
      }
      return prd;
    });
    setProducts(updatedProducts);
  };

  const handleDecrementQuantity = (id) => {
    const updatedProducts = products.map((prd) => {
      if (prd.id === id && prd.quantity > 1) {
        return {
          ...prd,
          quantity: prd.quantity - 1,
          subTotal: prd.sellPrice * (prd.quantity - 1),
        };
      }
      return prd;
    });
    setProducts(updatedProducts);
  };

  const handleQuantityChange = (newValue, id) => {
    const parsedValue = parseInt(newValue);
    const updatedProducts = products.map((prd) => {
      if (prd.id === id) {
        return {
          ...prd,
          quantity: isNaN(parsedValue) ? 1 : parsedValue < prd.stock ? parsedValue : prd.stock,
          subTotal:
            prd.sellPrice *
            (isNaN(parsedValue) ? 1 : parsedValue < prd.stock ? parsedValue : prd.stock),
        };
      }
      return prd;
    });
    setProducts(updatedProducts);
  };

  return (
    <div className="w-full px-6 py-3 flex gap-2 rounded-lg shadow-md justify-between items-center bg-white">
      <div className="w-[20%]">
        <Image
          src={product.img || "/produkHitam.png"}
          alt="product image"
          width={60}
          height={60}
          style={{ width: "auto", height: "auto" }}
        />
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
        <div
          onClick={() => handleDecrementQuantity(product.id)}
          className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 flex justify-center items-center bg-blue-400 rounded-lg text-xl md:text-base lg:text-xl text-white shadow-md cursor-pointer select-none"
        >
          {"-"}
        </div>
        <input
          type="number"
          value={product.quantity}
          onChange={(e) => handleQuantityChange(e.target.value, product.id)}
          className="w-8 h-8 md:w-6 md:h-6 lg:w-10 lg:h-8 text-sm py-1 text-center outline-none border rounded-lg shadow-md"
        />
        <div
          onClick={() => handleIncrementQuantity(product.id)}
          className="w-8 h-8 md:w-6 md:h-6 lg:w-8 lg:h-8 flex justify-center items-center bg-blue-400 rounded-lg text-xl md:text-base lg:text-xl text-white shadow-md cursor-pointer pointer select-none"
        >
          {"+"}
        </div>
      </div>
      <div
        onClick={() => handleDeleteProducts(product.id)}
        className="w-[10%] flex justify-end items-center cursor-pointer"
      >
        <Image src="/close.png" alt="" width={20} height={20} />
      </div>
    </div>
  );
};

export default ProductBuy;
