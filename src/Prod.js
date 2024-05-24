import { useEffect, useState } from "react";
import { getProduct, deleteProduct } from "./api";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Prod() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await getProduct();
        setProduct(response);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setProduct(product.filter(prod => prod.id !== id));
        } catch (error) {
            console.log("Delete error:", error);
        }
    }

    return (
        <div className="container bigdiv">
            {product.map((prod) => (
                <div className="content" key={prod.id}>
                    <div>
                        {/* {prod.image && <img src={require(`./images/${prod.image}`)} alt="a" />} */}
                        <a href="/"><h2>{prod.name}</h2></a>
                        <div className="contss">
                            <div></div>
                        </div>
                        <h4 className="price">{prod.price}</h4>
                        <button className="AL"><a href="/">Read</a></button>
                        <button className="edit_product"><a href="/">Update</a></button>
                        <button onClick={() => handleDelete(prod.id)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
