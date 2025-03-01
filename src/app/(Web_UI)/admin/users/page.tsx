"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const UserProfileForm = () => {
  const router = useRouter();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [Role, setRole] = useState<string[]>([]); // Change from string to string[]

  const [startDate, setStartDate] = useState("");
  const [EmploymentDuration, setEmploymentDuration] = useState("");
  const [WorkLocation, setWorkLocation] = useState("");
  const [Salary, setSalary] = useState("");
  const [WorkHour, setWorkHour] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handlePictureDelete = () => {
    setProfilePicture(null);
  };

  const handleChangePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const isFormComplete =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "" &&
    password === confirmPassword;

    const handleRoleChange = (e:any) => {
      const { value, checked } = e.target;
      if (checked) {
        setRole((prevRoles) => [...prevRoles, value]); // Add the role
      } else {
        setRole((prevRoles) => prevRoles.filter((role) => role !== value)); // Remove the role
      }
    };
    

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      gender,
      phoneNumber,
      address,
      birthdate,
      Role,
      startDate,
      employmentDuration: parseInt(EmploymentDuration) || 0,
      WorkLocation,
      salary: parseFloat(Salary) || 0,
      workHour: parseInt(WorkHour) || 0,
      email,
      password,
    };

    try {
      const response = await fetch("/api/admin/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorMessage = "Failed to create user"; // ข้อความเริ่มต้น
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          console.error("Error response:", errorData);
          errorMessage = errorData.error || errorMessage;
        }

        throw new Error(errorMessage);
      }

      alert("User created successfully!");
      router.push("/admin/userList");
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.message);
    }
  };

  

  return (
    <div className=" h-screen flex justify-center items-center bg-white overflow-hidden">
      <div className="w-full h-full px-80 py-6 bg-white shadow-lg rounded-lg overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-6">
            <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {profilePicture ? (
                <img
                  src={URL.createObjectURL(profilePicture)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="https://cdn.readawrite.com/articles/11259/11258229/thumbnail/large.gif?1"
                  alt="Default Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="ml-4">
              <button
                type="button"
                onClick={handleChangePictureClick}
                className="text-sm text-white bg-[#88D64C] border-2 border-[#88D64C hover:scale-110 transition-transform duration-200] px-4 py-2 rounded-lg block mb-2 w-full"
              >
                Change Picture
              </button>
              <button
                type="button"
                onClick={handlePictureDelete}
                className="text-sm text-[#88D64C] border-2 border-[#88D64C hover:scale-110 transition-transform duration-200] px-4 py-2 rounded-lg block w-full"
              >
                Delete Picture
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePictureChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Name */}
          <div className="flex space-x-4 justify-between">
            <div className="mb-4 w-1/2">
              <label className="block font-semibold mb-2">First Name</label>
              <input
                type="text"
                value={firstName}
                placeholder="Enter your first name"
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4 w-1/2">
              <label className="block font-semibold mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              maxLength={10}
              pattern="\d{10}"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
            />
          </div>

          {/* Birthdate */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Birthdate</label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
            />
          </div>

          {/* Roles */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Roles</label>
            <div className="flex flex-col">
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value="Admin"
                  checked={Role.includes("Admin")}
                  onChange={(e) => handleRoleChange(e)}
                  className="mr-2"
                />
                Admin
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value="Supervisor"
                  checked={Role.includes("Supervisor")}
                  onChange={(e) => handleRoleChange(e)}
                  className="mr-2"
                />
                Supervisor
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value="DairyWorker"
                  checked={Role.includes("DairyWorker")}
                  onChange={(e) => handleRoleChange(e)}
                  className="mr-2"
                />
                DairyWorker
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value="Veterian"
                  checked={Role.includes("Veterian")}
                  onChange={(e) => handleRoleChange(e)}
                  className="mr-2"
                />
                Veterian
              </label>
            </div>
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
            />
          </div>

          {/* Employment Duration */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Employment Duration (Years)
            </label>
            <input
              type="number"
              placeholder="Enter your employment Duration"
              value={EmploymentDuration}
              onChange={(e) => {
                const newValue = e.target.value;
                if (newValue === "" || /^[1-9]\d*$/.test(newValue)) {
                  setEmploymentDuration(newValue);
                }
              }}
              min="1"
              step="1"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
            />
          </div>

          {/* Work Location */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Work Location</label>
            <input
              type="text"
              placeholder="Enter your work location"
              value={WorkLocation}
              onChange={(e) => setWorkLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
            />
          </div>

          {/* Salary */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Salary</label>
            <input
              type="text"
              placeholder="Enter your salary"
              value={Salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
            />
          </div>

          {/* Work Hour */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Work Hour</label>
            <input
              type="number"
              placeholder="Enter your work hour"
              value={WorkHour}
              onChange={(e) => {
                const newValue = e.target.value;
                if (newValue === "" || /^[1-9]\d*$/.test(newValue)) {
                  setWorkHour(newValue);
                }
              }}
              min="1"
              step="1"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex space-x-2 justify-between">
            <button
              type="button"
              onClick={() => router.push("/admin/userList")}
              className="w-1/3 py-2 rounded-lg bg-[#CECECE] text-white hover:scale-110 transition-transform duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-1/3 py-2 rounded-lg text-white transition ${
                isFormComplete
                  ? "bg-[#88D64C] hover:bg-[#74B845]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!isFormComplete}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
