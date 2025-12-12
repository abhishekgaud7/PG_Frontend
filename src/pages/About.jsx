import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="container">
                    <h1 className="fade-in">About RoomNest</h1>
                    <p className="fade-in">Connecting people with their perfect home away from home.</p>
                </div>
            </section>

            <div className="container">
                <section className="mission-section">
                    <div className="mission-grid">
                        <div className="mission-content slide-down">
                            <h2>Our Mission</h2>
                            <p>
                                At RoomNest, we believe that finding a comfortable and safe place to stay shouldn't be a hassle.
                                Our mission is to simplify the house-hunting process for students and working professionals
                                by providing a transparent, reliable, and user-friendly platform.
                            </p>
                            <p>
                                Whether you're a student looking for a PG near your college or a property owner
                                wanting to list your guest house, RoomNest bridges the gap with technology and trust.
                            </p>
                        </div>
                        <div className="mission-image fade-in">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                                alt="Team collaboration"
                            />
                        </div>
                    </div>
                </section>
            </div>

            <section className="values-section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2>Why Choose Us?</h2>
                        <p>We are committed to providing the best experience for both tenants and owners.</p>
                    </div>

                    <div className="values-grid">
                        <div className="value-card">
                            <div className="value-icon">🛡️</div>
                            <h3>Verified Listings</h3>
                            <p>Every property is verified to ensure safety and authenticity.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">⚡</div>
                            <h3>Fast Booking</h3>
                            <p>Connect properly with owners and book your stay in minutes.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">🤝</div>
                            <h3>Direct Connection</h3>
                            <p>No middlemen. Talk directly to property owners.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">💎</div>
                            <h3>Quality Assurance</h3>
                            <p>We maintain high standards for all listed properties.</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container">
                <section className="team-section">
                    <h2>Meet Our Team</h2>
                    <div className="team-grid">
                        <div className="team-member">
                            <div className="member-avatar">
                                <img src="a:\PG\PG_Frontend\happuuuu.jpeg" alt="Founder" />
                            </div>
                            <h3>Harsh Vishwakarma</h3>
                            <div className="member-role">Founder</div>
                            <p>Visionary leader passionate about solving housing problems.</p>
                        </div>
                        <div className="team-member">
                            <div className="member-avatar">
                                <img src="a:\PG\PG_Frontend\Abhiiiiiiiiiiiii.jpg" alt="Co-Founder" />
                            </div>
                            <h3>Abhishek Gaud</h3>
                            <div className="member-role">Co-Founder</div>
                            <p>Tech enthusiast building scalable solutions.</p>
                        </div>
                        <div className="team-member">
                            <div className="member-avatar">
                                <img src="a:\PG\PG_Frontend\suhanana.jpeg" alt="Ceo" />
                            </div>
                            <h3>Suhani Vishwakarma</h3>
                            <div className="member-role">Ceo</div>
                            <p>Ensuring smooth operations and customer happiness.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
