import React from 'react';
import { useLidoAPY } from '../hooks/useLidoAPY';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export default function APYChart() {
  const { data, error } = useLidoAPY();

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!data.length) {
    return <div>Loading APY data...</div>;
  }

  const chartData = data.map(m => ({
    date: new Date(Number(m.timestamp) * 1000).toLocaleDateString(),
    apr: parseFloat(m.apr) * 100, // Convert to percentage
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h3>Historical stETH APY</h3>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis unit="%" />
          <Tooltip formatter={value => `${value.toFixed(2)}%`} />
          <Line
            type="monotone"
            dataKey="apr"
            stroke="#8884d8"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}