import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { useState, useMemo } from "react";

ChartJS.register(ArcElement, Tooltip);

const GaugeChart = () => {
  // Dummy data inside the component
  const [dummyData] = useState([
    { id: 1, label: "Performance", percentage: 40 },
    { id: 2, label: "Efficiency", percentage: 75 },
    { id: 3, label: "Completion", percentage: 60 },
    { id: 4, label: "Satisfaction", percentage: 70 },
  ]);

  // Calculate the average percentage
  const averagePercentage = useMemo(() => {
    const total = dummyData.reduce((sum, item) => sum + item.percentage, 0);
    return Math.round(total / dummyData.length);
  }, [dummyData]);

  const data = {
    datasets: [
      {
        data: [averagePercentage, 100 - averagePercentage],
        backgroundColor: ["#161D7C", "#E8EAF6"],
        borderWidth: 0,
        borderRadius: 30,
        cutout: "85%", 
        rotation: -90, 
        circumference: 180, 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="w-full flex justify-center">
      <div className="relative flex flex-col items-center w-64 h-40">
        <div className="relative w-full h-full top-5">
          <Doughnut data={data} options={options} />
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-gray-900">
          {averagePercentage}%
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
