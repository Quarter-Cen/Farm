"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AddTreatmentPage() {
    const { id } = useParams(); // ดึง id จาก URL
    const router = useRouter(); // ใช้ push กลับหน้าหลัก
    const [veterianId, setVeterianId] = useState(null);
    const [formData, setFormData] = useState({
        nameDisease: "",
        cowWeight: "",
        events: "",
        details: "",
        drugName: "",
        status: "",
        notation: "",
        date: "",
        veterianId: null, // ใช้ค่าเริ่มต้นก่อน
        cowId: id, // ใช้ id ที่ได้จาก URL
    });

    useEffect(() => {
        // สมมุติว่า fetch API แล้วได้ response
        fetch("/api/auth/me/rolesId")
            .then((res) => res.json())
            .then((data) => {
                // ค้นหาวัตถุที่ role.name เป็น 'Veterian'
                const veterian = data.find((item: any) => item.role.name === "Veterian");
                if (veterian) {
                    setVeterianId(veterian.id);
                }
            })
            .catch((error) => console.log("Error fetching roles:", error));
    }, []);

    // ใช้ useEffect เพื่ออัพเดต formData เมื่อ veterianId เปลี่ยน
    useEffect(() => {
        if (veterianId) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                veterianId, // อัพเดต veterianId เมื่อมันพร้อม
            }));
        }
    }, [veterianId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, // รองรับ input ทุกประเภท
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ลบ key ที่ว่างออกจาก formData
        const cleanedData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => key.trim() !== "")
        );
        console.log("🚀 Submitting cleaned data:", cleanedData); // เช็คข้อมูลก่อนส่ง
        try {
            const res = await fetch("/api/veterian/treatment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanedData),
            });

            const data = await res.json();
            if (!res.ok) {
                alert(`Error: ${data.error}`);
                return;
            }

            alert("Add treatmentation successfully");
            router.push("/veterian/cow"); // กลับไปหน้าวัว
        } catch (error) {
            console.error("Failed to submit:", error);
            alert("Have problems");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-[450px] rounded-lg shadow-md px-8 py-6 space-y-4"
            >
                {/* หัวข้อ */}
                <h2 className="text-xl font-bold text-center text-gray-700">
                    Cow treatment information ID {id}
                </h2>

                {/* Input Fields */}
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name disease</label>
                        <input
                            type="text" name="nameDisease" value={formData.nameDisease} onChange={handleChange}
                            className="border border-gray-300 w-full p-2 rounded-md focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Weight</label>
                        <input
                            type="text" name="cowWeight" value={formData.cowWeight} onChange={handleChange}
                            className="border border-gray-300 w-full p-2 rounded-md focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Events</label>
                        <input
                            type="text" name="events" value={formData.events} onChange={handleChange}
                            className="border border-gray-300 w-full p-2 rounded-md focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Details</label>
                        <textarea
                            name="details" value={formData.details} onChange={handleChange}
                            className="border border-gray-300 w-full p-2 rounded-md focus:ring-2 focus:ring-green-400 h-20 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Drug name</label>
                        <input
                            type="text" name="drugName" value={formData.drugName} onChange={handleChange}
                            className="border border-gray-300 w-full p-2 rounded-md focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                </div>

                {/* สถานะสุขภาพ */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">HealthStatus</label>
                    <div className="flex gap-4 mt-2">
                        <div className="py-1">
                            <input type="radio" value="HEALTHY" id="HEALTHY" name="status" onChange={handleChange} checked={formData.status === "HEALTHY"} className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#5EC28D] checked:border-[#5EC28D] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                            <label>Healthy</label>
                        </div>
                        <div className="py-1">
                            <input type="radio" value="SICK" id="SICK" name="status" onChange={handleChange} checked={formData.status === "SICK"} className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#F4C95D] checked:border-[#F4C95D] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                            <label>Sick</label>
                        </div>
                        <div className="py-1">
                            <input type="radio" value="INJURED" id="INJURED" name="status" onChange={handleChange} checked={formData.status === "INJURED"} className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#E88F67] checked:border-[#E88F67] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                            <label>Injured</label>
                        </div>
                        <div className="py-1">
                            <input type="radio" value="DEAD" id="DEAD" name="status" onChange={handleChange} checked={formData.status === "DEAD"} className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#6C757D] checked:border-[#6C757D] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                            <label>Dead</label>
                        </div>
                    </div>
                </div>

                {/* หมายเหตุ */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Notation</label>
                    <input
                        type="text" name="notation" value={formData.notation} onChange={handleChange}
                        className="border border-gray-300 w-full p-2 rounded-md focus:ring-2 focus:ring-green-400"
                    />
                </div>

                {/* วันที่บันทึก */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Record date</label>
                    <input
                        type="date" lang="en" inputMode="none" name="date" value={formData.date} onChange={handleChange}
                        className="border border-gray-300 w-full p-2 rounded-md focus:ring-2 focus:ring-green-400"
                    />
                </div>

                {/* ปุ่ม */}
                <div className="text-center mt-6">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition mx-6"
                    >
                        Apply
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/veterian/cow")}
                        className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition mx-6"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
