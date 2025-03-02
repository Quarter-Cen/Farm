
import { UserService } from "@/services/user";
import { NextResponse } from "next/server";


const stockService = new UserService();

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id =  await params

    try {
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


export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = await params;
    const userData = await request.json();  // รับข้อมูลที่ถูกส่งมาจาก Body

    try {
        const updatedUser = await stockService.updateUser(
            BigInt(id), // ใช้ BigInt เพื่อรองรับการค้นหาผู้ใช้ตาม ID
            userData.firstName,
            userData.lastName,
            userData.gender,
            Number(userData.employmentDuration),
            userData.workLocation,
            userData.salary,
            userData.startDate,
            userData.workHour,
            userData.phoneNumber,
            userData.address,
            userData.birthdate,
            userData.roles
        );

        if (updatedUser) {
            const jsonResponse = JSON.stringify(updatedUser, (key, value) =>
                typeof value === "bigint" ? value.toString() : value
            );
            return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
        } else {
            return NextResponse.json({ message: "Failed to update user" }, { status: 400 });
        }
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
