import { NextRequest, NextResponse } from "next/server";
import { WeightData } from "@/services/weightData"; // นำเข้าฟังก์ชัน getWeight

let weightData = new WeightData();

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // ดึงค่าจาก Query Parameters
        const weight = searchParams.get("weight");
        const recordedAt = searchParams.get("recordedAt");

        // แปลงค่าประเภทให้ตรง
        const query = {
            weight: weight ? parseFloat(weight) : null,
            recordedAt: recordedAt ? new Date(recordedAt) : null
        };

        // เรียกใช้ฟังก์ชัน `getWeight()`
        const weightDta = await weightData.getWeight(query.weight, query.recordedAt);

        // ตรวจสอบว่ามีข้อมูลหรือไม่
        if (weightDta.length === 0) {
            return NextResponse.json({ error: "No weight data found" }, { status: 404 });
        }

        console.log("✅ Sending Response:", weightDta); // Debug API Response
        return NextResponse.json({ weightDta }, { status: 200 });

    } catch (error) {
        console.error("Error fetching cow weight data:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
