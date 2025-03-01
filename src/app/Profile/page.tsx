"use client"; // บอกให้ Next.js ใช้ Client Component

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import 'remixicon/fonts/remixicon.css'; 

const UserProfile = () => {
  const router = useRouter(); 
  const [profileData, setProfileData] = useState<any>(null); // สร้าง state สำหรับข้อมูลโปรไฟล์
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  useEffect(() => {
    // ดึงข้อมูลจาก API
    const fetchProfileData = async () => {
      const response = await fetch('/api/user/profile?id=1'); 
      if (response.ok) {
        const data = await response.json();
        setProfileData(data); 
        setProfilePicture(data.profilePicture || null); 
      } else {
        console.error('Failed to fetch profile data');
      }
    };
    fetchProfileData();
  }, []);

  if (!profileData) {
    return <div>Loading...</div>; 
  }

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
              <p className="text-xl font-semibold text-gray-800">{profileData.firstName} {profileData.lastName}</p>
              <div className="flex items-center">
                <p className="text-sm text-gray-600">{profileData.Role}</p>
                <i className="ri-shield-check-line text-[#88D64C] ml-1"></i> 
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            className="text-sm text-white bg-[#CECECE] px-4 py-2 w-40 rounded-lg hover:bg-[#88D64C] transition-colors"
            onClick={() => router.push("/edit-profile")} 
          >
            Edit
          </button>
        </div>

        {/* Profile Info */}
        <div className="Profile">
          <label className="ml-2 block font-semibold text-[#BEBEBE]">Profile</label>
          <div className="mb-5 ml-2">
            <p className="text-[#89939E]">Date of Birth: {profileData.birthdate}</p>            
            <p className="text-[#89939E]">Gender: {profileData.gender}</p>
            <p className="text-[#89939E]">Address: {profileData.address}</p>
            <p className="text-[#89939E]">Phone Number: {profileData.phoneNumber}</p>
          </div>
        </div>

        {/* Information */}
        <div className="Information">
          <label className="ml-2 block font-semibold text-[#BEBEBE]">Information</label>
          <div className="mb-4 ml-2">
            <p className="text-[#89939E]">Role: {profileData.Role}</p>   
            <p className="text-[#89939E]">Start Date: {profileData.StartDate}</p>            
            <p className="text-[#89939E]">Employment Duration (Years): {profileData.EmploymentDuration}</p>     
            <p className="text-[#89939E]">Work Location: {profileData.WorkLocation}</p>     
            <p className="text-[#89939E]">Salary: {profileData.Salary}</p>     
            <p className="text-[#89939E]">Work Hour (Hours): {profileData.WorkHour}</p>     
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
