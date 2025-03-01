import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get('role');  

  try {
    // ถ้ามี role จะกรองตาม role ของผู้ใช้
    if (role) {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            { admin: { isNot: null } },
            { supervisor: { isNot: null } },
            { dairyWorker: { isNot: null } },
            { veterian: { isNot: null } },
          ]
        }
      });
      return NextResponse.json(users);
    } else {
      // ถ้าไม่มี role ให้ดึงข้อมูลทั้งหมด
      const users = await prisma.user.findMany();
      return NextResponse.json(users);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ message: 'Error fetching users data' }, { status: 500 });
  }
}
