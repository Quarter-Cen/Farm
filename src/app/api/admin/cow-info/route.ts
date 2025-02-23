import { NextRequest, NextResponse } from "next/server";
import { CowService } from "@/services/cowInformation";
import { HealthStatus } from "@prisma/client";

let cowService = new CowService()

export async function GET(req: NextRequest) {
    try {
        const cow = await cowService.getAllCow();

        if (!cow || cow.length === 0) {
            return NextResponse.json({ error: "Cow not found" }, { status: 404 });
        }

        const jsonResponse = JSON.stringify(cow, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error fetching cow:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, gender, age, birthDate, breed, healthStatus, weight, veterianId } = body;

        // ตรวจสอบค่า ENUM HealthStatus
        if (!Object.values(HealthStatus).includes(healthStatus)) {
            return NextResponse.json({ error: "Invalid health status" }, { status: 400 });
        }

        const newCow = await cowService.AddCow(
            name,
            gender,
            age,
            new Date(birthDate),
            breed,
            healthStatus,
            weight,
            veterianId ? BigInt(veterianId) : undefined
        );

        const jsonResponse = JSON.stringify(newCow, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        return new NextResponse(jsonResponse, { status: 201, headers: { "Content-Type": "application/json" } });

    } catch (error) {
        console.error("Error creating cow:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


