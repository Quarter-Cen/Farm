'use client'


import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from 'react';




const AddStock = () => {
  const router = useRouter(); // ✅ สร้างตัวแปร router

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    importFrom: '',
    type: '', 
    quantity: 0,
    pricePerUnit: 0,
    adminId: '', 
  });

  
  const [isFormValid, setIsFormValid] = useState(false); // State to track if form is valid


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

  const validateForm = (): boolean => {
    const { name, date, importFrom, type, quantity, pricePerUnit } = formData;
    return !!(name && date && importFrom && type && quantity > 0 && pricePerUnit > 0);
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

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

        router.push('/admin/resorce'); // ✅ หลังจากเพิ่มสำเร็จให้ไปที่หน้า /admin/resorce

      }
    } catch (error) {
      console.error('Failed to add stock:', error);
      alert('Error adding stock');
    }
  };

  const handleCancel = () => {
    router.push('/admin/resorce'); // ✅ กลับไปหน้าที่ต้องการเมื่อกด Cancel
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

        <div className="flex justify-between">
          <button 
            type="button" 
            onClick={handleCancel} 
            className="w-1/2 mr-2 bg-[#CECECE] text-white py-2 rounded-lg transition duration-300 ease-in-out hover:bg-[#74B845]"
          >
            Cancel
          </button>

          <button 
            type="submit"
            disabled={!isFormValid} 
            className={`w-1/2 text-white py-2 rounded-lg transition duration-300 ease-in-out transform ${isFormValid ? 'bg-[#74B845] hover:bg-[#74B845]' : 'bg-[#CECECE] cursor-not-allowed'}`}
          >
            Add Stock
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStock;
