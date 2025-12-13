import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import client from '../api/client';
import './Home.css';

const Home = () => {
    const [featuredProperties, setFeaturedProperties] = useState([]);

    useEffect(() => {
        const fetchFeaturedProperties = async () => {
            try {
                const response = await client.get('/properties');
                // Get first 3 properties as featured
                const mappedProperties = response.data.data.slice(0, 3).map(p => ({
                    ...p,
                    pricePerMonth: p.price_per_month,
                    availableBeds: p.available_beds,
                    createdAt: p.created_at,
                    ownerId: p.owner_id
                }));
                setFeaturedProperties(mappedProperties);
            } catch (err) {
                console.error('Error fetching featured properties:', err);
            }
        };

        fetchFeaturedProperties();
    }, []);

    const handleSearch = (filters) => {
        // Navigate to properties page with filters
        const params = new URLSearchParams();
        if (filters.city) params.append('city', filters.city);
        if (filters.type !== 'All') params.append('type', filters.type);
        if (filters.gender !== 'Any') params.append('gender', filters.gender);

        window.location.href = `/properties?${params.toString()}`;
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section gradient-overlay">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title fade-in">
                                Find your next PG or guest house <span className="highlight">easily</span>
                            </h1>
                            <p className="hero-subtitle fade-in">
                                Your one-stop platform for finding PG accommodations across India
                            </p>
                            <div className="hero-stats fade-in" style={{ animationDelay: '0.2s' }}>
                                <div className="stat-item">
                                    <div className="stat-icon">🏠</div>
                                    <span className="stat-number">100+</span>
                                    <span className="stat-label">Properties Listed</span>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-icon">👥</div>
                                    <span className="stat-number">50+</span>
                                    <span className="stat-label">Happy Tenants</span>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-icon">📍</div>
                                    <span className="stat-number">10+</span>
                                    <span className="stat-label">Cities Covered</span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-search fade-in">
                            <SearchBar onSearch={handleSearch} variant="full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Cities */}
            <section className="cities-section">
                <div className="container">
                    <h2 className="section-title">Popular Cities</h2>
                    <div className="cities-grid">
                        {['Mandi', 'Shimla', 'Chandigarh', 'Delhi', 'Mumbai', 'Bangalore'].map((city) => (
                            <Link key={city} to={`/properties?city=${city}`} className="city-card">
                                <div className="city-icon">🏙️</div>
                                <h3>{city}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Properties */}
            <section className="featured-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Properties</h2>
                        <Link to="/properties" className="btn btn-secondary">
                            View All
                        </Link>
                    </div>
                    <div className="properties-grid">
                        {featuredProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works-section">
                <div className="container">
                    <h2 className="section-title">How It Works</h2>
                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-icon">🔍</div>
                            <h3>1. Search</h3>
                            <p>Browse through verified PGs and guest houses in your preferred city</p>
                        </div>
                        <div className="step-card">
                            <div className="step-icon">📋</div>
                            <h3>2. Compare</h3>
                            <p>Compare amenities, prices, and reviews to find the perfect match</p>
                        </div>
                        <div className="step-card">
                            <div className="step-icon">✅</div>
                            <h3>3. Book</h3>
                            <p>Send a booking request and connect directly with the owner</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section gradient-primary">
                <div className="container">
                    <div className="cta-content">
                        <h2>Are you a property owner?</h2>
                        <p>List your PG or guest house and reach thousands of potential tenants</p>
                        <Link to="/register" className="btn btn-outline btn-lg">
                            List Your Property
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <h3>🏡 RoomNest</h3>
                            <p>Your trusted platform for finding rooms</p>
                        </div>
                        <div className="footer-links">
                            <div className="footer-column">
                                <h4>For Tenants</h4>
                                <Link to="/properties">Browse Properties</Link>
                                <Link to="/my-bookings">My Bookings</Link>
                            </div>
                            <div className="footer-column">
                                <h4>For Owners</h4>
                                <Link to="/owner/dashboard">Dashboard</Link>
                                <Link to="/owner/add-property">Add Property</Link>
                            </div>
                            <div className="footer-column">
                                <h4>Company</h4>
                                <Link to="/about">About Us</Link>
                                <Link to="/contact">Contact</Link>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2025 RoomNest. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
