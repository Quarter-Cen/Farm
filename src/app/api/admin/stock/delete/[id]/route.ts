// app/api/stock/delete/route.ts
import { NextResponse } from "next/server";
import { StockService } from "@/services/stock";

const stockService = new StockService();


export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const id =  await params

    try {
        await stockService.deleteStock(BigInt(id.id));
        return NextResponse.json({}, { status: 204 });
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
