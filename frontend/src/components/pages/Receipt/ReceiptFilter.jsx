import React from 'react';
import { FiSearch } from 'react-icons/fi';

const ReceiptFilter = ({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, startDate, setStartDate, endDate, setEndDate, uniqueCategories }) => {
    return (
        <div className="flex space-x-4 mt-4">
            <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <FiSearch className="text-gray-500" />
                </span>
                <input 
                    type="text" 
                    placeholder="Search for receipt" 
                    className="border p-2 pl-10 rounded w-full"
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <select 
                className="border p-2 rounded" 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
            >
                <option value="">All Categories</option>
                {uniqueCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <input 
                type="date" 
                className="border p-2 rounded" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
            />
            <input 
                type="date" 
                className="border p-2 rounded" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
            />
        </div>
    );
};

export default ReceiptFilter;