"use client"; // บอกให้ Next.js ใช้ Client Component

import { useState, useRef } from "react";
import { useRouter } from "next/navigation"; 

const UserProfile = () => {
  const router = useRouter(); 
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [gender, setGender] = useState("Male");
  const [phoneNumber, setPhoneNumber] = useState("0912345678");
  const [email, setEmail] = useState("66026134@up.ac.th");
  const [address, setAddress] = useState("Phayao, Thailand");
  const [birthdate, setBirthdate] = useState("2002-05-10");
  const [Role, setRole] = useState("Admin");
  const [StartDate, setStartDate] = useState("2005-01-01");
  const [EmploymentDuration, setEmploymentDuration] = useState("3");     // Years
  const [WorkLocation, setWorkLocation] = useState("Phayao, Thailand");
  const [Salary, setSalary] = useState("25000");
  const [WorkHour, setWorkHour] = useState("8");  // Hours
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePicture(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleEditProfile = () => {
    router.push("/edit-profile"); // ลิงก์ไปหน้า Edit Profile
  };

  return (
    <div className="bg-white w-full min-h-screen flex justify-center items-start pt-10 px-6">
      <div className="w-full max-w-2xl p-0 shadow-none">
        {/* Profile Picture and Name */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
              {profilePicture ? (
                <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <img
                  src="https://cdn.readawrite.com/articles/11259/11258229/thumbnail/large.gif?1"
                  alt="Default Profile"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="ml-10">
              {/* Display Full Name and Role */}
              <p className="text-xl font-semibold text-gray-800">{firstName} {lastName}</p>
              <p className="text-sm text-gray-600">{Role}<i className="ri-shield-check-line text-green-500 ml-2"></i></p> 
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            className="text-sm text-white bg-[#CECECE] px-4 py-2 w-40 rounded-lg hover:bg-[#88D64C] transition-colors"
            onClick={handleEditProfile}
          >
            Edit
          </button>
        </div>

        {/* Profile Info */}
        <div className="Profile">
          <label className="ml-2 block font-semibold text-[#BEBEBE]">Profile</label>
          <div className="mb-5 ml-2">
            <p className="text-[#89939E]">Date of Birth: {birthdate}</p>            
            <p className="text-[#89939E]">Gender: {gender}</p>
            <p className="text-[#89939E]">Address: {address}</p>
            <p className="text-[#89939E]">Phone Number: {phoneNumber}</p>
          </div>
        </div>

        {/* Information */}
        <div className="Information">
          <label className="ml-2 block font-semibold text-[#BEBEBE]">Information</label>
          <div className="mb-4 ml-2">
            <p className="text-[#89939E]">Role: {Role}</p>   
            <p className="text-[#89939E]">Start Date: {StartDate}</p>            
            <p className="text-[#89939E]">Employment Duration (Years): {EmploymentDuration}</p>     
            <p className="text-[#89939E]">Work Location: {WorkLocation}</p>     
            <p className="text-[#89939E]">Salary: {Salary}</p>     
            <p className="text-[#89939E]">Work Hour (Hours): {WorkHour}</p>     
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
