import { useState, useEffect } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const Reports = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Comment out the API part and use dummy data
    // const fetchData = async () => {
    //   const response = await axios.get(`${API_BASE_URL}/receipts/reports`);
    //   setChartData(response.data);
    // };

    // fetchData();

    // Dummy data
    const dummyData = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Receipts",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1,
        },
      ],
    };

    setChartData(dummyData);
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Reports</h2>
      {chartData && (
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
      )}
    </div>
  );
};

export default Reports;