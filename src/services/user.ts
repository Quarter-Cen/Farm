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
    } catch (error:any) {
      console.log('Error fetching user: ', error.message);
      return null;
    }
  }

  // เพิ่มฟังก์ชัน getUserById
  async getUserById(userId: bigint): Promise<User | null> {
    try {
      console.log(userId)
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          admin: true,
          supervisor: true,
          dairyWorker: true,
          veterian: true,
        },
      });

      if (!user) {
        throw new Error('User not found.');
      }

      // แปลงข้อมูลผู้ใช้เพื่อรวม role เข้าในฟิลด์เดียว
      const userWithRoles = {
        ...user,
        role: {
          admin: user.admin ? user.admin.id : null,
          supervisor: user.supervisor ? user.supervisor.id : null,
          dairyWorker: user.dairyWorker ? user.dairyWorker.id : null,
          veterian: user.veterian ? user.veterian.id : null,
        },
      };
      console.log(userWithRoles)
      return userWithRoles;
    } catch (error: any) {
      console.log('Error fetching user by id: ', error.message);
      return null;
    }
  }

  async updateUser(
    userId: bigint,
    firstName: string,
    lastName: string,
    gender: Gender,
    employmentDurationHours: number | undefined,
    workLocation: string | undefined,
    salary: number,
    startDate: string | undefined,   // ให้แน่ใจว่าเป็น string ที่มีรูปแบบ ISO-8601
    workHour: number,
    phoneNumber: string,
    address: string,
    birthdate: string,   // ให้แน่ใจว่าเป็น string ที่มีรูปแบบ ISO-8601
    roles: string[]      // แก้ไขเป็น array ของ string สำหรับ roles
): Promise<User | null> {
    try {
        // อัพเดตข้อมูล user
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                firstName,
                lastName,
                gender,
                employmentDurationHours,
                workLocation,
                salary,
                startDate: startDate ? new Date(startDate) : undefined,
                workHour,
                phoneNumber,
                address,
                birthdate: birthdate ? new Date(birthdate) : undefined
            }
        });

        // ตรวจสอบ role ที่มีอยู่ในฐานข้อมูล
        const currentRoles = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                admin: true,
                supervisor: true,
                dairyWorker: true,
                veterian: true
            }
        });

        // ตรวจสอบและลบ role ที่ไม่ตรงกับ array `roles`
        if (currentRoles?.admin && !roles.includes('Admin')) {
            await prisma.admin.delete({ where: { userId: userId } });
        }
        if (currentRoles?.supervisor && !roles.includes('Supervisor')) {
            await prisma.supervisor.delete({ where: { userId: userId } });
        }
        if (currentRoles?.dairyWorker && !roles.includes('DairyWorker')) {
            await prisma.dairyWorker.delete({ where: { userId: userId } });
        }
        if (currentRoles?.veterian && !roles.includes('Veterian')) {
            await prisma.veterian.delete({ where: { userId: userId } });
        }

        // สร้าง role ใหม่ที่ยังไม่มี
        if (roles.includes('Admin') && !currentRoles?.admin) {
            await prisma.admin.create({
                data: {
                    userId: updatedUser.id,
                }
            });
        }
        if (roles.includes('Supervisor') && !currentRoles?.supervisor) {
            await prisma.supervisor.create({
                data: {
                    userId: updatedUser.id,
                }
            });
        }
        if (roles.includes('DairyWorker') && !currentRoles?.dairyWorker) {
            await prisma.dairyWorker.create({
                data: {
                    userId: updatedUser.id,
                }
            });
        }
        if (roles.includes('Veterian') && !currentRoles?.veterian) {
            await prisma.veterian.create({
                data: {
                    userId: updatedUser.id,
                }
            });
        }

        return updatedUser;
    } catch (exception: any) {
        console.error('Error updating user: ', exception.message);
        return null;
    }
}

  
}
