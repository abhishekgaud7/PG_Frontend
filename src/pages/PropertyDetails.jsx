import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/client';
import './PropertyDetails.css';

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [property, setProperty] = useState(null);
    const [bookingData, setBookingData] = useState({
        checkInDate: '',
        checkOutDate: ''
    });
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await client.get(`/properties/${id}`);
                const p = response.data.data;

                // Map to camelCase
                const mappedProperty = {
                    ...p,
                    pricePerMonth: p.price_per_month,
                    availableBeds: p.available_beds,
                    createdAt: p.created_at,
                    ownerId: p.owner_id,
                    // Ensure arrays
                    images: p.images || [],
                    amenities: p.amenities || []
                };

                setProperty(mappedProperty);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching property:', err);
                setError('Failed to load property details');
                setLoading(false);
            }
        };

        if (id) {
            fetchProperty();
        }
    }, [id]);

    const handleBookingChange = (e) => {
        setBookingData({
            ...bookingData,
            [e.target.name]: e.target.value
        });
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            await client.post('/bookings', {
                property: parseInt(id),
                checkInDate: bookingData.checkInDate,
                checkOutDate: bookingData.checkOutDate
            });

            setBookingSuccess(true);
            setTimeout(() => {
                navigate('/my-bookings');
            }, 2000);
        } catch (err) {
            console.error('Booking error:', err);
            alert(err.response?.data?.message || 'Failed to request booking');
        }
    };

    if (!property) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading property details...</p>
            </div>
        );
    }

    return (
        <div className="property-details-page">
            {/* Hero Image */}
            <div className="property-hero">
                <img src={property.images[0]} alt={property.title} />
            </div>

            <div className="container">
                <div className="property-details-content">
                    {/* Main Content */}
                    <div className="property-main">
                        <div className="property-header">
                            <div>
                                <h1>{property.title}</h1>
                                <p className="property-location">
                                    <span>📍</span> {property.address}, {property.city}
                                </p>
                                <div className="property-meta">
                                    <span className={`badge badge-${property.gender === 'Male' ? 'primary' : property.gender === 'Female' ? 'error' : 'secondary'}`}>
                                        {property.gender === 'Male' ? 'Boys' : property.gender === 'Female' ? 'Girls' : 'Any'} {property.type}
                                    </span>
                                    <span className="beds-info">🛏️ {property.availableBeds} beds available</span>
                                </div>
                            </div>
                            <div className="property-price-large">
                                <span className="price">₹{property.pricePerMonth.toLocaleString()}</span>
                                <span className="period">/month</span>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="property-section">
                            <h2>Amenities</h2>
                            <div className="amenities-grid">
                                {property.amenities.map((amenity, index) => (
                                    <div key={index} className="amenity-item">
                                        <span className="amenity-icon">✓</span>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="property-section">
                            <h2>About this property</h2>
                            <p className="property-description">{property.description}</p>
                        </div>

                        {/* Additional Info */}
                        <div className="property-section">
                            <h2>Additional Information</h2>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Deposit</span>
                                    <span className="info-value">₹{property.deposit.toLocaleString()}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Property Type</span>
                                    <span className="info-value">{property.type}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Gender Preference</span>
                                    <span className="info-value">{property.gender === 'Male' ? 'Boys Only' : property.gender === 'Female' ? 'Girls Only' : 'Any'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Available Beds</span>
                                    <span className="info-value">{property.availableBeds}</span>
                                </div>
                            </div>
                        </div>

                        {/* Owner Info */}
                        <div className="property-section">
                            <h2>Owner Information</h2>
                            <div className="owner-card">
                                <div className="owner-avatar">{property.owner.name.charAt(0)}</div>
                                <div className="owner-info">
                                    <h3>
                                        {property.owner.name}
                                        {property.owner.verified && (
                                            <span className="verified-badge">✓ Verified</span>
                                        )}
                                    </h3>
                                    <p>{property.owner.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="booking-sidebar">
                        <div className="booking-card card">
                            <h3>Book this property</h3>

                            {bookingSuccess ? (
                                <div className="booking-success">
                                    <div className="success-icon">✓</div>
                                    <h4>Booking Request Sent!</h4>
                                    <p>The owner will confirm your booking soon.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleBookingSubmit} className="booking-form">
                                    <div className="form-group">
                                        <label htmlFor="checkInDate" className="form-label">Check-in Date</label>
                                        <input
                                            type="date"
                                            id="checkInDate"
                                            name="checkInDate"
                                            value={bookingData.checkInDate}
                                            onChange={handleBookingChange}
                                            className="form-input"
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="checkOutDate" className="form-label">Check-out Date</label>
                                        <input
                                            type="date"
                                            id="checkOutDate"
                                            name="checkOutDate"
                                            value={bookingData.checkOutDate}
                                            onChange={handleBookingChange}
                                            className="form-input"
                                            required
                                            min={bookingData.checkInDate || new Date().toISOString().split('T')[0]}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg w-full">
                                        Request Booking
                                    </button>

                                    <p className="booking-note">
                                        <small>Note: Owner will confirm your booking request</small>
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
