import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TrustScoreBreakdown = ({ score = 4.8 }) => {
    const [isOpen, setIsOpen] = useState(false);

    const metrics = [
        { label: 'Avg Rating', value: '4.9/5.0', type: 'high' },
        { label: 'Acceptance Rate', value: '98%', type: 'high' },
        { label: 'Response Time', value: '< 1 hr', type: 'high' },
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="ml-2 text-gray-400 hover:text-blue-500 transition-colors"
                title="View Trust Score Breakdown"
            >
                ⓘ
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="glass-card p-6 w-full max-w-sm relative bg-white/90"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>

                            <h3 className="text-xl font-bold mb-1">Trust Score Breakdown</h3>
                            <p className="text-gray-500 text-sm mb-6">Based on owner performance</p>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-lg font-medium">Overall Score</span>
                                    <span className="text-3xl font-bold text-green-600">{score}</span>
                                </div>

                                {metrics.map((metric, idx) => (
                                    <div key={idx} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                                        <span className="text-gray-600">{metric.label}</span>
                                        <span className={`font-bold ${metric.type === 'high' ? 'text-green-600' : 'text-yellow-600'}`}>
                                            {metric.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TrustScoreBreakdown;
