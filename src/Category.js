import { useEffect, useState } from "react";
import { getCategory, addCategory, updateCategory, deleteCategory } from "./api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [editCategory, setEditCategory] = useState({ id: null, name: "" });
    const navigate = useNavigate();

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await getCategory();
            if (response.success !== false) {
                setCategories(response);
            } else {
                throw new Error(response.data);
            }
        } catch (error) {
            handleAuthError(error);
        }
    };

    const handleAuthError = (error) => {
        if (error.message === "Authorization token is missing. Please log in.") {
            toast.error(error.message);
            navigate("/login");
        } else {
            toast.error(error.message);
        }
    };

    const handleAddCategory = async () => {
        if (newCategory.trim() === "") {
            toast.error("Category name cannot be empty");
            return;
        }
        try {
            const response = await addCategory({ name: newCategory });
            if (response.success !== false) {
                toast.success("Category added successfully");
                loadCategories();
                setNewCategory("");
            } else {
                throw new Error(response.data);
            }
        } catch (error) {
            handleAuthError(error);
        }
    };

    const handleEditCategory = (category) => {
        setEditCategory(category);
    };

    const handleUpdateCategory = async () => {
        if (editCategory.name.trim() === "") {
            toast.error("Category name cannot be empty");
            return;
        }
        try {
            const response = await updateCategory(editCategory.id, { name: editCategory.name });
            if (response.success !== false) {
                toast.success("Category updated successfully");
                loadCategories();
                setEditCategory({ id: null, name: "" });
            } else {
                throw new Error(response.data);
            }
        } catch (error) {
            handleAuthError(error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            const response = await deleteCategory(id);
            if (response.success !== false) {
                toast.success("Category deleted successfully");
                loadCategories();
            } else {
                throw new Error(response.data);
            }
        } catch (error) {
            handleAuthError(error);
        }
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h2>Categories</h2>
            <div className="mb-4">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="New category" 
                    value={newCategory} 
                    onChange={(e) => setNewCategory(e.target.value)} 
                />
                <button className="btn btn-primary mt-2" onClick={handleAddCategory}>Add Category</button>
            </div>
            <ul className="list-group">
                {categories.map((category) => (
                    <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {editCategory.id === category.id ? (
                            <input 
                                type="text" 
                                className="form-control" 
                                value={editCategory.name} 
                                onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })} 
                            />
                        ) : (
                            <span>{category.name}</span>
                        )}
                        <div>
                            {editCategory.id === category.id ? (
                                <button className="btn btn-success btn-sm me-2" onClick={handleUpdateCategory}>Update</button>
                            ) : (
                                <button className="btn btn-info btn-sm me-2" onClick={() => handleEditCategory(category)}>Edit</button>
                            )}
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
