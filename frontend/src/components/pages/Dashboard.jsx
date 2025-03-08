// src/components/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { fetchReceipts } from "../../api/receipts";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [latestReceipts, setLatestReceipts] = useState([]);

  useEffect(() => {
    const getLatestReceipts = async () => {
      try {
        const data = await fetchReceipts();
        const sortedReceipts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setLatestReceipts(sortedReceipts.slice(0, 10));
      } catch (error) {
        console.error("Error fetching receipts:", error);
        toast.error("Error fetching receipts");
      }
    };

    getLatestReceipts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Latest Receipts</h3>
        <table className="mt-4 w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Store Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {latestReceipts.map((receipt, index) => (
              receipt.receiptData.map((data, dataIndex) => (
                <tr key={`${index}-${dataIndex}`} className="border">
                  <td className="p-2 border">{data.storeName}</td>
                  <td className="p-2 border">{data.receiptCategory}</td>
                  <td className="p-2 border">{data.total}</td>
                  <td className="p-2 border">{new Date(receipt.createdAt.$date?.$numberLong || receipt.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;