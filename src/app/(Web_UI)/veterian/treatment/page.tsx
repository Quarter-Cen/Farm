"use client";
import { useEffect, useState } from "react";

interface Cow {
    name: string
}

interface Treatment {
    id: number;
    nameDisease: string;
    events: string;
    details: string;
    date: string;
    drugName: string;
    status: string;
    notation: string;
    cow: Cow
}

export default function VeterianTreatment() {
    const [treatmentData, setTreatmentData] = useState<Treatment[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isVeterian, setIsVeterian] = useState(false);
    const [vetId, setVetId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/auth/me/rolesId")
            .then((res) => res.json())
            .then((data) => {
                const admin = data.find((item: any) => item.role.name === "Admin");
                const veterian = data.find((item: any) => item.role.name === "Veterian");

                if (admin) {
                    setIsAdmin(true);
                    setIsVeterian(false);
                } else if (veterian) {
                    setIsVeterian(true);
                    setIsAdmin(false);
                    setVetId(veterian.id);
                }
            })
            .catch((error) => console.log("Error fetching roles:", error));
    }, []);

    useEffect(() => {
        // Start loading
        setLoading(true);

        if (isAdmin) {
            fetch("/api/veterian/treatment")
                .then((res) => res.json())
                .then((data: Treatment[]) => {
                    setTreatmentData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching treatment info:", error);
                    setLoading(false);
                });
        } else if (isVeterian && vetId !== null) {
            fetch(`/api/veterian/assigned-treatments?vetId=${vetId}`)
                .then((res) => res.json())
                .then((data: Treatment[]) => {
                    console.log("Data:", data)
                    data.forEach((treatment) => {
                        console.log(`🐮 Cow Name: ${treatment.cow?.name || "ไม่มีข้อมูล"}`);
                    })
                    setTreatmentData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching assigned cows:", error);
                    setLoading(false);
                });
        }
    }, [isAdmin, isVeterian, vetId]);

    useEffect(() => {
        console.log("cc", treatmentData.length);
    }, [treatmentData]);

    return (
        <div className="flex items-center justify-center ml-[2%]">
            {loading ? (
                <p className="text-center text-gray-500 text-lg">กำลังโหลดข้อมูล...</p>
            ) : treatmentData.length === 0 ? (
                <div className="text-center">
                    <span className="text-gray-600 text-lg font-semibold">ไม่มีข้อมูลการรักษา</span>
                </div>
            ) : (
                <table className="min-w-full table-auto border border-gray-300">
                    <thead>
                        <tr className="bg-[#DBDBDB] text-gray-700">
                            <th className="px-6 py-2 border">วันที่</th>
                            <th className="px-6 py-2 border">ชื่อวัว</th>
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
                                <td className="px-6 py-2 border">{treatment.cow?.name || "ไม่ระบุ"}</td>
                                <td className="px-6 py-2 border">{treatment.nameDisease}</td>
                                <td className="px-6 py-2 border">{treatment.events}</td>
                                <td className="px-6 py-2 border">{treatment.details}</td>
                                <td className="px-6 py-2 border">{treatment.drugName}</td>
                                <td className="px-6 py-2 border">
                                    <span className={`px-3 py-1 rounded-full text-white ${treatment.status === "HEALTHY"
                                        ? "bg-[#28A745]"
                                        : treatment.status === "SICK"
                                            ? "bg-[#FFC107]"
                                            : treatment.status === "INJURED"
                                                ? "bg-[#DC3545]"
                                                : "bg-[#6C757D]"
                                        }`}>
                                        {treatment.status === "HEALTHY"
                                            ? "HEALTHY"
                                            : treatment.status === "SICK"
                                                ? "SICK"
                                                : treatment.status === "INJURED"
                                                    ? "INJURED"
                                                    : "DEAD"
                                            }
                                    </span>

                                </td>
                                <td className="px-6 py-2 border">{treatment.notation || "-"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
