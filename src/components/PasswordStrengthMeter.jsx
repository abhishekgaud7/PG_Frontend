import React from 'react';
import './PasswordStrengthMeter.css';

const PasswordStrengthMeter = ({ password }) => {
    const calculateStrength = () => {
        let strength = 0;

        if (!password) return { score: 0, label: '', color: '' };

        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

        const score = Math.min(strength, 4);

        const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
        const colors = ['#ff4444', '#ff8800', '#ffbb33', '#00C851', '#007E33'];

        return {
            score,
            label: labels[score] || '',
            color: colors[score] || ''
        };
    };

    const getRequirements = () => {
        return [
            { text: 'At least 8 characters', met: password.length >= 8 },
            { text: 'Uppercase & lowercase letters', met: /[A-Z]/.test(password) && /[a-z]/.test(password) },
            { text: 'Contains a number', met: /[0-9]/.test(password) },
            { text: 'Contains special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
        ];
    };

    if (!password) return null;

    const strength = calculateStrength();
    const requirements = getRequirements();

    return (
        <div className="password-strength-meter">
            <div className="strength-bar-container">
                <div
                    className="strength-bar"
                    style={{
                        width: `${(strength.score / 4) * 100}%`,
                        backgroundColor: strength.color
                    }}
                />
            </div>
            <div className="strength-label" style={{ color: strength.color }}>
                {strength.label}
            </div>
            <div className="requirements-list">
                {requirements.map((req, index) => (
                    <div key={index} className={`requirement ${req.met ? 'met' : ''}`}>
                        <span className="check-icon">{req.met ? '✓' : '○'}</span>
                        <span className="requirement-text">{req.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PasswordStrengthMeter;
