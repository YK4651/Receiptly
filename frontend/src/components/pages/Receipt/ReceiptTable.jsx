import React from "react";
import { FiEye } from "react-icons/fi";

const ReceiptTable = ({
    paginatedReceipts,
    selectedReceipts,
    handleCheckboxChange,
    handleSelectAll,
    setSelectedReceipt,
    filteredReceipts,
}) => {
    return (
        <table className='mt-6 w-full'>
            <thead>
                <tr className='bg-gray-200/20'>
                    <th className='border-y border-l h-15 border-gray-400'>
                        <input
                            type='checkbox'
                            className='w-4 h-4 focus:ring-gray-200'
                            checked={selectedReceipts.length === filteredReceipts.length}
                            onChange={handleSelectAll}
                        />
                    </th>
                    <th className='p-2 border-y text-gray-500 font-light text-left border-gray-400'>
                        Store Name
                    </th>
                    <th className='p-2 border-y text-gray-500 font-light border-gray-400'>
                        Category
                    </th>
                    <th className='border-y text-gray-500 font-light border-gray-400'>
                        Total
                    </th>
                    <th className='border-y text-gray-500 font-light border-gray-400'>
                        Created At
                    </th>
                    <th className='border-y text-gray-500 font-light border-r border-gray-400'>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {paginatedReceipts.map((receipt, index) =>
                    receipt.receiptData.map((data, dataIndex) => (
                        <tr key={`${index}-${dataIndex}`} className='border'>
                            <td className='p-2 border-l border-b border-gray-400 '>
                                <input
                                    type='checkbox'
                                    className='w-4 h-4 focus:ring-gray-200'
                                    checked={selectedReceipts.includes(receipt)}
                                    onChange={() => handleCheckboxChange(receipt)}
                                />
                            </td>
                            <td className='p-2 h-20 border-y border-gray-400'>
                                {data.storeName}
                            </td>
                            <td className={`p-2 border-y border-gray-400 text-center`}>
                                <span
                                    className={`px-4 py-2 text-xs rounded-full ${
                                        data.receiptCategory !== "Uncategorized"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-gray-100 text-gray-400"
                                    }`}
                                >
                                    {data.receiptCategory}
                                </span>
                            </td>
                            <td className='p-2 border-y border-gray-400 text-center text-gray-400'>
                                {data.total}
                            </td>
                            <td className='p-2 border-y border-gray-400 text-center text-gray-400'>
                                {new Date(
                                    receipt.createdAt.$date?.$numberLong || receipt.createdAt
                                ).toLocaleDateString()}
                            </td>
                            <td className='p-2 border-y border-r text-center border-gray-400'>
								
                                <button
                                    onClick={() =>
                                        setSelectedReceipt({
                                            ...receipt,
                                            data: receipt.receiptData[dataIndex],
                                            imageUrl: receipt.imageUrls[dataIndex],
                                        })
                                    }
                                >
                                    <FiEye />
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default ReceiptTable;