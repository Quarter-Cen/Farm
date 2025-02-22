import { NextRequest, NextResponse } from "next/server";
import { TreatmentService } from "@/services/TreatmentData";

let treatmentService = new TreatmentService()

//GetCowWithTreatment
export async function GET(req: NextRequest) {
    try {
        const treatments = await treatmentService.getCowWithTreatment();

        const formattedTreatments = treatments.map((treatment) => ({
            id: treatment.id.toString(),
            nameDisease: treatment.nameDisease,
            events: treatment.events,
            details: treatment.details,
            date: treatment.date,
            drugName: treatment.drugName,
            status: treatment.status,
            notation: treatment.notation,
            veterianId: treatment.veterianId.toString(),
            cowId: treatment.cowId.toString(),
            cow: treatment.cow
                ? {
                    id: treatment.cow.id.toString(),
                    name: treatment.cow.name,
                    gender: treatment.cow.gender,
                    age: treatment.cow.age,
                    weight: treatment.cow.weight,
                    birthDate: treatment.cow.birthDate,
                    breed: treatment.cow.breed,
                    healthStatus: treatment.cow.healthStatus,
                }
                : null,
            veterian: treatment.veterian
                ? {
                    id: treatment.veterian.id.toString(),
                    // name: treatment.veterian.name,
                }
                : null,
        }));

        return NextResponse.json(formattedTreatments, { status: 200 });
    } catch (error) {
        console.error("Error fetching treatments:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// CREATE
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const requiredFields = ["nameDisease", "events", "details", "date", "drugName", "status", "notation", "veterianId", "cowId", "cowWeight"];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json({ error: `${field} is required` }, { status: 400 });
            }
        }

        const newTreatment = await treatmentService.AddTreatmentData(
            body.nameDisease,
            body.events,
            body.details,
            new Date(body.date),
            body.drugName,
            body.status,
            body.notation,
            BigInt(body.veterianId),
            BigInt(body.cowId),
            body.cowWeight
        );

        if (!newTreatment) {
            return NextResponse.json({ error: "Failed to create treatment record" }, { status: 500 });
        }

        const formattedTreatment = {
            ...newTreatment,
            id: newTreatment.id.toString(),
            veterianId: newTreatment.veterianId.toString(),
            cowId: newTreatment.cowId.toString(),
        };

        return NextResponse.json(formattedTreatment, { status: 201 });
    } catch (error) {
        console.error("Error creating treatment:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}