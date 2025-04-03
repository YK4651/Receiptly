import { useState } from "react";
import { toast } from "react-toastify";
import { createCategory } from "../api/category";
import Toast from "../../common/Toast";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [toast, setToast] = useState({ message: null, type: "success", title: null });


  const handleCreateCategory = async () => {
    if (!categoryName) {
      setToast({
        message: "Please specify a category name.",
        type: "error",
        title: "Category name is required",
    });
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
      setToast({
        message: "Oops! Something went wrong. Please try again later",
        type: "error",
        title: "Error creating category",
      });
    }
  };

  return (
    <div className="p-4">
       {toast.message && (
          <Toast
            type={toast.type}
            message={toast.message}
            title={toast.error || toast.title}
            onClose={() => setToast({ ...toast, message: null })}
          />
        )}
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