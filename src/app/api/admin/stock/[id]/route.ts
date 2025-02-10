import { StockService } from "@/services/stock";
import { NextResponse } from "next/server"

export async function  GET(request: Request, { params }: { params: { id: string } }){
        try { 
            const Id = BigInt(params.id)
            let getStockByID = new StockService()
            let getResponse = await getStockByID.getStockById(Id)
            return NextResponse.json({ data : getResponse}, { status: 200 })
        } catch (error:any) {
            console.error("Error fetching stock:", error)
            return NextResponse.json(
                { message: "Error fetching stock", error: error.message },
                { status: 500 }
            )
        }
} 

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const Id = BigInt(params.id)
        const stockService = new StockService()

        const currentStock = await stockService.getStockById(Id);
        if (!currentStock) {
            return NextResponse.json(
                { message: "Stock not found" },
                { status: 404 }
            )
        }

        const updatedData = await request.json()
        const newStockData = { ...currentStock, ...updatedData };
        const editResponse = await stockService.editStock(Id, newStockData);
        return NextResponse.json({ detail: editResponse }, { status: 200 });
    } catch (error: any) {
        console.error("Error editing stock:", error);
        return NextResponse.json(
            { message: "Error editing stock", error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }){
    try { 
        const Id = BigInt(params.id)
        let delStockByID = new StockService()
        let delResponse = await delStockByID.deleteStock(Id)
        return NextResponse.json({ message : delResponse}, { status: 200 })
    } catch (error:any) {
        console.error("Error deleting stock:", error)
        return NextResponse.json(
            { message: "Error deleting stock", error: error.message },
            { status: 500 }
        )
    }
}

