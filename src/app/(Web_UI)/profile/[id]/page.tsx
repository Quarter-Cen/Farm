"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import 'remixicon/fonts/remixicon.css';

const UserProfile = () => {
  const router = useRouter();
  const { id } = useParams();
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/auth/profile/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [id]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  // แปลงข้อมูลให้แสดงผลสวยงาม
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();
  const roles = Object.entries(profileData.role)
    .filter(([_, value]) => value !== null)
    .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1)) // ทำให้ตัวอักษรตัวแรกเป็นตัวใหญ่

  return (
    <div className="bg-white w-full min-h-screen flex justify-center items-start pt-10 px-6">
      <div className="w-full max-w-2xl p-0 shadow-none">
        {/* Profile Picture and Name */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
              <img
                src="https://cdn.readawrite.com/articles/11259/11258229/thumbnail/large.gif?1"
                alt="Default Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-10">
              <p className="text-xl font-semibold text-gray-800">
                {profileData.firstName} {profileData.lastName}
              </p>
              <div className="flex items-center">
                <p className="text-sm text-gray-600">{roles.join(", ")}</p>
                <i className="ri-shield-check-line text-[#88D64C] ml-1"></i>
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            className="text-sm text-white bg-[#CECECE] px-4 py-2 w-40 rounded-lg hover:bg-[#88D64C] transition-colors"
            onClick={() => router.push(`/profile/edit/${id}`)}
          >
            Edit
          </button>
        </div>

        {/* Profile Info */}
        <div className="Profile">
          <label className="ml-2 block font-semibold text-[#BEBEBE]">Profile</label>
          <div className="mb-5 ml-2">
            <p className="text-[#89939E]">Date of Birth: {formatDate(profileData.birthdate)}</p>
            <p className="text-[#89939E]">Gender: {profileData.gender}</p>
            <p className="text-[#89939E]">Address: {profileData.address}</p>
            <p className="text-[#89939E]">Phone Number: {profileData.phoneNumber}</p>
          </div>
        </div>

        {/* Information */}
        <div className="Information">
          <label className="ml-2 block font-semibold text-[#BEBEBE]">Information</label>
          <div className="mb-4 ml-2">
            <p className="text-[#89939E]">Role: {roles.join(", ")}</p>
            <p className="text-[#89939E]">Start Date: {formatDate(profileData.startDate)}</p>
            <p className="text-[#89939E]">Employment Duration (Hours): {profileData.employmentDurationHours}</p>
            <p className="text-[#89939E]">Work Location: {profileData.workLocation}</p>
            <p className="text-[#89939E]">Salary: {profileData.salary}</p>
            <p className="text-[#89939E]">Work Hour (Hours): {profileData.workHour}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
