import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const Reports = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");


  useEffect(() => {

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure the token is stored after login
        if (!token) {
          setError("Unauthorized: No token found");
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/receipts/reports`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const report = response.data;

        // Create chart data based on the fetched report
        const formattedData = {
          labels: ["Revenue", "Expenses", "Gross Burn", "Net Burn", "Cash Inflows", "Cash Outflows"],
          datasets: [
            {
              label: "Financial Summary",
              data: [report.revenue, report.expenses, report.grossBurn, report.netBurn, report.cashFlow.cashInflows, report.cashFlow.cashOutflows],
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1,
            },
          ],
        };

        setChartData(formattedData);
      } catch (err) {
        setError("Error fetching report data");
        console.error(err);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  return (
    <div>
      <h2 className="text-2xl mb-4">Reports</h2>
      {error && <p className="text-red-500">{error}</p>}
      {chartData ? (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg mb-2">Bar Chart</h3>
            <Bar data={chartData} />
          </div>
          <div>
            <h3 className="text-lg mb-2">Line Chart</h3>
            <Line data={chartData} />
          </div>
          <div>
            <h3 className="text-lg mb-2">Pie Chart</h3>
            <Pie data={chartData} />
          </div>
          <div>
            <h3 className="text-lg mb-2">Doughnut Chart</h3>
            <Doughnut data={chartData} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Reports;