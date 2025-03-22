import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { updateReceipt } from '../../../api/receipts';

const ViewReceipt = ({ receipt, onClose, onSave }) => {
    const [editableReceipt, setEditableReceipt] = useState({ ...receipt.data, items: receipt.data.items || [] });

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
        return new Date(date).toISOString().split('T')[0];
    };

    const getDropboxImageUrl = (url) => {
        return url.replace('dl=0', 'raw=1');
    };

    return (
      <div className="p-4">
        <div className="mb-4 ">
          {console.log(receipt)}

          {Array.isArray(editableReceipt.items) &&
            editableReceipt.items.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex mb-2 p-6 rounded-[10px] border border-[#D3D3D3] bg-[#FAFAFA] gap-4">
                  {Object.keys(item)
                    .filter((key) =>
                      ["name", "price"].includes(key.toLowerCase())
                    )
                    .sort(
                      (a, b) =>
                        ["name", "price"].indexOf(a.toLowerCase()) -
                        ["name", "price"].indexOf(b.toLowerCase())
                    )
                    .map((key, fieldIndex) => (
                      <div key={key} className="flex-1 mr-2">
                        <label className="block font-bold mb-2">
                          {fieldIndex % 2 === 0 ? "Item(s)" : "price"}:
                        </label>
                        <input
                          type="text"
                          name={key}
                          value={item[key]}
                          onChange={(e) => handleItemChange(index, e)}
                          className="border p-2 rounded w-full border-[#D3D3D3] bg-white mr-4"
                          placeholder={key.replace("_", " ")} 
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
        <div className="mb-4 flex justify-end">
        <div className="flex max-w-[50%] w-full gap-4 mr-8">
            <div className="flex-1">
            <label className="block font-bold">Total:</label>
            <input
                type="text"
                name="total"
                value={editableReceipt.total}
                onChange={handleChange}
                className="border p-2 rounded w-full border-[#D3D3D3] bg-white mr-4"
            />
            </div>
            <div className="flex-1">
            <label className="block font-bold">Tax:</label>
            <input
                type="text"
                name="tax"
                value={editableReceipt.tax}
                onChange={handleChange}
                className="border p-2 rounded w-full border-[#D3D3D3] bg-white mr-4"
            />
            </div>
        </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="p-2 bg-gray-500 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="p-2 bg-[#2E39E6] cursor-pointer text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    );
};

export default ViewReceipt;