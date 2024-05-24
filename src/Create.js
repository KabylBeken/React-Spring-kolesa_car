import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveProduct, getCategory } from "./api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CreateJava() {
    const [prod, setProd] = useState({
        name: '',
        image: null,
        price: 0,
        category: ''
    });
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await getCategory();
                setCategory(response);
            } catch (error) {
                handleAuthError(error);
            }
        };
        getCategories();
    }, []);

    const handleAuthError = (error) => {
        if (error.message === "Authorization token is missing. Please log in.") {
            toast.error(error.message);
            navigate("/login");
        } else {
            toast.error(error.message);
        }
    };

    const handleName = (ev) => {
        setProd({ ...prod, name: ev.target.value });
    };
    const handleImage = (ev) => {
        setProd({ ...prod, image: ev.target.files[0] });
    };
    const handlePrice = (ev) => {
        setProd({ ...prod, price: ev.target.value });
    };
    const handleSelect = (ev) => {
        setProd({ ...prod, category: parseInt(ev.target.value) });
    };

    const handleForm = async (ev) => {
        ev.preventDefault();
        const formData = new FormData();
        formData.append('name', prod.name);
        formData.append('price', prod.price);
        formData.append('category', prod.category);
        formData.append('image', prod.image);
        try {
            const response = await saveProduct(formData);
            console.log('Response:', response);
            setProd({ name: '', image: null, price: 0, category: '' });
            toast.success("Product saved successfully!");

            navigate('/product'); // Navigate to the /product page after successful creation
        } catch (error) {
            handleAuthError(error);
        }
    };

    return (
        <div className="container mt-4">
            <form className="form-container" onSubmit={handleForm}>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image:</label>
                    <input type="file" id="image" name="image" className="form-control" onChange={handleImage} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Name:</label>
                    <input type="text" id="title" name="title" className="form-control" value={prod.name} onChange={handleName} />
                </div>

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price:</label>
                    <input type="number" id="price" name="price" className="form-control" min="0" step="1" value={prod.price} onChange={handlePrice} required placeholder="$" />
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category:</label>
                    <select name="category" value={prod.category} onChange={handleSelect} className="form-control" required>
                        <option value="">Select Category</option>
                        {category.map((op) => (
                            <option key={op.id} value={op.id}>{op.name}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Add Product</button>
            </form>
        </div>
    );
}
