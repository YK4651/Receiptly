import { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [rangeData, setRangeData] = useState([0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // We'll keep the same labels as your dummy data
  const labels = ["81–100", "61–80", "41–60", "21–40", "0–20"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the array of all reports (with `margin` property)
        const response = await axios.get(`${API_BASE_URL}/reports/generate`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const allReports = response.data; // should be an array

        // Bucket each margin into the 5 ranges
        const marginCounts = {
          "81–100": 0,
          "61–80": 0,
          "41–60": 0,
          "21–40": 0,
          "0–20": 0,
        };

        allReports.forEach((report) => {
          const margin = report.margin;

          if (margin >= 81) {
            marginCounts["81–100"]++;
          } else if (margin >= 61) {
            marginCounts["61–80"]++;
          } else if (margin >= 41) {
            marginCounts["41–60"]++;
          } else if (margin >= 21) {
            marginCounts["21–40"]++;
          } else {
            // Anything below 21 goes here (including negative margins)
            marginCounts["0–20"]++;
          }
        });

        // Convert marginCounts to an array in the same order as `labels`
        const newRangeData = [
          marginCounts["81–100"],
          marginCounts["61–80"],
          marginCounts["41–60"],
          marginCounts["21–40"],
          marginCounts["0–20"],
        ];

        setRangeData(newRangeData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching margin data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  // Build the chart data
  const data = {
    labels,
    datasets: [
      {
        data: rangeData,
        backgroundColor: [
          "#6466F1",
          "#C0C3F8",
          "#060636",
          "#121456",
          "#D4D6FA",
        ],
        borderWidth: 0,
      },
    ],
  };

  // Keep your existing styling and options
  const options = {
    cutout: "70%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        align: "center",
        labels: {
          color: "#4A4A4A",
          font: {
            size: 14,
          },
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
    },
    layout: {
      padding: {
        right: 32,
      },
    },
  };

  if (loading) return <p className="text-center">Loading chart...</p>;

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-80 h-60 flex justify-center items-center">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
