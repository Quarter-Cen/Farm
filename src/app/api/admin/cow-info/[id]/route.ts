import { NextRequest, NextResponse } from "next/server";
import { CowService } from "@/services/cowInformation";
import { HealthStatus } from "@prisma/client";

let cowService = new CowService()

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id =  await params
        const cowId = BigInt(id.id); // แปลง id เป็น BigInt
        const cow = await cowService.getCowByID(cowId);

        if (!cow) {
            return NextResponse.json({ error: "Cow not found" }, { status: 404 });
        }
        
        const jsonResponse = JSON.stringify(cow, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error fetching cow:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

interface CowData {
    name: string;
    gender: string;
    age: number;
    weight: number;
    birthDate: string;
    breed: string;
    healthStatus: HealthStatus;
    veterianId: bigint;
  }
  

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const id =  await params
    const body: CowData = await req.json();  // กำหนด type ให้ body เป็น CowData
    console.log(body)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid or empty payload' }, { status: 400 });
    }
  
    let { name, gender, age, weight, birthDate, breed, healthStatus, veterianId } = body;
    let ConvertbirthDate = new Date(birthDate);
    try {
      if (!id) {
        throw new Error("ID is required");
      }
  
      // ตรวจสอบว่า healthStatus ที่ส่งมาเป็นค่าที่ถูกต้อง
      if (!Object.values(HealthStatus).includes(healthStatus as HealthStatus)) {
        throw new Error('Invalid healthStatus value');
      }
  
      // ใช้ CowService เพื่ออัปเดตข้อมูลวัว
      const updatedCow = await cowService.editCow(BigInt(id.id), {
        name,
        gender,
        age,
        weight,
        birthDate : ConvertbirthDate,
        breed,
        healthStatus: healthStatus as HealthStatus, // ใช้ HealthStatus
        veterianId: BigInt(veterianId)
      });
  
      const jsonResponse = JSON.stringify(updatedCow, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
    );

    return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error: any) {
      console.error(error.stack); // ตรวจสอบข้อผิดพลาด
      return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
  }

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id =  await params
        const cowId =  BigInt(id.id); // แปลง id เป็น BigInt
        const deletedCow = await cowService.deleteCow(cowId);

        if (!deletedCow) {
            return NextResponse.json({ error: "Cow not found" }, { status: 404 });
        }

        const jsonResponse = JSON.stringify(deletedCow, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error deleting cow:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
