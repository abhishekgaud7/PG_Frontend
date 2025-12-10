import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { popularAreasByCity } from '../utils/mockData';
import './AddProperty.css';

const AddProperty = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        type: 'PG',
        gender: 'Any',
        city: '',
        area: '',
        address: '',
        pricePerMonth: '',
        deposit: '',
        availableBeds: '',
        amenities: [],
        description: ''
    });
    const [success, setSuccess] = useState(false);
    const [availableAreas, setAvailableAreas] = useState([]);

    const amenitiesList = ['WiFi', 'Food', 'Laundry', 'AC', 'Hot Water', 'Parking', 'Gym', 'Security', 'Housekeeping', 'TV'];

    // Update available areas when city changes
    useEffect(() => {
        if (formData.city && popularAreasByCity[formData.city]) {
            setAvailableAreas(popularAreasByCity[formData.city]);
        } else {
            setAvailableAreas([]);
            setFormData(prev => ({ ...prev, area: '' }));
        }
    }, [formData.city]);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mock property creation
        console.log('Creating property:', formData);
        setSuccess(true);

        setTimeout(() => {
            navigate('/owner/properties');
        }, 2000);
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

                    {availableAreas.length > 0 && (
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="area" className="form-label">Area *</label>
                                <select
                                    id="area"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleChange}
                                    className="form-select"
                                    required
                                >
                                    <option value="">Select Area</option>
                                    {availableAreas.map(area => (
                                        <option key={area} value={area}>{area}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

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
