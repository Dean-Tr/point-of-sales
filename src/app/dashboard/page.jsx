import DashboardCard from "@/components/DashboardCard";
import { Transactions, Products, Expenses } from "@/data";
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

      <div className="my-8 flex justify-between items-center">
        <DashboardCard
          img={"/stok.png"}
          color={"blue"}
          title={"Total Barang"}
          content={`${Products.length} Barang`}
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
          color={"green"}
          title={"Total Penjualan"}
          content={totalTransactions.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          })}
        />

        <DashboardCard
          img={"/keuntungan.png"}
          color={"yellow"}
          title={"Total Keuntungan"}
          content={totalProfit.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          })}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
