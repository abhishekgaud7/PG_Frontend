import React, { useState, useEffect } from 'react';
import './SearchBar.css';


const SearchBar = ({ onSearch, variant = 'full' }) => {
    const [filters, setFilters] = useState({
        city: '',
        type: 'All',
        gender: 'Any',
        minPrice: '',
        maxPrice: ''
    });

    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(filters);
        }
    };

    const handleReset = () => {
        setFilters({
            city: '',
            type: 'All',
            gender: 'Any',
            minPrice: '',
            maxPrice: ''
        });
        if (onSearch) {
            onSearch({
                city: '',
                type: 'All',
                gender: 'Any',
                minPrice: '',
                maxPrice: ''
            });
        }
    };

    if (variant === 'simple') {
        return (
            <form onSubmit={handleSubmit} className="search-bar search-bar-simple">
                <input
                    type="text"
                    name="city"
                    value={filters.city}
                    onChange={handleChange}
                    placeholder="Search by city..."
                    className="search-input"
                />
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>
        );
    }

    return (
        <div className="search-bar-container">
            <form onSubmit={handleSubmit} className="search-bar">
                <div className="search-bar-main">
                    <div className="search-field">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={filters.city}
                            onChange={handleChange}
                            placeholder="Enter city, e.g. Mandi"
                            className="search-input"
                        />
                    </div>

                    <div className="search-field">
                        <label htmlFor="type">Type</label>
                        <select
                            id="type"
                            name="type"
                            value={filters.type}
                            onChange={handleChange}
                            className="search-select"
                        >
                            <option value="All">All</option>
                            <option value="PG">PG</option>
                            <option value="Guest House">Guest House</option>
                        </select>
                    </div>



                    <div className="search-field">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={filters.gender}
                            onChange={handleChange}
                            className="search-select"
                        >
                            <option value="Any">Any</option>
                            <option value="Male">Boys</option>
                            <option value="Female">Girls</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary btn-search">
                        🔍 Search
                    </button>
                </div>

                {variant === 'full' && (
                    <button
                        type="button"
                        className="advanced-toggle"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                    >
                        {showAdvanced ? 'Hide' : 'More'} filters {showAdvanced ? '▴' : '▾'}
                    </button>
                )}
            </form>

            {showAdvanced && variant === 'full' && (
                <div className="advanced-filters slide-down">
                    <div className="advanced-filters-grid">
                        <div className="search-field">
                            <label htmlFor="minPrice">Min Price (₹/month)</label>
                            <input
                                type="number"
                                id="minPrice"
                                name="minPrice"
                                value={filters.minPrice}
                                onChange={handleChange}
                                placeholder="Min price"
                                className="search-input"
                            />
                        </div>

                        <div className="search-field">
                            <label htmlFor="maxPrice">Max Price (₹/month)</label>
                            <input
                                type="number"
                                id="maxPrice"
                                name="maxPrice"
                                value={filters.maxPrice}
                                onChange={handleChange}
                                placeholder="Max price"
                                className="search-input"
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="btn btn-secondary btn-sm"
                    >
                        Reset Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
