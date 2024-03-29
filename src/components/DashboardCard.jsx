import Image from "next/image";
import React from "react";

const DashboardCard = ({ title, content, color, img }) => {
  return (
    <div>
      <div className="max-w-80 h-20 flex">
        <div className={`relative w-20 bg-${color}-800 flex justify-center items-center`}>
          <Image src={img} alt="" width={50} height={50} />
          <div className="absolute inset-0  opacity-50"></div>
        </div>
        <div className={`w-60 bg-${color}-600 p-3 flex flex-col gap-2 justify-center`}>
          <p className="text-white text-sm">{title}</p>
          <p className="text-white text-2xl font-bold">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
