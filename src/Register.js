import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerjs } from "./api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function RegisterForm() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success, data } = await registerjs(userName, email, password);
        if (success) {
            navigate("/login", { state: { message: data } });
        } else {
            toast.error(data);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-3">Register Page</h2>
                    <form onSubmit={handleSubmit} className="card p-4">
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Name</label>
                            <input type="text" id="userName" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} required placeholder="Enter your name"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password"/>
                        </div>
                        <div className="mb-3 text-center">
                            <a href="/login" className="btn btn-link">Already have an account?</a>
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
