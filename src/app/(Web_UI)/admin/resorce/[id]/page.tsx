'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FoodImp, Stock } from "@prisma/client";

export default function CowDetails() {
  const { id } = useParams();
  const [stock, setStock] = useState<Stock | null>(null);
  const [order, setOrder] = useState<FoodImp[]>([]);
  const [usage, setUsage] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // state สำหรับ loading
  const [error, setError] = useState<string | null>(null); // state สำหรับ error

  useEffect(() => {
    fetch(`/api/admin/stock/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch stock data");
        }
        return res.json();
      })
      .then((data: Stock) => {
        setStock(data);
        setLoading(false); // set loading false หลังจากโหลดข้อมูลเสร็จ
      })
      .catch((error) => {
        setError(error.message); // แสดงข้อความ error
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (stock) {
      fetch("/api/admin/stock/getOrder")
        .then((res) => res.json())
        .then((data: FoodImp[]) => {
          const stockOrder = data.filter((order) => order.type === stock?.type);
          setOrder(stockOrder);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [stock]);

  useEffect(() => {
    if (stock) {
      fetch(`/api/admin/stock/use`)
        .then((res) => res.json())
        .then((data: any[]) => {
          const stockUsage = data.filter((usage) => usage.stockId === stock.id);
          setUsage(stockUsage);
        })
        .catch((error) => {
          console.error("Error fetching usage:", error);
        });
    }
  }, [stock]);
  
  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading data...</p>;
  
  if (error)
    return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  
  return (
    <div className="flex flex-col items-center justify-center mt-10 mx-24">
      <h1 className="text-2xl text-gray-800 font-bold mb-6">
        Inventory and Ordering Details
      </h1>
  
      {/* Resource Information */}
      <div className="border p-6 rounded-lg shadow-lg bg-white w-full mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Resource Information
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-gray-700">
          <p><strong>ID:</strong> {stock.id}</p>
          <p><strong>Type:</strong> {stock.type}</p>
          <p><strong>Quantity:</strong> {stock.quantity}</p>
          <p><strong>Unit:</strong> {stock.unit}</p>
          <p><strong>Update Date:</strong> {new Date(stock.updatedAt).toLocaleDateString("th-TH")}</p>
          <p><strong>Status:</strong> {stock.status}</p>
        </div>
      </div>
  
      {/* Ordering Information */}
      <div className="border p-6 rounded-lg shadow-lg bg-white w-full mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Ordering Information
        </h2>
        {order.length === 0 ? (
          <p className="text-center py-4 text-gray-500">
            There is no ordering information yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Type</th>
                  <th className="px-4 py-2 border">Source</th>
                  <th className="px-4 py-2 border">Quantity</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 text-gray-700">
                {order.map((order, index) => (
                  <tr key={order.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 text-center border">{index + 1}</td>
                    <td className="px-4 py-2 text-center border">
                      {new Date(order.date).toLocaleDateString("th-TH")}
                    </td>
                    <td className="px-4 py-2 text-center border">{order.name}</td>
                    <td className="px-4 py-2 text-center border">{order.type}</td>
                    <td className="px-4 py-2 text-center border">{order.importFrom}</td>
                    <td className="px-4 py-2 text-center border">{order.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
  
      {/* Usage Information */}
      <div className="border p-6 rounded-lg shadow-lg bg-white w-full mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Usage Information
        </h2>
        {usage.length === 0 ? (
          <p className="text-center py-4 text-gray-500">
            No usage data available.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2 border">#</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Quantity</th>
                  <th className="px-4 py-2 border">Used By</th>
                </tr>
              </thead>
              <tbody className="bg-gray-50 text-gray-700">
                {usage.map((usageItem, index) => (
                  <tr key={usageItem.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 text-center border">{index + 1}</td>
                    <td className="px-4 py-2 text-center border">
                      {new Date(usageItem.usedAt).toLocaleDateString("th-TH")}
                    </td>
                    <td className="px-4 py-2 text-center border">{usageItem.quantity}</td>
                    <td className="px-4 py-2 text-center border">
                      {usageItem.usedBy?.user?.firstName} {usageItem.usedBy?.user?.lastName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
  
      {/* Back Button */}
      <Link href="/admin/resource">
        <button className="mt-6 bg-[#74B845] text-white px-6 py-3 rounded-lg hover:scale-105 transition-transform duration-200">
          Back to Resource Page
        </button>
      </Link>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 59e97a58d474712fbf5b8d0d26ac0b1ffa809fd2
