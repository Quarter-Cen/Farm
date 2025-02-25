import { PrismaClient, Gender } from '@prisma/client';

const prisma = new PrismaClient();

// ฟังก์ชันในการสร้างผู้ใช้
async function createUser(data: {
  firstName: string;
  lastName: string;
  gender: Gender;  // ใช้ Gender แทน string
  employmentDurationHours: number;
  workLocation: string;
  salary: number;
  startDate: Date;
  workHour: number;
  phoneNumber: string;
  address: string;
  birthdate: Date;
  email: string;
  password: string;
}) {
  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,  // ใช้ Gender แทน string
      employmentDurationHours: data.employmentDurationHours,
      workLocation: data.workLocation,
      salary: data.salary,
      startDate: data.startDate,
      workHour: data.workHour,
      phoneNumber: data.phoneNumber,
      address: data.address,
      birthdate: data.birthdate,
      email: data.email,
      password: data.password,
    },
  });
  return user;
}

// ฟังก์ชันในการอัปเดตข้อมูลผู้ใช้
async function updateUser(id: bigint, data: {
  firstName?: string;
  lastName?: string;
  gender?: Gender;  // ใช้ Gender แทน string
  employmentDurationHours?: number;
  workLocation?: string;
  salary?: number;
  startDate?: Date;
  workHour?: number;
  phoneNumber?: string;
  address?: string;
  birthdate?: Date;
  email?: string;
  password?: string;
}) {
  const user = await prisma.user.update({
    where: { id },
    data: {
      ...data,
    },
  });
  return user;
}

