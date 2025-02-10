import { CowService } from "@/services/cowInformation";
import { NextResponse } from "next/server"

export async function  GET(request: Request, { params }: { params: { id: string } }){
        try { 
            const cowId = BigInt(params.id)
            let getCowByID = new CowService()
            let getResponse = await getCowByID.getCowByID(cowId)
            return NextResponse.json({ data : getResponse}, { status: 200 })
        } catch (error:any) {
            console.error("Error fetching cow:", error)
            return NextResponse.json(
                { message: "Error fetching cow", error: error.message },
                { status: 500 }
            )
        }
} 

export async function PUT(request: Request, { params }: { params: { id: string } }){
try {
        const Id = BigInt(params.id)
        const cowService = new CowService()

        const currentStock = await cowService.getCowByID(Id);
        if (!currentStock) {
            return NextResponse.json(
                { message: "Cow not found" },
                { status: 404 }
            )
        }

        const updatedData = await request.json()
        const newCowData = { ...currentStock, ...updatedData };
        const editResponse = await cowService.editCow(Id, newCowData);
        return NextResponse.json({ detail: editResponse }, { status: 200 });
    } catch (error: any) {
        console.error("Error editing cow:", error);
        return NextResponse.json(
            { message: "Error editing cow", error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }){
    try { 
        const cowId = BigInt(params.id)
        let delCowByID = new CowService()
        let delResponse = await delCowByID.deleteCow(cowId)
        return NextResponse.json({ message : delResponse}, { status: 200 })
    } catch (error:any) {
        console.error("Error deleting cow:", error)
        return NextResponse.json(
            { message: "Error deleting cow", error: error.message },
            { status: 500 }
        )
    }
}

