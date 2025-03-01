import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Gender } from '@prisma/client';

const prisma = new PrismaClient();

// ฟังก์ชันสร้างผู้ใช้ (POST)
async function createUser(data: {
  firstName: string;
  lastName: string;
  gender: Gender;
  phoneNumber: string;
  employmentDurationHours: number;
  workLocation: string;
  salary: number;
  startDate: Date;
  workHour: number;
  address: string;
  birthdate: Date;
  email: string;
  password: string;
}) {
  try {
    // ตรวจสอบว่ามี email หรือ phoneNumber ซ้ำหรือไม่
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { phoneNumber: data.phoneNumber }],
      },
    });

    if (existingUser) {
      throw new Error("Email or phone number already exists.");
    }

    // สร้างผู้ใช้ใหม่
    const newUser = await prisma.user.create({
      data: {
        ...data,
      },
    });

    return newUser;
  } catch (error: unknown) {
    console.error("Error creating user:", error);
    throw new Error("Unable to create user");
  }
}

// ฟังก์ชันดึงข้อมูลผู้ใช้ (GET)
async function getUserById(id: bigint) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error: unknown) {
    console.error("Error fetching user:", error);
    throw new Error("Unable to fetch user");
  }
}

// ฟังก์ชันอัปเดตข้อมูลผู้ใช้ (PUT)
async function updateUser(id: bigint, data: Partial<typeof createUser>) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return updatedUser;
  } catch (error: unknown) {
    console.error("Error updating user:", error);
    throw new Error("Unable to update user");
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  console.log("ID",id)
  if (req.method === 'POST') {
    try {
      const data = req.body;

      // ตรวจสอบข้อมูลที่จำเป็น
      if (!data.firstName || !data.lastName || !data.email || !data.password) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // ตรวจสอบ email format
      if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      const newUser = await createUser(data);
      return res.status(201).json(newUser);
    } catch (error: unknown) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const userId = BigInt(id);

  if (req.method === 'GET') {
    try {
      const user = await getUserById(userId);
      return res.status(200).json(user);
    } catch (error: unknown) {
      return res.status(500).json({ message: (error as Error).message });
    }
  } else if (req.method === 'PUT') {
    try {
      const data = req.body;
      const updatedUser = await updateUser(userId, data);
      return res.status(200).json(updatedUser);
    } catch (error: unknown) {
      return res.status(500).json({ message: (error as Error).message });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
