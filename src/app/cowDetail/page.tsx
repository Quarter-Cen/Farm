'use client'
import SideBar from "@/components/SideBar"
import Link from "next/link"
import { IoIosAdd } from "react-icons/io";
import { Suspense } from "react";

export default function cowDetail() {
  return (
    <div className="flex w-screen min-h-screen justify-center bg-[#e9e9e9] relative">
      <SideBar />
      <Suspense fallback="Loadind...">
      <div className="ml-64 p-4 my-16">
        <table className="table table-zebra">
          <thead className="text-sm text-[#8A8A8A] uppercase bg-[#DBDBDB]">
            <tr className="">
              <th className="py-3 px-6 text-center">Id</th>
              <th className="py-3 px-6 text-center">ชื่อ</th>
              <th className="py-3 px-6 text-center">เพศ</th>
              <th className="py-3 px-6 text-center">อายุ</th>
              <th className="py-3 px-6 text-center">สายพันธ์ุ</th>
              <th className="py-3 px-6 text-center">สถานะสุขภาพ</th>
              <th className="py-3 px-12 text-center">การดำเนินการ</th>
            </tr>
          </thead>
          <tbody className="bg-[#F4F4F4] px-10">
            <tr>
              <td className="py-3 px-6 text-center">1</td>
              <td className="py-3 px-6 text-center">John Doe</td>
              <td className="py-3 px-6 text-center">Male</td>
              <td className="py-3 px-6 text-center">11</td>
              <td className="py-3 px-6 text-center">Thai</td>
              <td className="py-3 px-6 text-center">สุขภาพดี</td>

              <td className="flex justify-center gap-1 py-3">
                <Link href="#" className="bg-green-500 hover:bg-green-600 p-1 rounded-lg">ดูเพิ่มเติม</Link>
                <Link href="#" className="bg-blue-500 hover:bg-blue-600 p-1 rounded-lg">แก้ไข</Link>
                <button className="bg-red-500 hover:bg-red-600 p-1 rounded-lg">ลบ</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="absolute right-64">
        <div className="py-6">
          <Link
            href="/cow/create"
            className="bg-[#88D64C] hover:bg-[#5A9F2E] p-2 w-full rounded-lg flex items-center gap-2"
          >
            <IoIosAdd size={20} />
            เพิ่มโคนมใหม่
          </Link>
        </div>
      </div>
      </Suspense>
    </div>
  )
}
