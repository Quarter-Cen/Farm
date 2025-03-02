"use client";
import { Stock } from "@prisma/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "remixicon/fonts/remixicon.css";

export default function VeterianTreatment() {
  const [stockData, setStockData] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/stock")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data: Stock[]) => {
        setStockData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-2 mb-3">
        <h1 className="text-2xl font-semibold ml-20 text-gray-800">Resorce</h1>
        <Link href={`/admin/resorce/add`}>
          <button className="w-28 h-10 text-white mr-20 bg-[#74B845]  hover:scale-105 transition-transform duration-200 rounded-lg text-sm">
            Add Resorce
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="w-full max-w-5xl mx-auto mt-2">
        {loading ? (
          <p className="text-center text-gray-500 text-sm">กำลังโหลดข้อมูล...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-sm">เกิดข้อผิดพลาด: {error}</p>
        ) : stockData.length === 0 ? (
          <div className="text-center bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm font-semibold">ไม่มีข้อมูลสต็อก</p>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Table Header */}
            <div className="grid grid-cols-5 bg-gray-200 text-gray-900 font-medium p-2 rounded-lg">
              <span className="text-center text-sm">Date</span>
              <span className="text-center text-sm">Type</span>
              <span className="text-center text-sm">Unit</span>
              <span className="text-center text-sm">Status</span>
              <span className="text-center text-sm">Operation</span>
            </div>

            {/* Stock Data Rows */}
            {stockData.map((stock) => (
              <div
                key={stock.id}
                className="grid grid-cols-5 items-center text-gray-900 bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() => window.location.href = `/admin/resorce/${stock.id}`}
              >
                <span className="text-center text-sm">{new Date(stock.updatedAt).toLocaleDateString("th-TH")}</span>
                <span className="text-center text-sm">{stock.type}</span>
                <span className="text-center text-sm">{stock.quantity}</span>
                <span
                  className={`text-center px-3 rounded-full font-light text-sm ${
                    stock.status === "AVAILABLE"
                      ? "text-green-600"
                      : stock.status === "RESERVED"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {stock.status === "AVAILABLE"
                    ? "Available"
                    : stock.status === "RESERVED"
                    ? "Reserved"
                    : "Out of Stock"}
                </span>
                <div className="flex justify-center space-x-4">
                  <Link href={`/veterian/treatment/${stock.id}`}>
                    <button className="text-[#CECECE] hover:text-[#74B845] hover:scale-105 transition-transform duration-200">
                      <i className="ri-edit-circle-fill text-2xl"></i>
                    </button>
                  </Link>
                </div>
              </div>

            ))}
          </div>
        )}
      </div>
    </div>
  );
}
