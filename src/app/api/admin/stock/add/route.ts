// app/api/stock/update/route.ts
import { NextResponse } from "next/server";
import { StockService } from "@/services/stock";

const stockService = new StockService();

export async function POST(request: Request) {
    const { name, date, importFrom, type, quantity, pricePerUnit, adminId} = await request.json();

    try {
        const stock = await stockService.addStock(
            name, 
            new Date(date), 
            importFrom, 
            type, 
            Number(quantity), 
            Number(pricePerUnit), 
            BigInt(adminId), 

        );
        
        const jsonResponse = JSON.stringify(stock, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );
    

        if (stock) {
            return new NextResponse(jsonResponse, { status: 201, headers: { "Content-Type": "application/json" } });
        } else {
            return NextResponse.json({ message: "Error adding stock" }, { status: 400 });
        }
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}