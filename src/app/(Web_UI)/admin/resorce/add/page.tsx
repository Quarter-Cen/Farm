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
    <div>
      <h1>Add New Stock</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Import From</label>
          <input
            type="text"
            name="importFrom"
            value={formData.importFrom}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">เลือกประเภท</option>
            <option value="VEGETABLE">Vegetable</option>
            <option value="MEAT">Meat</option>
            <option value="DAIRY">Dairy</option>
            <option value="GRAIN">Grain</option>
          </select>
        </div>
        <div>
          <label>Quantity</label>
          <input
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price per Unit</label>
          <input
            type="number"
            name="pricePerUnit"
            value={formData.pricePerUnit}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Stock</button>
      </form>
    </div>
  );
};

export default AddStock;
