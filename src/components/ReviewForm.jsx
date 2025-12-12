import React, { useState } from 'react';
import StarRating from './StarRating';
import './ReviewForm.css';

const ReviewForm = ({ propertyId, bookingId, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        rating: 0,
        cleanliness: 0,
        communication: 0,
        value: 0,
        comment: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.rating === 0) {
            alert('Please provide an overall rating');
            return;
        }
        setLoading(true);
        await onSubmit(formData);
        setLoading(false);
    };

    return (
        <div className="review-form-container">
            <h3>Write a Review</h3>
            <form onSubmit={handleSubmit} className="review-form">
                <div className="rating-section">
                    <label>Overall Rating *</label>
                    <StarRating
                        rating={formData.rating}
                        onRatingChange={(val) => setFormData({ ...formData, rating: val })}
                        size="large"
                    />
                </div>

                <div className="detailed-ratings">
                    <div className="rating-item">
                        <label>Cleanliness</label>
                        <StarRating
                            rating={formData.cleanliness}
                            onRatingChange={(val) => setFormData({ ...formData, cleanliness: val })}
                        />
                    </div>
                    <div className="rating-item">
                        <label>Communication</label>
                        <StarRating
                            rating={formData.communication}
                            onRatingChange={(val) => setFormData({ ...formData, communication: val })}
                        />
                    </div>
                    <div className="rating-item">
                        <label>Value for Money</label>
                        <StarRating
                            rating={formData.value}
                            onRatingChange={(val) => setFormData({ ...formData, value: val })}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label>Your Review</label>
                    <textarea
                        className="form-textarea"
                        rows="5"
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        placeholder="Share your experience..."
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
