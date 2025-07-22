import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useAuth.js";
import { useForm } from "../../hooks/useForm.js";
import { useState } from "react";

const initialValues = { email: '', password: '' }

export default function Login() {

    const [error, setError] = useState('')

    const login = useLogin()

    const navigate = useNavigate()

    const loginHandler = async ({ email, password }) => {
        try {
            await login(email, password)
            // console.log("Login successful", userData);
            navigate('/')
        } catch (err) {
            setError(err.error || 'Login failed');
        }
    }

    const { values, changeHandler, onSubmit } = useForm(initialValues, loginHandler)

    return (
        <section className="page-section bg-light d-flex align-items-center justify-content-center vh-100"
            style={{ background: "url('/images/header-bg.jpg') center/cover no-repeat" }}>
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase" style={{ color: "#ffc800" }}>Login</h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card shadow p-4 bg-white">
                            {error && (
                                <div className="alert alert-danger text-center mb-3">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input type="email"
                                        className={`form-control ${error ? 'error' : ''}`}
                                        id="email"
                                        name="email"
                                        value={values.email}
                                        onChange={changeHandler}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${error ? 'error' : ''}`}
                                        id="password"
                                        name="password"
                                        value={values.password}
                                        onChange={changeHandler}
                                        required />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                                <p className="text-center mt-3">Don't have an account? <Link to="/register">Register here</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
