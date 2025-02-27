"use client";
import { useEffect, useState } from "react";

interface Treatment {
    id: number;
    nameDisease: string;
    events: string;
    details: string;
    date: string;
    drugName: string;
    status: string;
    notation: string;
}

export default function VeterianTreatment() {
    const [treatmentData, setTreatmentData] = useState<Treatment[]>([]);

    useEffect(() => {
        fetch("/api/veterian/treatment")
            .then((res) => res.json())
            .then((data: Treatment[]) => setTreatmentData(data))
            .catch((error) => console.error("Error fetching treatments:", error));
    }, []);

    return (
        <div className="flex items-center justify-center">
            <table className="min-w-full table-auto border border-gray-300">
                <thead>
                    <tr className="bg-[#DBDBDB] text-gray-700">
                        <th className="px-6 py-2 border">วันที่</th>
                        <th className="px-6 py-2 border">ชื่อโรค</th>
                        <th className="px-6 py-2 border">เหตุการณ์</th>
                        <th className="px-6 py-2 border">รายละเอียดอาการ</th>
                        <th className="px-6 py-2 border">ยารักษา</th>
                        <th className="px-6 py-2 border">สถานะ</th>
                        <th className="px-6 py-2 border">หมายเหตุ</th>
                    </tr>
                </thead>
                <tbody className="bg-[#F4F4F4] text-center">
                    {treatmentData.map((treatment) => (
                        <tr key={treatment.id} className="border">
                            <td className="px-6 py-2 border">{new Date(treatment.date).toLocaleDateString("th-TH")}</td>
                            <td className="px-6 py-2 border">{treatment.nameDisease}</td>
                            <td className="px-6 py-2 border">{treatment.events}</td>
                            <td className="px-6 py-2 border">{treatment.details}</td>
                            <td className="px-6 py-2 border">{treatment.drugName}</td>
                            <td className="px-6 py-2 border">
                                <span className={`px-3 py-1 rounded-full text-white ${treatment.status === "รักษาแล้ว"
                                        ? "bg-[#28A745]" 
                                        : treatment.status === "กำลังรักษา"
                                            ? "bg-[#FFC107]" 
                                            : "bg-[#FD7E14]"
                                    }`}>
                                    {treatment.status === "รักษาแล้ว"
                                        ? "รักษาแล้ว"
                                        : treatment.status === "กำลังรักษา"
                                            ? "กำลังรักษา"
                                            : "รอดำเนินการ"}
                                </span>

                            </td>
                            <td className="px-6 py-2 border">{treatment.notation || "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
