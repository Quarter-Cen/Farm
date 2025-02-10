import { NextRequest, NextResponse } from "next/server";
import { HealthIssueData } from "@/services/healthProblems";

let healthProblems = new HealthIssueData();

export async function GET(req: NextRequest) {
    try {
        const healthIssues = await healthProblems.getHealthIssues();
        return new Response(JSON.stringify(healthIssues), { status: 200 });
    } catch (error) {
        console.error("Error fetching health issues:", error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch health issues' }),
            { status: 500 }
        );
    }
}