import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { serialize } from 'cookie';  // อย่าลืมนำเข้า serialize

export async function POST(request: Request) {
  // ใช้ cookies() เพื่อดึงคุกกี้จาก request
  const cookieStore = await cookies();
  const cookiesValue = cookieStore.get("session");

  // กำหนดการตั้งค่า cookie เพื่อลบคุกกี้
  const cookie = serialize('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  // ใช้ secure ใน production เท่านั้น
    maxAge: 0,  // หมดอายุทันที
    path: '/',  // ใช้ path ที่ใช้สำหรับ cookie
  });

  // สร้าง response พร้อมกับการตั้งค่า Set-Cookie
  const response = NextResponse.json({ message: "Logout successful" });

  // ตั้งค่า Set-Cookie header เพื่อลบคุกกี้
  response.headers.set('Set-Cookie', cookie);

  return response;
}
