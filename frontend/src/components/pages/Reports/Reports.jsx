import { useState } from "react";
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
	const [dateRange, setDateRange] = useState({ start: "", end: "" });

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

			<Menu
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>

			<FinancialMetrics onDateChange={setDateRange} />

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
