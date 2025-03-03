"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const StockComparison = () => {
  const [data, setData] = useState({ importData: {}, usageData: {} });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/getInfoForChart");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData({ importData: {}, usageData: {} }); // Set to empty in case of error
      }
    };
    fetchData();
  }, []);

  const months = Object.keys(data.importData);
  const importQuantities = months.map((month) => data.importData[month]);
  const usageQuantities = months.map((month) => data.usageData[month] || 0); // Defaults to 0 if no data for usage

  const chartData = months.map((month, index) => ({
    month,
    imports: importQuantities[index],
    usage: usageQuantities[index],
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
        Stock Comparison
      </h2>
      {months.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="imports"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="usage" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default StockComparison;
