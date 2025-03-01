// page.tsx
"use client"; // บอกให้ Next.js ใช้ Client Component

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import 'remixicon/fonts/remixicon.css';

const UserList: React.FC = () => {
  const [filter, setFilter] = useState<string>(''); 
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/users?role=${filter}`); 
        
        if (response.ok) {
          const contentType = response.headers.get('Content-Type');
          
          // ตรวจสอบว่าเป็น JSON
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            setUsers(data); 
          } else {
            console.error('Expected JSON but received something else');
          }
        } else {
          console.error('Failed to fetch users:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [filter]);

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen); 
  };

  return (
    <div className="p-5 px-64">
      {/* Content Section */}
      <div>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-2xl">User List Page</h1>
            <h2 className="text-[#979797]">List of everyone in your farm</h2>
          </div>

          <div className="flex items-center space-x-2">
            {/* Add Icon */}
            <div className="cursor-pointer hover:scale-110 transition-transform duration-200">
              <Link href="/users">
                <i className="ri-add-circle-fill text-[#88D64C] text-3xl"></i>
              </Link>
            </div>
            {/* Filter */}
            <div className="relative hover:scale-110 transition-transform duration-200">
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
                      onClick={() => setFilter('')} 
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
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <div key={user.id} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-4">
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex flex-col items-start">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
                    <Link href={`/editUser/${user.id}`}>
                      <i className="ri-edit-circle-fill text-[#979797] text-xl cursor-pointer hover:scale-110 transition-transform duration-200"></i>
                    </Link>
                  </div>
                  <p className="text-sm text-gray-500">{user.role}</p>
                </div>
              </div>
              <div className="mt-3 ml-2 flex flex-col space-y-1">
                <p className="text-sm flex items-center space-x-2">
                  <i className="ri-mail-line text-[#737791] text-xl"></i> 
                  <span className="text-[#737791]">{user.email}</span>
                </p>
                <p className="text-sm flex items-center space-x-2">
                  <i className="ri-phone-line text-[#737791] text-xl"></i> 
                  <span className="text-[#737791]">{user.phoneNumber}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList; 
