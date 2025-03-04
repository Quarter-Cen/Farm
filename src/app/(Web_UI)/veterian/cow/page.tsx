"use client";
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
                } else if (veterian) {
                    setIsVeterian(true);
                    setVetId(veterian.id);
                }
            })
            .catch((error) => console.log("Error fetching roles:", error));
    }, []);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const endpoint = isAdmin ? "/api/admin/cow-info" : `/api/veterian/assigned-cows?vetId=${vetId}`;
                const res = await fetch(endpoint);
                const data = await res.json();
                setCowData(data);
            } catch (error) {
                console.error("Error fetching cow info:", error);
            } finally {
                setLoading(false);
            }
        };

        if (isAdmin || (isVeterian && vetId !== null)) {
            fetchData();
        }
    }, [isAdmin, isVeterian, vetId]);

    return (
        <div className="w-full max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Cow Data For Responsible person</h2>

            {loading ? (
                <p className="text-center text-gray-500 text-lg">Loading...</p>
            ) : cowData.length === 0 ? (
                <p className="text-center text-gray-600 text-lg font-semibold">No cow information</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-gray-600 text-center border-b">
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Gender</th>
                                <th className="px-4 py-3">Age</th>
                                <th className="px-4 py-3">Breed</th>
                                <th className="px-4 py-3">HealthStatus</th>
                                <th className="px-4 py-3 text-center">Operation</th>
                            </tr>
                        </thead>
                        <tbody className="text-center text-gray-600 border-b">
                            {cowData.map((cow, index) => (
                                <tr key={cow.id} className="border-b hover:bg-gray-100 transition">
                                    <td className="px-4 py-3 text-gray-600">{index + 1}</td>
                                    <td className="px-4 py-3">{cow.name}</td>
                                    <td className="px-4 py-3">{cow.gender}</td>
                                    <td className="px-4 py-3">{cow.age} year old</td>
                                    <td className="px-4 py-3">{cow.breed}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-4 py-1 rounded-full text-white text-sm 
                                        ${cow.healthStatus === "HEALTHY"
                                                ? "bg-[#5EC28D]"
                                                : cow.healthStatus === "SICK"
                                                    ? "bg-[#F4C95D]"
                                                    : cow.healthStatus === "INJURED"
                                                        ? "bg-[#E88F67]"
                                                        : "bg-[#6C757D]"
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
                                    <td className="px-4 py-3 text-center flex items-center justify-center gap-2">
                                        <Link href={`/veterian/treatment/addtreatment/${cow.id}`}>
                                            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition">
                                                <span>Add</span>
                                            </button>
                                        </Link>
                                        <Link href={`/veterian/treatment/${cow.id}`}>
                                            <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition">
                                                <span>See More</span>
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
