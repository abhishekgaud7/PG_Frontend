import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onFinish }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Start fade out after 2.5 seconds
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 2500);

        // Call onFinish after fade out animation completes
        const finishTimer = setTimeout(() => {
            onFinish();
        }, 3200);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(finishTimer);
        };
    }, [onFinish]);

    return (
        <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
            <div className="splash-content">
                <div className="splash-logo">
                    <span className="logo-icon">🏡</span>
                </div>
                <h1 className="splash-title">RoomNest</h1>
                <p className="splash-tagline">Find Your Perfect Home Away From Home</p>
                <div className="splash-loader">
                    <div className="loader-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div className="splash-background">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>
        </div>
    );
};

export default SplashScreen;
