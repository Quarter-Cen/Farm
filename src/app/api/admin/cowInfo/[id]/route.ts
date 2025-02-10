import { CowService } from "@/services/cowInformation";
import { NextResponse } from "next/server"

export async function  GET(request: Request, { params }: { params: { id: string } }){
        try { 
            const cowId = BigInt(params.id)
            let getCowByID = new CowService()
            let getResponse = await getCowByID.getCowByID(cowId)
            return NextResponse.json({ data : getResponse}, { status: 201 })
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
        const cowId = BigInt(params.id)
        let editCow = new CowService()
        const updatedData = await request.json()
        let editResponse = await editCow.editCow(cowId, updatedData)
        
        return NextResponse.json({ detail : editResponse}, { status: 201 })
    } catch (error:any) {
        console.error("Error editing cow:", error)
        return NextResponse.json(
            { message: "Error editing cow", error: error.message },
            { status: 500 }
        )
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }){
    try { 
        const cowId = BigInt(params.id)
        let delCowByID = new CowService()
        let delResponse = await delCowByID.deleteCow(cowId)
        return NextResponse.json({ message : delResponse}, { status: 201 })
    } catch (error:any) {
        console.error("Error deleting cow:", error)
        return NextResponse.json(
            { message: "Error deleting cow", error: error.message },
            { status: 500 }
        )
    }
}

