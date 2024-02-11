import Link from "next/link";

const Navbar = () => {
  const user = false;
  return (
    <div className="h-12 bg-blue-600 flex items-center justify-between uppercase px-12 text-white">
      <div className="hidden md:flex flex-1 text-xl font-bold">
        <Link href="/">Warung Bu Imas</Link>
      </div>
      <div className="md:hidden">
        <p className="hidden">a</p>
      </div>
      <div className="flex ">
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
};

export default Navbar;
