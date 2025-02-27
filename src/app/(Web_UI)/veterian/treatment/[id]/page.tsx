"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Cow {
    id: string;
    name: string;
    gender: string;
    age: number;
    weight: number;
    birthDate: string;
    breed: string;
    healthStatus: string;
}

interface Treatment {
    id: string;
    nameDisease: string;
    events: string;
    details: string;
    date: string;
    drugName: string;
    status: string;
    notation: string;
    veterianId: string;
    cowId: string;
    cow?: Cow;
}

export default function CowDetails() {
    const { id } = useParams();
    const [cow, setCow] = useState<Cow | null>(null);
    const [treatments, setTreatments] = useState<Treatment[]>([]);

    useEffect(() => {
        if (!id) return;

        fetch("/api/veterian/treatment")
            .then((res) => res.json())
            .then((data: Treatment[]) => {
                const cowTreatment = data.find((treatment) => treatment.cowId === id);
                if (cowTreatment?.cow) {
                    setCow(cowTreatment.cow);
                    setTreatments(data.filter((t) => t.cowId === id));
                }
            })
            .catch((error) => console.error("Error fetching treatments:", error));
    }, [id]);

    if (!cow) return <p className="text-center mt-10 text-gray-500">ยังไม่มีข้อมูลการรักษา...</p>;

    return (
        <div className="flex flex-col items-center justify-center mt-10 mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">🐄 รายละเอียดวัวและการรักษา</h1>

            {/* 🐄 ข้อมูลวัว */}
            <div className="border p-6 rounded-lg shadow-lg bg-white w-full mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">🐄 ข้อมูลวัว</h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-gray-700">
                    <p><strong>ชื่อ:</strong> {cow.name}</p>
                    <p><strong>เพศ:</strong> {cow.gender}</p>
                    <p><strong>อายุ:</strong> {cow.age} ปี</p>
                    <p><strong>น้ำหนัก:</strong> {cow.weight} กก.</p>
                    <p><strong>วันเกิด:</strong> {new Date(cow.birthDate).toLocaleDateString("th-TH")}</p>
                    <p><strong>สายพันธุ์:</strong> {cow.breed}</p>
                    <p className="col-span-2"><strong>สถานะสุขภาพ:</strong> <span className="text-red-500">{cow.healthStatus}</span></p>
                </div>
            </div>

            {/* 💉 ข้อมูลการรักษา */}
            <div className="border p-6 rounded-lg shadow-lg bg-white w-full">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">💉 ข้อมูลการรักษา</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="px-4 py-2 border">#</th>
                                <th className="px-4 py-2 border">วันที่</th>
                                <th className="px-4 py-2 border">ชื่อโรค</th>
                                <th className="px-4 py-2 border">เหตุการณ์</th>
                                <th className="px-4 py-2 border">รายละเอียด</th>
                                <th className="px-4 py-2 border">ยาที่ใช้</th>
                                <th className="px-4 py-2 border">สถานะ</th>
                                <th className="px-4 py-2 border">หมายเหตุ</th>
                                <th className="px-4 py-2 border">การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-50 text-gray-700">
                            {treatments.length > 0 ? (
                                treatments.map((treatment, index) => (
                                    <tr key={treatment.id} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 text-center border">{index + 1}</td>
                                        <td className="px-4 py-2 text-center border">
                                            {new Date(treatment.date).toLocaleDateString('th-TH')}
                                        </td>
                                        <td className="px-4 py-2 text-center border">{treatment.nameDisease}</td>
                                        <td className="px-4 py-2 text-center border">{treatment.events}</td>
                                        <td className="px-4 py-2 text-center border">{treatment.details}</td>
                                        <td className="px-4 py-2 text-center border">{treatment.drugName}</td>
                                        <td className="px-4 py-2 text-center border">
                                            <span className={`px-3 py-1 rounded-full text-white text-sm ${treatment.status === "รักษาแล้ว"
                                                ? "bg-[#28A745]"
                                                : treatment.status === "กำลังรักษา"
                                                    ? "bg-[#FFC107]"
                                                    : "bg-[#FD7E14]"
                                                }`}>
                                                {treatment.status === "รักษาแล้ว"
                                                    ? "รักษาแล้ว" :
                                                    treatment.status === "กำลังรักษา"
                                                        ? "กำลังรักษา"
                                                        : "รอดำเนินการ"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-center border">{treatment.notation}</td>
                                        <td className="px-4 py-2 text-center border">
                                            <div className="flex justify-center gap-2">
                                                <Link href={`/veterian/treatment/edittreatment/${treatment.id}`}>
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-md">
                                                        แก้ไข
                                                    </button>
                                                </Link>
                                                <button className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md">
                                                    ลบ
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="text-center py-4 text-gray-500">ไม่มีข้อมูลการรักษา</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ปุ่มกลับ */}
            <Link href="/veterian/cow">
                <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition duration-300">
                    🔙 กลับไปหน้าวัว
                </button>
            </Link>
        </div>
    );
}
