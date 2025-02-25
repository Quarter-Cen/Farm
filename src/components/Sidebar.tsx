"use client"

import { redirect } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

type Role = "Admin" | "Veterian" | "Supervisor" | "DairyWorker";

const roleLinks: Record<Role, { href: string; label: string }[]> = {
  Admin: [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/cow", label: "Cow" },
    { href: "/admin/cow-care", label: "Cow Care" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/exports", label: "Exports" },
    { href: "/admin/resorce", label: "Resorce" },
  ],
  Veterian: [
    { href: "/veterian/dashboard", label: "Dashboard" },
    { href: "/veterian/cow", label: "Cow" },
    { href: "/veterian/treatment", label: "Treatmentation" },
  ],
  Supervisor: [
    { href: "/supervisor/dashboard", label: "Dashboard" },
    { href: "/supervisor/dashboard/profile", label: "Profile" },
  ],
  DairyWorker: [
    { href: "/dairyworker/dashboard", label: "Dashboard" },
    { href: "/dairyworker/dashboard/profile", label: "Profile" },
  ],
};

export default function Sidebar() {
  const [roles, setRoles] = useState<Role[]>([])
  const [name, setName] = useState('')
  const pathname = usePathname() // ✅ ดึง path ปัจจุบัน

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", { method: "POST" });

    if (response.ok) {
      console.log("Logout successful");
      redirect("/login");
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
          const res_name = await name_response.json()
          setName(res_name.fullname)
          setRoles(data.map((role: any) => role.name as Role));
        }
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    fetchRole();
  }, []);

  if (roles.length === 0) {
    return <div className="w-64 bg-gray-900 text-white min-h-screen p-4">Loading...</div>;
  }

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4 overflow-y-scroll">
      <h2 className="text-xl font-bold mb-6">{name}</h2>

      <ul>
        {roles.map((role) => {
          if (!roleLinks[role]) return null; // ตรวจสอบว่า role นี้มีใน roleLinks หรือไม่

          return (
            <div key={role}>
              <h3 className="font-bold mt-4">{role} Dashboard</h3>
              {roleLinks[role].map(({ href, label }) => {
                const isActive = pathname.match(new RegExp(`^${href}(/|$)`));

                return (
                  <li key={href} className="mb-2 ">
                    <Link
                      href={href}
                      className={`block px-4 py-2 rounded transition ${
                        isActive ? "bg-gray-600 text-white font-bold" : "hover:bg-gray-600"
                      }`}
                    >
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
            onClick={handleLogout}
            className="block px-4 py-2 hover:bg-gray-600 rounded w-full text-left"
          >
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  );
}
