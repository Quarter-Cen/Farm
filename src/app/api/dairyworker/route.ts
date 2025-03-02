import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // รับข้อมูลจาก body ของ request
    const { foodType, quantity, usedById } = await request.json();

    // ตรวจสอบว่ามีข้อมูลครบหรือไม่
    if (!foodType || !quantity || !usedById) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // ดำเนินการใช้งาน stock โดยใช้ foodType (เป็น enum)
    const stock = await prisma.stock.findFirst({ where: { type: foodType } });
    if (!stock || stock.quantity < quantity) {
      return NextResponse.json({ message: "Not enough stock available" }, { status: 400 });
    }

    // สร้างการใช้งาน stock
    const stockUsage = await prisma.stockUsage.create({
      data: { stockId: stock.id, quantity, usedById },
    });

    // อัปเดตจำนวน stock
    await prisma.stock.update({
      where: { id: stock.id },
      data: { quantity: stock.quantity - quantity },
    });

    const jsonResponse = JSON.stringify(stockUsage, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
    );

    return new NextResponse(jsonResponse, { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (error:any) {
    console.error("Error using stock:", error.stack);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
