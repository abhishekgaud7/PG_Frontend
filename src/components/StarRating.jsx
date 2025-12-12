import React, { useState } from 'react';
import './StarRating.css';

const StarRating = ({ rating, onRatingChange, readonly = false, size = 'medium' }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleClick = (value) => {
        if (!readonly && onRatingChange) {
            onRatingChange(value);
        }
    };

    const handleMouseEnter = (value) => {
        if (!readonly) {
            setHoverRating(value);
        }
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const displayRating = hoverRating || rating;

    return (
        <div className={`star-rating ${size} ${readonly ? 'readonly' : 'interactive'}`}>
            {[1, 2, 3, 4, 5].map((value) => (
                <span
                    key={value}
                    className={`star ${value <= displayRating ? 'filled' : ''}`}
                    onClick={() => handleClick(value)}
                    onMouseEnter={() => handleMouseEnter(value)}
                    onMouseLeave={handleMouseLeave}
                >
                    ⭐
                </span>
            ))}
        </div>
    );
};

export default StarRating;
