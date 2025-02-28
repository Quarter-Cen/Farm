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

export default function VeterianCowInfo() {
    const [cowData, setCowData] = useState<Cow[]>([]);

    useEffect(() => {
        fetch("/api/admin/cow-info")
            .then((res) => res.json())
            .then((data: Cow[]) => setCowData(data))
            .catch((error) => console.error("Error fetching treatments:", error));
    }, []);

    return (
        <>
            <div className="flex items-center justify-center">
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
                        {cowData.map((cow, index) => (
                            <tr key={cow.id}>
                                <td className="px-12 py-2 text-center border">{index + 1}</td>
                                <td className="px-12 py-2 text-center border">{cow.name}</td>
                                <td className="px-12 py-2 text-center border">{cow.gender}</td>
                                <td className="px-12 py-2 text-center border">{cow.age}</td>
                                <td className="px-12 py-2 text-center border">{cow.breed}</td>
                                <td className="px-12 py-2 text-center border">
                                    <span className={`px-5 py-1 rounded-full text-white ${cow.healthStatus === "HEALTHY" ?
                                        "bg-[#28A745]" :
                                        cow.healthStatus === "SICK" ?
                                            "bg-[#FFC107]" :
                                            cow.healthStatus === "INJURED" ?
                                                "bg-[#DC3545]" :
                                                "bg-[#6C757D]"
                                        }`}>
                                        {cow.healthStatus === "HEALTHY"
                                            ? "HEALTHY"
                                            : cow.healthStatus === "SICK"
                                                ? "SICK"
                                                : cow.healthStatus === "INJURED"
                                                    ? "INJURED"
                                                    : "DEAD"
                                        }
                                    </span>
                                </td>
                                <td className="px-12 py-2 text-center flex gap-1 border">
                                    <Link href={`/veterian/treatment/addtreatment/${cow.id}`}>
                                        <button className="bg-[#88D64C] hover:bg-[#76b942] px-3 py-1 rounded-md">
                                            <span>เพิ่มข้อมูล</span>
                                        </button>
                                    </Link>
                                    <Link href={`/veterian/treatment/${cow.id}`}>
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
