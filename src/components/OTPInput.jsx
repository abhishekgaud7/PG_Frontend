import React, { useState, useRef, useEffect } from 'react';
import './OTPInput.css';

const OTPInput = ({ length = 6, onComplete, onResend, expiresAt }) => {
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const [timeLeft, setTimeLeft] = useState(null);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (expiresAt) {
            const interval = setInterval(() => {
                const remaining = Math.max(0, Math.floor((new Date(expiresAt) - new Date()) / 1000));
                setTimeLeft(remaining);
                if (remaining === 0) {
                    clearInterval(interval);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [expiresAt]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Move to next input
        if (element.value && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }

        // Check if OTP is complete
        if (newOtp.every(digit => digit !== '')) {
            onComplete(newOtp.join(''));
        }
    };

    const handleKeyDown = (e, index) => {
        // Move to previous input on backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, length);

        if (/^\d+$/.test(pastedData)) {
            const newOtp = pastedData.split('');
            setOtp([...newOtp, ...new Array(length - newOtp.length).fill('')]);

            if (newOtp.length === length) {
                onComplete(pastedData);
            }

            // Focus last filled input
            const nextIndex = Math.min(newOtp.length, length - 1);
            inputRefs.current[nextIndex].focus();
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="otp-input-container">
            <div className="otp-inputs">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={el => inputRefs.current[index] = el}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleChange(e.target, index)}
                        onKeyDown={e => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        className="otp-input"
                        autoFocus={index === 0}
                    />
                ))}
            </div>

            {timeLeft !== null && (
                <div className="otp-timer">
                    {timeLeft > 0 ? (
                        <span className="time-remaining">Code expires in {formatTime(timeLeft)}</span>
                    ) : (
                        <span className="time-expired">Code expired</span>
                    )}
                </div>
            )}

            {onResend && (
                <button
                    type="button"
                    onClick={onResend}
                    className="resend-btn"
                    disabled={timeLeft > 0}
                >
                    {timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : 'Resend OTP'}
                </button>
            )}
        </div>
    );
};

export default OTPInput;
