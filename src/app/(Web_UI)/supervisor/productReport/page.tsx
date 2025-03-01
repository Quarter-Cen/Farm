"use client";

import { useState, useEffect } from "react";

const ProductReport = () => {
  const [zone, setZone] = useState<string[]>([]);
  const [milkDate, setMilkDate] = useState("");
  const [milkProduced, setMilkProduced] = useState("");
  const [supervisorId, setSupervisorId] = useState(""); 
  const [isVisible, setIsVisible] = useState(true);

  // Handle zone change (for checkboxes)
  const handleZoneChange = (selectedZone: string) => {
    setZone((prev) =>
      prev.includes(selectedZone)
        ? prev.filter((z) => z !== selectedZone)
        : [...prev, selectedZone]
    );
  };

  useEffect(() => {
    // Fetch roles and set supervisorId
    fetch("/api/auth/me/rolesId")
        .then((res) => res.json())
        .then((data) => {
            // Find the Supervisor role from the response
            const supervisor = data.find((item: any) => item.role.name === "Supervisor");
            if (supervisor) {
                setSupervisorId(supervisor.id);
            }
        })
        .catch((error) => console.log("Error fetching roles:", error));
  }, []); 

  // Ensure the supervisorId is available for form submission
  const isFormComplete =
    zone.length > 0 &&
    milkDate.trim() !== "" &&
    milkProduced.trim() !== "";

  const handleSubmit = async () => {
    if (!isFormComplete) return;
  
    try {
      const response = await fetch("/api/supervisor/productReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cowZone: zone.join(","),
          date: milkDate,
          quantityOfProduct: Number(milkProduced),
          supervisorId: Number(supervisorId),
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error response:", errorData); 
        alert("Error: " + errorData);
        return;
      }
  
      const data = await response.json(); 
      alert("Product Report Created Successfully!");
      // Reset form
      setZone([]);
      setMilkDate("");
      setMilkProduced("");
      setSupervisorId("");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    isVisible && (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-lg w-full p-6 bg-white shadow-lg rounded-lg border border-gray-300 relative">
        

          <h1 className="text-2xl font-bold mb-6 text-center">Product Report</h1>

          {/* Zone Selection */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">1. Zone</label>
            <div className="grid grid-cols-2 gap-2">
              {["A", "B", "C", "D"].map((z) => (
                <label key={z} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={z}
                    checked={zone.includes(z)}
                    onChange={() => handleZoneChange(z)}
                    className="w-4 h-4"
                  />
                  {z}
                </label>
              ))}
            </div>
          </div>

          {/* Milk Production Date */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">2. Milk Production Date</label>
            <input
              type="date"
              value={milkDate}
              onChange={(e) => setMilkDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
            />
          </div>

          {/* Milk Produced */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">3. Milk Produced (liters)</label>
            <input
              type="number"
              placeholder="Enter milk produced (liters)"
              value={milkProduced}
              onChange={(e) => setMilkProduced(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSubmit}
            className={`w-full text-white py-2 rounded-lg transition ${
              isFormComplete
                ? "bg-[#88D64C] hover:bg-[#76C03A]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!isFormComplete}
          >
            Save
          </button>
        </div>
      </div>
    )
  );
};

export default ProductReport;
