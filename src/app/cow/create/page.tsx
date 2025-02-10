"use client"
import { useState } from "react";
import Link from "next/link";
import SideBar from "@/components/SideBar"
function addNewCow() {
    const [customInputVisible, setCustomInputVisible] = useState(false);
    return (
        <div className="mt-20 flex justify-center">
            <SideBar />
            <div className="bg-[#88D64C] ml-64 max-w-xl">
                <h1 className="text-2xl text-center mb-2">ข้อมูลทั่วไป</h1>
                <form className="mx-20 grid grid-cols-4">
                    <div>
                        <label htmlFor="ชื่อโค">ชื่อโค</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-1/2"
                        />
                    </div>
                    <div>
                        <label htmlFor="gender">เพศ</label>
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
                        <label htmlFor="ชื่อโค">อายุ</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-1/2"
                        />
                    </div>
                    <div>
                        <label htmlFor="ชื่อโค">น้ำหนัก</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="ชื่อโค">วันเกิด</label>
                        <input
                            type="date"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div>
                        <label htmlFor="ชื่อโค">สายพันธ์ุ</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div>
                        <label htmlFor="ชื่อโค">สถานะสุขภาพ</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div>
                        <label htmlFor="ชื่อโค">วันที่บันทึก</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div>
                        <label htmlFor="name">ชื่อ-นามสกุลผู้รับผิดชอบ</label>
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
                    <div className="flex">
                        <div>
                            <Link
                                href="">
                                ยืนยัน
                            </Link>
                        </div>
                        <div>
                            <Link
                                href="/cowDetail">
                                ยกเลิก
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default addNewCow