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
        <div className="w-full max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl h-screen overflow-auto">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Treatmentation Data</h2>

            {loading ? (
                <p className="text-center text-gray-500 text-lg">Loading...</p>
            ) : treatmentData.length === 0 ? (
                <div className="text-center">
                    <span className="text-center text-gray-600 text-lg font-semibold">No treatmentation data</span>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-gray-600 text-center border-b">
                                <th className="px-5 py-3">Date</th>
                                <th className="px-5 py-3">Cow name</th>
                                <th className="px-5 py-3">Name of disease</th>
                                <th className="px-5 py-3">Events</th>
                                <th className="px-5 py-3">Details</th>
                                <th className="px-5 py-3">Drug name</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Notaion</th>
                            </tr>
                        </thead>
                        <tbody className="text-center text-gray-600 border-b">
                            {treatmentData.map((treatment) => (
                                <tr key={treatment.id} className="border-b hover:bg-gray-100 transition">
                                    <td className="px-5 py-3 border-b">{new Date(treatment.date).toLocaleDateString("en-EN")}</td>
                                    <td className="px-5 py-3 border-b">{treatment.cow?.name || "ไม่ระบุ"}</td>
                                    <td className="px-5 py-3 border-b">{treatment.nameDisease}</td>
                                    <td className="px-5 py-3 border-b">{treatment.events}</td>
                                    <td className="px-5 py-3 border-b">{treatment.details}</td>
                                    <td className="px-5 py-3 border-b">{treatment.drugName}</td>
                                    <td className="px-5 py-3 border-b">
                                        <span
                                            className={`px-4 py-1 text-sm font-medium rounded-full text-white bg-opacity-90 whitespace-nowrap
                                                ${treatment.status === "HEALTHY"
                                                    ? "bg-[#5EC28D]"
                                                    : treatment.status === "SICK"
                                                        ? "bg-[#F4C95D]"
                                                        : treatment.status === "INJURED"
                                                            ? "bg-[#E88F67]"
                                                            : "bg-[#6C757D]"
                                                }`}
                                        >
                                            {treatment.status === "HEALTHY"
                                                ? "Healthy"
                                                : treatment.status === "SICK"
                                                    ? "Sick"
                                                    : treatment.status === "INJURED"
                                                        ? "Injured"
                                                        : "Dead"
                                            }
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 border-b">{treatment.notation || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
