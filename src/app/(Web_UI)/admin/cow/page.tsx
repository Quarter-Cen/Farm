"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Cow {
  id: number;
  name: string;
  gender: string;
  age: number;
  breed: string;
  healthStatus: string;
}

export default function VeterianCowInfo() {
  const [cowData, setCowData] = useState<Cow[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVeterian, setIsVeterian] = useState(false);
  const [vetId, setVetId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me/rolesId")
      .then((res) => res.json())
      .then((data) => {
        const admin = data.find((item: any) => item.role.name === "Admin");
        const veterian = data.find((item: any) => item.role.name === "Veterian");

        if (admin) {
          setIsAdmin(true);
          setIsVeterian(false);
        } else if (veterian) {
          setIsVeterian(true);
          setIsAdmin(false);
          setVetId(veterian.id);
        }
      })
      .catch((error) => console.log("Error fetching roles:", error));
  }, []);

  useEffect(() => {
    setLoading(true);
    if (isAdmin) {
      fetch("/api/admin/cow-info")
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched cowData:", data); // ตรวจสอบค่า
          setCowData(Array.isArray(data) ? data : []); // ตรวจสอบให้แน่ใจว่าเป็น array
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching cow info:", error);
          setLoading(false);
        });
    } else if (isVeterian && vetId !== null) {
      fetch(`/api/veterian/assigned-cows?vetId=${vetId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched assigned cows:", data); // ตรวจสอบค่า
          setCowData(Array.isArray(data) ? data : []); // ตรวจสอบให้แน่ใจว่าเป็น array
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching assigned cows:", error);
          setLoading(false);
        });
    }
  }, [isAdmin, isVeterian, vetId]);
  

  return (
    <div className="flex flex-col p-4 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-2 mb-3">
        <h1 className="text-2xl font-semibold ml-20 text-gray-800">Cow Information</h1>
    

        <Link href={`/admin/cow/add`}>
          <button className="w-28 h-10 text-white mr-20 bg-[#74B845]  hover:scale-105 transition-transform duration-200 rounded-lg text-sm">

            Add cow
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="w-full max-w-5xl mx-auto mt-2">
        {loading ? (
          <p className="text-center text-gray-500 text-sm">กำลังโหลดข้อมูล...</p>
        ) : cowData.length === 0 ? (
          <div className="text-center bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm font-semibold">ไม่มีข้อมูลวัว</p>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Table Header */}
            <div className="grid grid-cols-6 bg-gray-200 text-gray-900 font-medium p-2 rounded-lg">
              <span className="text-center text-sm">Cow ID</span>
              <span className="text-center text-sm">Name</span>
              <span className="text-center text-sm">Gender</span>
              <span className="text-center text-sm">Age</span>
              <span className="text-center text-sm">Breed</span>
              <span className="text-center text-sm">Health Status</span>
            </div>

            {/* Cow Data Rows */}
            {cowData.map((cow, index) => (
              <div
                key={cow.id}
                className="grid grid-cols-6 items-center text-gray-900 bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <span className="text-center text-sm">{index + 1}</span>
                <span className="text-center text-sm">{cow.name}</span>
                <span className="text-center text-sm">{cow.gender}</span>
                <span className="text-center text-sm">{cow.age}</span>
                <span className="text-center text-sm">{cow.breed}</span>
                <span
                  className={`text-center px-3 py-0.5 rounded-full border font-light font-semibold text-xs ${
                    cow.healthStatus === "HEALTHY"
                      ? "text-green-600 border-green-600"
                      : cow.healthStatus === "SICK"
                      ? "text-yellow-600 border-yellow-600"
                      : cow.healthStatus === "INJURED"
                      ? "text-red-600 border-red-600"
                      : "text-gray-600 border-gray-600"
                  }`}
                >
                  {cow.healthStatus}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}