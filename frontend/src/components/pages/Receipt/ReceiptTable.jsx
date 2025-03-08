// src/components/pages/Receipt/ReceiptTable.jsx
import React from 'react';
import { FiEye } from "react-icons/fi";

const ReceiptTable = ({ paginatedReceipts, selectedReceipts, handleCheckboxChange, handleSelectAll, setSelectedReceipt, filteredReceipts }) => {
    return (
        <table className="mt-6 w-full border">
            <thead>
                <tr className="bg-gray-200">
                    <th className="p-2 border">
                        <input 
                            type="checkbox" 
                            checked={selectedReceipts.length === filteredReceipts.length} 
                            onChange={handleSelectAll} 
                        />
                    </th>
                    <th className="p-2 border">Store Name</th>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Total</th>
                    <th className="p-2 border">Created At</th>
                    <th className="p-2 border">Actions</th>
                </tr>
            </thead>
            <tbody>
                {paginatedReceipts.map((receipt, index) => (
                    receipt.receiptData.map((data, dataIndex) => (
                        <tr key={`${index}-${dataIndex}`} className="border">
                            <td className="p-2 border">
                                <input 
                                    type="checkbox" 
                                    checked={selectedReceipts.includes(receipt)} 
                                    onChange={() => handleCheckboxChange(receipt)} 
                                />
                            </td>
                            <td className="p-2 border">{data.storeName}</td>
                            <td className="p-2 border">{data.receiptCategory}</td>
                            <td className="p-2 border">{data.total}</td>
                            <td className="p-2 border">{new Date(receipt.createdAt.$date?.$numberLong || receipt.createdAt).toLocaleDateString()}</td>
                            <td className="p-2 border">
                                <button onClick={() => setSelectedReceipt({ ...receipt, data, imageUrl: receipt.imageUrls[dataIndex] })}>
                                    <FiEye />
                                </button>
                            </td>
                        </tr>
                    ))
                ))}
            </tbody>
        </table>
    );
};

export default ReceiptTable;