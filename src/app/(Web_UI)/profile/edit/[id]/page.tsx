"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const UserProfileForm = () => {
  const router = useRouter();
  const { id } = useParams();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [roles, setRoles] = useState<string[]>([]); // เปลี่ยนเป็น array
  const [startDate, setStartDate] = useState("");
  const [employmentDuration, setEmploymentDuration] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [workHour, setWorkHour] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/admin/user/${id}`);
        const data = await response.json();

        if (data) {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setGender(data.gender);
          setPhoneNumber(data.phoneNumber);
          setAddress(data.address);
          setBirthdate(data.birthdate ? data.birthdate.split("T")[0] : "");

          // Filter roles to include only those with non-null values
          const filteredRoles = Object.keys(data.role).filter(
            (role) => data.role[role] !== null
          );
          setRoles(filteredRoles);

          setStartDate(data.startDate ? data.startDate.split("T")[0] : "");
          setEmploymentDuration(data.employmentDurationHours);
          setWorkLocation(data.workLocation);
          setSalary(data.salary);
          setWorkHour(data.workHour);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setRoles((prevRoles) =>
      checked ? [...prevRoles, name] : prevRoles.filter((role) => role !== name)
    );
  };

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

  const isFormComplete = firstName.trim() !== "" && lastName.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      gender,
      phoneNumber,
      address,
      birthdate,
      roles, // ส่ง roles เป็น array
      startDate,
      employmentDuration: parseInt(employmentDuration) || 0,
      workLocation,
      salary: parseFloat(salary) || 0,
      workHour: parseInt(workHour) || 0,
    };

    try {
      const response = await fetch(`/api/admin/user/${id}`, {
        method: "PUT",
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
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePictureChange}
                className="hidden"
              />
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
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
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
          {/* Role (Checkboxes) */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Role</label>
            <div className="space-y-2">
              {["Admin", "Supervisor", "DairyWorker", "Veterian"].map(
                (roleName) => (
                  <div key={roleName} className="flex items-center">
                    <input
                      type="checkbox"
                      id={roleName}
                      name={roleName}
                      checked={roles.includes(roleName)}
                      onChange={handleRoleChange}
                      className="mr-2"
                    />
                    <label htmlFor={roleName} className="text-sm">
                      {roleName.charAt(0).toUpperCase() + roleName.slice(1)}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Employment Duration */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">
              Employment Duration (Years)
            </label>
            <input
              type="number"
              value={employmentDuration}
              onChange={(e) => setEmploymentDuration(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Work Location */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Work Location</label>
            <input
              type="text"
              value={workLocation}
              onChange={(e) => setWorkLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Salary */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Salary</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Work Hour */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Work Hour</label>
            <input
              type="number"
              value={workHour}
              onChange={(e) => setWorkHour(e.target.value)}
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
