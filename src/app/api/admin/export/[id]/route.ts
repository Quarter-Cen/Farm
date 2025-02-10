import { ExportService } from "@/services/export";
import { NextResponse } from "next/server"

export async function  GET(request: Request, { params }: { params: { id: string } }){
        try { 
            const Id = BigInt(params.id)
            let getExportByID = new ExportService()
            let getResponse = await getExportByID.getExportByID(Id)
            return NextResponse.json({ data : getResponse}, { status: 200 })
        } catch (error:any) {
            console.error("Error fetching export:", error)
            return NextResponse.json(
                { message: "Error fetching export", error: error.message },
                { status: 500 }
            )
        }
} 

export async function PUT(request: Request, { params }: { params: { id: string } }){
    try {
        const Id = BigInt(params.id)
        const exportService = new ExportService()

        const currentStock = await exportService.getExportByID(Id);
        if (!currentStock) {
            return NextResponse.json(
                { message: "Export not found" },
                { status: 404 }
            )
        }

        const updatedData = await request.json()
        const newExportData = { ...currentStock, ...updatedData };
        const editResponse = await exportService.editExport(Id, newExportData);
        return NextResponse.json({ detail: editResponse }, { status: 200 });
    } catch (error: any) {
        console.error("Error editing export:", error);
        return NextResponse.json(
            { message: "Error editing export", error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }){
    try { 
        const Id = BigInt(params.id)
        let delExportByID = new ExportService()
        let delResponse = await delExportByID.deleteExport(Id)
        return NextResponse.json({ message : delResponse}, { status: 200 })
    } catch (error:any) {
        console.error("Error deleting export:", error)
        return NextResponse.json(
            { message: "Error deleting export", error: error.message },
            { status: 500 }
        )
    }
}

