import React, { useState, useEffect } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import jsonData from "../../data/conversion.json"; // Import the JSON data directly

export const LineChartComponent = () => {
  const [priceData, setPriceData] = useState([]); // Initialize state for chart data

  useEffect(() => {
    // Process JSON data when the component is mounted
    const processedData = jsonData.map((item) => ({
      name: new Date(item.timestamp).toLocaleTimeString(),
      current_price: item.current_price,
      predicted_price: item.predicted_prices[0],
    }));
    setPriceData(processedData);
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={priceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="current_price" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="predicted_price" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
