"use client"; // ใช้ใน Next.js App Router
import { useEffect, useState } from "react";
import Link from "next/link";

interface Cow {
    id: number;
    name: string;
    gender: string;
    age: number;
    breed: string;
    healthStatus: string;
}

interface Treatment {
    id: number;
    nameDisease: string;
    status: string;
    cow: Cow;
}

export default function VeterianCowInfo() {
    const [cowData, setCowData] = useState<Treatment[]>([]);

    useEffect(() => {
        fetch("/api/veterian/treatment")
            .then((res) => res.json())
            .then((data: Treatment[]) => setCowData(data))
            .catch((error) => console.error("Error fetching treatments:", error));
    }, []);

    return (
        <>
            <div className="flex items-center justify-center ml-[250px]">
                <table className="min-w-full table-auto border border-gray-300">
                    <thead>
                        <tr className="bg-[#DBDBDB]">
                            <th className="px-14 py-2 border"><span className="text-[#8A8A8A]">ลำดับ</span></th>
                            <th className="px-14 py-2 border"><span className="text-[#8A8A8A]">ชื่อ</span></th>
                            <th className="px-14 py-2 border"><span className="text-[#8A8A8A]">เพศ</span></th>
                            <th className="px-14 py-2 border"><span className="text-[#8A8A8A]">อายุ</span></th>
                            <th className="px-14 py-2 border"><span className="text-[#8A8A8A]">สายพันธ์ุ</span></th>
                            <th className="px-14 py-2 border"><span className="text-[#8A8A8A]">สถานะสุขภาพ</span></th>
                            <th className="px-14 py-2 border"><span className="text-[#8A8A8A]">การดำเนินการ</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#F4F4F4]">
                        {cowData.map((treatment, index) => (
                            <tr key={treatment.id}>
                                <td className="px-12 py-2 text-center">{index + 1}</td>
                                <td className="px-12 py-2 text-center">{treatment.cow.name}</td>
                                <td className="px-12 py-2 text-center">{treatment.cow.gender}</td>
                                <td className="px-12 py-2 text-center">{treatment.cow.age}</td>
                                <td className="px-12 py-2 text-center">{treatment.cow.breed}</td>
                                <td className="px-12 py-2 text-center">
                                    <span className={`px-5 py-1 rounded-full text-white ${treatment.cow.healthStatus === "ดี" ? "bg-[#28A745]" : "bg-[#FF5733]"}`}>
                                        {treatment.cow.healthStatus === "ดี" ? "ดี" : "ไม่ดี"}
                                    </span>
                                </td>
                                <td className="px-12 py-2 text-center flex gap-1">
                                    <Link href="/veterian/treatment/addtreatment">
                                        <button className="bg-[#88D64C] hover:bg-[#76b942] px-3 py-1 rounded-md">
                                            <span>เพิ่มข้อมูล</span>
                                        </button>
                                    </Link>
                                    <Link href={`/veterian/treatment/${treatment.cow.id}`}>
                                        <button className="bg-[#4c83d6] hover:bg-[#37609c] px-3 py-1 rounded-md">
                                            <span>ดูเพิ่มเติม</span>
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
