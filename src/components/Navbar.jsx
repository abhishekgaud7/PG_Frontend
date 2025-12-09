import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, isAuthenticated, isOwner, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo">
                        <span className="logo-icon">🏡</span>
                        <span className="logo-text">RoomNest</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="navbar-links desktop-only">
                        <Link to="/properties" className="nav-link">Browse</Link>
                        <Link to="/for-owners" className="nav-link">For Owners</Link>
                        <Link to="/about" className="nav-link">About</Link>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="navbar-actions desktop-only">
                        {isAuthenticated ? (
                            <>
                                <div className="user-info">
                                    <span className="user-avatar">{user?.name?.charAt(0)}</span>
                                    <span className="user-name">{user?.name}</span>
                                </div>
                                <Link
                                    to={isOwner ? "/owner/dashboard" : "/my-bookings"}
                                    className="btn btn-sm btn-secondary"
                                >
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="btn btn-sm btn-outline">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-sm btn-outline">Login</Link>
                                <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn mobile-only"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="mobile-menu slide-down">
                        <Link to="/properties" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                            Browse
                        </Link>
                        <Link to="/for-owners" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                            For Owners
                        </Link>
                        <Link to="/about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                            About
                        </Link>

                        <div className="mobile-divider"></div>

                        {isAuthenticated ? (
                            <>
                                <div className="mobile-user-info">
                                    <span className="user-avatar">{user?.name?.charAt(0)}</span>
                                    <span>{user?.name}</span>
                                </div>
                                <Link
                                    to={isOwner ? "/owner/dashboard" : "/my-bookings"}
                                    className="mobile-nav-link"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="mobile-nav-link logout-btn">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                                    Login
                                </Link>
                                <Link to="/register" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
