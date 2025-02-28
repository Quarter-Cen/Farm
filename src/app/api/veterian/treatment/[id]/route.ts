import { NextRequest, NextResponse } from "next/server";
import { TreatmentService } from "@/services/TreatmentData";

let treatmentService = new TreatmentService()

//[GET] ดึงข้อมูลการรักษาตาม ID
export async function GET(req: NextRequest, params: { params: { id: string } }) {
    try {
        const { id } = await params.params;

        const treatment = await treatmentService.getTreatmentByID(BigInt(id));

        if (!treatment) {
            return NextResponse.json({ error: "Treatment not found" }, { status: 404 });
        }

        const jsonResponse = JSON.stringify(treatment, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error fetching treatment:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE
export async function DELETE(req: NextRequest, params: { params: { id: string } }) {
    try {
        const { id } = await params.params;
        const deleteTreament = await treatmentService.deleteTreatmentData(BigInt(id))

        if (!deleteTreament) {
            return NextResponse.json({ error: "Treatment not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Treatment deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting treatment:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

//EDIT
export async function PUT(req: NextRequest, params: { params: { id: string } }) {
    try {
        const { id } = await params.params;
        const body = await req.json();

        console.log("✅ ข้อมูลที่ได้รับจากฟอร์ม:", body); // ตรวจสอบค่า formData

        // ตรวจสอบว่า id และ body ไม่เป็น null
        if (!id || !body) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        // แปลงค่าก่อนส่งให้ Prisma
        const validBody = {
            nameDisease: body.nameDisease,
            events: body.events,
            details: body.details,
            date: body.date ? new Date(body.date) : undefined, 
            drugName: body.drugName,
            status: body.status,
            notation: body.notation,
            cowWeight: body.cowWeight ? Number(body.cowWeight) : undefined, 
            veterianId: body.veterianId ? BigInt(body.veterianId) : undefined, 
            cowId: body.cowId ? BigInt(body.cowId) : undefined,
        };

        console.log("📌 ข้อมูลที่ส่งไป editTreatmentData:", validBody);

        const editTreatment = await treatmentService.editTreatmentData(BigInt(id), validBody)

        if (!editTreatment) {
            return NextResponse.json({ error: "Treatment not found" }, { status: 404 });
        }

        const formattedTreatment = {
            ...editTreatment,
            id: editTreatment.id.toString(),
            veterianId: editTreatment.veterianId.toString(),
            cowId: editTreatment.cowId.toString(),
        };

        return NextResponse.json(formattedTreatment, { status: 200 });
    } catch (error) {
        console.error("Error updating treatment:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}