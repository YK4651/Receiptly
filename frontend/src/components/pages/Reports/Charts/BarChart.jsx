import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [labels, setLabels] = useState([]);
  const [growthRateData, setGrowthRateData] = useState([]);
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

        // Group and aggregate revenue by month
        const revenueByMonth = {};
        allReports.forEach((report) => {
          const month = dayjs(report.createdAt).format("MMM");
          if (revenueByMonth[month]) {
            revenueByMonth[month] += report.revenue;
          } else {
            revenueByMonth[month] = report.revenue;
          }
        });

        // Use a fixed month order to maintain calendar order
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
        const sortedMonths = monthOrder.filter(
          (month) => revenueByMonth[month] !== undefined
        );

        // Create an array of aggregated revenue values based on the sorted months
        const aggregatedRevenues = sortedMonths.map(
          (month) => revenueByMonth[month]
        );

        // Calculate the revenue growth rate:
        // For the first month, growth is set to 0.
        // For subsequent months, growth rate = ((current - previous) / previous) * 100.
        const growthRates = aggregatedRevenues.map((current, index, arr) => {
          if (index === 0) return 0;
          const previous = arr[index - 1];
          return previous ? ((current - previous) / previous) * 100 : 0;
        });

        setLabels(sortedMonths);
        setGrowthRateData(growthRates);
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
        label: "Revenue Growth Rate (%)",
        data: growthRateData,
        backgroundColor: "#6F77F8",
        // Rounded top corners:
        borderRadius: 8,
        // Ensure corners are visible on top:
        borderSkipped: false,
        // Adjust bar widths:
        barPercentage: 0.5,
        categoryPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          display: false, // hide y-axis labels
          beginAtZero: true,
        },
        grid: {
          drawBorder: false,
          color: "rgba(0,0,0,0.05)",
        },
      },
      x: {
        ticks: {
          color: "#6B7280", // x-axis label color
        },
        grid: {
          drawBorder: false,
          drawOnChartArea: false,
          display: false, // hide vertical grid lines
        },
      },
    },
    plugins: {
      legend: {
        display: false, // hide legend
      },
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
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
