import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './PropertyMap.css';

// Fix for default marker icon missing in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const PropertyMap = ({ address, city }) => {
    const [position, setPosition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoordinates = async () => {
            if (!address || !city) return;

            setLoading(true);
            try {
                // Use Nominatim OpenStreetMap API to geocode the address
                const query = `${address}, ${city}`;
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
                const data = await response.json();

                if (data && data.length > 0) {
                    setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
                } else {
                    // Fallback to searching just the city
                    const cityResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`);
                    const cityData = await cityResponse.json();

                    if (cityData && cityData.length > 0) {
                        setPosition([parseFloat(cityData[0].lat), parseFloat(cityData[0].lon)]);
                    } else {
                        setError('Location not found');
                    }
                }
            } catch (err) {
                console.error('Error fetching coordinates:', err);
                setError('Failed to load map');
            } finally {
                setLoading(false);
            }
        };

        fetchCoordinates();
    }, [address, city]);

    if (loading) {
        return <div className="map-loading glass-card">Loading map location...</div>;
    }

    if (error || !position) {
        return (
            <div className="map-error glass-card">
                <p>⚠️ {error || 'Location unavailable'}</p>
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${address}, ${city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-map-fallback"
                >
                    View on Google Maps
                </a>
            </div>
        );
    }

    return (
        <div className="property-map-container glass-card">
            <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        {address}, {city}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default PropertyMap;
