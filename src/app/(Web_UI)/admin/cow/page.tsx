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
  const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับโหลดข้อมูล

  useEffect(() => {
    fetch("/api/auth/me/rolesId")
      .then((res) => res.json())
      .then((data) => {
        const admin = data.find((item: any) => item.role.name === "Admin");
        const veterian = data.find(
          (item: any) => item.role.name === "Veterian"
        );

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
    // Start loading
    setLoading(true);

    if (isAdmin) {
      fetch("/api/admin/cow-info")
        .then((res) => res.json())
        .then((data: Cow[]) => {
          setCowData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching cow info:", error);
          setLoading(false);
        });
    } else if (isVeterian && vetId !== null) {
      fetch(`/api/veterian/assigned-cows?vetId=${vetId}`)
        .then((res) => res.json())
        .then((data: Cow[]) => {
          console.log(data);
          setCowData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching assigned cows:", error);
          setLoading(false);
        });
    }
  }, [isAdmin, isVeterian, vetId]);

  // Log cowData length after fetching and state update
  useEffect(() => {
    console.log("cc", cowData.length);
  }, [cowData]);

  return (
    <div className="flex-col">
      <div className="flex justify-between p-4">
        <h1>Cow Information</h1>
        <Link href={`/admin/resorce/add`}>
          <button className="bg-[#88D64C] hover:bg-[#76b942] px-3 py-1 rounded-md">
            เพิ่มข้อมูล
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-center ml-[2%]">
        {loading ? (
          <p className="text-center text-gray-500 text-lg">
            กำลังโหลดข้อมูล...
          </p>
        ) : cowData.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 text-lg font-semibold">
              ไม่มีข้อมูลวัว
            </p>
            <Link href="/admin/add-cow">
              <button className="mt-3 bg-[#4c83d6] hover:bg-[#37609c] px-4 py-2 rounded-md text-white">
                เพิ่มข้อมูลวัว
              </button>
            </Link>
          </div>
        ) : (
          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-[#DBDBDB]">
                <th className="px-14 py-2 border text-[#8A8A8A]">ลำดับ</th>
                <th className="px-14 py-2 border text-[#8A8A8A]">ชื่อ</th>
                <th className="px-14 py-2 border text-[#8A8A8A]">เพศ</th>
                <th className="px-14 py-2 border text-[#8A8A8A]">อายุ</th>
                <th className="px-14 py-2 border text-[#8A8A8A]">สายพันธ์ุ</th>
                <th className="px-14 py-2 border text-[#8A8A8A]">
                  สถานะสุขภาพ
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#F4F4F4]">
              {cowData.map((cow, index) => (
                <tr key={cow.id}>
                  <td className="px-12 py-2 text-center border">{index + 1}</td>
                  <td className="px-12 py-2 text-center border">{cow.name}</td>
                  <td className="px-12 py-2 text-center border">
                    {cow.gender}
                  </td>
                  <td className="px-12 py-2 text-center border">{cow.age}</td>
                  <td className="px-12 py-2 text-center border">{cow.breed}</td>
                  <td className="px-12 py-2 text-center border">
                    <span
                      className={`px-5 py-1 rounded-full text-white ${
                        cow.healthStatus === "HEALTHY"
                          ? "bg-[#28A745]"
                          : cow.healthStatus === "SICK"
                          ? "bg-[#FFC107]"
                          : cow.healthStatus === "INJURED"
                          ? "bg-[#DC3545]"
                          : "bg-[#6C757D]"
                      }`}
                    >
                      {cow.healthStatus === "HEALTHY"
                        ? "HEALTHY"
                        : cow.healthStatus === "SICK"
                        ? "SICK"
                        : cow.healthStatus === "INJURED"
                        ? "INJURED"
                        : "DEAD"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
