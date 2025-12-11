import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import OTPInput from '../components/OTPInput';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    // Tab state
    const [activeTab, setActiveTab] = useState('password'); // 'password' or 'otp'

    // Password login state
    const [passwordForm, setPasswordForm] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    // OTP login state
    const [otpForm, setOtpForm] = useState({
        phone: ''
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otpExpiresAt, setOtpExpiresAt] = useState(null);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [attemptsRemaining, setAttemptsRemaining] = useState(null);

    // Password login
    const handlePasswordChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPasswordForm({
            ...passwordForm,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setAttemptsRemaining(null);

        try {
            const response = await client.post('/auth/login', {
                email: passwordForm.email,
                password: passwordForm.password
            });

            const { data } = response.data;
            login(data, data.token);
            setLoading(false);

            // Redirect based on role
            if (data.role === 'owner') {
                navigate('/owner/dashboard');
            } else {
                navigate('/properties');
            }
        } catch (err) {
            console.error('Login error:', err);
            const message = err.response?.data?.message || 'Failed to login. Please try again.';
            const remaining = err.response?.data?.attemptsRemaining;

            setError(message);
            if (remaining !== undefined) {
                setAttemptsRemaining(remaining);
            }
            setLoading(false);
        }
    };

    // OTP login
    const handleOTPChange = (e) => {
        setOtpForm({
            ...otpForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await client.post('/auth/send-otp', {
                phone: otpForm.phone
            });

            setOtpSent(true);
            setOtpExpiresAt(response.data.expiresAt);
            setLoading(false);
        } catch (err) {
            console.error('OTP error:', err);
            setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
            setLoading(false);
        }
    };

    const handleOTPComplete = async (code) => {
        setError('');
        setLoading(true);

        try {
            const response = await client.post('/auth/verify-otp', {
                phone: otpForm.phone,
                code
            });

            const { data } = response.data;
            login(data, data.token);
            setLoading(false);

            // Redirect based on role
            if (data.role === 'owner') {
                navigate('/owner/dashboard');
            } else {
                navigate('/properties');
            }
        } catch (err) {
            console.error('OTP verification error:', err);
            setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
            setLoading(false);
        }
    };

    const handleResendOTP = () => {
        setOtpSent(false);
        setOtpExpiresAt(null);
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-illustration">
                    <div className="illustration-content">
                        <h2>Welcome Back! 👋</h2>
                        <p>Login to discover your perfect PG accommodation or manage your properties with ease</p>
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
                            <h1>Login to RoomNest</h1>
                            <p>Choose your preferred login method</p>
                        </div>

                        {/* Tab Navigation */}
                        <div className="auth-tabs">
                            <button
                                type="button"
                                className={`tab-btn ${activeTab === 'password' ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveTab('password');
                                    setError('');
                                }}
                            >
                                <span className="tab-icon">🔒</span>
                                Password
                            </button>
                            <button
                                type="button"
                                className={`tab-btn ${activeTab === 'otp' ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveTab('otp');
                                    setError('');
                                    setOtpSent(false);
                                }}
                            >
                                <span className="tab-icon">📱</span>
                                OTP Login
                            </button>
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                                {attemptsRemaining !== null && attemptsRemaining > 0 && (
                                    <div className="attempts-warning">
                                        {attemptsRemaining} {attemptsRemaining === 1 ? 'attempt' : 'attempts'} remaining
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Password Login Tab */}
                        {activeTab === 'password' && (
                            <form onSubmit={handlePasswordSubmit} className="auth-form">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={passwordForm.email}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={passwordForm.password}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>

                                <div className="form-options">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="rememberMe"
                                            checked={passwordForm.rememberMe}
                                            onChange={handlePasswordChange}
                                        />
                                        <span>Remember me</span>
                                    </label>
                                    {/* <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link> */}
                                </div>

                                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>
                        )}

                        {/* OTP Login Tab */}
                        {activeTab === 'otp' && (
                            <div className="auth-form">
                                {!otpSent ? (
                                    <form onSubmit={handleSendOTP}>
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={otpForm.phone}
                                                onChange={handleOTPChange}
                                                placeholder="+91 XXXXX XXXXX"
                                                required
                                            />
                                            <small className="form-text">Enter your registered phone number</small>
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                            {loading ? 'Sending OTP...' : 'Send OTP'}
                                        </button>
                                    </form>
                                ) : (
                                    <div className="otp-verification">
                                        <p className="otp-instruction">
                                            Enter the 6-digit code sent to <strong>{otpForm.phone}</strong>
                                        </p>
                                        <OTPInput
                                            length={6}
                                            onComplete={handleOTPComplete}
                                            onResend={handleResendOTP}
                                            expiresAt={otpExpiresAt}
                                        />
                                        <button
                                            type="button"
                                            className="btn-link"
                                            onClick={() => {
                                                setOtpSent(false);
                                                setOtpExpiresAt(null);
                                            }}
                                        >
                                            Change phone number
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

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
