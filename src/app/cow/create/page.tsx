"use client"
import { useState } from "react";
import Link from "next/link";
import SideBar from "@/components/SideBar"

function addNewCow() {
    const [customInputVisible, setCustomInputVisible] = useState(false);
    return (
        <div className="mt-20 flex justify-center">
            <SideBar />
            <div className="bg-[#88D64C] ml-64 max-w-2xl py-5">
                <h1 className="text-2xl text-center mb-2 text">ข้อมูลทั่วไป</h1>
                <form className="mx-20 grid grid-cols-4">
                    <div className="">
                        <label
                            htmlFor="ชื่อโค"
                            className="grid"
                        >
                            ชื่อโค
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-24"
                        />
                    </div>
                    <div>
                        <label htmlFor="gender" className="grid">เพศ</label>
                        <select
                            name="gender"
                            id="gender"
                            className="border w-1/2"
                        >
                            <option value=""></option>
                            <option value="ชาย">ชาย</option>
                            <option value="หญิง">หญิง</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="ชื่อโค" className="grid">อายุ</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-1/2"
                        />
                    </div>
                    <div>
                        <label htmlFor="ชื่อโค" className="grid">น้ำหนัก</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-1/2"
                        />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="ชื่อโค" className="grid">วันเกิด</label>
                        <input
                            type="date"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div>
                        <label htmlFor="ชื่อโค" className="grid">สายพันธ์ุ</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div>
                        <label htmlFor="ชื่อโค" className="grid">สถานะสุขภาพ</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div>
                        <label htmlFor="ชื่อโค" className="grid">วันที่บันทึก</label>
                        <input
                            type="date"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="grid">ชื่อ-นามสกุลผู้รับผิดชอบ</label>
                        <select
                            name="name"
                            id="name"
                            className="border rounded-md p-2"
                            onChange={(e) => setCustomInputVisible(e.target.value === "other")}
                        >
                            <option value="">-- กรุณาเลือก --</option>
                            <option value="สมชาย ใจดี">สมชาย ใจดี</option>
                            <option value="สมหญิง รักดี">สมหญิง รักดี</option>
                            <option value="other">พิมพ์เอง...</option>
                        </select>
                        {customInputVisible && (
                            <input
                                type="text"
                                id="customName"
                                name="customName"
                                className="border"
                                placeholder="กรอกชื่อเอง"
                            />
                        )}
                    </div>
                    <div className="col-span-2 flex justify-center gap-4 mt-4">
                        <button type="submit" className="hover:bg-green-700 text-white px-6 py-2 rounded-lg">
                            ยืนยัน
                        </button>
                        <Link href="" className="bg-white text-green-600 px-6 py-2 rounded-lg border border-green-600">
                            ยกเลิก
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default addNewCow