import { NextResponse } from 'next/server';
import { UserService } from '@/services/user';
import { Gender } from '@prisma/client';

const userService = new UserService();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received body:', body);

    // ตรวจสอบค่าที่จำเป็นต้องมี
    if (!body.firstName || !body.lastName || !body.gender || !body.email || !body.password ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ตรวจสอบค่า gender ว่าถูกต้องหรือไม่
    if (!Object.values(Gender).includes(body.gender)) {
      return NextResponse.json({ error: 'Invalid gender value' }, { status: 400 });
    }

    // ตรวจสอบค่า startDate ว่าถูกต้องหรือไม่
    const startDate = new Date(body.startDate);
    if (isNaN(startDate.getTime())) {
      return NextResponse.json({ error: 'Invalid startDate value' }, { status: 400 });
    }

    // ตรวจสอบค่า birthdate
    const birthdate = new Date(body.birthdate);
    if (isNaN(birthdate.getTime())) {
      return NextResponse.json({ error: 'Invalid birthdate value' }, { status: 400 });
    }

    // ตรวจสอบว่า email ซ้ำหรือไม่
    const checkEmail = await userService.checkEmail(body.email);
    if (checkEmail === 'Email is already in use.') {
      return NextResponse.json({ error: 'Email is already in use.' }, { status: 400 });
    }

    // เรียกใช้ service เพื่อสร้าง user
    const newUser = await userService.createUser(
      body.firstName,
      body.lastName,
      body.gender as Gender,
      Number(body.employmentDuration), // ใช้ค่าที่ถูกต้องจาก request
      body.WorkLocation, // ใช้ค่าที่ถูกต้องจาก request
      Number(body.salary),
      startDate,
      Number(body.workHour), // ใช้ค่าที่ถูกต้องจาก request
      body.phoneNumber,
      body.address,
      birthdate,
      body.email,
      body.password,
      body.Role // ส่ง role ไปด้วย
    );

    if (!newUser) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }

    const jsonResponse = JSON.stringify(newUser, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    );

    return new NextResponse(jsonResponse, { status: 201, headers: { "Content-Type": "application/json" } });

  } catch (error: any) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
