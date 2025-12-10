import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import client from '../api/client';
import './PropertyList.css';

const PropertyList = () => {
    const [searchParams] = useSearchParams();
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [activeFilters, setActiveFilters] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProperties = async (filters) => {
        try {
            setLoading(true);
            const params = {};
            if (filters.city) params.city = filters.city;
            if (filters.type && filters.type !== 'All') params.type = filters.type;
            if (filters.gender && filters.gender !== 'Any') params.gender = filters.gender;
            if (filters.minPrice) params.minPrice = filters.minPrice;
            if (filters.maxPrice) params.maxPrice = filters.maxPrice;

            const response = await client.get('/properties', { params });

            // Map backend snake_case to frontend camelCase
            const mappedProperties = response.data.data.map(p => ({
                ...p,
                pricePerMonth: p.price_per_month,
                availableBeds: p.available_beds,
                createdAt: p.created_at,
                ownerId: p.owner_id
            }));

            setProperties(mappedProperties);
            setFilteredProperties(mappedProperties);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching properties:', err);
            setError('Failed to load properties');
            setLoading(false);
        }
    };

    useEffect(() => {
        // Apply URL params as initial filters
        const initialFilters = {
            city: searchParams.get('city') || '',
            type: searchParams.get('type') || 'All',
            gender: searchParams.get('gender') || 'Any'
        };

        setActiveFilters(initialFilters);
        fetchProperties(initialFilters);
    }, [searchParams]);

    const handleSearch = (filters) => {
        setActiveFilters(filters);
        fetchProperties(filters);
    };

    const removeFilter = (filterKey) => {
        const newFilters = { ...activeFilters };
        if (filterKey === 'price') {
            delete newFilters.minPrice;
            delete newFilters.maxPrice;
        } else {
            newFilters[filterKey] = filterKey === 'type' ? 'All' : filterKey === 'gender' ? 'Any' : '';
        }
        setActiveFilters(newFilters);
        fetchProperties(newFilters);
    };

    const hasActiveFilters = () => {
        return activeFilters.city ||
            (activeFilters.type && activeFilters.type !== 'All') ||
            (activeFilters.gender && activeFilters.gender !== 'Any') ||
            activeFilters.minPrice ||
            activeFilters.maxPrice;
    };

    return (
        <div className="property-list-page">
            <div className="search-header">
                <div className="container">
                    <h1>Browse Properties</h1>
                    <SearchBar onSearch={handleSearch} variant="full" />
                </div>
            </div>

            <div className="container">
                <div className="property-list-content">
                    {/* Active Filters */}
                    {hasActiveFilters() && (
                        <div className="active-filters">
                            <span className="filters-label">Active filters:</span>
                            {activeFilters.city && (
                                <span className="filter-chip">
                                    {activeFilters.city}
                                    <button onClick={() => removeFilter('city')}>✕</button>
                                </span>
                            )}
                            {activeFilters.type && activeFilters.type !== 'All' && (
                                <span className="filter-chip">
                                    {activeFilters.type}
                                    <button onClick={() => removeFilter('type')}>✕</button>
                                </span>
                            )}
                            {activeFilters.gender && activeFilters.gender !== 'Any' && (
                                <span className="filter-chip">
                                    {activeFilters.gender === 'Male' ? 'Boys' : 'Girls'} PG
                                    <button onClick={() => removeFilter('gender')}>✕</button>
                                </span>
                            )}
                            {(activeFilters.minPrice || activeFilters.maxPrice) && (
                                <span className="filter-chip">
                                    ₹{activeFilters.minPrice || 0} - ₹{activeFilters.maxPrice || '∞'}
                                    <button onClick={() => removeFilter('price')}>✕</button>
                                </span>
                            )}
                        </div>
                    )}

                    {/* Results Count */}
                    <div className="results-header">
                        <h2>{filteredProperties.length} Properties Found</h2>
                    </div>

                    {/* Properties Grid */}
                    {filteredProperties.length > 0 ? (
                        <div className="properties-grid">
                            {filteredProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>

                    ) : loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading properties...</p>
                        </div>
                    ) : error ? (
                        <div className="error-state">
                            <p>{error}</p>
                            <button onClick={() => window.location.reload()} className="btn btn-primary">Retry</button>
                        </div>
                    ) : (
                        <div className="no-results">
                            <div className="no-results-icon">🔍</div>
                            <h3>No properties found</h3>
                            <p>Try adjusting your filters or search in a different city</p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default PropertyList;
