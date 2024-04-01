import Image from "next/image";
import React from "react";

const Button = ({ img, title, color, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`flex gap-2 justify-center items-center bg-${color}-600 py-2 px-6 md:py-3 rounded-md text-xs md:text-base text-white`}
      >
        <Image src={img} alt="" height={20} width={20} />
        {title}
      </button>
    </div>
  );
};

export default Button;
