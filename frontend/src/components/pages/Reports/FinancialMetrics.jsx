import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FiCalendar } from "react-icons/fi";
import ExportReport from "./ExportReport"; // Import the new component

const FinancialMetrics = ({ onDateChange, openChartModal }) => {
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;

	const handleChange = (update) => {
		setDateRange(update);
		if (update[0] && update[1]) {
			onDateChange({
				start: format(update[0], "yyyy-MM-dd"),
				end: format(update[1], "yyyy-MM-dd"),
			});
		}
	};

	return (
		<div className='mb-4 bg-white rounded'>
			<h3 className='text-md font-medium'>Financial Metrics</h3>
			<p className='text-xs/4 font-light text-gray-500 mb-4 mt-1'>
				Track your startups financial health with real-time insights on cash
				flow, <br />
				profitability, and growth.
			</p>

			{/* Date Range Picker */}
			<div className='mt-4 flex justify-between items-center space-x-4'>
				<div className='relative inline-flex items-center border border-gray-300 px-3 py-1 rounded-lg cursor-pointer bg-white'>
					<FiCalendar className='w-4 h-4 text-gray-500 mr-2' />
					<DatePicker
						selected={startDate}
						onChange={handleChange}
						startDate={startDate}
						endDate={endDate}
						selectsRange
						dateFormat='MMM d, yyyy'
						placeholderText='Select Date Range'
						className='outline-none text-xs w-40 text-gray-500'
					/>
				</div>

				{/* Buttons */}
				<div>
					<ExportReport /> {/* Export Button Component */}

				{/* To Follow */}
					{/* <button
						onClick={openChartModal}
						className='px-3 py-2 bg-blue-600 text-xs text-white rounded-lg shadow hover:bg-blue-700 transition'
					>
						+ Add More
					</button> */}
				</div>
			</div>
		</div>
	);
};

export default FinancialMetrics;
