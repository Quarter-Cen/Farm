"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";

type Role = "Admin" | "Veterian" | "Supervisor" | "DairyWorker";

const roleLinks: Record<Role, { href: string; label: string; icon: string }[]> =
  {
    Admin: [
      { href: "/admin/dashboard", label: "Dashboard", icon: "ri-pie-chart-2-fill" },
      { href: "/admin/cow", label: "Cow", icon: "ri-bar-chart-line" },
      { href: "/admin/resorce", label: "Resorce", icon: "ri-database-2-fill" },
      { href: "/admin/userList", label: "Users", icon: "ri-group-line" },
    ],
    Veterian: [
      { href: "/veterian/cow", label: "Cow", icon: "ri-bar-chart-line" },
      { href: "/veterian/treatment", label: "Treatmentation", icon: "ri-capsule-fill" },
    ],
    Supervisor: [
      { href: "/supervisor/productReport", label: "Product Report", icon: "ri-file-list-3-fill" },
    ],
    DairyWorker: [
      { href: "/dairyworker/resorce", label: "Resorce", icon: "ri-database-2-fill" },
      { href: "/dairyworker/useResorce", label: "Resorce Usage", icon: "ri-line-chart-line" },
    ],
  };

export default function Sidebar() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [name, setName] = useState("");
  const pathname = usePathname(); 
  const router = useRouter(); // ✅ ใช้ router สำหรับ navigation

  const handleProfile = () => {
    router.push("/profile"); // ✅ เปลี่ยนเส้นทางไปหน้าโปรไฟล์
  };

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", { method: "POST" });

    if (response.ok) {
      console.log("Logout successful");
      router.push("/login"); // ✅ ใช้ router.push แทน redirect()
    } else {
      console.error("Failed to logout");
    }
  };

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch("/api/auth/me/roles");
        const name_response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          const res_name = await name_response.json();
          setName(res_name.fullname);
          setRoles(data.map((role: any) => role.name as Role));
        }
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    fetchRole();
  }, []);

  if (roles.length === 0) {
    return (
      <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-64 mt-5 text-[#151D48] h-screen p-4 overflow-y-scroll">
      <h2 className="text-2xl font-bold mb-6">
        <i className="ri-seedling-line border rounded-lg p-2 mr-4 ml-3 text-white bg-[#88D64C]"></i>
        {name}
      </h2>

      <ul>
        {roles.map((role) => {
          if (!roleLinks[role]) return null;

          return (
            <div key={role}>
              <h3 className="font-bold mb-4 mt-4">{role}</h3>
              {roleLinks[role].map(({ href, label, icon }) => {
                const isActive = pathname.match(new RegExp(`^${href}(/|$)`));

                return (
                  <li key={href} className="text-[#737791] mb-2">
                    <Link
                      href={href}
                      className={`block px-4 py-2 rounded-xl transition ${
                        isActive
                          ? "bg-[#88D64C] text-white "
                          : "hover:bg-[#bdbdbd]"
                      }`}
                    >
                      <i className={`${icon} mr-2`}></i>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </div>
          );
        })}

        <li className="mb-2">
          <button
            onClick={handleProfile}
            className="block font-bold mt-4 pl-1 py-2 hover:bg-[#bdbdbd] rounded w-full text-left"
          >
            Profile
          </button>
        </li>
        <li className="mb-2">
          <button
            onClick={handleLogout}
            className="block font-bold mt-4 pl-1 py-2 hover:bg-[#bdbdbd] rounded w-full text-left"
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}
