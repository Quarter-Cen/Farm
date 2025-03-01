import { UserService } from "@/services/user";
import { NextRequest, NextResponse } from "next/server";


let exportService = new UserService()

export async function GET(req: NextRequest) {
    try {
        const exp = await exportService.getAllUser();

        if (!exp || exp.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const jsonResponse = JSON.stringify(exp, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error fetching User:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


  

