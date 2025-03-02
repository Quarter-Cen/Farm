'use client'

import { useState, useEffect } from "react";

// Enum สำหรับประเภทอาหาร
enum FoodType {
  VEGETABLE = "VEGETABLE",
  MEAT = "MEAT",
  DAIRY = "DAIRY",
  GRAIN = "GRAIN"
}

export default function UseFoodPage() {
  const [foodType, setFoodType] = useState<FoodType | "">("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [usedById, setUsedById] = useState<number | "">("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // ดึงข้อมูล role ของ DairyWorker จาก API
  useEffect(() => {
    fetch("/api/auth/me/rolesId")
      .then((res) => res.json())
      .then((data) => {
        const dairyWorker = data.find((item: any) => item.role.name === "DairyWorker");
        if (dairyWorker) {
          // ตั้งค่า usedById ให้เป็น ID ของ DairyWorker
          setUsedById(dairyWorker.id);
        }
      })
      .catch((error) => console.log("Error fetching roles:", error));
  }, []);

  // ฟังก์ชันส่งข้อมูลไปยัง API
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!foodType || !quantity || !usedById) {
      setMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // ส่งข้อมูลไปยัง API
      const response = await fetch("/api/dairyworker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ foodType, quantity, usedById }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("ใช้งาน Food Type สำเร็จ!");
        // ใช้ window.location.href สำหรับการเปลี่ยนหน้า
        window.location.href = '/dairyworker/dashboard';
      } else {
        setMessage(data.message || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      setMessage("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">ใช้งาน Food Type</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Food Type Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Food Type</label>
          <select
            value={foodType}
            onChange={(e) => setFoodType(e.target.value as FoodType)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">เลือกประเภทอาหาร</option>
            {Object.values(FoodType).map((food) => (
              <option key={food} value={food}>
                {food}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="กรุณากรอกจำนวน"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 text-white font-semibold rounded-md ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "กำลังประมวลผล..." : "ใช้งาน Food Type"}
        </button>
      </form>

      {/* Message */}
      {message && (
        <div className="mt-6 text-center">
          <p className={`text-sm ${message.includes("สำเร็จ") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        </div>
      )}
    </div>
  );
}
