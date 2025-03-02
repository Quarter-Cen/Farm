"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Treatment {
    date: string;
    status: "HEALTHY" | "SICK" | "INJURED" | "DEAD";
    cow: {
        healthStatus: "HEALTHY" | "SICK" | "INJURED" | "DEAD";
    } | null;
}

const STATUS_COLORS = {
    HEALTHY: "#28A745",
    SICK: "#FFC107",
    INJURED: "#FD7E14",
    DEAD: "#DC3545"
} as const;

const MONTHS = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน"];

export default function HealthStatusChart() {
    const [data, setData] = useState<{ month: string; HEALTHY: number; SICK: number; INJURED: number; DEAD: number }[]>([]);

    useEffect(() => {
        fetch("/api/veterian/treatment")
            .then((res) => res.json())
            .then((treatments: Treatment[]) => {
                // สร้างโครงสร้างข้อมูลเริ่มต้น
                const initialData = MONTHS.map((month) => ({
                    month,
                    HEALTHY: 0,
                    SICK: 0,
                    INJURED: 0,
                    DEAD: 0
                }));

                // นับจำนวนวัวตามสถานะสุขภาพในแต่ละเดือน
                treatments.forEach((treatment) => {
                    const treatmentDate = new Date(treatment.date);
                    const monthIndex = treatmentDate.getMonth(); // 0-11
                    const healthStatus = treatment.status

                    if (monthIndex >= 0 && monthIndex < 6 && healthStatus && healthStatus in STATUS_COLORS) {
                        // ใช้ Type Assertion เพื่อให้ TypeScript ยอมรับ
                        initialData[monthIndex][healthStatus as keyof typeof STATUS_COLORS] += 1;
                    }
                });

                setData(initialData);
            })
            .catch((error) => {
                console.error("Error fetching treatment data:", error);
            });
    }, []);

    return (
        <div className="w-full h-96 flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4">สถานะสุขภาพวัว (มกราคม - มิถุนายน)</h2>
            <ResponsiveContainer width="80%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="HEALTHY" fill={STATUS_COLORS.HEALTHY} name="สุขภาพดี" />
                    <Bar dataKey="SICK" fill={STATUS_COLORS.SICK} name="ป่วย" />
                    <Bar dataKey="INJURED" fill={STATUS_COLORS.INJURED} name="บาดเจ็บ" />
                    <Bar dataKey="DEAD" fill={STATUS_COLORS.DEAD} name="เสียชีวิต" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
