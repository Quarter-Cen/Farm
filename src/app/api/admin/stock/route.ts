import { StockService } from "@/services/stock";
import { NextResponse } from "next/server"

export async function GET(request: Request){
    try {
        let getStock = new StockService()
        let getResponse = await getStock.getAllStock()
        return NextResponse.json({ data : getResponse}, { status: 200 })
    } catch (error:any) {
        console.error("Error fetching stock:", error)
        return NextResponse.json(
            { message: "Error fetching stock", error: error.message },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        let data = await request.json()
        let addStock = new StockService()
        let item = data as { name: string, date: Date, importFrom: string, type: string, quantity: number, pricePerUnit: number, adminId: bigint }
        let addResponse = await addStock.addPurchaseOrder(item.name, item.date, item.importFrom, item.type, item.quantity, item.pricePerUnit, item.adminId)
        return NextResponse.json({ message: addResponse }, { status: 200 })
    } catch (error:any) {
        console.error("Error adding stock:", error)
        return NextResponse.json(
            { message: "Error adding stock", error: error.message },
            { status: 500 }
        )
    }
}


