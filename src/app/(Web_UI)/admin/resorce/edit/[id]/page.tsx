"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";


const EditStock = () => {
  const router = useRouter();
  const { id } = useParams(); // ดึงค่า id จาก URL

  const [formData, setFormData] = useState({
    type: "VEGETABLE", // ค่าเริ่มต้นของ FoodType
    quantity: 0,
    unit: 0,
    status: "AVAILABLE", // ค่าเริ่มต้นของ StockStatus
  });
  

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // โหลดข้อมูล Stock ที่ต้องการแก้ไข
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await fetch(`/api/admin/stock/${id}`);
        const data = await res.json();
  
        if (res.ok) {
          setFormData({
            type: data.type || "VEGETABLE", // ตรวจสอบค่าเริ่มต้น
            quantity: data.quantity || 0,
            unit: data.unit || 0,
            status: data.status || "AVAILABLE",
          });
        } else {
          setMessage(`Error: ${data.error}`);
        }
      } catch (error) {
        setMessage("Failed to fetch stock data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchStockData();
  }, [id]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "unit" ? Number(value) : value, // แปลงค่าเป็นตัวเลขถ้าเป็นจำนวน
    }));
  };
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`/api/admin/stock/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Stock updated successfully!");
        router.push("/admin/resorce"); // กลับไปที่หน้ารายการ stock หลังจากแก้ไขเสร็จ
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Failed to update stock:", error);
      setMessage("Error updating stock");
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">Edit Stock</h1>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ประเภทของวัตถุดิบ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]"
          >
            <option value="VEGETABLE">Vegetable</option>
            <option value="MEAT">Meat</option>
            <option value="DAIRY">Dairy</option>
            <option value="GRAIN">Grain</option>
          </select>
        </div>
  
        {/* จำนวน */}
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
  
        {/* หน่วย */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
          <input
            type="number"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]"
          />
        </div>
  
        {/* สถานะของ Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]"
          >
            <option value="AVAILABLE">Available</option>
            <option value="OUT_OF_STOCK">Out of Stock</option>
            <option value="RESERVED">Reserved</option>
            
          </select>
        </div>
  

        {/* ปุ่ม Submit */}
        <button 
          type="submit"
          className="w-full bg-gray-300 text-white py-2 rounded-lg mt-4 transition duration-300 ease-in-out transform hover:bg-[#74B845] hover:scale-105 focus:outline-none"
        >
          Update Stock
        </button>
      </form>
    </div>
  );
  
};

export default EditStock;
