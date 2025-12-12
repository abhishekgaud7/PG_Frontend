import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import client from '../api/client';
import './AddProperty.css';

const AddProperty = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        type: 'PG',
        gender: 'Any',
        city: '',
        address: '',
        pricePerMonth: '',
        deposit: '',
        availableBeds: '',
        amenities: [],
        description: '',
        amenities: [],
        description: '',
        images: [''], // Array of image URLs, start with one empty
        houseRules: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const amenitiesList = ['WiFi', 'Food', 'Laundry', 'AC', 'Hot Water', 'Parking', 'Gym', 'Security', 'Housekeeping', 'TV'];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAmenityToggle = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData({ ...formData, images: newImages });
    };

    const addImageField = () => {
        if (formData.images.length < 5) {
            setFormData({ ...formData, images: [...formData.images, ''] });
        }
    };

    const removeImageField = (index) => {
        if (formData.images.length > 1) {
            const newImages = formData.images.filter((_, i) => i !== index);
            setFormData({ ...formData, images: newImages });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Prepare data for API
            const propertyData = {
                title: formData.title,
                type: formData.type,
                gender: formData.gender,
                city: formData.city,
                address: formData.address,
                pricePerMonth: Number(formData.pricePerMonth),
                deposit: Number(formData.deposit),
                availableBeds: Number(formData.availableBeds),
                amenities: formData.amenities,
                description: formData.description,
                amenities: formData.amenities,
                description: formData.description,
                house_rules: formData.houseRules, // Send snake_case if backend expects it, or camelCase. Assuming flexible or snake_case for consistency with amenities.
                // Filter out empty strings
                images: formData.images.filter(url => url.trim() !== '').length > 0
                    ? formData.images.filter(url => url.trim() !== '')
                    : ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800']
            };

            await client.post('/properties', propertyData);
            setSuccess(true);
            setLoading(false);

            setTimeout(() => {
                navigate('/owner/properties');
            }, 2000);
        } catch (err) {
            console.error('Error creating property:', err);
            setError(err.response?.data?.message || 'Failed to create property');
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="add-property-page">
                <div className="container-md">
                    <div className="success-message">
                        <div className="success-icon">✓</div>
                        <h2>Property Added Successfully!</h2>
                        <p>Redirecting to your properties...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="add-property-page">
            <div className="container-md">
                <div className="page-header">
                    <h1>Add New Property</h1>
                    <p>Fill in the details to list your PG or guest house</p>
                </div>

                <form onSubmit={handleSubmit} className="property-form card">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="title" className="form-label">Property Title *</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Sunview Girls PG"
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="type" className="form-label">Type *</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="form-select"
                                required
                            >
                                <option value="PG">PG</option>
                                <option value="Guest House">Guest House</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="gender" className="form-label">Gender Preference *</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="form-select"
                                required
                            >
                                <option value="Any">Any</option>
                                <option value="Male">Boys Only</option>
                                <option value="Female">Girls Only</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="city" className="form-label">City *</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="e.g., Mandi"
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Property Images (Max 5)</label>
                        {formData.images.map((url, index) => (
                            <div key={index} className="image-input-group">
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="form-input"
                                />
                                {formData.images.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeImageField(index)}
                                        className="btn-icon-danger"
                                        title="Remove image"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                        {formData.images.length < 5 && (
                            <button
                                type="button"
                                onClick={addImageField}
                                className="btn btn-secondary btn-sm mt-2"
                            >
                                + Add Another Image
                            </button>
                        )}
                        <small className="form-text text-muted">First image will be the cover image.</small>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="address" className="form-label">Full Address *</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Complete address with landmarks"
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="pricePerMonth" className="form-label">Price per Month (₹) *</label>
                            <input
                                type="number"
                                id="pricePerMonth"
                                name="pricePerMonth"
                                value={formData.pricePerMonth}
                                onChange={handleChange}
                                placeholder="6500"
                                className="form-input"
                                required
                                min="0"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="deposit" className="form-label">Deposit (₹) *</label>
                            <input
                                type="number"
                                id="deposit"
                                name="deposit"
                                value={formData.deposit}
                                onChange={handleChange}
                                placeholder="3000"
                                className="form-input"
                                required
                                min="0"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="availableBeds" className="form-label">Available Beds *</label>
                            <input
                                type="number"
                                id="availableBeds"
                                name="availableBeds"
                                value={formData.availableBeds}
                                onChange={handleChange}
                                placeholder="10"
                                className="form-input"
                                required
                                min="1"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Amenities</label>
                        <div className="amenities-selector">
                            {amenitiesList.map((amenity) => (
                                <label key={amenity} className="amenity-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={formData.amenities.includes(amenity)}
                                        onChange={() => handleAmenityToggle(amenity)}
                                    />
                                    <span>{amenity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your property, nearby facilities, rules, etc."
                            className="form-textarea"
                            required
                            rows="5"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="houseRules" className="form-label">House Rules</label>
                        <textarea
                            id="houseRules"
                            name="houseRules"
                            value={formData.houseRules}
                            onChange={handleChange}
                            placeholder="e.g. No smoking, Quiet hours after 10 PM, No pets allowed."
                            className="form-textarea"
                            rows="3"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={() => navigate('/owner/dashboard')} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary btn-lg">
                            Save Property
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProperty;
