import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, setCurrentPage, totalItems }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex items-center justify-between border-t border-gray-200 mt-3 pt-4 pr-6 pl-6">
            {totalItems >= 10 && (
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 px-4 border border-gray-300 rounded-lg flex items-center hover:bg-blue-500/25 hover:text-gray-700"
                >
                    <FiArrowLeft className="pr-2 w-6" />Previous
                </button>
            )}
            <div className="flex space-x-2">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`p-2 h-[40px] w-[40px] hover:bg-blue-500/10 hover:text-[#2A34D1]/80 rounded-lg ${currentPage === number ? 'bg-blue-500/25 text-[#2A34D1]' : 'bg-white text-gray-400'}`}
                    >
                        {number}
                    </button>
                ))}
            </div>
            {totalItems >= 10 && (
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 px-4 border border-gray-300 rounded-lg flex items-center hover:bg-blue-500/25 hover:text-gray-700"
                >
                    Next <FiArrowRight className="pl-2 w-6" />
                </button>
            )}
        </div>
    );
};

export default Pagination;