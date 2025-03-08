import DateRangePicker from "../../common/DateRangePicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import ExportReport from "./ExportReport"; // Import the new component

const FinancialMetrics = ({ onDateChange, openChartModal, startDate, setStartDate, endDate, setEndDate }) => {
	return (
		<div className='mb-4 bg-white rounded'>
			<h3 className='text-[18px] font-[700]'>Financial Metrics</h3>
			<p className='text-[16px] font-light text-gray-500 mb-4 mt-1'>
				Track your startup’s financial health with real-time insights on cash
				flow, <br />
				profitability, and growth.
			</p>

			{/* Date Range Picker */}
			<div className='mt-4 flex justify-between items-center space-x-4'>
				<DateRangePicker 
					startDate={startDate}
					setStartDate={setStartDate}
					endDate={endDate}
					setEndDate={setEndDate}
				/>

				{/* Buttons */}
				<div>
					<ExportReport /> {/* Export Button Component */}

					{/* To Follow: Add More Button */}
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
