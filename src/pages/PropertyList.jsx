import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { mockProperties } from '../utils/mockData';
import './PropertyList.css';

const PropertyList = () => {
    const [searchParams] = useSearchParams();
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [activeFilters, setActiveFilters] = useState({});

    useEffect(() => {
        setProperties(mockProperties);

        // Apply URL params as initial filters
        const initialFilters = {
            city: searchParams.get('city') || '',
            type: searchParams.get('type') || 'All',
            gender: searchParams.get('gender') || 'Any'
        };

        setActiveFilters(initialFilters);
        applyFilters(initialFilters);
    }, [searchParams]);

    const applyFilters = (filters) => {
        let filtered = [...mockProperties];

        if (filters.city) {
            filtered = filtered.filter(p =>
                p.city.toLowerCase().includes(filters.city.toLowerCase())
            );
        }

        if (filters.area) {
            filtered = filtered.filter(p => p.area === filters.area);
        }

        if (filters.type && filters.type !== 'All') {
            filtered = filtered.filter(p => p.type === filters.type);
        }

        if (filters.gender && filters.gender !== 'Any') {
            filtered = filtered.filter(p => p.gender === filters.gender);
        }

        if (filters.minPrice) {
            filtered = filtered.filter(p => p.pricePerMonth >= parseInt(filters.minPrice));
        }

        if (filters.maxPrice) {
            filtered = filtered.filter(p => p.pricePerMonth <= parseInt(filters.maxPrice));
        }

        setFilteredProperties(filtered);
    };

    const handleSearch = (filters) => {
        setActiveFilters(filters);
        applyFilters(filters);
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
        applyFilters(newFilters);
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
                    ) : (
                        <div className="no-results">
                            <div className="no-results-icon">🔍</div>
                            <h3>No properties found</h3>
                            <p>Try adjusting your filters or search in a different city</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyList;
