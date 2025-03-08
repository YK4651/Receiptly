// src/components/pages/Receipt/ViewReceipt.jsx
import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { updateReceipt } from '../../../api/receipts';

const ViewReceipt = ({ receipt, onClose, onSave }) => {
    const [editableReceipt, setEditableReceipt] = useState({ ...receipt.data });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableReceipt(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...editableReceipt.items];
        updatedItems[index] = {
            ...updatedItems[index],
            [name]: value
        };
        setEditableReceipt(prevState => ({
            ...prevState,
            items: updatedItems
        }));
    };

    const handleSave = async () => {
        try {
            await updateReceipt(receipt._id, editableReceipt);
            console.log('Updated receipt:', editableReceipt);
            onSave(receipt._id, editableReceipt); // Call the onSave function
            onClose();
        } catch (error) {
            console.error('Error updating receipt:', error);
            alert('Error updating receipt');
        }
    };

    const getFormattedDate = (date) => {
        if (date && date.$date && date.$date.$numberLong) {
            return new Date(date.$date.$numberLong).toISOString().split('T')[0];
        }
        return new Date(date).toISOString().split('T')[0];
    };

    const getDropboxImageUrl = (url) => {
        return url.replace('dl=0', 'raw=1');
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Receipt Details</h2>
            <div className="mb-4">
                <label className="block font-bold">Store Name:</label>
                <input 
                    type="text" 
                    name="storeName" 
                    value={editableReceipt.storeName} 
                    onChange={handleChange} 
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block font-bold">Category:</label>
                <input 
                    type="text" 
                    name="receiptCategory" 
                    value={editableReceipt.receiptCategory} 
                    onChange={handleChange} 
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block font-bold">Subcategory:</label>
                <input 
                    type="text" 
                    name="subcategory" 
                    value={editableReceipt.subcategory} 
                    onChange={handleChange} 
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block font-bold">Total:</label>
                <input 
                    type="text" 
                    name="total" 
                    value={editableReceipt.total} 
                    onChange={handleChange} 
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block font-bold">Created At:</label>
                <input 
                    type="date" 
                    name="createdAt" 
                    value={getFormattedDate(receipt.createdAt)} 
                    onChange={handleChange} 
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-4">
                <label className="block font-bold">Items:</label>
                {editableReceipt.items.map((item, index) => (
                    <div key={index} className="mb-2">
                    <div className="flex mb-2">
                        <div className="flex-1 mr-2">
                            <label className="block font-bold">Item Name:</label>
                            <input 
                                type="text" 
                                name="Description" 
                                value={item.Description} 
                                onChange={(e) => handleItemChange(index, e)} 
                                className="border p-2 rounded w-full"
                                placeholder="Item Name"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block font-bold">Item Price:</label>
                            <input 
                                type="text" 
                                name="Unit Price" 
                                value={item["Unit Price"]} 
                                onChange={(e) => handleItemChange(index, e)} 
                                className="border p-2 rounded w-full"
                                placeholder="Item Price"
                            />
                        </div>
                    </div>
                </div>
                ))}
            </div>
            <div className="mb-4">
                <label className="block font-bold">Receipt Image:</label>
                <Zoom>
                    <img src={getDropboxImageUrl(receipt.imageUrl)} alt="Receipt" className="w-full h-auto max-w-xs" />
                </Zoom>
            </div>
            <div className="flex justify-end space-x-4">
                <button onClick={onClose} className="p-2 bg-gray-500 text-white rounded-lg">Cancel</button>
                <button onClick={handleSave} className="p-2 bg-blue-500 text-white rounded-lg">Save</button>
            </div>
        </div>
    );
};

export default ViewReceipt;