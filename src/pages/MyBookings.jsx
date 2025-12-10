import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import './MyBookings.css';

const MyBookings = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await client.get('/bookings/my');
                const mappedBookings = response.data.data.map(b => ({
                    id: b.id,
                    status: b.status,
                    checkInDate: b.check_in_date,
                    checkOutDate: b.check_out_date,
                    createdAt: b.created_at,
                    property: {
                        ...b.property,
                        pricePerMonth: b.property.price_per_month,
                        // Ensure images is an array
                        images: b.property.images || []
                    }
                }));
                setBookings(mappedBookings);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching bookings:', err);
                setError('Failed to load bookings');
                setLoading(false);
            }
        };

        if (user) {
            fetchBookings();
        }
    }, [user]);

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'confirmed':
                return 'badge-success';
            case 'pending':
                return 'badge-warning';
            case 'cancelled':
                return 'badge-error';
            default:
                return 'badge-secondary';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="my-bookings-page">
            <div className="container">
                <div className="page-header">
                    <h1>My Bookings</h1>
                    <p>View and manage all your booking requests</p>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading your bookings...</p>
                    </div>
                ) : error ? (
                    <div className="error-state">
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()} className="btn btn-primary">Retry</button>
                    </div>
                ) : bookings.length > 0 ? (
                    <div className="bookings-list">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="booking-card card">
                                <div className="booking-header">
                                    <div className="booking-id">Booking #{booking.id}</div>
                                    <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </span>
                                </div>

                                <div className="booking-content">
                                    <div className="booking-property">
                                        <img
                                            src={booking.property.images[0]}
                                            alt={booking.property.title}
                                            className="booking-property-image"
                                        />
                                        <div className="booking-property-info">
                                            <h3>{booking.property.title}</h3>
                                            <p className="property-location">
                                                📍 {booking.property.city}
                                            </p>
                                            <p className="property-type">
                                                {booking.property.type} • {booking.property.gender === 'Male' ? 'Boys' : booking.property.gender === 'Female' ? 'Girls' : 'Any'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="booking-details">
                                        <div className="booking-dates">
                                            <div className="date-item">
                                                <span className="date-label">Check-in</span>
                                                <span className="date-value">{formatDate(booking.checkInDate)}</span>
                                            </div>
                                            <div className="date-separator">→</div>
                                            <div className="date-item">
                                                <span className="date-label">Check-out</span>
                                                <span className="date-value">{formatDate(booking.checkOutDate)}</span>
                                            </div>
                                        </div>

                                        <div className="booking-meta">
                                            <span className="booking-created">
                                                Booked on {formatDate(booking.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="booking-actions">
                                    <Link
                                        to={`/properties/${booking.property.id}`}
                                        className="btn btn-secondary btn-sm"
                                    >
                                        View Property
                                    </Link>
                                    {booking.status === 'pending' && (
                                        <button className="btn btn-danger btn-sm">
                                            Cancel Booking
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-bookings">
                        <div className="no-bookings-icon">📋</div>
                        <h3>No bookings yet</h3>
                        <p>Start exploring properties and make your first booking!</p>
                        <Link to="/properties" className="btn btn-primary">
                            Browse Properties
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
