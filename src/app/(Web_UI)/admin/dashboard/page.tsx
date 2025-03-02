"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [cows, setCows] = useState<any[]>([]);
  const [prods, setProds] = useState<any[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/admin/userList`);

        if (response.ok) {
          const contentType = response.headers.get("Content-Type");

          // ตรวจสอบว่าเป็น JSON
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            setUsers(data);
          } else {
            console.error("Expected JSON but received something else");
          }
        } else {
          console.error("Failed to fetch users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // ใช้ filter ถ้ามีการกรอง

  useEffect(() => {
    const fetchCows = async () => {
      try {
        const response = await fetch(`/api/admin/cow-info`);

        if (response.ok) {
          const contentType = response.headers.get("Content-Type");

          // ตรวจสอบว่าเป็น JSON
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            setCows(data);
          } else {
            console.error("Expected JSON but received something else");
          }
        } else {
          console.error("Failed to fetch users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchCows();
  }, []); // ใช้ filter ถ้ามีการกรอง

  useEffect(() => {
    const fetchProd = async () => {
      try {
        const response = await fetch(`/api/admin/allProdRe`);

        if (response.ok) {
          const contentType = response.headers.get("Content-Type");

          // ตรวจสอบว่าเป็น JSON
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            setProds(data);
          } else {
            console.error("Expected JSON but received something else");
          }
        } else {
          console.error("Failed to fetch users:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchProd();
  }, []); // ใช้ filter ถ้ามีการกรอง

  return (
    <>
      <div className="h-screen grid grid-cols-3 grid-rows-2">
        <div className="bg-blue-50 col-span-2">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-blue-500 text-white rounded-lg shadow">
                <h2 className="text-lg font-semibold">Total Users</h2>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <div className="p-4 bg-green-500 text-white rounded-lg shadow">
                <h2 className="text-lg font-semibold">Total Cows</h2>
                <p className="text-2xl font-bold">{cows.length}</p>
              </div>
              <div className="p-4 bg-red-500 text-white rounded-lg shadow">
                <h2 className="text-lg font-semibold">Product</h2>
                <p className="text-2xl font-bold">{prods.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-red-50 ">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Resorce Consumtion</h1>
            <div>
              
            </div>
          </div>
        </div>
        <div className="bg-red-50 col-span-2">Ho</div>
        <div className="bg-red-50">Ho</div>
      </div>
    </>
  );
}
