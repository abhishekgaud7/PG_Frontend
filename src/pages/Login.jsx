import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'user'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Mock authentication - replace with real API call
        setTimeout(() => {
            if (formData.email && formData.password) {
                const mockUser = {
                    id: 1,
                    name: formData.role === 'owner' ? 'Harsh Kumar' : 'Rahul Singh',
                    email: formData.email,
                    role: formData.role
                };
                const mockToken = 'mock-jwt-token-' + Date.now();

                login(mockUser, mockToken);
                setLoading(false);

                // Redirect based on role
                if (formData.role === 'owner') {
                    navigate('/owner/dashboard');
                } else {
                    navigate('/properties');
                }
            } else {
                setError('Please fill in all fields');
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-illustration">
                    <div className="illustration-content">
                        <h2>Welcome Back! 👋</h2>
                        <p>Login to find your perfect PG or manage your properties</p>
                        <div className="illustration-graphic">
                            <div className="floating-card card-1">🏠</div>
                            <div className="floating-card card-2">🔑</div>
                            <div className="floating-card card-3">✨</div>
                        </div>
                    </div>
                </div>

                <div className="auth-form-container">
                    <div className="auth-form-wrapper">
                        <div className="auth-header">
                            <h1>Welcome to RoomNest</h1>
                            <p>Login to find your perfect room</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            {error && (
                                <div className="alert alert-error">
                                    {error}
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="form-input"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="role" className="form-label">Login As</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="form-select"
                                >
                                    <option value="user">Tenant / User</option>
                                    <option value="owner">Property Owner</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-lg w-full"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>Don't have an account? <Link to="/register">Register here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
