import { useEffect, useState } from "react";
import { getProduct, deleteProduct } from "./api";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductSpring.css'; // Import custom CSS
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function ProductSpring() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await getProduct();
            setProducts(response);
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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter(prod => prod.id !== id));
            toast.success("Product delete successfully!");
        } catch (error) {
            handleAuthError(error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">CAR List</h1>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="row">
                {filteredProducts.map((prod) => (
                    <div className="col-md-4 mb-4" key={prod.id}>
                        <div className="card h-100">
                            {prod.image && (
                                <img src={require(`./images/${prod.image}`)} className="card-img-top" alt={prod.name} />
                            )}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{prod.name}</h5>
                                <p className="card-text"><small className="text-muted">{prod.price} tenge</small></p>
                                <div className="mt-auto">
                                    <Link to={`/update/${prod.id}`} className="btn btn-secondary me-2">Edit</Link>
                                    <button onClick={() => handleDelete(prod.id)} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
