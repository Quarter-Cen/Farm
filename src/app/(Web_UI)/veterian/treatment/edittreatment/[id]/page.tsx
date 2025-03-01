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
        <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-[#88D64C] w-[450px] rounded-lg shadow-lg px-12 py-8">
                <div className="text-center pb-2">
                    <span className="text-2xl font-bold">ข้อมูลการรักษาวัว ID {id}</span>
                </div>

                {/* ฟอร์มต่างๆ */}
                <div className="py-1">
                    <label>ชื่อโรค</label>
                    <input type="text" name="nameDisease" value={formData.nameDisease} onChange={handleChange} className="border w-full p-1 rounded-md" required />
                </div>
                <div className="py-1">
                    <label>น้ำหนัก</label>
                    <input type="text" name="cowWeight" value={formData.cowWeight} onChange={handleChange} className="border w-full p-1 rounded-md" />
                </div>
                <div className="py-1">
                    <label>เหตุการณ์</label>
                    <input type="text" name="events" value={formData.events} onChange={handleChange} className="border w-full p-1 rounded-md" />
                </div>
                <div className="py-1">
                    <label>รายละเอียดอาการ</label>
                    <input type="text" name="details" value={formData.details} onChange={handleChange} className="border w-full p-1 rounded-md" />
                </div>
                <div className="py-1">
                    <label>ยารักษา</label>
                    <input type="text" name="drugName" value={formData.drugName} onChange={handleChange} className="border w-full p-1 rounded-md" />
                </div>

                {/* สถานะ */}
                <div className="py-1">
                    <input type="radio" value="HEALTHY" id="HEALTHY" name="status" onChange={handleChange} checked={formData.status === "HEALTHY"} className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#28A745] checked:border-[#28A745] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label>HEALTHY</label>
                </div>
                <div className="py-1">
                    <input type="radio" value="SICK" id="SICK" name="status" onChange={handleChange} checked={formData.status === "SICK"} className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#FFC107] checked:border-[#FFC107] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label>SICK</label>
                </div>
                <div className="py-1">
                    <input type="radio" value="INJURED" id="INJURED" name="status" onChange={handleChange} checked={formData.status === "INJURED"} className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#DC3545] checked:border-[#DC3545] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label>INJURED</label>
                </div>
                <div className="py-1">
                    <input type="radio" value="DEAD" id="DEAD" name="status" onChange={handleChange} checked={formData.status === "DEAD"} className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#6C757D] checked:border-[#6C757D] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    <label>DEAD</label>
                </div>

                <div className="py-1">
                    <label>หมายเหตุ</label>
                    <input type="text" name="notation" value={formData.notation} onChange={handleChange} className="border w-full p-1 rounded-md" />
                </div>
                <div className="py-1">
                    <label>วันที่บันทึก</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="border w-full p-1 rounded-md" />
                </div>

                <div className="text-center mt-6">
                    <button type="submit" className="hover:bg-[#70b13f] px-3 py-1 mx-6 rounded-sm">ยืนยัน</button>
                    <button type="button" onClick={() => router.push(`/veterian/cow`)} className="bg-white px-3 py-1 mx-6 rounded-sm text-black hover:bg-[#88D64C]">ยกเลิก</button>
                </div>
            </form>
        </div>
    );
}
