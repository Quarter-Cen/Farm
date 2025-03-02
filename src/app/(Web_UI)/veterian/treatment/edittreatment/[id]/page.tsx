"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface Treatment {
    id: string;
    nameDisease: string;
    cowWeight: string;
    events: string;
    details: string;
    drugName: string;
    status: string;
    notation: string;
    date: string;
}

export default function EditTreatment() {
    const router = useRouter();
    const { id } = useParams(); // ดึง id จาก URL
    const [formData, setFormData] = useState<Treatment>({
        id: "",
        nameDisease: "",
        cowWeight: "",
        events: "",
        details: "",
        drugName: "",
        status: "",
        notation: "",
        date: "",
    });


    // ดึงข้อมูล treatment by id
    useEffect(() => {
        if (!id) return;
        console.log("Form Data:", formData);
        fetch(`/api/veterian/treatment/${id}`)
            .then((res) => res.json())
            .then((data: Treatment) => {
                setFormData({
                    ...data,
                    date: data.date.split("T")[0], // ปรับรูปแบบวันที่
                });
            })
            .catch((error) => console.error("Error fetching treatment:", error));
    }, [id]);

    // อัปเดตค่าฟอร์ม
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

    };

    // ส่งข้อมูลแก้ไข
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        try {
            const response = await fetch(`/api/veterian/treatment/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update treatment");
            }
            alert("อัปเดตข้อมูลสำเร็จ!");
            router.push("/veterian/cow");
        } catch (error) {
            console.error("Error updating treatment:", error);
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
                    ข้อมูลการรักษาวัว ID {id}
                </h2>

                {/* Input Fields */}
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ชื่อโรค</label>
                        <input
                            type="text" name="nameDisease" value={formData.nameDisease} onChange={handleChange}
                            className="border border-gray-300 w-full p-2 rounded-md focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">น้ำหนัก</label>
                        <input
                            type="text" name="cowWeight" value={formData.cowWeight} onChange={handleChange}
                            className="border border-gray-300 w-full p-2 rounded-md focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">เหตุการณ์</label>
                        <input
                            type="text" name="events" value={formData.events} onChange={handleChange}
                            className="border border-gray-300 w-full p-2 rounded-md focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">รายละเอียดอาการ</label>
                        <input
                            type="text" name="details" value={formData.details} onChange={handleChange}
                            className="border border-gray-300 w-full p-2 rounded-md focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">ยารักษา</label>
                        <input
                            type="text" name="drugName" value={formData.drugName} onChange={handleChange}
                            className="border border-gray-300 w-full p-2 rounded-md focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                </div>

                {/* สถานะสุขภาพ */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">สถานะสุขภาพ</label>
                    <div className="flex gap-4 mt-2">
                        <div className="py-1">
                            <input type="radio" value="HEALTHY" id="HEALTHY" name="status" onChange={handleChange} checked={formData.status === "HEALTHY"} className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#5EC28D] checked:border-[#5EC28D] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                            <label>สุขภาพดี</label>
                        </div>
                        <div className="py-1">
                            <input type="radio" value="SICK" id="SICK" name="status" onChange={handleChange} checked={formData.status === "SICK"} className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white  checked:bg-[#F4C95D] checked:border-[#F4C95D] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                            <label>ป่วย</label>
                        </div>
                        <div className="py-1">
                            <input type="radio" value="INJURED" id="INJURED" name="status" onChange={handleChange} checked={formData.status === "INJURED"} className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#E88F67] checked:border-[#E88F67] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                            <label>ได้รับบาดเจ็บ</label>
                        </div>
                        <div className="py-1">
                            <input type="radio" value="DEAD" id="DEAD" name="status" onChange={handleChange} checked={formData.status === "DEAD"} className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#6C757D] checked:border-[#6C757D] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                            <label>ตาย</label>
                        </div>
                    </div>
                </div>

                {/* หมายเหตุ */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">หมายเหตุ</label>
                    <input
                        type="text" name="notation" value={formData.notation} onChange={handleChange}
                        className="border border-gray-300 w-full p-2 rounded-md focus:ring-2 focus:ring-green-400"
                    />
                </div>

                {/* วันที่บันทึก */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">วันที่บันทึก</label>
                    <input
                        type="date" name="date" value={formData.date} onChange={handleChange}
                        className="border border-gray-300 w-full p-2 rounded-md focus:ring-2 focus:ring-green-400"
                    />
                </div>

                {/* ปุ่ม */}
                <div className="text-center mt-6">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition mx-6"
                    >
                        ยืนยัน
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push(`/veterian/cow`)}
                        className="border border-gray-400 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition mx-6"
                    >
                        ยกเลิก
                    </button>
                </div>
            </form>
        </div>
    );
}
