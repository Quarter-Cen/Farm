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

        if (updatedStock) {
            return NextResponse.json(updatedStock);
        } else {
            return NextResponse.json({ message: "Stock not found" }, { status: 404 });
        }
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
