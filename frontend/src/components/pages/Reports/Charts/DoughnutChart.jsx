import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  // Dummy data
const data = {
    labels: ["81–100", "61–80", "41–60", "21–40", "0–20"],
    datasets: [
        {
            data: [20, 25, 30, 15, 10],
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

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-80 h-60 flex justify-center items-center">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
