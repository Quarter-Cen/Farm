import { TreatmentData } from "@/services/treatment";
import { NextRequest, NextResponse } from "next/server";

let treatmentData = new TreatmentData();

export async function POST(req: NextResponse) {
    try {
        const body = await req.json();
        const {
            nameDisease,
            events,
            details,
            date,
            drugName,
            status,
            responsibleMan,
            notation,
            veterianId,
            cowId
        } = body

        if (
            !nameDisease ||
            !events ||
            !details ||
            !date ||
            !drugName ||
            !status ||
            !responsibleMan ||
            !notation ||
            !veterianId ||
            !cowId
        ) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newTreatment = await treatmentData.createTreatmentData(
            nameDisease,
            events,
            details,
            new Date(date),
            drugName,
            status,
            responsibleMan,
            notation,
            BigInt(veterianId),
            BigInt(cowId)
        )

        // 🛠 แปลง BigInt เป็น String
        const formattedTreatment = {
            ...newTreatment,
            id: newTreatment.id.toString(),
            veterianId: newTreatment.veterianId ? newTreatment.veterianId.toString() : null,
            cowId: newTreatment.cowId ? newTreatment.cowId.toString() : null
        }

        return NextResponse.json(formattedTreatment, {status : 201})
    } catch (error) {
        console.error("Error creating treatment data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function PUT(req: NextResponse) {
    try {
        const body = await req.json();
        const {
            id,
            nameDisease,
            events,
            details,
            date,
            drugName,
            status,
            responsibleMan,
            notation,
            veterianId,
            cowId
        } = body

        // ตรวจสอบว่ามี `id` หรือไม่
        if (!id) {
            return NextResponse.json({ error: "Missing treatment ID" }, { status: 400 });
        }

        // เรียกใช้ฟังก์ชันเพื่ออัปเดตข้อมูล
        const updatedTreatment = await treatmentData.updateTreatmentData(
            id,
            nameDisease,
            events,
            details,
            date ? new Date(date) : undefined, // แปลงวันที่ถ้ามี
            drugName,
            status,
            responsibleMan,
            notation,
            veterianId,
            cowId
        )

        // ตรวจสอบว่าพบข้อมูลหรือไม่
        if (!updatedTreatment) {
            return NextResponse.json({ error: "Treatment not found or update failed" }, { status: 404 });
        }

        const formattedTreatment = {
            ...updatedTreatment,
            id: updatedTreatment.id.toString(),
            veterianId: updatedTreatment?.veterianId ? updatedTreatment.veterianId.toString() : null,
            cowId: updatedTreatment?.cowId ? updatedTreatment.cowId.toString() : null
        }

        return NextResponse.json(formattedTreatment, { status : 200})
    } catch (error) {
        console.error("Error updating treatment data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id")

        // ตรวจสอบว่ามี `id` และเป็นตัวเลข
        if (!id || !/^\d+$/.test(id)) {
            return NextResponse.json({ error: "Invalid or missing treatment ID" }, { status: 400 });
        }

        const treatmentId = BigInt(id)
        console.log("Deleting treatment with ID", treatmentId);

        //ลบข้อมูลการรักษา
        const deletedTreatment = await treatmentData.deleteTreatmentData(treatmentId);

        //ตรวจสอบว่ามีข้อมูลถูกลบจริงหรือไม่
        if (!deletedTreatment) {
            return NextResponse.json({ error: "Treatment not found" },  { status : 404 });
        }

        // ส่งค่ากลับ โดยแปลง BigInt เป็น String
        return NextResponse.json({
            message: "Treatment deleted successfully",
            deletedTreatment: {
                ...deletedTreatment,
                id: deletedTreatment.id.toString(),
                veterianId: deletedTreatment?.veterianId ? deletedTreatment.veterianId.toString() : null,
                cowId: deletedTreatment?.cowId ? deletedTreatment.cowId.toString() : null
            }
        }, { status: 200});
    } catch (error) {
        console.error("Error deleting treatment data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // ดึงค่าจาก Query Parameters
        const id = searchParams.get("id")
        const nameDisease = searchParams.get("nameDisease")
        const events = searchParams.get("events")
        const details = searchParams.get("details")
        const date = searchParams.get("date")
        const drugName = searchParams.get("drugName")
        const status = searchParams.get("status")
        const responsibleMan = searchParams.get("responsibleMan")
        const notation = searchParams.get("notation")
        const veterianId = searchParams.get("veterianId")
        const cowId = searchParams.get("cowId")

        // แปลงค่าให้ตรงกับประเภทที่ต้องการ
        const query = {
            id: id ? BigInt(id) : null,
            nameDisease: nameDisease || null,
            events: events || null,
            details: details || null,
            date: date ? new Date(date) : null,
            drugName: drugName || null,
            status: status || null,
            responsibleMan: responsibleMan || null,
            notation: notation || null,
            veterianId: veterianId ? BigInt(veterianId) : null,
            cowId: cowId ? BigInt(cowId) : null
        }

        // เรียกใช้ฟังก์ชัน `getTreatmentData()`
        const treatment = await treatmentData.getTreatmentData(
            query.id,
            query.nameDisease,
            query.events,
            query.details,
            query.date,
            query.drugName,
            query.status,
            query.responsibleMan,
            query.notation,
            query.veterianId,
            query.cowId
        )

        if (!treatment) {
            return NextResponse.json({ error: "Cow not found" }, { status: 404 });
        }

        return NextResponse.json({
            treatment: {
                ...treatment,
                id: treatment.id.toString(),
                veterianId: treatment.veterianId?.toString() || null,
                cowId: treatment.cowId?.toString() || null
            }
        }, { status: 200});
    } catch (error) {
        console.error("Error fetching treatment data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}