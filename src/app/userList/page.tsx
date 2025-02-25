'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import 'remixicon/fonts/remixicon.css'; // นำเข้า CSS ของ Remix Icon

const UserList: React.FC = () => {
  const [filter, setFilter] = useState<string>(''); // ค่าเริ่มต้นเป็นค่าว่าง
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen); // สลับการเปิด/ปิด dropdown
  };

  return (
    <div className="p-5 px-64 ">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl">List of Users</h1>
          <h2 className="text-[#979797]">List of everyone in your farm</h2>
        </div>

        {/* Add Icon & Filter อยู่ใน flex container เดียวกัน */}
        <div className="flex items-center space-x-2">
          {/* Add Icon */}
          <div className="cursor-pointer">
            <Link href="/users">
              <i className="ri-add-circle-fill text-[#88D64C] text-3xl"></i>
            </Link>
          </div>
          {/* Filter */}
          <div className="relative">
          <div
            className="bg-[#88D64C] text-white p-2 px-3 rounded-lg cursor-pointer text-center w-24"
            onClick={handleFilterClick}
            >
            <i className="ri-align-justify"></i> Filter
        </div>


            {isFilterOpen && (
              <div className="absolute mt-2 bg-white shadow-lg rounded-md w-[150px] border border-gray-300">
                <ul>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => setFilter('')} // เลือกทั้งหมด
                  >
                    All
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => setFilter('Admin')}
                  >
                    Admin
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => setFilter('Supervisor')}
                  >
                    Supervisor
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => setFilter('Dairy Worker')}
                  >
                    Dairy Worker
                  </li>
                  <li
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => setFilter('Veterian')}
                  >
                    Veterian
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-300 mt-5">
        <thead>
          <tr>
            <th className="border px-4 py-2">Profile</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone Number</th>
            <th className="border px-4 py-2">Edit</th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              id: 1,
              firstName: 'John',
              lastName: 'Doe',
              role: 'Admin',
              email: 'john@example.com',
              phoneNumber: '123456789',
              profilePicture:
                'https://e7.pngegg.com/pngimages/184/821/png-clipart-mangalore-united-states-management-computer-science-business-profile-angle-white-thumbnail.png',
            },
            {
              id: 2,
              firstName: 'Jane',
              lastName: 'Smith',
              role: 'Supervisor',
              email: 'jane@example.com',
              phoneNumber: '987654321',
              profilePicture:
                'https://e7.pngegg.com/pngimages/184/821/png-clipart-mangalore-united-states-management-computer-science-business-profile-angle-white-thumbnail.png',
            },
            {
              id: 3,
              firstName: 'Mike',
              lastName: 'Jones',
              role: 'Dairy Worker',
              email: 'mike@example.com',
              phoneNumber: '111222333',
              profilePicture:
                'https://e7.pngegg.com/pngimages/184/821/png-clipart-mangalore-united-states-management-computer-science-business-profile-angle-white-thumbnail.png',
            },
          ]
            .filter(user => (filter ? user.role === filter : true))
            .map(user => (
              <tr key={user.id}>
                <td className="border px-4 py-2">
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  {user.firstName} {user.lastName}
                </td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phoneNumber}</td>
                <td className="border px-4 py-2 flex items-center justify-center">
                  <i className="ri-edit-circle-fill text-[#979797] text-2xl cursor-pointer hover:text-[#88D64C]"></i>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
