// app/api/stock/use/route.ts
import { NextResponse } from "next/server";
import { StockService } from "@/services/stock";

const stockService = new StockService();

export async function POST(request: Request) {
    const { stockId, quantity, usedById } = await request.json();

    try {
        const stockUsage = await stockService.useStock(
            BigInt(stockId), 
            quantity, 
            BigInt(usedById)
        );

        if (stockUsage) {
            return NextResponse.json(stockUsage);
        } else {
            return NextResponse.json({ message: "Error using stock" }, { status: 400 });
        }
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
