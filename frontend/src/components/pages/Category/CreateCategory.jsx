import { useState } from "react";
import { toast } from "react-toastify";
import { createCategory } from "../api/category";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  const handleCreateCategory = async () => {
    if (!categoryName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const response = await createCategory(categoryName);
      if (response.status !== 201) {
        throw new Error("Failed to create category");
      }else{
        toast.success("Category created successfully");
        setCategoryName("");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Error creating category");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Create Category</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
          Category Name
        </label>
        <input
          type="text"
          id="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={handleCreateCategory}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Create Category
      </button>
    </div>
  );
};

export default CreateCategory;