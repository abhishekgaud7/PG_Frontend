import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import PageTransition from '../components/PageTransition';
import './Maintenance.css';

const Maintenance = () => {
    const { user } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newTicket, setNewTicket] = useState({
        category: 'Plumbing',
        description: '',
        priority: 'Medium'
    });

    useEffect(() => {
        // Mock: Load tickets from local storage or set defaults
        const storedTickets = JSON.parse(localStorage.getItem('maintenance_tickets') || '[]');
        if (storedTickets.length === 0) {
            const defaults = [
                { id: 'TKT-101', category: 'Plumbing', description: 'Leaky faucet in bathroom', status: 'In Progress', date: '2023-10-25', priority: 'Medium' },
                { id: 'TKT-102', category: 'Electrical', description: 'Light bulb flickering in hallway', status: 'Open', date: '2023-10-27', priority: 'Low' },
                { id: 'TKT-098', category: 'Cleaning', description: 'Common area not cleaned', status: 'Closed', date: '2023-10-20', priority: 'High' }
            ];
            setTickets(defaults);
            localStorage.setItem('maintenance_tickets', JSON.stringify(defaults));
        } else {
            setTickets(storedTickets);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const ticket = {
            id: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
            ...newTicket,
            status: 'Open',
            date: new Date().toISOString().split('T')[0]
        };

        const updatedTickets = [ticket, ...tickets];
        setTickets(updatedTickets);
        localStorage.setItem('maintenance_tickets', JSON.stringify(updatedTickets));

        setShowForm(false);
        setNewTicket({ category: 'Plumbing', description: '', priority: 'Medium' });
    };

    return (
        <div className="maintenance-page container">
            <div className="maintenance-header">
                <div>
                    <h1>Maintenance & Support</h1>
                    <p className="text-gray-600">Report and track your property issues</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="btn btn-primary"
                >
                    {showForm ? 'Cancel' : '+ Report Issue'}
                </button>
            </div>

            {showForm && (
                <div className="mb-8">
                    <PageTransition>
                        <form onSubmit={handleSubmit} className="create-ticket-form glass-card">
                            <h3 className="mb-4 text-lg font-bold">New Maintenance Request</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <select
                                        className="form-select"
                                        value={newTicket.category}
                                        onChange={e => setNewTicket({ ...newTicket, category: e.target.value })}
                                    >
                                        <option>Plumbing</option>
                                        <option>Electrical</option>
                                        <option>Furniture</option>
                                        <option>Cleaning</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Priority</label>
                                    <select
                                        className="form-select"
                                        value={newTicket.priority}
                                        onChange={e => setNewTicket({ ...newTicket, priority: e.target.value })}
                                    >
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                        <option>Critical</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-textarea"
                                    rows="3"
                                    required
                                    placeholder="Describe the issue in detail..."
                                    value={newTicket.description}
                                    onChange={e => setNewTicket({ ...newTicket, description: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-full">Submit Ticket</button>
                        </form>
                    </PageTransition>
                </div>
            )}

            <div className="ticket-grid">
                {tickets.map(ticket => (
                    <div key={ticket.id} className="ticket-card glass-card">
                        <div className="ticket-main">
                            <div className="ticket-header">
                                <span className="ticket-id">{ticket.id}</span>
                                <span className="ticket-category">{ticket.category}</span>
                                <StatusBadge status={ticket.status} />
                            </div>
                            <h4 className="ticket-description">{ticket.description}</h4>
                            <div className="ticket-meta">
                                📅 Reported on {ticket.date} • Priority: <span className={`font-semibold ${ticket.priority === 'Critical' ? 'text-red-600' : ''}`}>{ticket.priority}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Maintenance;
