import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotificationBell.css';

const NotificationBell = () => {
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    // Mock notifications - replace with API call
    useEffect(() => {
        const mockNotifications = [
            {
                id: 1,
                type: 'booking_confirmed',
                title: 'Booking Confirmed',
                message: 'Your booking request has been confirmed!',
                link: '/my-bookings',
                read: false,
                createdAt: new Date().toISOString()
            }
        ];
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.read).length);
    }, []);

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    return (
        <div className="notification-bell-container">
            <button
                className="notification-bell-btn"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                🔔
                {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                )}
            </button>

            {showDropdown && (
                <div className="notification-dropdown">
                    <div className="notification-header">
                        <h4>Notifications</h4>
                        {unreadCount > 0 && (
                            <span className="unread-count">{unreadCount} new</span>
                        )}
                    </div>

                    <div className="notification-list">
                        {notifications.length === 0 ? (
                            <div className="no-notifications">
                                <p>No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map(notif => (
                                <Link
                                    key={notif.id}
                                    to={notif.link}
                                    className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                                    onClick={() => {
                                        markAsRead(notif.id);
                                        setShowDropdown(false);
                                    }}
                                >
                                    <div className="notification-content">
                                        <strong>{notif.title}</strong>
                                        <p>{notif.message}</p>
                                        <span className="notification-time">
                                            {new Date(notif.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    {!notif.read && <span className="unread-dot"></span>}
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationBell;
