"use client";

import { useState, useRef, useEffect } from "react";
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
  const [EmploymentDuration, setEmploymentDuration] = useState("");
  const [WorkLocation, setWorkLocation] = useState("");
  const [Salary, setSalary] = useState("");
  const [WorkHour, setWorkHour] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // ดึงข้อมูลจาก API เมื่อคอมโพเนนต์โหลด
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/getUserData");
        const data = await response.json();
        
        // ตั้งค่าข้อมูลใน state
        if (data) {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setGender(data.gender);
          setPhoneNumber(data.phoneNumber);
          setAddress(data.address);
          setBirthdate(data.birthdate);
          setRole(data.Role);
          setStartDate(data.StartDate);
          setEmploymentDuration(data.EmploymentDuration);
          setWorkLocation(data.WorkLocation);
          setSalary(data.Salary);
          setWorkHour(data.WorkHour);
          setEmail(data.email);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
      StartDate,
      employmentDuration: parseInt(EmploymentDuration) || 0,
      WorkLocation,
      salary: parseFloat(Salary) || 0,
      workHour: parseInt(WorkHour) || 0,
      email,
      password,
    };

    try {
      const response = await fetch("/api/updateUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      alert("User updated successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error updating the user.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-white overflow-hidden">
      <div className="w-full h-full px-80 py-6 bg-white shadow-lg rounded-lg overflow-y-auto">
        <form onSubmit={handleSubmit}>
          {/* Profile Picture */}
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
                className="text-sm text-white bg-[#88D64C] border-2 border-[#88D64C] px-4 py-2 rounded-lg block mb-2 w-full"
              >
                Change Picture
              </button>
              <button
                type="button"
                onClick={handlePictureDelete}
                className="text-sm text-[#88D64C] border-2 border-[#88D64C] px-4 py-2 rounded-lg block w-full"
              >
                Delete Picture
              </button>
              <input type="file" ref={fileInputRef} onChange={handlePictureChange} className="hidden" />
            </div>
          </div>

          {/* Name Fields */}
          <div className="flex space-x-4 justify-between">
            <div className="mb-4 w-1/2">
              <label className="block font-semibold mb-2">First Name</label>
              <input
                type="text"
                value={firstName}       
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4 w-1/2">
              <label className="block font-semibold mb-2">Last Name</label>
              <input
                type="text"
                value={lastName}
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
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Birthdate */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Birthdate</label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Role</label>
            <input
              type="text"
              value={Role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Start Date */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Start Date</label>
            <input
              type="date"
              value={StartDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Employment Duration */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Employment Duration (Years)</label>
            <input
              type="number"
              value={EmploymentDuration}
              onChange={(e) => setEmploymentDuration(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Work Location */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Work Location</label>
            <input
              type="text"
              value={WorkLocation}
              onChange={(e) => setWorkLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Salary */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Salary</label>
            <input
              type="number"
              value={Salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Work Hour */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Work Hour</label>
            <input
              type="number"
              value={WorkHour}
              onChange={(e) => setWorkHour(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="flex space-x-2 justify-between">
            <button
              type="button"
              onClick={() => router.push("/userList")}
              className="w-1/3 py-2 rounded-lg bg-[#CECECE] text-white hover:scale-110 transition-transform duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-1/3 py-2 rounded-lg text-white transition ${
                isFormComplete
                  ? "bg-[#88D64C] hover:bg-[#76BF42] hover:scale-110 transition-transform duration-200"
                  : "bg-[#CECECE] cursor-not-allowed hover:scale-110 transition-transform duration-200"
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
