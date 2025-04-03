import React, { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp, FiEdit } from "react-icons/fi";

const ResultsTable = ({ data, onUpdate, handleRemoveFile }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [editableData, setEditableData] = useState(data);
  const [isEditing, setIsEditing] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    onUpdate(editableData);
  }, [editableData, onUpdate]);

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleInputChange = (arrayIndex, key, value) => {
    const updatedData = { ...editableData };
  
    if (key.startsWith('items.')) {
      const [_, itemIndex, itemKey] = key.split('.');
      updatedData.results[arrayIndex].items[itemIndex][itemKey] = value;
    } else {
      updatedData.results[arrayIndex][key] = value;
    }
  
    setEditableData(updatedData);
  
    if (value.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        [`${arrayIndex}-${key}`]: "This field cannot be empty",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`${arrayIndex}-${key}`];
        return newErrors;
      });
    }
  };

  const toggleEditing = (index) => {
    setIsEditing((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleRemove = (index) => {
    const updatedData = { ...editableData };
    updatedData.results.splice(index, 1);
    setEditableData(updatedData);
    handleRemoveFile(index);
  };

  return (
    <div className="overflow-x-auto mt-4 w-full">
      {editableData.results.map((result, arrayIndex) => (
        <div key={arrayIndex} className="mb-6 border border-gray-200 rounded-lg">
          <div
            className="flex justify-between items-center p-4 bg-white cursor-pointer w-full"
            onClick={() => toggleSection(arrayIndex)}
          >
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-semibold">{result.storeName}</h3>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center bg-[#F4F3FF] px-2 py-1 rounded-lg">
                <span className="mr-2 text-[#5925DC]">{result.receiptCategory}</span>
                <FiEdit onClick={(e) => { e.stopPropagation(); toggleEditing(arrayIndex); }} className="stroke-[#5925DC] cursor-pointer" />
              </div>
              {expandedSections[arrayIndex] ? <FiChevronUp /> : <FiChevronDown />}
            </div>
          </div>
          {expandedSections[arrayIndex] && (
            <div className="mt-2 bg-white p-4">
              <div className="mb-4 col-span-2">
                <h4 className="text-md font-semibold mb-2">Receipt Category</h4>
                <input
                  type="text"
                  value={result.receiptCategory}
                  onChange={(e) => handleInputChange(arrayIndex, 'receiptCategory', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors[`${arrayIndex}-receiptCategory`] && (
                  <p className="text-red-500 text-xs mt-1">{errors[`${arrayIndex}-receiptCategory`]}</p>
                )}
              </div>
              <div className="mb-4">
                <h4 className="text-md font-semibold mb-2">Items</h4>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100">
                      {Object.keys(result.items[0]).map((key) => (
                        <th key={key} className="py-2 px-4 border-b text-left text-sm font-semibold text-gray-700">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.items.map((item, idx) => (
                      <tr key={idx}>
                        {Object.entries(item).map(([key, value], i) => (
                          <td key={i} className="py-2 px-4 text-sm text-gray-700">
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => handleInputChange(arrayIndex, `items.${idx}.${key}`, e.target.value)}
                              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors[`${arrayIndex}-items.${idx}.${key}`] && (
                              <p className="text-red-500 text-xs mt-1">{errors[`${arrayIndex}-items.${idx}.${key}`]}</p>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2">Total</h4>
                  <input
                    type="text"
                    value={result.total}
                    onChange={(e) => handleInputChange(arrayIndex, 'total', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors[`${arrayIndex}-total`] && (
                    <p className="text-red-500 text-xs mt-1">{errors[`${arrayIndex}-total`]}</p>
                  )}
                </div>
                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2">Tax</h4>
                  <input
                    type="text"
                    value={result.totalTax}
                    onChange={(e) => handleInputChange(arrayIndex, 'tax', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors[`${arrayIndex}-tax`] && (
                    <p className="text-red-500 text-xs mt-1">{errors[`${arrayIndex}-tax`]}</p>
                  )}
                </div>
              </div>
              {/* <button
                onClick={() => handleRemove(arrayIndex)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button> */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultsTable;