// app/api/stock/[stockId]/route.ts
import { NextResponse } from "next/server";
import { StockService } from "@/services/stock";

const stockService = new StockService();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id =  await params

    try {
        const stock = await stockService.getStockById(BigInt(id.id));
        console.log(stock)
        const jsonResponse = JSON.stringify(stock, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        if (jsonResponse) {
            return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
        } else {
            return NextResponse.json({ message: "Stock not found" }, { status: 404 });
        }
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
