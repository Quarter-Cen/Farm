"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AddTreatmentPage() {
    const { id } = useParams(); // ดึง id จาก URL
    const router = useRouter(); // ใช้ push กลับหน้าหลัก

    const [formData, setFormData] = useState({
        nameDisease: "",
        cowWeight: "",
        events: "",
        details: "",
        drugName: "",
        status: "",
        notation: "",
        date: "",
        veterianId: "1", // สมมุติ ID ของสัตวแพทย์
        cowId: id, // ใช้ id ที่ได้จาก URL
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

            alert("บันทึกข้อมูลสำเร็จ");
            router.push("/veterian/cow"); // กลับไปหน้าวัว
        } catch (error) {
            console.error("Failed to submit:", error);
            alert("เกิดข้อผิดพลาด");
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
                <div className='py-1'>
                    <label>น้ำหนัก</label>
                    <input type="text" name='cowWeight' value={formData.cowWeight} onChange={handleChange} className='border w-full p-1 rounded-md' />
                </div>
                <div className='py-1'>
                    <label>เหตุการณ์</label>
                    <input type="text" name='events' value={formData.events} onChange={handleChange} className='border w-full p-1 rounded-md' />
                </div>
                <div className='py-1'>
                    <label>รายละเอียดอาการ</label>
                    <input type="text" name='details' value={formData.details} onChange={handleChange} className='border w-full p-1 rounded-md' />
                </div>
                <div className='py-1'>
                    <label>ยารักษา</label>
                    <input type="text" name='drugName' value={formData.drugName} onChange={handleChange} className='border w-full p-1 rounded-md' />
                </div>
                <div className='py-1'>
                    <input type="radio" value="รักษาแล้ว" id='รักษาแล้ว' name="status" onChange={handleChange} checked={formData.status === "รักษาแล้ว"} className='appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#28A745] checked:border-[#28A745] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' />
                    <label>รักษาแล้ว</label>
                </div>
                <div className='py-1'>
                    <input type="radio" value="กำลังรักษา" id='กำลังรักษา' name="status" onChange={handleChange} checked={formData.status === "กำลังรักษา"} className='appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#FD7E14] checked:border-[#FD7E14] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' />
                    <label>กำลังรักษา</label>
                </div>
                <div className='py-1'>
                    <input type="radio" value="รอดำเนินการ" id='รอดำเนินการ' name="status" onChange={handleChange} checked={formData.status === "รอดำเนินการ"} className='appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#FFC107] checked:border-[#FFC107] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' />
                    <label>รอดำเนินการ</label>
                </div>
                <div className='py-1'>
                    <label>หมายเหตุ</label>
                    <input type="text" name='notation' value={formData.notation} onChange={handleChange} className='border w-full p-1 rounded-md' />
                </div>
                <div className='py-1'>
                    <label>วันที่บันทึก</label>
                    <input type="date" name='date' value={formData.date} onChange={handleChange} className='border w-full p-1 rounded-md' />
                </div>


                {/* ฟอร์มอื่นๆ */}
                <div className="text-center mt-6">
                    <button type="submit" className="hover:bg-[#70b13f] px-3 py-1 mx-6 rounded-sm">ยืนยัน</button>
                    <button type="button" onClick={() => router.push("/veterian/cow")} className="bg-white px-3 py-1 mx-6 rounded-sm text-black hover:bg-[#88D64C]">ยกเลิก</button>
                </div>
            </form>
        </div>
    );
}
