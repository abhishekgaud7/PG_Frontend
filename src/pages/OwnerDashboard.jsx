import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import client from '../api/client';
import './OwnerDashboard.css';

const OwnerDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalProperties: 0,
        totalBookings: 0,
        vacantBeds: 0
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                // Fetch owner properties
                const propertiesRes = await client.get(`/properties?ownerId=${user.id}`);
                const properties = propertiesRes.data.data;

                // Fetch owner bookings
                const bookingsRes = await client.get('/bookings/owner');
                const bookings = bookingsRes.data.data;

                // Calculate stats
                const totalProperties = properties.length;
                const totalBookings = bookings.length;
                const totalBeds = properties.reduce((sum, p) => sum + p.available_beds, 0);

                setStats({
                    totalProperties,
                    totalBookings,
                    vacantBeds: totalBeds
                });

                // Map recent bookings
                const mappedBookings = bookings.slice(0, 5).map(b => ({
                    id: b.id,
                    status: b.status,
                    checkInDate: b.check_in_date,
                    checkOutDate: b.check_out_date,
                    property: {
                        title: b.property.title,
                        images: b.property.images || []
                    },
                    user: b.user
                }));

                setRecentBookings(mappedBookings);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data');
                setLoading(false);
            }
        };

        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short'
        });
    };

    return (
        <div className="owner-dashboard-page">
            <div className="dashboard-layout">
                {/* Sidebar */}
                <aside className="dashboard-sidebar">
                    <div className="sidebar-header">
                        <h2>Owner Panel</h2>
                    </div>
                    <nav className="sidebar-nav">
                        <Link to="/owner/dashboard" className="nav-item active">
                            <span className="nav-icon">📊</span>
                            Dashboard
                        </Link>
                        <Link to="/owner/properties" className="nav-item">
                            <span className="nav-icon">🏘️</span>
                            My Properties
                        </Link>
                        <Link to="/owner/add-property" className="nav-item">
                            <span className="nav-icon">➕</span>
                            Add Property
                        </Link>
                        <Link to="/my-bookings" className="nav-item">
                            <span className="nav-icon">📋</span>
                            Bookings
                        </Link>
                        <Link to="/" className="nav-item">
                            <span className="nav-icon">⚙️</span>
                            Settings
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="dashboard-main">
                    <div className="dashboard-header">
                        <div>
                            <h1>Welcome, {user?.name} 👋</h1>
                            <p>Here's what's happening with your properties</p>
                        </div>
                        <Link to="/owner/add-property" className="btn btn-primary">
                            + Add Property
                        </Link>
                    </div>


                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading dashboard data...</p>
                        </div>
                    ) : error ? (
                        <div className="error-state">
                            <p>{error}</p>
                            <button onClick={() => window.location.reload()} className="btn btn-primary">Retry</button>
                        </div>
                    ) : (
                        <>
                            {/* Stats Cards */}
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                                        🏘️
                                    </div>
                                    <div className="stat-content">
                                        <span className="stat-label">Total Properties</span>
                                        <span className="stat-value">{stats.totalProperties}</span>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}>
                                        📋
                                    </div>
                                    <div className="stat-content">
                                        <span className="stat-label">Total Bookings</span>
                                        <span className="stat-value">{stats.totalBookings}</span>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)' }}>
                                        🛏️
                                    </div>
                                    <div className="stat-content">
                                        <span className="stat-label">Vacant Beds</span>
                                        <span className="stat-value">{stats.vacantBeds}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Bookings */}
                            <div className="dashboard-section">
                                <div className="section-header">
                                    <h2>Recent Bookings</h2>
                                    <Link to="/my-bookings" className="btn btn-secondary btn-sm">
                                        View All
                                    </Link>
                                </div>

                                {recentBookings.length > 0 ? (
                                    <div className="bookings-table-container">
                                        <table className="bookings-table">
                                            <thead>
                                                <tr>
                                                    <th>Property</th>
                                                    <th>User</th>
                                                    <th>Dates</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recentBookings.map((booking) => (
                                                    <tr key={booking.id}>
                                                        <td>
                                                            <div className="table-property">
                                                                <img src={booking.property.images[0]} alt={booking.property.title} />
                                                                <span>{booking.property.title}</span>
                                                            </div>
                                                        </td>
                                                        <td>{booking.user?.name || 'Guest User'}</td>
                                                        <td>{formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}</td>
                                                        <td>
                                                            <span className={`badge badge-${booking.status === 'confirmed' ? 'success' : booking.status === 'pending' ? 'warning' : 'error'}`}>
                                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="empty-state">
                                        <p>No bookings yet</p>
                                    </div>
                                )}
                            </div>

                            {/* Quick Actions */}
                            <div className="dashboard-section">
                                <h2>Quick Actions</h2>
                                <div className="quick-actions-grid">
                                    <Link to="/owner/add-property" className="action-card">
                                        <div className="action-icon">➕</div>
                                        <h3>Add New Property</h3>
                                        <p>List a new PG or guest house</p>
                                    </Link>
                                    <Link to="/owner/properties" className="action-card">
                                        <div className="action-icon">✏️</div>
                                        <h3>Manage Properties</h3>
                                        <p>Edit or update your listings</p>
                                    </Link>
                                    <Link to="/my-bookings" className="action-card">
                                        <div className="action-icon">📊</div>
                                        <h3>View Analytics</h3>
                                        <p>Track your performance</p>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div >
        </div >
    );
};

export default OwnerDashboard;
