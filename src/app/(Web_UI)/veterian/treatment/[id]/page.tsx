"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Cow {
  id: string;
  name: string;
  gender: string;
  age: number;
  weight: number;
  birthDate: string;
  breed: string;
  healthStatus: string;
}

interface Treatment {
  id: string;
  nameDisease: string;
  events: string;
  details: string;
  date: string;
  drugName: string;
  status: "HEALTHY" | "SICK" | "INJURED" | "DEAD";
  notation: string;
  veterianId: string;
  cowId: string;
  // cow?: Cow;
}

export default function CowDetails() {
  const { id } = useParams();
  const [cow, setCow] = useState<Cow | null>(null);
  const [treatments, setTreatments] = useState<Treatment[]>([]);

  useEffect(() => {
    fetch(`/api/admin/cow-info/${id}`)
      .then((res) => res.json())
      .then((data: Cow) => setCow(data))
      .catch((error) => console.error("Error fetching treatments:", error));
  }, []);

  useEffect(() => {
    if (!id) return;
    fetch("/api/veterian/treatment")
      .then((res) => res.json())
      .then((data: Treatment[]) => {
        const cowTreatment = data.filter((treatment) => treatment.cowId === id);
        setTreatments(cowTreatment);
        // if (cowTreatment?.cow) {
        //     setTreatments(data.filter((t) => t.cowId === id));
        // }

        // หาสถานะล่าสุดจาก treatment ล่าสุด
        if (cowTreatment.length > 0) {
          const latestTreatment = cowTreatment.reduce((latest, current) =>
            new Date(current.date) > new Date(latest.date) ? current : latest
          );
          console.log("latestTreatment: ", latestTreatment.status);
          setCow((prevCow) =>
            prevCow
              ? { ...prevCow, healthStatus: latestTreatment.status }
              : null
          );
        }
      })
      .catch((error) => console.log("Error fetching treatments:", error));
  }, [id]);

  if (!cow)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  const deleteTreatment = async (treatmentId: string) => {
    try {
      const response = await fetch(`/api/veterian/treatment/${treatmentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Failed to delete treatment");
        return;
      }

      setTreatments((prevTreatments) =>
        prevTreatments.filter((treatment) => treatment.id !== treatmentId)
      );
      alert("Treatment deleted successfully");
    } catch (error) {
      console.error("Error deleting treatment:", error);
    }
  };

  if (!cow) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No cow information and treatment
      </p>
    );
  }

  return (
    <div className="overflow-auto h-[97vh]">
      <div className="flex flex-col items-center justify-center mt-10 mx-auto ">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          🐄 Cow details and treatment
        </h1>

        {/* 🐄 ข้อมูลวัว */}
        <div className="border border-gray-200 p-6 rounded-lg shadow-md bg-white w-full max-w-3xl mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            🐄 Cow information
          </h2>
          <div className="grid grid-cols-2 gap-y-3 text-gray-700 text-lg tracking-wide">
            <p>
              <strong>Name:</strong> {cow.name}
            </p>
            <p>
              <strong>Gender:</strong> {cow.gender}
            </p>
            <p>
              <strong>Age:</strong> {cow.age} year old
            </p>
            <p>
              <strong>Weight:</strong> {cow.weight} Kg.
            </p>
            <p>
              <strong>Birthdate:</strong>{" "}
              {new Date(cow.birthDate).toLocaleDateString("en-EN")}
            </p>
            <p>
              <strong>Breed:</strong> {cow.breed}
            </p>
            <p className="col-span-2">
              <strong>HealthStatus:</strong>
              <span
                className={`px-1 ${
                  cow.healthStatus === "HEALTHY"
                    ? "text-[#5EC28D]"
                    : cow.healthStatus === "SICK"
                    ? "text-[#F4C95D]"
                    : cow.healthStatus === "INJURED"
                    ? "text-[#E88F67]"
                    : "text-[#6C757D]"
                }`}
              >
                {/* {cow.healthStatus} */}
                {cow.healthStatus === "HEALTHY"
                  ? "HEALTHY"
                  : cow.healthStatus === "SICK"
                  ? "SICK"
                  : cow.healthStatus === "INJURED"
                  ? "INJURED"
                  : "DEAD"}
              </span>
            </p>
          </div>
        </div>

        {/* 💉 ข้อมูลการรักษา */}
        <div className="border p-6 rounded-lg shadow-lg bg-white w-full">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            💉 Treatmentation
          </h2>
          {treatments.length === 0 ? (
            <p className="text-center py-4 text-gray-500">No treatmentation</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="px-4 py-2 border">ID</th>
                    <th className="px-4 py-2 border">Date</th>
                    <th className="px-4 py-2 border">Name disease</th>
                    <th className="px-4 py-2 border">Events</th>
                    <th className="px-4 py-2 border">Details</th>
                    <th className="px-4 py-2 border">Drug name</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Notation</th>
                    <th className="px-4 py-2 border">Oparetion</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-50 text-gray-700">
                  {treatments.length > 0 ? (
                    treatments.map((treatment, index) => (
                      <tr key={treatment.id} className="hover:bg-gray-100">
                        <td className="px-4 py-2 text-center border">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 text-center border">
                          {new Date(treatment.date).toLocaleDateString("th-TH")}
                        </td>
                        <td className="px-4 py-2 text-center border">
                          {treatment.nameDisease}
                        </td>
                        <td className="px-4 py-2 text-center border">
                          {treatment.events}
                        </td>
                        <td className="px-4 py-2 text-center border">
                          {treatment.details}
                        </td>
                        <td className="px-4 py-2 text-center border">
                          {treatment.drugName}
                        </td>
                        <td className="px-4 py-2 text-center border">
                          <span
                            className={`px-3 py-1 rounded-full text-white text-sm ${
                              treatment.status === "HEALTHY"
                                ? "bg-[#5EC28D]"
                                : treatment.status === "SICK"
                                ? "bg-[#F4C95D]"
                                : treatment.status === "INJURED"
                                ? "bg-[#E88F67]"
                                : "bg-[#6C757D]"
                            }`}
                          >
                            {treatment.status === "HEALTHY"
                              ? "HEALTHY"
                              : treatment.status === "SICK"
                              ? "SICK"
                              : treatment.status === "INJURED"
                              ? "INJURED"
                              : "DEAD"}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-center border">
                          {treatment.notation}
                        </td>
                        <td className="px-4 py-2 text-center border">
                          <div className="flex justify-center gap-2">
                            <Link
                              href={`/veterian/treatment/edittreatment/${treatment.id}`}
                            >
                              <button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-md">
                                Edit
                              </button>
                            </Link>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                              onClick={() => deleteTreatment(treatment.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={9}
                        className="text-center py-4 text-gray-500"
                      >
                        No treatmentation data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ปุ่มกลับ */}
        <Link href="/veterian/cow">
          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition duration-300">
            🔙 Back to cow page
          </button>
        </Link>
      </div>
    </div>
  );
}
