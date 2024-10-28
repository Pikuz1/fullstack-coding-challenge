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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register required components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface EmissionsChartProps {
  chartData: any;
}

const EmissionsChart: React.FC<EmissionsChartProps> = ({ chartData }) => {
  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default EmissionsChart;
