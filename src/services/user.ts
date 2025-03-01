import { PrismaClient, Gender, User } from '@prisma/client';
import { iUserService } from './adminServices/iUserService';
import bcrypt from 'bcrypt'; // ใช้ bcrypt ในการเข้ารหัสรหัสผ่าน
import next from 'next';

const prisma = new PrismaClient();

export class UserService implements iUserService {
  async createUser(
    firstName: string,
    lastName: string,
    gender: Gender,
    employmentDurationHours: number,
    workLocation: string,
    salary: number,
    startDate: Date,
    workHour: number,
    phoneNumber: string,
    address: string,
    birthdate: Date,
    email: string,
    password: string,
    roles: [] // เปลี่ยนเป็น array เพื่อรองรับหลาย role
  ): Promise<User | null> {
    try {
      // ตรวจสอบว่ามี email ซ้ำหรือไม่
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error('Email is already in use.');
      }
      console.log(roles)
      // ตรวจสอบว่า role ถูกต้องหรือไม่ (รองรับหลาย role)
      const validRoles = ['Admin', 'Supervisor', 'DairyWorker', 'Veterian'];
      for (let role of roles) {
        if (!validRoles.includes(role)) {
          throw new Error('Invalid role value');
        }
      }

      // เข้ารหัสรหัสผ่านก่อนบันทึก
      const hashedPassword = await bcrypt.hash(password, 10);

      // สร้างผู้ใช้ใหม่
      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          gender,
          employmentDurationHours,
          workLocation,
          salary,
          startDate,
          workHour,
          phoneNumber,
          address,
          birthdate,
          email,
          password: hashedPassword, // ใช้รหัสผ่านที่เข้ารหัสแล้ว
        },
      });

      // สร้าง role ที่เชื่อมโยงกับ User สำหรับแต่ละ role ใน array
      for (let role of roles) {
        if (role === 'Admin') {
          await prisma.admin.create({
            data: {
              userId: newUser.id,
            },
          });
        } else if (role === 'Supervisor') {
          await prisma.supervisor.create({
            data: {
              userId: newUser.id,
            },
          });
        } else if (role === 'DairyWorker') {
          await prisma.dairyWorker.create({
            data: {
              userId: newUser.id,
            },
          });
        } else if (role === 'Veterian') {
          await prisma.veterian.create({
            data: {
              userId: newUser.id,
            },
          });
        }
      }

      return newUser;
    } catch (exception: any) {
      console.error('Error creating user: ', exception.message);
      return null;
    }
  }

  async checkEmail(email: string): Promise<String | typeof next> {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return 'Email is already in use.';
    }

    return next;
  }

  async getAllUser(): Promise<User[] | null> {
    try {
      const users = await prisma.user.findMany({
        include: {
          admin: true,
          supervisor: true,
          dairyWorker: true,
          veterian: true,
        },
      });

      // แปลงข้อมูลผู้ใช้เพื่อรวม role เข้าในฟิลด์เดียว
      const usersWithRoles = users.map((user) => {
        return {
          ...user,
          role: {
            admin: user.admin ? user.admin.id : null,
            supervisor: user.supervisor ? user.supervisor.id : null,
            dairyWorker: user.dairyWorker ? user.dairyWorker.id : null,
            veterian: user.veterian ? user.veterian.id : null,
          },
        };
      });

      return usersWithRoles;
    } catch (error) {
      console.log('Error fetching user: ', error.message);
      return null;
    }
  }
}
