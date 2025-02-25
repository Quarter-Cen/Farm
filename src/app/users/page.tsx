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
  const [Role, setRole] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EmploymentDuration, setEmploymentDuration] = useState(""); // Years
  const [WorkLocation, setWorkLocation] = useState("");
  const [Salary, setSalary] = useState("");
  const [WorkHour, setWorkHour] = useState(""); // Hours
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create user data object
    const formData = {
      firstName,
      lastName,
      gender,
      phoneNumber,
      address,
      birthdate,
      Role,
      StartDate,
      EmploymentDuration: parseInt(EmploymentDuration),
      WorkLocation,
      Salary: parseFloat(Salary),
      WorkHour: parseInt(WorkHour),
      email,
      password,
    };

    try {
      // Send the data to the backend API (replace with your actual API endpoint)
      const response = await fetch("/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const result = await response.json();
      alert("User created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error creating the user.");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      <div className="max-w-xl w-full p-6 bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit}>
          {/* Profile Picture Section */}
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
                className="text-sm text-white bg-[#88D64C] border-2 border-[#88D64C] px-4 py-2 rounded-lg focus:outline-none block mb-2 w-full"
              >
                Change Picture
              </button>
              <button
                type="button"
                onClick={handlePictureDelete}
                className="text-sm text-[#88D64C] border-2 border-[#88D64C] px-4 py-2 rounded-lg focus:outline-none block w-full"
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

          {/* First Name and Last Name */}
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block font-semibold mb-2">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold mb-2">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
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
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Phone Number</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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

          {/* Role */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Role</label>
            <select
              value={Role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#88D64C]"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="supervisor">Supervisor</option>
              <option value="dairyWorker">DairyWorker</option>
              <option value="veterian">Veterian</option>
            </select>
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Start Date</label>
            <input
              type="date"
              value={StartDate}
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
              onChange={(e) => setEmploymentDuration(e.target.value)}
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
              onChange={(e) => setWorkHour(e.target.value)}
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
            <label className="block font-semibold mb-2">
              Confirm Password
            </label>
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
              onClick={() => router.push("/userList")}
              className="w-1/3 py-2 rounded-lg bg-[#CECECE] text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-1/3 py-2 rounded-lg text-white transition ${
                isFormComplete
                  ? "bg-[#88D64C] hover:bg-[#76BF42]"
                  : "bg-[#CECECE] cursor-not-allowed"
              }`}
              disabled={!isFormComplete}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;
