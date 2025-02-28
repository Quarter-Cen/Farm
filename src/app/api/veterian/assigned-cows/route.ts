import { NextRequest, NextResponse } from "next/server";
import { CowService } from "@/services/cowInformation";

let cowService = new CowService()

export async function GET(req: NextRequest) {
    try {
        
        // ดึง vetId จาก query parameters
        const { searchParams } = new URL(req.url);
        const vetId = searchParams.get("vetId");

        console.log(vetId)
        // เช็คว่า vetId มีอยู่และเป็นตัวเลขที่ถูกต้องหรือไม่
        if (!vetId || isNaN(Number(vetId))) {
            return NextResponse.json({ error: "Invalid vetId" }, { status: 400 });
        }

        const cow = await cowService.getAllCowByVetID(BigInt(vetId));

        const jsonResponse = JSON.stringify(cow, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error fetching cow:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}