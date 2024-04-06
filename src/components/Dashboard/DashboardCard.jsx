import Image from "next/image";
import React from "react";

const DashboardCard = ({ title, content, color, img }) => {
  return (
    <div className="w-full min-w-36 max-w-[23rem] h-20 flex">
      <div className={`hidden lg:flex lg:w-[6rem] bg-${color}-800 justify-center items-center`}>
        <Image src={img} alt="" width={50} height={50} />
      </div>
      <div
        className={`w-full lg:max-w-[17rem] bg-${color}-600 p-3 flex flex-col gap-2 justify-center`}
      >
        <p className="text-white text-sm">{title}</p>
        <p className="text-white text-md xl:text-2xl font-bold">{content}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
