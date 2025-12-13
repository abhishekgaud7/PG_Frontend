import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';
import client from '../api/client';
import './ManageProperties.css';

const ManageProperties = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const response = await client.get(`/properties?ownerId=${user.id}`);
                const mappedProperties = response.data.data.map(p => ({
                    ...p,
                    pricePerMonth: p.price_per_month,
                    availableBeds: p.available_beds,
                    createdAt: p.created_at,
                    ownerId: p.owner_id,
                    images: p.images || []
                }));
                setProperties(mappedProperties);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching properties:', err);
                setError('Failed to load properties');
                setLoading(false);
            }
        };

        if (user) {
            fetchProperties();
        }
    }, [user]);

    const handleEdit = (property) => {
        // Navigate to edit page (for now, just log)
        console.log('Edit property:', property);
        alert(`Edit functionality for "${property.title}" will be implemented with backend`);
    };

    const handleDelete = async (propertyId) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                await client.delete(`/properties/${propertyId}`);
                setProperties(properties.filter(p => p.id !== propertyId));
                console.log('Deleted property:', propertyId);
            } catch (err) {
                console.error('Error deleting property:', err);
                alert('Failed to delete property');
            }
        }
    };

    return (
        <div className="manage-properties-page">
            <div className="container">
                <div className="page-header">
                    <div>
                        <button onClick={() => navigate(-1)} className="back-button" title="Go back">
                            ← Back
                        </button>
                        <h1>Manage Properties</h1>
                        <p>View, edit, and manage all your listed properties</p>
                    </div>
                    <button onClick={() => navigate('/owner/add-property')} className="btn btn-primary">
                        + Add New Property
                    </button>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading properties...</p>
                    </div>
                ) : error ? (
                    <div className="error-state">
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()} className="btn btn-primary">Retry</button>
                    </div>
                ) : properties.length > 0 ? (
                    <>
                        {/* Desktop Table View */}
                        <div className="properties-table-container desktop-only">
                            <table className="properties-table">
                                <thead>
                                    <tr>
                                        <th>Property</th>
                                        <th>City</th>
                                        <th>Type</th>
                                        <th>Price</th>
                                        <th>Beds</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties.map((property) => (
                                        <tr key={property.id}>
                                            <td>
                                                <div className="table-property">
                                                    <img src={property.images[0]} alt={property.title} />
                                                    <div>
                                                        <div className="property-name">{property.title}</div>
                                                        <div className="property-gender">
                                                            {property.gender === 'Male' ? 'Boys' : property.gender === 'Female' ? 'Girls' : 'Any'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{property.city}</td>
                                            <td>{property.type}</td>
                                            <td>₹{property.pricePerMonth.toLocaleString()}</td>
                                            <td>{property.availableBeds}</td>
                                            <td>
                                                <span className="badge badge-success">Active</span>
                                            </td>
                                            <td>
                                                <div className="table-actions">
                                                    <button onClick={() => handleEdit(property)} className="btn btn-sm btn-secondary">
                                                        Edit
                                                    </button>
                                                    <button onClick={() => handleDelete(property.id)} className="btn btn-sm btn-danger">
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="properties-grid mobile-only">
                            {properties.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    property={property}
                                    showActions={true}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="no-properties">
                        <div className="no-properties-icon">🏘️</div>
                        <h3>No properties listed yet</h3>
                        <p>Start by adding your first property</p>
                        <button onClick={() => navigate('/owner/add-property')} className="btn btn-primary">
                            + Add Property
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageProperties;
