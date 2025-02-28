import { NextRequest, NextResponse } from "next/server";
import { ExportStatus } from '@prisma/client'
import { StockService } from "@/services/stock";
let stockService = new StockService()

export async function GET(req: NextRequest) {
    try {
        const res = await stockService.getAllStock();

        if (!res || res.length === 0) {
            return NextResponse.json({ error: "Export not found" }, { status: 404 });
        }

        const jsonResponse = JSON.stringify(res, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error fetching Export:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


export async function POST(req: Request) {
    const body = await req.json();
    const { name,date,importFrom,type,quantity,pricePerQuantity,adminId } = body
    try {
      const res = await stockService.addPurchaseOrder(
          name,
          new Date(date),
          importFrom,
          type,
          quantity,
          pricePerQuantity,
          BigInt(adminId),
        );
  
          const jsonResponse = JSON.stringify(res, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        return new NextResponse(jsonResponse, { status: 201, headers: { "Content-Type": "application/json" } });
    } catch (error:any) {
      return NextResponse.json({ error: 'Failed to create export' }, { status: 500 });
    }
  }
  

