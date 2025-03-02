// app/api/stock/update/route.ts
import { NextResponse } from "next/server";
import { StockService } from "@/services/stock";

const stockService = new StockService();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const id =  await params
    const { quantity, status } = await request.json();

    try {
        const updatedStock = await stockService.updateStock(
            BigInt(id.id), 
            quantity, 
            status
        );
        const jsonResponse = JSON.stringify(updatedStock, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );
    

        if (jsonResponse) {
            return new NextResponse(jsonResponse, { status: 201, headers: { "Content-Type": "application/json" } });
        } else {
            return NextResponse.json({ message: "Stock not found" }, { status: 404 });
        }
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
