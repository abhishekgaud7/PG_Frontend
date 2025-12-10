import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ property, showActions = false, onEdit, onDelete }) => {
    const {
        id,
        title,
        type,
        gender,
        city,
        pricePerMonth,
        amenities = [],
        images = [],
        availableBeds
    } = property;

    const displayImage = images[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800';

    return (
        <div className="property-card">
            <Link to={`/properties/${id}`} className="property-card-link">
                <div className="property-image">
                    <img src={displayImage} alt={title} />
                    <div className="property-badges">
                        <span className={`badge badge-${gender === 'Male' ? 'primary' : gender === 'Female' ? 'error' : 'secondary'}`}>
                            {gender === 'Male' ? 'Boys' : gender === 'Female' ? 'Girls' : 'Any'} {type}
                        </span>
                    </div>
                </div>

                <div className="property-card-body">
                    <h3 className="property-title">{title}</h3>
                    <p className="property-location">
                        <span className="location-icon">📍</span>
                        {city} • {type}
                    </p>

                    <div className="property-amenities">
                        {amenities.slice(0, 4).map((amenity, index) => (
                            <span key={index} className="amenity-tag">
                                {amenity}
                            </span>
                        ))}
                        {amenities.length > 4 && (
                            <span className="amenity-tag more">+{amenities.length - 4}</span>
                        )}
                    </div>

                    <div className="property-footer">
                        <div className="property-price">
                            <span className="price-amount">₹{pricePerMonth.toLocaleString()}</span>
                            <span className="price-period">/month</span>
                        </div>
                        {availableBeds && (
                            <span className="beds-available">{availableBeds} beds</span>
                        )}
                    </div>
                </div>
            </Link>

            {showActions && (
                <div className="property-actions">
                    <button onClick={() => onEdit(property)} className="btn btn-sm btn-secondary">
                        Edit
                    </button>
                    <button onClick={() => onDelete(property.id)} className="btn btn-sm btn-danger">
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default PropertyCard;
