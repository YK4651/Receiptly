import React from "react";
import { FiSearch } from "react-icons/fi";
import DateRangePicker from "../../common/DateRangePicker";

const ReceiptFilter = ({
	searchTerm,
	setSearchTerm,
	categoryFilter,
	setCategoryFilter,
	startDate,
	setStartDate,
	endDate,
	setEndDate,
	uniqueCategories,
}) => {
	return (
		<div className='flex justify-between space-x-4 mt-20 mr-6 ml-6'>
			<DateRangePicker
				startDate={startDate}
				setStartDate={setStartDate}
				endDate={endDate}
				setEndDate={setEndDate}
			/>
			<div className="flex items-center gap-2">
				<div className='w-full h-10 flex items-center border border-gray-300 p-2 rounded-lg'>
					<FiSearch className='text-gray-500 ml-2' />
					<input
						type='text'
						placeholder='Search for receipt'
						className='flex-1 p-2 rounded outline-none'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<select
					className='cursor-pointer border p-2 px-3 h-10 rounded-lg border-gray-300 text-gray-500'
					value={categoryFilter}
					onChange={(e) => setCategoryFilter(e.target.value)}
				>
					<option value=''>Filter</option>
					{uniqueCategories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default ReceiptFilter;
