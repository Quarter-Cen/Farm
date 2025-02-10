import { ExportService } from "@/services/export";
import { NextResponse } from "next/server"

export async function GET(request: Request){
    try {
        let getExport = new ExportService()
        let getResponse = await getExport.getAllExports()
        return NextResponse.json({ data : getResponse}, { status: 200 })
    } catch (error:any) {
        console.error("Error fetching export:", error)
        return NextResponse.json(
            { message: "Error fetching export", error: error.message },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        let data = await request.json()
        let addExport = new ExportService()
        let item = data as { customer: string, quantity: number, status: string, type: string, destination: string, pricePerQuantity: number }
        let addResponse = await addExport.addExport(item.customer, item.quantity, item.status, item.type, item.destination, item.pricePerQuantity)
        return NextResponse.json({ message: addResponse }, { status: 200 })
    } catch (error:any) {
        console.error("Error adding export:", error)
        return NextResponse.json(
            { message: "Error adding export", error: error.message },
            { status: 500 }
        )
    }
}


