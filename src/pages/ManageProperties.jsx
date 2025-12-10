import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PropertyCard from '../components/PropertyCard';
import { mockProperties } from '../utils/mockData';
import './ManageProperties.css';

const ManageProperties = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // Filter properties owned by current user
        const ownerProperties = mockProperties.filter(p => p.owner.id === user?.id);
        setProperties(ownerProperties);
    }, [user]);

    const handleEdit = (property) => {
        // Navigate to edit page (for now, just log)
        console.log('Edit property:', property);
        alert(`Edit functionality for "${property.title}" will be implemented with backend`);
    };

    const handleDelete = (propertyId) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            setProperties(properties.filter(p => p.id !== propertyId));
            console.log('Deleted property:', propertyId);
        }
    };

    return (
        <div className="manage-properties-page">
            <div className="container">
                <div className="page-header">
                    <div>
                        <h1>Manage Properties</h1>
                        <p>View, edit, and manage all your listed properties</p>
                    </div>
                    <button onClick={() => navigate('/owner/add-property')} className="btn btn-primary">
                        + Add New Property
                    </button>
                </div>

                {properties.length > 0 ? (
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
