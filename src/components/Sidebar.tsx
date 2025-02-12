"use client"

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const role = pathname.split("/")[1].toUpperCase();

  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
        method: 'POST',
    });

    if (response.ok) {
        console.log('Logout successful');
        redirect('/login')
    } else {
        console.error('Failed to logout');
    }
};
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">{role} Dashboard</h2>
      <ul>
        <li className="mb-2">
          <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-700 rounded">
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/dashboard/users" className="block px-4 py-2 hover:bg-gray-700 rounded">
            Users
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/dashboard/settings" className="block px-4 py-2 hover:bg-gray-700 rounded">
            Settings
          </Link>
        </li>
        <li className="mb-2">
          <button
            onClick={handleLogout}
            className="block px-4 py-2 hover:bg-gray-700 rounded w-full text-left"
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
}
