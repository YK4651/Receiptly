import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-between items-center mt-4">
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 bg-gray-300 rounded-lg"
            >
                Previous
            </button>
            <div className="flex space-x-2">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => setCurrentPage(number)}
                        className={`p-2 rounded-lg ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        {number}
                    </button>
                ))}
            </div>
            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 bg-gray-300 rounded-lg"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;