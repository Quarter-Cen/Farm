"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
export default function EditCowPage({ cowId }: { cowId: number }) {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    age: "",
    birthDate: "",
    breed: "",
    healthStatus: "HEALTHY",
    weight: "",
    veterianId: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // ใช้ useEffect เพื่อดึงข้อมูลจาก API
  useEffect(() => {
    const fetchCowData = async () => {
      try {
        const res = await fetch(`/api/admin/cow-info/${id}`);
        const data = await res.json();

        if (res.ok) {
          setFormData({
            name: data.name || "",
            gender: data.gender || "male",
            age: data.age ? data.age.toString() : "",
            birthDate: data.birthDate ? data.birthDate.split("T")[0] : "",
            breed: data.breed || "",
            healthStatus: data.healthStatus || "HEALTHY",
            weight: data.weight ? data.weight.toString() : "",
            veterianId: data.veterianId ? data.veterianId.toString() : "",
          });
          setLoading(false);
        } else {
          setMessage("Failed to fetch cow data");
          setLoading(false);
        }
      } catch (error) {
        setMessage("Error fetching cow data");
        setLoading(false);
      }
    };

    fetchCowData();
  }, [cowId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`/api/admin/cow-info/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
          weight: parseFloat(formData.weight),
          veterianId: formData.veterianId
            ? parseInt(formData.veterianId)
            : undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Cow updated successfully!");
        router.push("/admin/cow");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Failed to update cow");
    }
  };

  // กรณีที่กำลังโหลดข้อมูล
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Cow</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="border p-2 w-full"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          required
          className="border p-2 w-full"
        />
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
          placeholder="Breed"
          required
          className="border p-2 w-full"
        />
        <select
          name="healthStatus"
          value={formData.healthStatus}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        >
          <option value="HEALTHY">Healthy</option>
          <option value="SICK">Sick</option>
          <option value="INJURED">injured</option>
          <option value="DEAD">Dead</option>
        </select>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight"
          required
          className="border p-2 w-full"
        />
        <input
          type="number"
          name="veterianId"
          value={formData.veterianId}
          onChange={handleChange}
          placeholder="Veterinarian ID (optional)"
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg w-full"
        >
          Update Cow
        </button>
      </form>
    </div>
  );
}
