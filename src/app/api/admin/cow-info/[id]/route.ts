import { NextRequest, NextResponse } from "next/server";
import { CowService } from "@/services/cowInformation";

let cowService = new CowService()

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id =  await params
        const cowId = BigInt(id.id); // แปลง id เป็น BigInt
        const cow = await cowService.getCowByID(cowId);

        if (!cow) {
            return NextResponse.json({ error: "Cow not found" }, { status: 404 });
        }
        
        const jsonResponse = JSON.stringify(cow, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error fetching cow:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id =  await params
        const cowId =  BigInt(id.id); // แปลง id เป็น BigInt
        const deletedCow = await cowService.deleteCow(cowId);

        if (!deletedCow) {
            return NextResponse.json({ error: "Cow not found" }, { status: 404 });
        }

        const jsonResponse = JSON.stringify(deletedCow, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error deleting cow:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}