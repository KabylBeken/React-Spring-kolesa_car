import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NotFound404() {
    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="text-center">
                <h1 className="mb-4">Error 404: Page Not Found</h1>
                <Link to="/" className="btn btn-primary">Go to Home Page</Link>
            </div>
        </div>
    );
}
