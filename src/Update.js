import { useState, useEffect } from "react";
import { getOneProd, updateProduct, getCategory } from "./api";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Edit() {
    const params = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);
    const [prod, setProd] = useState({
        id: '',
        name: '',
        price: 0,
        category: ''
    });

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const product = await getOneProd(params.prodId);
                if (product) {
                    setProd(product);
                }
            } catch (error) {
                handleAuthError(error);
            }
        };

        if (params.prodId) {
            fetchData();
        }
    }, [params.prodId]);

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
    const handlePrice = (ev) => {
        setProd({ ...prod, price: ev.target.value });
    };
    const handleSelect = (ev) => {
        setProd({ ...prod, category: ev.target.value });
    };

    const handleForm = async (ev) => {
        ev.preventDefault();
        try {
            const response = await updateProduct(params.prodId, prod);
            toast.success("Product updated successfully!");
            navigate('/product'); // Navigate to the /product page after a successful update
        } catch (error) {
            handleAuthError(error);
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleForm}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input id="name" type="text" className="form-control" value={prod.name} onChange={handleName} />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input id="price" type="number" className="form-control" value={prod.price} onChange={handlePrice} />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select id="category" className="form-control" value={prod.category} onChange={handleSelect}>
                        {category.map((op) => (
                            <option key={op.id} value={op.id}>{op.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}
