"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ reportData }) => {
  const [data, setData] = useState({
    datasets: [],
  });
  const [option, setOption] = useState({});

  function getLast30Days() {
    let dates = [];
    let today = new Date();

    for (let i = 29; i >= 0; i--) {
      let date = new Date(today);
      date.setDate(today.getDate() - i);
      let dateString = date.toLocaleString("id-ID", { day: "2-digit", month: "2-digit" });
      dates.push(dateString);
    }
    return dates;
  }
  const last30Days = getLast30Days();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const thirtyDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29);
  thirtyDaysAgo.setHours(23, 59, 59, 999);

  const netProfits = [];
  for (let d = thirtyDaysAgo; d < tomorrow; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    const item = reportData.find((item) => item.date.startsWith(dateStr));
    netProfits.push(item ? parseInt(item.netProfit) : 0);
  }

  useEffect(() => {
    setData({
      labels: last30Days,
      datasets: [
        {
          label: "Keuntungan",
          data: netProfits,
          backgroundColor: "rgba(59, 130, 246, 1)",
        },
      ],
    });

    setOption({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
      },
    });
  }, []);

  return (
    <div className="h-full w-full p-3">
      <Bar options={option} data={data} />
    </div>
  );
};

export default BarChart;
