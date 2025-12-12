import React, { useState } from 'react';
import './Support.css';

const Support = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock submission
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
            alert('Message sent successfully! Our support team will contact you shortly.');
        }, 1500);
    };

    const faqs = [
        {
            q: "How do I book a room?",
            a: "Simply browse properties, select one you like, and click 'Request Booking'. The owner will review your request and confirm it."
        },
        {
            q: "Is my deposit refundable?",
            a: "Yes, security deposits are refundable at the end of your stay, subject to the property's house rules and condition check."
        },
        {
            q: "How can I contact the property owner?",
            a: "Once your booking is confirmed, you will receive the owner's contact details. You can also see their phone number on the property details page if they are verified."
        },
        {
            q: "I forgot my password, what should I do?",
            a: "Currently, you can contact support to reset your password manually if you cannot login."
        }
    ];

    return (
        <div className="support-page">
            <div className="container">
                <div className="support-header">
                    <h1>How can we help you?</h1>
                    <p>We're here to ensure your Experience at RoomNest is smooth and comfortable.</p>
                </div>

                <div className="support-grid">
                    {/* Contact Form */}
                    <div className="contact-section">
                        <div className="contact-card">
                            <h2>📩 Send us a message</h2>
                            <form onSubmit={handleSubmit} className="support-form">
                                <div className="form-group">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Subject</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="form-select"
                                        required
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="Booking Issue">Booking Issue</option>
                                        <option value="Payment Issue">Payment/Refund</option>
                                        <option value="Account Help">Account Help</option>
                                        <option value="Complaint">Report a Complaint</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="form-textarea"
                                        rows="5"
                                        required
                                        placeholder="Describe your issue..."
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-full" disabled={submitted}>
                                    {submitted ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        <div className="contact-info">
                            <div className="contact-method">
                                <span className="method-icon">📞</span>
                                <div className="method-details">
                                    <h4>Call Us</h4>
                                    <p>+91 98765 43210</p>
                                </div>
                            </div>
                            <div className="contact-method">
                                <span className="method-icon">📧</span>
                                <div className="method-details">
                                    <h4>Email Us</h4>
                                    <p>support@roomnest.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="faq-section">
                        <h2>Frequently Asked Questions</h2>
                        <div className="faq-list">
                            {faqs.map((faq, index) => (
                                <div key={index} className="faq-item">
                                    <span className="faq-question">{faq.q}</span>
                                    <p className="faq-answer">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
