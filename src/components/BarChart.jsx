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

const BarChart = () => {
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
      let dateString = date.toLocaleString("id-ID", { day: "2-digit" });
      dates.push(dateString);
    }
    return dates;
  }

  const last30Days = getLast30Days();

  // ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

  useEffect(() => {
    setData({
      labels: last30Days,
      datasets: [
        {
          label: "Keuntungan",
          data: [134, 143, 154, 122, 165, 151, 119, 111, 199, 170],
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
