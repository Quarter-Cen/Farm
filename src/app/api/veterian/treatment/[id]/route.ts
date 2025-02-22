import { NextRequest, NextResponse } from "next/server";
import { TreatmentService } from "@/services/TreatmentData";

let treatmentService = new TreatmentService()

//[GET] ดึงข้อมูลการรักษาตาม ID
export async function GET(req: NextRequest, params: { params: { id: string } }) {
    try {
        const {id} = await params.params;

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
export async function DELETE(req: NextRequest, params: { params: { id: string}}) {
    try {
        const {id} = await params.params;
        const deleteTreamrnt = await treatmentService.deleteTreatmentData(BigInt(id))

        if (!deleteTreamrnt) {
            return NextResponse.json({ error: "Treatment not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Treatment deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting treatment:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}