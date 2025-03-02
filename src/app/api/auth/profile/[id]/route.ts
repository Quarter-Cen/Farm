
import { UserService } from "@/services/user";
import { NextResponse } from "next/server";


const stockService = new UserService();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id =  await params

    try {
        console.log(request.body)
        const user = await stockService.getUserById(BigInt(id.id));

        const jsonResponse = JSON.stringify(user, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        if (jsonResponse) {
            return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
        } else {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
    } catch (error:any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

