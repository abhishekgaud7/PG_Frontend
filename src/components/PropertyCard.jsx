import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
        availableBeds,
        averageRating = 0,
        reviewCount = 0
    } = property;

    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (favorites.includes(id)) {
            setIsFavorite(true);
        }
    }, [id]);

    const toggleFavorite = (e) => {
        e.preventDefault(); // Prevent navigation
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        let newFavorites;
        if (isFavorite) {
            newFavorites = favorites.filter(favId => favId !== id);
        } else {
            newFavorites = [...favorites, id];
        }
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
    };

    const displayImage = images[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800';

    return (
        <motion.div
            className="property-card glass-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <button
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={toggleFavorite}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>
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
                    {averageRating > 0 && (
                        <div className="property-rating">
                            <span className="rating-stars">⭐ {averageRating.toFixed(1)}</span>
                            <span className="rating-count">({reviewCount} reviews)</span>
                        </div>
                    )}
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
        </motion.div>
    );
};

export default PropertyCard;
