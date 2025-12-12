import React from 'react';
import StarRating from './StarRating';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="review-card">
            <div className="review-header">
                <div className="reviewer-info">
                    <div className="reviewer-avatar">
                        {review.tenantName?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <h4>{review.tenantName || 'Anonymous'}</h4>
                        <span className="review-date">{formatDate(review.createdAt)}</span>
                    </div>
                </div>
                <StarRating rating={review.rating} readonly size="small" />
            </div>

            {(review.cleanliness || review.communication || review.value) && (
                <div className="detailed-ratings-display">
                    {review.cleanliness > 0 && (
                        <div className="rating-badge">
                            Cleanliness: <StarRating rating={review.cleanliness} readonly size="small" />
                        </div>
                    )}
                    {review.communication > 0 && (
                        <div className="rating-badge">
                            Communication: <StarRating rating={review.communication} readonly size="small" />
                        </div>
                    )}
                    {review.value > 0 && (
                        <div className="rating-badge">
                            Value: <StarRating rating={review.value} readonly size="small" />
                        </div>
                    )}
                </div>
            )}

            <p className="review-comment">{review.comment}</p>
        </div>
    );
};

export default ReviewCard;
