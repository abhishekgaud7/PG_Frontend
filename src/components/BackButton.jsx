import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = ({ label = 'Back', className = '' }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Go back to previous page
    };

    return (
        <button
            className={`back-button ${className}`}
            onClick={handleBack}
            aria-label="Go back"
        >
            <span className="back-icon">←</span>
            <span className="back-label">{label}</span>
        </button>
    );
};

export default BackButton;
