import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const MaintenanceWidget = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ open: 0, inProgress: 0, total: 0 });
    const [recentTickets, setRecentTickets] = useState([]);

    useEffect(() => {
        // Load mock data from localStorage (or defaults)
        const storedTickets = JSON.parse(localStorage.getItem('maintenance_tickets') || '[]');

        if (storedTickets.length === 0) {
            // Seed defaults if empty
            const defaults = [
                { id: 'TKT-101', category: 'Plumbing', description: 'Leaky faucet in bathroom', status: 'In Progress', date: '2023-10-25', priority: 'Medium' },
                { id: 'TKT-102', category: 'Electrical', description: 'Light bulb flickering in hallway', status: 'Open', date: '2023-10-27', priority: 'Low' },
                { id: 'TKT-098', category: 'Cleaning', description: 'Common area not cleaned', status: 'Closed', date: '2023-10-20', priority: 'High' }
            ];
            localStorage.setItem('maintenance_tickets', JSON.stringify(defaults));
            // Recalculate with defaults
            setStats({
                open: defaults.filter(t => t.status === 'Open').length,
                inProgress: defaults.filter(t => t.status === 'In Progress').length,
                total: defaults.length
            });
            setRecentTickets(defaults.slice(0, 3));
        } else {
            setStats({
                open: storedTickets.filter(t => t.status === 'Open').length,
                inProgress: storedTickets.filter(t => t.status === 'In Progress').length,
                total: storedTickets.length
            });
            setRecentTickets(storedTickets.slice(0, 3));
        }

    }, []);

    return (
        <div className="glass-card p-6 h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Maintenance Requests</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                    {stats.open} New
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-center">
                    <span className="block text-2xl font-bold text-red-600">{stats.open}</span>
                    <span className="text-xs text-red-600 uppercase font-semibold">Open</span>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-center">
                    <span className="block text-2xl font-bold text-yellow-600">{stats.inProgress}</span>
                    <span className="text-xs text-yellow-600 uppercase font-semibold">In Progress</span>
                </div>
            </div>

            <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Recent Tickets</h4>
            <div className="space-y-3 mb-4">
                {recentTickets.map(ticket => (
                    <div key={ticket.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded transition-colors border-b border-gray-100 last:border-0">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm">{ticket.category}</span>
                                <span className="text-xs text-gray-400">{ticket.id}</span>
                            </div>
                            <p className="text-xs text-gray-500 truncate w-40">{ticket.description}</p>
                        </div>
                        <StatusBadge status={ticket.status} />
                    </div>
                ))}
                {recentTickets.length === 0 && <p className="text-gray-400 text-sm italic">No tickets found.</p>}
            </div>

            <button className="btn btn-outline w-full text-sm">View All Tickets</button>
        </div>
    );
};

export default MaintenanceWidget;
