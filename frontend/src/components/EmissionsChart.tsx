import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EmissionsChartProps {
  data: Array<{ country: string; data: Array<{ year: string; emissions: number }> }>;
}

const EmissionsChart: React.FC<EmissionsChartProps> = ({ data }) => {
  // Flatten data for use in the chart
  const chartData = data.flatMap(country =>
    country.data.map(entry => ({ ...entry, country: country.country }))
  );

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.map(country => (
          <Line type="monotone" dataKey="emissions" data={country.data} key={country.country} name={country.country} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EmissionsChart;
