import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
      const body = await req.json();
      console.log("Received body:", body); // ตรวจสอบข้อมูลที่ได้รับจาก client
  
      const { date, quantityOfProduct, cowZone, supervisorId } = body;
  
      if (!date || !quantityOfProduct || !cowZone || !supervisorId) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
  
      const newProductReport = await prisma.productReport.create({
        data: {
          date: new Date(date),
          quantityOfProduct,
          cowZone,
          supervisor: {
            connect: { id: BigInt(supervisorId) }
          }
        }
      });
  
      console.log("Created Product Report:", newProductReport); // เพิ่มการพิมพ์เมื่อสร้างรายงานสำเร็จ
  
      return NextResponse.json(newProductReport, { status: 201 });
    } catch (error) {
      console.error("Error in API:", error);
      return NextResponse.json({ error: "Failed to create product report" }, { status: 500 });
    }
  }
  
