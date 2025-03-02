import { PrismaClient, ProductReport } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
        try {
            const res = await prisma.productReport.findMany();

            const jsonResponse = JSON.stringify(res, (key, value) =>
                typeof value === "bigint" ? value.toString() : value
            );
                return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
        } catch (error) {
            console.error('Error fetching all exports:', error);
            return [];
        }
    }