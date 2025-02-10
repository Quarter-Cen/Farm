import { CowData } from "@/services/cow";
import { NextRequest, NextResponse } from "next/server";

let cowData = new CowData();
//Create
export async function POST(req: NextResponse) {
    try {
        const body = await req.json();
        const {
            name,
            gender,
            age,
            weight,
            birthdate,
            breed,
            healthStatus,
            recordedAt,
            veterianId
        } = body;

        if (
            !name ||
            !gender ||
            !age ||
            !weight ||
            !birthdate ||
            !breed ||
            !healthStatus ||
            !recordedAt ||
            !veterianId
        ) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newCow = await cowData.createCowData(
            name,
            gender,
            age,
            weight,
            new Date(birthdate),
            breed,
            healthStatus,
            new Date(recordedAt),
            BigInt(veterianId) // แก้ให้ใช้ค่าจาก req.body
        );

        // 🛠 แปลง BigInt เป็น String
        const formattedCow = {
            ...newCow,
            id: newCow.id.toString(), // ถ้ามี BigInt ID ให้แปลงเป็น String
            veterianId: newCow.veterianId ? newCow.veterianId.toString() : null // แปลง BigInt อื่น ๆ
        };

        return NextResponse.json(formattedCow, { status: 201 });
    } catch (error) {
        console.error("Error creating cow data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

//Update
export async function PUT(req: NextResponse) {
    try {
        const body = await req.json();
        const {
            id,
            name,
            gender,
            age,
            weight,
            birthdate,
            breed,
            healthStatus,
            recordedAt,
            veterianId
        } = body;

        // ตรวจสอบว่ามี `id` หรือไม่
        if (!id) {
            return NextResponse.json({ error: "Missing cow ID" }, { status: 400 });
        }

        // เรียกใช้ฟังก์ชันเพื่ออัปเดตข้อมูล
        const updatedCow = await cowData.editCowData(
            id,
            name,
            gender,
            age,
            weight,
            birthdate ? new Date(birthdate) : undefined,
            breed,
            healthStatus,
            recordedAt ? new Date(recordedAt) : undefined,
            veterianId
        )

        // ตรวจสอบว่าพบข้อมูลหรือไม่
        if (!updatedCow) {
            return NextResponse.json({ error: "Treatment not found or update failed" }, { status: 404 });
        }

        const formattedCow = {
            ...updatedCow,
            id: updatedCow.id.toString(),
            veterianId: updatedCow?.veterianId ? updatedCow.veterianId.toString() : null   // ตรวจสอบก่อนแปลง
        }

        return NextResponse.json(formattedCow, { status: 200 })
    } catch (error) {
        console.error("Error updating cow data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

//Delete
export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        // ตรวจสอบว่ามี `id` และเป็นตัวเลข
        if (!id || !/^\d+$/.test(id)) {
            return NextResponse.json({ error: "Invalid or missing cow ID" }, { status: 400 });
        }

        const cowId = BigInt(id); // แปลงเป็น BigInt
        console.log("Deleting cow with ID:", cowId);

        // ลบข้อมูลวัว
        const deletedCow = await cowData.deleteCowData(cowId);

        // ตรวจสอบว่ามีข้อมูลถูกลบจริงหรือไม่
        if (!deletedCow) {
            return NextResponse.json({ error: "Cow not found" }, { status: 404 });
        }

        // ส่งค่ากลับ โดยแปลง BigInt เป็น String
        return NextResponse.json({
            message: "Cow deleted successfully",
            deletedCow: {
                ...deletedCow,
                id: deletedCow.id.toString(),
                veterianId: deletedCow?.veterianId ? deletedCow.veterianId.toString() : null
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error deleting cow data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

//Pull
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // ดึงค่าจาก Query Parameters
        const id = searchParams.get("id");
        const name = searchParams.get("name");
        const gender = searchParams.get("gender");
        const age = searchParams.get("age");
        const weight = searchParams.get("weight");
        const birthdate = searchParams.get("birthdate");
        const breed = searchParams.get("breed");
        const healthStatus = searchParams.get("healthStatus");
        const recordedAt = searchParams.get("recordedAt");
        const veterianId = searchParams.get("veterianId");

        // แปลงค่าให้ตรงกับประเภทที่ต้องการ
        const query = {
            id: id ? BigInt(id) : null,
            name: name || null,
            gender: gender || null,
            age: age ? parseInt(age) : null,
            weight: weight ? parseFloat(weight) : null,
            birthdate: birthdate ? new Date(birthdate) : null,
            breed: breed || null,
            healthStatus: healthStatus || null,
            recordedAt: recordedAt ? new Date(recordedAt) : null,
            veterianId: veterianId ? BigInt(veterianId) : null
        };

        // เรียกใช้ฟังก์ชัน `getCowData()`
        const cow = await cowData.getCowData(
            query.id,
            query.name,
            query.gender,
            query.age,
            query.weight,
            query.birthdate,
            query.breed,
            query.healthStatus,
            query.recordedAt,
            query.veterianId
        );

        // ตรวจสอบว่าพบข้อมูลหรือไม่
        if (!cow) {
            return NextResponse.json({ error: "Cow not found" }, { status: 404 });
        }

        // ส่งข้อมูลกลับ โดยแปลง `BigInt` เป็น `String`
        return NextResponse.json({
            cow: {
                ...cow,
                id: cow.id.toString(),
                veterianId: cow.veterianId?.toString() || null
            }
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching cow data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}