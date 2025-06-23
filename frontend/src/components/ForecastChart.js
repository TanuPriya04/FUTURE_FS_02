import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

import './ForecastChart.css';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function ForecastChart({ data }) {
  const labels = data.list.filter((_, index) => index % 8 === 0).map(item => {
    const date = new Date(item.dt_txt);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });

  const temps = data.list.filter((_, index) => index % 8 === 0).map(item => item.main.temp);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temp (°C)',
        data: temps,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className="forecast-chart">
      <h3>📈 Temperature Trend</h3>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default ForecastChart;