import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const ScoreHistoryChart = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Trust Score',
                data: [4.2, 4.3, 4.5, 4.6, 4.7, 4.8],
                borderColor: '#2563EB', // Primary Blue
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#2563EB',
                pointBorderWidth: 2,
                pointRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            y: {
                min: 3,
                max: 5,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
        },
    };

    return (
        <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Score History</h3>
                <span className="text-green-600 text-sm font-semibold flex items-center">
                    ▲ 0.6 this year
                </span>
            </div>
            <div className="h-48">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default ScoreHistoryChart;
