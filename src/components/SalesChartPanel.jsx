import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the chart elements
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SalesChartPanel = ({ title, chartData }) => {
  const defaultData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [12000, 19000, 3000, 5000, 22000],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="col-md-6">
      <div className="card mb-3">
        <div className="card-header">{title}</div>
        <div className="card-body">
          <div style={{ height: 300 }}>
            <Bar data={chartData || defaultData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChartPanel;
