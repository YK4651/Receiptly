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
    const [burnRateData, setBurnRateData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/reports");
                const report = response.data;
                setBurnRateData(report.grossBurn || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching report data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        // labels: burnRateData.map((item) => item.month),
        datasets: [
            {
                label: "Burn Rate",
                data: [543,392, 432, 345, 456, 543, 432, 543, 432, 345, 456, 543],
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
                ticks: {
                    display: false,
                },
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
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
                backgroundColor: "rgba(0,0,0,0.7)",
                titleColor: "#fff",
                bodyColor: "#fff",
            },
        },
    };

    return (
        <div className='flex justify-center items-center'>
            <div className='h-64 w-full'>
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default LineChart;
