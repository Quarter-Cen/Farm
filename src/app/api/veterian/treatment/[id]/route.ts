import { NextRequest, NextResponse } from "next/server";
import { TreatmentService } from "@/services/TreatmentData";

let treatmentService = new TreatmentService()

//[GET] ดึงข้อมูลการรักษาตาม ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = BigInt(params.id);

        const treatment = await treatmentService.getTreatmentByID(id);

        if (!treatment) {
            return NextResponse.json({ error: "Treatment not found" }, { status: 404 });
        }

        return NextResponse.json(treatment, { status: 200 });
    } catch (error) {
        console.error("Error fetching treatment:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}