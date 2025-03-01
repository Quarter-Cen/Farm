"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FoodImp, Stock } from "@prisma/client";

export default function CowDetails() {
    const { id } = useParams();
    const [stock, setStock] = useState<Stock | null>(null);
    const [order, setOrder] = useState<FoodImp[]>([]);
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

    if (loading) return <p className="text-center mt-10 text-gray-500">กำลังโหลดข้อมูล...</p>;

    if (error) return <p className="text-center mt-10 text-red-500">เกิดข้อผิดพลาด: {error}</p>;

    if (!stock) return <p className="text-center mt-10 text-gray-500">ไม่พบข้อมูลคลังนี้</p>;

    return (
        <div className="flex flex-col items-center justify-center mt-10 mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">รายละเอียดคลังและการสั่งซื้อ</h1>
            <div className="border p-6 rounded-lg shadow-lg bg-white w-full mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">ข้อมูลคลัง</h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-gray-700">
                    <p><strong>ลำดับ:</strong> {stock.id}</p>
                    <p><strong>ประเภท:</strong> {stock.type}</p>
                    <p><strong>จำนวน:</strong> {stock.quantity}</p>
                    <p><strong>ราคาต่อหน่วย:</strong> {stock.unit}</p>
                    <p><strong>วันที่แก้ไขล่าสุด:</strong> {new Date(stock.updatedAt).toLocaleDateString("th-TH")}</p>
                    <p><strong>สถานะ:</strong> {stock.status}</p>
                </div>
            </div>

            <div className="border p-6 rounded-lg shadow-lg bg-white w-full">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">💉 ข้อมูลการสั่งซื้อ</h2>
                {order.length === 0 ? (
                    <p className="text-center py-4 text-gray-500">ยังไม่มีข้อมูลการสั่งซื้อ</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="px-4 py-2 border">#</th>
                                    <th className="px-4 py-2 border">วันที่</th>
                                    <th className="px-4 py-2 border">ชื่อ</th>
                                    <th className="px-4 py-2 border">ประเภท</th>
                                    <th className="px-4 py-2 border">แหล่งที่มา</th>
                                    <th className="px-4 py-2 border">จำนวน</th>
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

            {/* ปุ่มกลับ */}
            <Link href="/admin/resorce">
                <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition duration-300">
                    🔙 กลับไปหน้าคลัง
                </button>
            </Link>
        </div>
    );
}
