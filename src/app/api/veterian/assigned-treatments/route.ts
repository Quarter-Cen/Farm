import { NextRequest, NextResponse } from "next/server";
import { TreatmentService } from "@/services/TreatmentData";

let treatmentService = new TreatmentService()

export async function GET(req: NextRequest) {
    try {
        
        // ดึง vetId จาก query parameters
        const { searchParams } = new URL(req.url);
        const vetId = searchParams.get("vetId");


        // เช็คว่า vetId มีอยู่และเป็นตัวเลขที่ถูกต้องหรือไม่
        if (!vetId || isNaN(Number(vetId))) {
            return NextResponse.json({ error: "Invalid vetId" }, { status: 400 });
        }

        const treatment = await treatmentService.getAllTreatmentByVetID(BigInt(vetId));

        const jsonResponse = JSON.stringify(treatment, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error fetching treatment:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}