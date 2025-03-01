"use client";
import { Stock } from "@prisma/client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function VeterianTreatment() {
  const [stockData, setStockData] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true); // state สำหรับ loading
  const [error, setError] = useState<string | null>(null); // state สำหรับ error

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
        setLoading(false); // set loading เป็น false หลังจากโหลดข้อมูลเสร็จ
      })
      .catch((error) => {
        setError(error.message); // แสดงข้อความ error ถ้าเกิดข้อผิดพลาด
        setLoading(false); // set loading เป็น false แม้เกิดข้อผิดพลาด
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">กำลังโหลดข้อมูล...</p>; // แสดงข้อความระหว่างโหลดข้อมูล
  }

  if (error) {
    return <p className="text-center text-red-500">เกิดข้อผิดพลาด: {error}</p>; // แสดงข้อความ error ถ้าเกิดข้อผิดพลาด
  }

  if (stockData.length === 0) {
    return (
      <p className="text-center text-gray-500">ไม่มีข้อมูล stock ที่จะแสดง</p>
    ); // แสดงข้อความหากไม่มีข้อมูล
  }

  return (
    <div className="flex-col">
      <div className="flex justify-between p-4">
        <h1>Resorce</h1>
        <Link href={`/admin/resorce/add`}>
          <button className="bg-[#88D64C] hover:bg-[#76b942] px-3 py-1 rounded-md">
            เพิ่มข้อมูล
          </button>
        </Link>
      </div>

      <div className="flex items-center justify-center ml-[2%]">
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-[#DBDBDB] text-gray-700">
              <th className="px-6 py-2 border">วันที่</th>
              <th className="px-6 py-2 border">ชนิด</th>
              <th className="px-6 py-2 border">จำนวน</th>
              <th className="px-6 py-2 border">สถานะ</th>
              <th className="px-6 py-2 border">การดำเนินการ</th>
            </tr>
          </thead>
          <tbody className="bg-[#F4F4F4] text-center">
            {stockData.map((stock) => (
              <tr key={stock.id} className="border">
                <td className="px-6 py-2 border">
                  {new Date(stock.updatedAt).toLocaleDateString("th-TH")}
                </td>
                <td className="px-6 py-2 border">{stock.type}</td>
                <td className="px-6 py-2 border">{stock.quantity}</td>
                <td className="px-6 py-2 border">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      stock.status === "AVAILABLE"
                        ? "bg-[#28A745]"
                        : stock.status === "RESERVED"
                        ? "bg-[#FFC107]"
                        : "bg-[#FD7E14]"
                    }`}
                  >
                    {stock.status === "AVAILABLE"
                      ? "Available"
                      : stock.status === "RESERVED"
                      ? "Reserved"
                      : "Out of Stock"}
                  </span>
                </td>
                <td className="px-1 py-2 text-center flex justify-center space-x-4 border">
                  <div>
                    <Link href={`/admin/resorce/${stock.id}`}>
                      <button className="bg-[#e7e459] hover:bg-[#adab38] px-3 py-1 rounded-md">
                        ดูเพิ่มเติม
                      </button>
                    </Link>
                  </div>
                  <div>
                    <Link href={`/veterian/treatment/${stock.id}`}>
                      <button className="bg-[#4c83d6] hover:bg-[#37609c] px-3 py-1 rounded-md">
                        แก้ไข
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
