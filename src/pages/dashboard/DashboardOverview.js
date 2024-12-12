import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faCashRegister } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from '@themesberg/react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { CounterWidget } from "../../components/Widgets";
// import jsonData from "../../data/conversion.json"; // Import the JSON data directly
import { LineChartComponent } from './LineChartComponent';

export default () => {
  const [priceData, setPriceData] = useState([]);

  useEffect(() => {
    // Initial data load
    // const processedData = jsonData.map((item) => ({
    //   name: new Date(item.timestamp).toLocaleTimeString(),
    //   current_price: item.current_price,
    //   predicted_price: item.predicted_prices[0],
    // }));
    // setPriceData(processedData);

    // Polling mechanism to check for data changes
    const intervalId = setInterval(() => {
      fetch("/path/to/your/api/or/data/conversion.json") // Fetch updated JSON file or API
        .then((response) => response.json())
        .then((updatedData) => {
          const updatedProcessedData = updatedData.map((item) => ({
            name: new Date(item.timestamp).toLocaleTimeString(),
            current_price: item.current_price,
            predicted_price: item.predicted_prices[0],
          }));

          setPriceData(updatedProcessedData);
        })
        .catch((error) => console.error("Error fetching updated data:", error));
    }, 5000); // Check for updates every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Calculate some basic statistics
  const calculateStats = () => {
    if (priceData.length === 0) return { 
      averageCurrentPrice: 0, 
      averagePredictedPrice: 0,
      priceChange: 0 
    };

    const currentPrices = priceData.map(item => item.current_price);
    const predictedPrices = priceData.map(item => item.predicted_price);

    const averageCurrentPrice = currentPrices.reduce((a, b) => a + b, 0) / currentPrices.length;
    const averagePredictedPrice = predictedPrices.reduce((a, b) => a + b, 0) / predictedPrices.length;
    const priceChange = ((currentPrices[currentPrices.length - 1] - currentPrices[0]) / currentPrices[0]) * 100;

    return { 
      averageCurrentPrice, 
      averagePredictedPrice,
      priceChange 
    };
  };

  const { averageCurrentPrice, averagePredictedPrice, priceChange } = calculateStats();

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Avg Current Price"
            title={`$${averageCurrentPrice.toFixed(5)}`}
            percentage={priceChange}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Avg Predicted Price"
            title={`$${averagePredictedPrice.toFixed(5)}`}
            percentage={priceChange}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>
      </Row>

      <Row>
        {/* <Col xs={12} className="mb-4">
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
        </Col> */}
        <Col xs={12} className="mb-4">
  <LineChartComponent />
</Col>
      </Row>
    </>
  );
};
