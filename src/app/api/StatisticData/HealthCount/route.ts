import { NextRequest, NextResponse } from "next/server";
import { HealthCountData } from "@/services/healthCounts";

let healthCountsData = new HealthCountData();

export async function  GET(req: NextRequest) {
    try {
        const healthCounts = await healthCountsData.getCattleHealthStats();
        return new Response(JSON.stringify(healthCounts), { status: 200});
    } catch (error) {
        console.error("Error fetching health counts:", error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch health count' }),
            { status: 500 }
        );
    }
}