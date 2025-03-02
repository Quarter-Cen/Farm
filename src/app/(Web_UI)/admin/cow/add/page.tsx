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
                window.location.href = '/admin/cow';
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            setMessage("Failed to add cow");
        }
    };

    useEffect(() => {
        const isValid = Object.values(formData).every(value => value !== "" && value !== undefined);
        setIsFormValid(isValid);
    }, [formData]);

    const handleCancel = () => {
        window.location.href = "/admin/cow";
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg overflow-y-auto">
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Add Cow</h2>
            {message && <p className="mb-4 text-red-500">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter cow name" required  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]"/>
                </div>

                <div className="flex space-x-2 justify-between">
                    <div className=" w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} required  className="w-full h-10 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Enter cow age" required  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">BirthDate</label>
                    <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Breed</label>
                    <input type="text" name="breed" value={formData.breed} onChange={handleChange} placeholder="Enter cow breed" required  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]" />
                </div>

                <div className="flex space-x-2 justify-between">
                    <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">HealthStatus</label>
                        <select name="healthStatus" value={formData.healthStatus} onChange={handleChange} required  className="w-full h-10 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]">
                            <option value="HEALTHY">Healthy</option>
                            <option value="SICK">Sick</option>
                            <option value="INJURED">Injured</option>
                            <option value="DEAD">Dead</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                        <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="Enter cow weight" required  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]" />
                    </div>
                </div>
               
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">VeterianId</label>
                    <input type="number" name="veterianId" value={formData.veterianId} onChange={handleChange} placeholder="Enter Veterinarian ID (optional)" className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#88D64C]"/>
                    </div>

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
