import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

export default function Header() {
    const navigate = useNavigate();
    const loc = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logoutForm = () => {
        console.log("logout");
        sessionStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/login");
        window.location.reload();
    };

    useEffect(() => {
        if (loc.state && loc.state.message) {
            toast(loc.state.message);
            loc.state = null;
        }

        const user = JSON.parse(sessionStorage.getItem("user"));
        if (user) {
            setIsLoggedIn(true);
        }
    }, [loc]);

    return (
    
        <div>
            <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4">
            <ToastContainer />
                <div className="container">
                    <a className="navbar-brand" href="/">Home</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            {!isLoggedIn && (
                                <>
                                    <li className="nav-item"><a className="nav-link" href="/login">Log in</a></li>
                                    <li className="nav-item"><a className="nav-link" href="/register">Register</a></li>
                                </>
                            )}
                            <li className="nav-item"><a className="nav-link" href="/addproduct">Add Car</a></li>
                            <li className="nav-item"><a className="nav-link" href="//kolesa.group">Kolesa.kz</a></li>
                            <li className="nav-item"><a className="nav-link" href="/product">Cars</a></li>
                            <li className="nav-item"><a className="nav-link" href="/category">Category</a></li>
                        </ul>
                        {isLoggedIn && <button className="btn btn-danger" onClick={logoutForm}>Logout</button>}
                    </div>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
            <footer className="bg-light text-center text-lg-start mt-4">
                <div className="container p-4">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Footer Content</h5>
                            <p>
                                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit.
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Links</h5>
                            <ul className="list-unstyled mb-0">
                                <li><a href="#!" className="text-dark">Link 1</a></li>
                                <li><a href="#!" className="text-dark">Link 2</a></li>
                                <li><a href="#!" className="text-dark">Link 3</a></li>
                                <li><a href="#!" className="text-dark">Link 4</a></li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase mb-0">Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="#!" className="text-dark">Link 1</a></li>
                                <li><a href="#!" className="text-dark">Link 2</a></li>
                                <li><a href="#!" className="text-dark">Link 3</a></li>
                                <li><a href="#!" className="text-dark">Link 4</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2024 Copyright:
                    <a className="text-dark" href="https://example.com/">Example.com</a>
                </div>
            </footer>
        </div>
    );
}
