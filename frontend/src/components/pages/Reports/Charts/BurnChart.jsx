import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BurnChart = ({ dateRange }) => {
  const [burnRateData, setBurnRateData] = useState({
    labels: [], 
    datasets: [
      {
        label: 'Burn Rate',
        data: [],
        fill: true,
        borderColor: '#4C6EF5',
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    const fetchBurnRateData = async () => {
      if (!dateRange.start || !dateRange.end) return;

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/burn-rate`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
          params: { startDate: dateRange.start, endDate: dateRange.end },
        });

        const data = await response.json();
        // Assuming the API returns monthly burn rate data
        const months = data.months || [];
        const burnRates = data.burnRates || [];

        setBurnRateData({
          labels: months,
          datasets: [
            {
              label: 'Burn Rate',
              data: burnRates,
              fill: true,
              borderColor: '#4C6EF5',
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching burn rate data:", error);
      }
    };

    fetchBurnRateData();
  }, [dateRange]);

  return <Line data={burnRateData} />;
};

export default BurnChart;
