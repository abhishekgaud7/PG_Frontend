import React from 'react';

const StatusBadge = ({ status }) => {
    const getStatusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'open':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'in progress':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'closed':
            case 'resolved':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(status)}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
