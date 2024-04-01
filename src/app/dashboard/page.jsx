import BarChart from "@/components/BarChart";
import DashboardCard from "@/components/DashboardCard";
import { Transactions, Products, Expenses, Category } from "@/data";
import Image from "next/image";

const DashboardPage = () => {
  function countTotalTransactions(transactions) {
    let total = 0;
    let profit = 0;
    transactions.forEach((transaction) => {
      total += transaction.totalTransaction;
      profit += transaction.totalProfit;
    });
    return { totalTransactions: total, totalProfit: profit };
  }

  function countTotalExpenses(expenses) {
    let total = 0;
    expenses.forEach((expense) => {
      total += expense.nominal;
    });
    return total;
  }

  const { totalTransactions, totalProfit } = countTotalTransactions(Transactions);
  const totalExpenses = countTotalExpenses(Expenses);

  return (
    <div className="bg-white h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] p-6">
      <h1 className="text-3xl font-bold uppercase">Dashboard</h1>

      <div className="w-full my-4 grid gap-2 grid-cols-2 md:grid-cols-4 justify-items-center items-center">
        <DashboardCard
          img={"/produk.png"}
          color={"blue"}
          title={"Total Produk"}
          content={`${Products.length} Produk`}
        />

        <DashboardCard
          img={"/kategori.png"}
          color={"green"}
          title={"Total Kategori"}
          content={`${Category.length} Kategori`}
        />

        <DashboardCard
          img={"/transaksi.png"}
          color={"red"}
          title={"Total Pengeluaran"}
          content={totalExpenses.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          })}
        />

        <DashboardCard
          img={"/penjualan.png"}
          color={"amber"}
          title={"Total Penjualan"}
          content={totalTransactions.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          })}
        />
      </div>

      <div className="border-2  border-slate-400">
        <h1 className="text-xl font-bold p-3">Grafik Keuntungan</h1>
        <div className="h-[calc(100vh-24rem)] md:h-[calc(100vh-16rem)] w-full">
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
