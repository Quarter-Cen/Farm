'use client'

import { useState, useEffect } from 'react';

const AddStock = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    importFrom: '',
    type: '', 
    quantity: 0,
    pricePerUnit: 0,
    adminId: '', 
  });

  useEffect(() => {
    fetch("/api/auth/me/rolesId")
      .then((res) => res.json())
      .then((data) => {
        const admin = data.find((item: any) => item.role.name === "Admin");
        if (admin) {
          setFormData((prev) => ({
            ...prev,
            adminId: admin.id,
          }));
        }
      })
      .catch((error) => console.log("Error fetching roles:", error));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/admin/stock/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.message) {
        alert(data.message);
      } else {
        alert('Stock added successfully!');
      }
    } catch (error) {
      console.error('Failed to add stock:', error);
      alert('Error adding stock');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">Add New Stock</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Import From</label>
          <input
            type="text"
            name="importFrom"
            placeholder="Enter importFrom"
            value={formData.importFrom}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]"
          >
            <option value="">Select Type</option>
            <option value="VEGETABLE">Vegetable</option>
            <option value="MEAT">Meat</option>
            <option value="DAIRY">Dairy</option>
            <option value="GRAIN">Grain</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price per Unit</label>
          <input
            type="number"
            name="pricePerUnit"
            value={formData.pricePerUnit}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]"
          />
        </div>
      
        <button 
          type="submit"
          className="w-full bg-gray-300 text-white py-2 rounded-lg mt-4 transition duration-300 ease-in-out transform hover:bg-[#74B845] hover:scale-105 focus:outline-none"
        >
          Add Stock
        </button>
      </form>
    </div>
  );
};

export default AddStock;
