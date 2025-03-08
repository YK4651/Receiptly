import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = () => {
	const data = {
		labels: [
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
		],
		datasets: [
			{
				label: "Revenue Growth",
				data: [45, 60, 38, 50, 35, 58, 48, 52, 50, 55, 62, 40],
				backgroundColor: "rgba(103, 114, 229, 0.8)",
				borderRadius: 6,
				barThickness: 45,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: true,
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				grid: {
					color: "rgba(0, 0, 0, 0.05)",
				},
				ticks: {
					display: false,
				},
			},
		},
	};

	return (
		<div className='h-full w-full'>
			<Bar data={data} options={options} />
		</div>
	);
};

export default BarChart;
