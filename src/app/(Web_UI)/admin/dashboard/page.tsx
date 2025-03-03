"use client";
import CowCare from "@/components/CowCare";
import ResorceCon from "@/components/ResorceCon";
import ZoneRace from "@/components/ZoneRace";
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
        <div className="col-span-2">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
            <div className="bg-white p-6 rounded-2xl shadow-md h-[300px] grid">
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-[#bdffd4] text-zinc-800 rounded-lg shadow h-full grid grid-rows-3">
                  <i className="ri-group-line bg-[#8eeeb0] rounded-full text-[26px] p-4 w-1/3"></i>
                  <p className="text-2xl font-bold mt-8">{users.length}</p>
                  <h2 className="text-xl font-semibold mt-4">Total Users</h2>
                </div>
                <div className="p-4 bg-[#dec0ff] text-zinc-800 rounded-lg shadow grid grid-rows-3">
                  <i className="ri-group-line bg-[#cca0fc] rounded-full text-[26px] p-4 w-1/3"></i>
                  <p className="text-2xl font-bold mt-8">{cows.length}</p>
                  <h2 className="text-xl font-semibold mt-4">Total Cows</h2>
                </div>
                <div className="p-4 bg-[#ffbec4] text-zinc-800 rounded-lg shadow grid grid-rows-3">
                  <i className="ri-group-line bg-[#fc9da7] rounded-full text-[26px] p-4 w-1/3 "></i>
                  <p className="text-2xl font-bold mt-8">{prods.length}</p>
                  <h2 className="text-xl font-semibold mt-4">Total Products</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className="p-6">
            <div>
              <ResorceCon />
            </div>
          </div>
        </div>
        <div className=" col-span-2">
          <ZoneRace />
        </div>
        <div className="p-6">
          <CowCare />
        </div>
      </div>
    </>
  );
}
