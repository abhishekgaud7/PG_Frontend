import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import NotificationBell from './NotificationBell';
import './Navbar.css';

const Navbar = () => {
    const { user, isAuthenticated, isOwner, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = () => {
        logout();
        setMobileMenuOpen(false);
        navigate('/login');
    };

    return (
        <div className="navbar-wrapper">
            <nav className="navbar floating-nav">
                <div className="navbar-container">
                    {/* Left Section: Logo & Links */}
                    <div className="nav-left">
                        <Link to="/" className="navbar-logo">
                            <div className="logo-circle">
                                🏠
                            </div>
                            <span className="logo-text">RoomNest</span>
                        </Link>

                        <div className="navbar-links desktop-only">
                            <Link to="/properties" className="nav-link">Rent</Link>
                            <Link to="/for-owners" className="nav-link">List Property</Link>
                            <Link to="/about" className="nav-link">About</Link>
                        </div>
                    </div>

                    {/* Center Section: Search Bar */}
                    <div className="nav-search desktop-only">
                        <div className="search-bar">
                            <input type="text" placeholder="Search for PGs..." />
                            <button className="search-btn">
                                🔍
                            </button>
                        </div>
                    </div>

                    {/* Right Section: Actions & Profile */}
                    <div className="nav-right desktop-only">
                        <button
                            onClick={toggleTheme}
                            className="btn-icon theme-toggle-btn"
                            title="Toggle Theme"
                        >
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>

                        {isAuthenticated ? (
                            <>
                                <Link to={isOwner ? "/owner/dashboard" : "/my-bookings"} className="btn-icon" title="Dashboard">
                                    {isOwner ? '📊' : '🔖'}
                                </Link>
                                <NotificationBell />

                                <div className="nav-divider"></div>

                                <Link to="/profile" className="user-profile-detailed" title="View Profile">
                                    <div className="user-text-info">
                                        <span className="user-name-bold">{user?.name?.split(' ')[0]}</span>
                                        <span className="user-role-text">{isOwner ? 'Owner' : 'Tenant'}</span>
                                    </div>
                                    <div className="user-avatar-circle">{user?.name?.charAt(0)}</div>
                                </Link>

                                <button onClick={handleLogout} className="logout-icon-small" title="Logout">
                                    🔴
                                </button>
                            </>
                        ) : (
                            <div className="auth-buttons">
                                <Link to="/login" className="nav-link-login">Log In</Link>
                                <Link to="/register" className="btn-pill-primary">Sign Up</Link>
                            </div>
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
                            Rent
                        </Link>
                        <Link to="/for-owners" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                            List Property
                        </Link>
                        <Link to="/about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                            About
                        </Link>

                        <div className="mobile-divider"></div>

                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="mobile-user-info-link" onClick={() => setMobileMenuOpen(false)}>
                                    <div className="mobile-user-info">
                                        <div className="user-avatar-circle">{user?.name?.charAt(0)}</div>
                                        <div className="user-text-info">
                                            <span className="user-name-bold">{user?.name}</span>
                                            <span className="user-role-text">{isOwner ? 'Owner' : 'Tenant'}</span>
                                        </div>
                                    </div>
                                </Link>
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
                                    Log In
                                </Link>
                                <Link to="/register" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
