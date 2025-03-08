// src/components/pages/Receipt/Receipts.jsx
import React, { useState, useEffect } from 'react';
import { CSVLink } from "react-csv";
import Modal from '../../common/Modal';
import ViewReceipt from './ViewReceipt';
import { fetchReceipts } from '../../../api/receipts';
import { toast } from 'react-toastify';
import ReceiptFilter from './ReceiptFilter';
import ReceiptTable from './ReceiptTable';
import Pagination from './Pagination';

const Receipts = () => {
    const [receipts, setReceipts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [subcategoryFilter, setSubcategoryFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedReceipts, setSelectedReceipts] = useState([]);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const getReceipts = async () => {
            try {
                const data = await fetchReceipts();
                setReceipts(data);
            } catch (error) {
                console.error("Error fetching receipts:", error);
                toast.error("Error fetching receipts");
            }
        };

        getReceipts();
    }, []);

    const uniqueCategories = [...new Set(receipts.flatMap(receipt => receipt.receiptData.map(data => data.receiptCategory)))];

    const filteredReceipts = receipts.filter(receipt => 
        receipt.receiptData.some(data => 
            data.storeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (categoryFilter === '' || data.receiptCategory === categoryFilter) &&
            (subcategoryFilter === '' || data.subcategory === subcategoryFilter)
        ) &&
        (!startDate || new Date(receipt.createdAt.$date?.$numberLong || receipt.createdAt) >= new Date(startDate)) &&
        (!endDate || new Date(receipt.createdAt.$date?.$numberLong || receipt.createdAt) <= new Date(endDate))
    );

    const handleCheckboxChange = (receipt) => {
        setSelectedReceipts(prevSelected =>
            prevSelected.includes(receipt)
                ? prevSelected.filter(r => r !== receipt)
                : [...prevSelected, receipt]
        );
    };

    const handleSelectAll = () => {
        if (selectedReceipts.length === filteredReceipts.length) {
            setSelectedReceipts([]);
        } else {
            setSelectedReceipts(filteredReceipts);
        }
    };

    const csvData = selectedReceipts.flatMap(receipt => 
        receipt.receiptData.map(data => ({
            storeName: data.storeName,
            receiptCategory: data.receiptCategory,
            subcategory: data.subcategory,
            total: data.total,
            createdAt: new Date(receipt.createdAt.$date?.$numberLong || receipt.createdAt).toLocaleDateString()
        }))
    );

    const totalPages = Math.ceil(filteredReceipts.length / itemsPerPage);
    const paginatedReceipts = filteredReceipts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleSave = (id, updatedReceipt) => {
        setReceipts(prevReceipts =>
            prevReceipts.map(receipt =>
                receipt._id === id ? { ...receipt, receiptData: [updatedReceipt] } : receipt
            )
        );
        setSelectedReceipt(null); // Close the modal after saving
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Receipts</h2>
            <ReceiptFilter 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm} 
                categoryFilter={categoryFilter} 
                setCategoryFilter={setCategoryFilter} 
                startDate={startDate} 
                setStartDate={setStartDate} 
                endDate={endDate} 
                setEndDate={setEndDate} 
                uniqueCategories={uniqueCategories}
            />
            <div className="mt-4">
                <CSVLink data={csvData} filename={"receipts.csv"} className="p-2 bg-blue-500 text-white rounded-lg">
                    Export to CSV
                </CSVLink>
            </div>
            <ReceiptTable 
                paginatedReceipts={paginatedReceipts} 
                selectedReceipts={selectedReceipts} 
                handleCheckboxChange={handleCheckboxChange} 
                handleSelectAll={handleSelectAll} 
                setSelectedReceipt={setSelectedReceipt} 
                filteredReceipts={filteredReceipts}
                handleSave={handleSave} // Pass the handleSave function
            />
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                setCurrentPage={setCurrentPage} 
            />
            {selectedReceipt && (
                <Modal isOpen={!!selectedReceipt} onClose={() => setSelectedReceipt(null)}>
                    <ViewReceipt receipt={selectedReceipt} onClose={() => setSelectedReceipt(null)} onSave={handleSave} />
                </Modal>
            )}
        </div>
    );
};

export default Receipts;