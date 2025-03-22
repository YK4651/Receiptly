import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart = () => {
  const [labels, setLabels] = useState([]);
  const [burnRateData, setBurnRateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch an array of reports from your backend
        const response = await axios.get(`${API_BASE_URL}/reports/generate`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const allReports = response.data; // Expecting an array of report objects

        // Group reports by month (using the month abbreviation) and aggregate grossBurn
        const monthData = {}; // e.g., { Jan: 100, Feb: 150, ... }
        allReports.forEach(report => {
          const month = dayjs(report.createdAt).format("MMM");
          if (monthData[month]) {
            monthData[month] += report.grossBurn;
          } else {
            monthData[month] = report.grossBurn;
          }
        });

        // Define the desired month order
        const monthOrder = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        // Filter out only those months that have data
        const sortedMonths = monthOrder.filter((month) => month in monthData);

        // Prepare chart arrays
        const labels = sortedMonths;
        const burnRateData = sortedMonths.map((month) => monthData[month]);

        setLabels(labels);
        setBurnRateData(burnRateData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching report data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  const data = {
    labels,
    datasets: [
      {
        label: "Gross Burn",
        data: burnRateData,
        borderColor: "#8a42f5",
        borderWidth: 2,
        pointRadius: 0,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(138, 66, 245, 0.2)");
          gradient.addColorStop(1, "rgba(138, 66, 245, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: {
          drawBorder: false,
          color: "rgba(0,0,0,0.05)",
        },
      },
      x: {
        grid: {
          drawBorder: false,
          drawOnChartArea: false,
          display: false,
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0,0,0,0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
  };

  if (loading) return <p className="text-center">Loading chart...</p>;

  return (
    <div className="flex justify-center items-center">
      <div className="h-64 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
