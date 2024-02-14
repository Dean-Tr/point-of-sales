import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-12 w-screen md:w-[calc(100vw-3rem)] bg-blue-600 flex items-center justify-center uppercase text-white">
      <div className="flex text-xl font-bold">
        <h1>Point of sales</h1>
      </div>
    </div>
  );
};

export default Navbar;
