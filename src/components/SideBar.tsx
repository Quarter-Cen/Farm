'use client'
export default function SideBar() {
  return (
    <div className="w-64 h-screen bg-[#73BD3A] text-white font-bold fixed top-0 left-0 shadow-lg">
      <nav className="p-4">
        <ul className="space-y-4">
          <li className="cursor-pointer hover:bg-[#5A9F2E] p-3 rounded-lg">
            ข้อมูลโคนม
          </li>
          <li className="cursor-pointer hover:bg-[#5A9F2E] p-3 rounded-lg">
            ข้อมูลการรักษา
          </li>
          <li className="cursor-pointer hover:bg-[#5A9F2E] p-3 rounded-lg">
            สถิติ
          </li>
          <li className="cursor-pointer hover:bg-red-600 p-3 rounded-lg">
            ออกจากระบบ
          </li>
        </ul>
      </nav>
    </div>
  );
}
