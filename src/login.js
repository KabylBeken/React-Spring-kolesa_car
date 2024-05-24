import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginjs } from "./api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function LoginForm() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const { success, data } = await loginjs(userName, password);
        if (success) {
            navigate("/product", { state: { message: data } });
        } else {
            toast.error("Login or password error");
        }
    };

    return (
        <div className="container mt-5">
             <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-3">Login Page</h2>
                    <form onSubmit={handleSubmit} className="card p-4">
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Name</label>
                            <input type="text" id="userName" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter Your Name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" />
                        </div>
                        <div className="mb-3 d-flex justify-content-between">
                            <a href="/register" className="btn btn-link">Register</a>
                            <a href="#" className="btn btn-link">Forgot password?</a>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
