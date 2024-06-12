"use client";

import BarChart from "@/components/Dashboard/BarChart";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "@/components/LoadingSpinner";
import baseURL from "@/utils/baseURL";

const DashboardPage = () => {
  const {
    isPending: categoryIsPending,
    error: categoryError,
    data: categoryData,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetch(`${baseURL}/api/categories`).then((res) => res.json()),
  });

  const {
    isPending: productIsPending,
    error: productError,
    data: productData,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch(`${baseURL}/api/products`).then((res) => res.json()),
  });

  const {
    isPending: expenseIsPending,
    error: expenseError,
    data: expenseData,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => fetch(`${baseURL}/api/expenses`).then((res) => res.json()),
  });

  const {
    isPending: transactionIsPending,
    error: transactionError,
    data: transactionData,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetch(`${baseURL}/api/transactions`).then((res) => res.json()),
  });

  const currentDate = new Date();
  currentDate.setHours(23, 59, 59, 999);
  const pastDate = new Date();
  pastDate.setDate(currentDate.getDate() - 29);
  pastDate.setHours(0, 0, 0, 0);
  const dates = { startDate: pastDate, endDate: currentDate };
  const {
    isPending: reportIsPending,
    error: reportError,
    data: reportData,
  } = useQuery({
    queryKey: ["reports"],
    queryFn: () =>
      fetch(`${baseURL}/api/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...dates,
        }),
      }).then((res) => res.json()),
  });

  const totalTransactions = transactionData?.reduce(
    (acc, t) => acc + parseFloat(t.totalTransaction),
    0
  );
  const totalExpenses = expenseData?.reduce((acc, e) => acc + parseFloat(e.nominal), 0);

  if (
    categoryIsPending ||
    productIsPending ||
    expenseIsPending ||
    transactionIsPending ||
    reportIsPending
  )
    return (
      <div className="flex justify-center items-center h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)]">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="bg-white h-[calc(100vh-3rem)] md:h-screen w-screen md:w-[calc(100vw-3rem)] p-6">
      <h1 className="text-3xl font-bold uppercase">Dashboard</h1>

      <div className="w-full my-4 grid gap-2 grid-cols-2 md:grid-cols-4 justify-items-center items-center">
        <DashboardCard
          img={"/produk.png"}
          color={"blue"}
          title={"Total Produk"}
          content={`${productData.length} Produk`}
        />

        <DashboardCard
          img={"/kategori.png"}
          color={"amber"}
          title={"Total Kategori"}
          content={`${categoryData.length} Kategori`}
        />

        <DashboardCard
          img={"/pengeluaran.png"}
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
      </div>

      <div className="border-2  border-slate-400">
        <h1 className="text-sm md:text-xl font-bold p-3">Grafik Keuntungan 30 Hari Terakhir</h1>
        <div className="h-[calc(100vh-24rem)] md:h-[calc(100vh-16rem)] w-full">
          <BarChart reportData={reportData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
