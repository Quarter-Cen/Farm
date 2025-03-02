"use client";

import { useState, useEffect } from "react";

export default function AddCowPage() {
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
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await fetch("/api/admin/cow-info", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    age: parseInt(formData.age),
                    weight: parseFloat(formData.weight),
                    veterianId: formData.veterianId ? parseInt(formData.veterianId) : undefined,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("Cow added successfully!");
                setFormData({
                    name: "",
                    gender: "male",
                    age: "",
                    birthDate: "",
                    breed: "",
                    healthStatus: "HEALTHY",
                    weight: "",
                    veterianId: "",
                });
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setMessage("Failed to add cow");
        }
    };

    // เช็คว่าเมื่อข้อมูลครบแล้วปุ่มจะเปลี่ยนสี
    useEffect(() => {
        const isValid = Object.values(formData).every(value => value !== "" && value !== undefined);
        setIsFormValid(isValid);
    }, [formData]);

    const handleCancel = () => {
        window.location.href = "http://localhost:3000/admin/cow";
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg">
            <h2 className="text-2xl text-center font-bold mb-4">Add Cow</h2>
            {message && <p className="mb-4 text-red-500">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="border p-2 w-full" />
                <select name="gender" value={formData.gender} onChange={handleChange} required className="border p-2 w-full">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required className="border p-2 w-full" />
                <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required className="border p-2 w-full" />
                <input type="text" name="breed" value={formData.breed} onChange={handleChange} placeholder="Breed" required className="border p-2 w-full" />
                <select name="healthStatus" value={formData.healthStatus} onChange={handleChange} required className="border p-2 w-full">
                    <option value="HEALTHY">Healthy</option>
                    <option value="SICK">Sick</option>
                    <option value="INJURED">Injured</option>
                    <option value="DEAD">Dead</option>
                </select>
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight" required className="border p-2 w-full" />
                <input type="number" name="veterianId" value={formData.veterianId} onChange={handleChange} placeholder="Veterinarian ID (optional)" className="border p-2 w-full" />
                
                <div className="flex space-x-4 mt-4">
                    <button
                        onClick={handleCancel}
                        className="w-full p-2 rounded-lg bg-[#CECECE] text-white"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className={`w-full p-2 rounded-lg ${isFormValid ? 'bg-[#74B845]' : 'bg-[#CECECE]'} text-white transition duration-300`}
                        disabled={!isFormValid}
                    >
                        Add Cow
                    </button>

                </div>
            </form>
        </div>
    );
}
