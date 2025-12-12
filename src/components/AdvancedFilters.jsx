import React, { useState } from 'react';
import './AdvancedFilters.css';

const AdvancedFilters = ({ onApplyFilters, initialFilters = {} }) => {
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        amenities: initialFilters.amenities || [],
        mealType: initialFilters.mealType || '',
        minRating: initialFilters.minRating || 0,
        ...initialFilters
    });

    const availableAmenities = [
        'WiFi',
        'Attached Bathroom',
        'AC',
        'Meals Included',
        'Laundry',
        'Parking',
        'Power Backup',
        'CCTV',
        'Gym',
        'Common Area'
    ];

    const handleAmenityToggle = (amenity) => {
        setFilters(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const handleApply = () => {
        onApplyFilters(filters);
        setShowFilters(false);
    };

    const handleReset = () => {
        const resetFilters = {
            ...filters,
            amenities: [],
            mealType: '',
            minRating: 0
        };
        setFilters(resetFilters);
        onApplyFilters(resetFilters);
    };

    return (
        <div className="advanced-filters-container">
            <button
                className="btn btn-secondary btn-sm advanced-filter-toggle"
                onClick={() => setShowFilters(!showFilters)}
            >
                🔍 Advanced Filters
                {(filters.amenities.length > 0 || filters.mealType || filters.minRating > 0) && (
                    <span className="filter-count">{
                        filters.amenities.length +
                        (filters.mealType ? 1 : 0) +
                        (filters.minRating > 0 ? 1 : 0)
                    }</span>
                )}
            </button>

            {showFilters && (
                <div className="advanced-filters-panel slide-down">
                    <div className="filters-grid">
                        {/* Amenities Filter */}
                        <div className="filter-section">
                            <h4>Amenities</h4>
                            <div className="amenities-grid">
                                {availableAmenities.map(amenity => (
                                    <label key={amenity} className="amenity-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={filters.amenities.includes(amenity)}
                                            onChange={() => handleAmenityToggle(amenity)}
                                        />
                                        <span>{amenity}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Meal Type Filter */}
                        <div className="filter-section">
                            <h4>Food Preference</h4>
                            <div className="meal-type-options">
                                {['Veg', 'Non-Veg', 'Both'].map(type => (
                                    <label key={type} className="radio-option">
                                        <input
                                            type="radio"
                                            name="mealType"
                                            value={type}
                                            checked={filters.mealType === type}
                                            onChange={(e) => setFilters({ ...filters, mealType: e.target.value })}
                                        />
                                        <span>{type}</span>
                                    </label>
                                ))}
                                <button
                                    className="btn-link"
                                    onClick={() => setFilters({ ...filters, mealType: '' })}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>

                        {/* Rating Filter */}
                        <div className="filter-section">
                            <h4>Minimum Rating</h4>
                            <div className="rating-filter">
                                {[1, 2, 3, 4, 5].map(rating => (
                                    <button
                                        key={rating}
                                        className={`rating-btn ${filters.minRating === rating ? 'active' : ''}`}
                                        onClick={() => setFilters({ ...filters, minRating: rating })}
                                    >
                                        {'⭐'.repeat(rating)} {rating}+
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="filter-actions">
                        <button className="btn btn-secondary" onClick={handleReset}>
                            Reset
                        </button>
                        <button className="btn btn-primary" onClick={handleApply}>
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdvancedFilters;
