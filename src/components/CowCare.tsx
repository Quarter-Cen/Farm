"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Treatment {
    date: string;
    status: "HEALTHY" | "SICK" | "INJURED" | "DEAD";
}

const STATUS_COLORS = {
    HEALTHY: "#5EC28D",
    SICK: "#F4C95D",
    INJURED: "#E88F67",
    DEAD: "#6C757D"
} as const;

const MONTHS = ["January", "Febuary", "March", "April", "May", "June"];

export default function HealthStatusChart() {
    const [data, setData] = useState<{ month: string; HEALTHY: number; SICK: number; INJURED: number; DEAD: number }[]>([]);

    useEffect(() => {
        fetch("/api/veterian/treatment")
            .then((res) => res.json())
            .then((treatments: Treatment[]) => {
                const initialData = MONTHS.map((month) => ({
                    month,
                    HEALTHY: 0,
                    SICK: 0,
                    INJURED: 0,
                    DEAD: 0
                }));

                treatments.forEach((treatment) => {
                    const treatmentDate = new Date(treatment.date);
                    const monthIndex = treatmentDate.getMonth(); // 0-11
                    const healthStatus = treatment.status;

                    if (monthIndex >= 0 && monthIndex < 6 && healthStatus in STATUS_COLORS) {
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
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
                    Cow Health Status (January - June)
                </h2>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="2 2" stroke="#EAEAEA" />
                        <XAxis dataKey="month" tick={{ fill: "#666", fontSize: 12 }} />
                        <YAxis tick={{ fill: "#666", fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: "#FFF", borderRadius: "8px", border: "none", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }} />
                        <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                        <Bar dataKey="HEALTHY" fill={STATUS_COLORS.HEALTHY} name="HEALTHY" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="SICK" fill={STATUS_COLORS.SICK} name="SICK" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="INJURED" fill={STATUS_COLORS.INJURED} name="INJURED" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="DEAD" fill={STATUS_COLORS.DEAD} name="DEAD" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}