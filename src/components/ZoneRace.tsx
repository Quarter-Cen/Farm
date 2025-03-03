'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProductReportChart = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/admin/zone'); // ดึงข้อมูลจาก API
      const result = await res.json();
      setData(result);
    };
    fetchData();
  }, []);   

  const months = Object.keys(data);
  const chartData = months.map((month) => ({
    month,
    "Zone A": data[month]["Zone A"] || 0,
    "Zone B": data[month]["Zone B"] || 0,
    "Zone C": data[month]["Zone C"] || 0,
    "Zone D": data[month]["Zone D"] || 0,
  }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-[95%]">
      <h2 className="text-xl font-semibold text-gray-700  mb-4">
        Product Report
        </h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Zone A" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Zone B" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Zone C" stroke="#ffc658" />
          <Line type="monotone" dataKey="Zone D" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductReportChart;
