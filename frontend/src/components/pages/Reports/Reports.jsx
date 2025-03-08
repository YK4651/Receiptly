import { useState, useEffect, useCallback, useMemo } from "react";
// import axios from "axios";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	PointElement,
	LineElement,
	ArcElement,
} from "chart.js";
import Menu from "./Menu";
import LineChart from "./Charts/LineChart";
import DoughnutChart from "./Charts/DoughnutChart";
import GaugeChart from "./Charts/GaugeChart";
import BarChart from "./Charts/BarChart";
import HelpToolTip from "../../common/HelpToolTip";
import FinancialMetrics from "./FinancialMetrics";
import {
	burnRateMessage,
	runwayMessage,
	grossMarginMessage,
	revenueGrowthRateMessage,
} from "../../common/ToolTipMessage";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	PointElement,
	LineElement,
	ArcElement
);

const Reports = () => {
	const [selectedCategory, setSelectedCategory] = useState("Financial");
	const [dateRange, setDateRange] = useState({ start: "", end: "" }); // Configure to display within selected date range

	// Define the charts per category
	const categoryCharts = {
		Financial: [
			{
				title: "Burn Rate",
				component: <LineChart />,
				message: burnRateMessage(),
			},
			{ title: "Runway", component: <GaugeChart />, message: runwayMessage() },
			{
				title: "Gross Margin",
				component: <DoughnutChart />,
				message: grossMarginMessage(),
			},
			{
				title: "Revenue Growth Rate",
				component: <BarChart />,
				message: revenueGrowthRateMessage(),
			},
		],
		"Customer & Market": [
			{ title: "Customer Retention", component: <LineChart /> },
			{ title: "Market Share", component: <DoughnutChart /> },
		],
		"Growth & Performance": [
			{ title: "Yearly Growth", component: <BarChart /> },
			{ title: "Profitability", component: <GaugeChart /> },
		],
		"Operational Efficiency": [
			{ title: "Efficiency Score", component: <DoughnutChart /> },
			{ title: "Operational Costs", component: <BarChart /> },
		],
		"Investor-Specific": [
			{ title: "Valuation Trends", component: <LineChart /> },
			{ title: "Funding Rounds", component: <BarChart /> },
		],
	};

	return (
		<div className='bg-white py-4 pl-4'>
			<h2 className='text-[24px] font-[700] mb-1'>Reports & Insights</h2>
			<p className='text-[16px] font-[400] text-gray-500 mb-6'>
				Track key metrics and gain insights to make smarter
				<br />
				financial decisions.
			</p>

			{/* Menu Navigation */}
			<Menu
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>

			{/* {selectedCategory === "Financial" && ( */}
				<FinancialMetrics onDateChange={setDateRange} />
			{/* // )} */}

			{/* Charts */}
			<div id='report-container' className='p-4 bg-white w-full'>
				<div className='grid grid-cols-2 gap-4'>
					{categoryCharts[selectedCategory]?.map((chart, index) => (
						<div
							key={index}
							className={`border border-gray-200 rounded-xl ${
								chart.component.type === BarChart ? "col-span-2" : ""
							} ${chart.component.type === LineChart ? "col-span-2" : ""}`}
						>
							<h3 className='text-md bg-gray-200/40 p-3 pl-6'>
								<span className='align-[4px]'>{chart.title}</span>
								<HelpToolTip message={`${chart.message}`} />
							</h3>
							<div className='px-4 py-8'>{chart.component}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Reports;

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const Reports = () => {
//   const [dateRange, setDateRange] = useState({ start: null, end: null });
//   const [selectedCategory, setSelectedCategory] = useState("Financial");
//   const [chartData, setChartData] = useState({});

//   const fetchData = useCallback(async () => {
//     if (!dateRange.start || !dateRange.end) return;

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`${API_BASE_URL}/receipts/reports`, {
//         headers: { Authorization: `Bearer ${token}` },
//         params: { startDate: dateRange.start, endDate: dateRange.end },
//       });

//       const data = response.data || {};

//       setChartData({
//         labels: ["Revenue", "Expenses", "Cash Inflows", "Cash Outflows"],
//         datasets: [
//           {
//             label: "Financial Summary",
//             data: [
//               data.revenue || 0,
//               data.expenses || 0,
//               data.cashFlow?.cashInflows || 0,
//               data.cashFlow?.cashOutflows || 0,
//             ],
//             backgroundColor: ["#4caf50", "#f44336", "#2196f3", "#ff9800"],
//             borderColor: ["#388e3c", "#d32f2f", "#1976d2", "#f57c00"],
//             borderWidth: 1,
//           },
//         ],
//       });
//     } catch (error) {
//       console.error("Error fetching report data:", error);
//     }
//   }, [dateRange]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const memoizedChartData = useMemo(() => chartData, [chartData]);

//   return (
//     <div className='bg-white py-4 pl-4'>
//       <h2 className='text-lg font-medium mb-1'>Reports & Insights</h2>
//       <p className='text-xs/4 font-light text-gray-500 mb-6'>
//         Track key metrics and gain insights to make smarter
//         <br />
//         financial decisions.
//       </p>
//       {/* Menu Navigation */}
//       <Menu
//         selectedCategory={selectedCategory}
//         setSelectedCategory={setSelectedCategory}
//       />

//       {/* Financial Metrics with Date Range */}
//       {selectedCategory === "Financial" && (
//         <FinancialMetrics onDateChange={setDateRange} />
//       )}

//       {/* Charts */}
//       <div className='grid grid-cols-2 gap-4'>
//         <div className='col-span-2 border border-gray-200 rounded-xl'>
//           <h3 className='text-md bg-gray-200/40 p-3 pl-6'>
//             <span className='align-[4px]'>Burn Rate</span>
//             <HelpToolTip
//               message={`Burn rate is a financial metric that measures how quickly a company spends its cash. It is a key metric for startups and other companies that are not yet profitable.

//   Burn rate is calculated by adding up a company's operating expenses, such as rent, salaries, and other overhead.

//   It's usually measured on a monthly basis.

//   It's a measure of negative cash flow.`}
//             />
//           </h3>
//           <div className='px-4 py-8'>
//             <LineChart data={memoizedChartData} />
//           </div>
//         </div>

//         <div className='border border-gray-200 rounded-xl'>
//           <h3 className='text-md bg-gray-200/40 p-3 pl-6'>
//             <span className='align-[4px]'>Runway</span>
//             <HelpToolTip
//               message={`Runway is the amount of time a company can continue to operate before it runs out of money.

//   It is calculated by dividing the company's current cash balance by its burn rate.

//   Runway is an important metric for startups and other companies that are not yet profitable, as it indicates how long they have to become profitable or secure additional funding.`}
//             />
//           </h3>
//           <GaugeChart data={memoizedChartData} />
//         </div>

//         <div className='border border-gray-200 rounded-xl'>
//           <h3 className='text-md bg-gray-200/40 p-3 pl-6'>
//             <span className='align-[4px]'>Gross Margin</span>
//             <HelpToolTip
//               message={`Gross margin is a financial metric that represents the percentage of total sales revenue that a company retains after incurring the direct costs associated with producing the goods and services it sells.

//   It is calculated by subtracting the cost of goods sold (COGS) from total revenue and dividing the result by total revenue.

//   Gross margin is an important indicator of a company's financial health and efficiency in managing production costs.`}
//             />
//           </h3>
//           <DoughnutChart data={memoizedChartData} />
//         </div>

//         <div className='col-span-2 border border-gray-200 rounded-xl'>
//           <h3 className='text-md bg-gray-200/40 p-3 pl-6'>
//             <span className='align-[4px]'>Revenue Growth Rate</span>
//             <HelpToolTip
//               message={`Revenue growth rate is a financial metric that measures the increase in a company's sales over a specific period of time.

//   It is calculated by comparing the current period's revenue to the revenue from the previous period and expressing the difference as a percentage.

//   Revenue growth rate is an important indicator of a company's performance and its ability to expand its business.`}
//             />
//           </h3>
//           <div className='px-4 py-8'>
//             <BarChart data={memoizedChartData} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
