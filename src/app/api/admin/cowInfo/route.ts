import { CowService } from "@/services/cowInformation";
import { NextResponse } from "next/server"

export async function GET(request: Request){
    try {
        let getCow = new CowService()
        let getResponse = await getCow.getAllCow()
        return NextResponse.json({ data : getResponse}, { status: 200 })
    } catch (error:any) {
        console.error("Error fetching cow:", error)
        return NextResponse.json(
            { message: "Error fetching cow", error: error.message },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        let data = await request.json()
        let addCow = new CowService()
        let item = data as { name: string, gender: string, age: number, birthDate: Date, breed: string, healthStatus: string }
        let addResponse = await addCow.AddCow(item.name, item.gender, item.age, item.birthDate, item.breed, item.healthStatus)
        return NextResponse.json({ message: addResponse }, { status: 200 })
    } catch (error:any) {
        console.error("Error adding cow:", error)
        return NextResponse.json(
            { message: "Error adding cow", error: error.message },
            { status: 500 }
        )
    }
}


