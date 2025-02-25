import { NextRequest, NextResponse } from "next/server";
import { ExportStatus, HealthStatus } from "@prisma/client";
import { ExportService } from "@/services/export";

let exportService = new ExportService()

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id =  await params
        const expId = BigInt(id.id); // แปลง id เป็น BigInt
        const res = await exportService.getExportByID(expId);

        if (!res) {
            return NextResponse.json({ error: "Export not found" }, { status: 404 });
        }
        
        const jsonResponse = JSON.stringify(res, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error fetching cow:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

interface ExportData {
    customer: string;
    quantity: number;
    status: ExportStatus;
    type: string;
    destination: string;
    pricePerQuantity: number;
    adminId: bigint;
    paymentMethodId: bigint;
  }

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const id =  await params
    const body: ExportData = await req.json();
    console.log(body)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid or empty payload' }, { status: 400 });
    }
  
    const { customer,quantity,status,type,destination,pricePerQuantity,adminId,paymentMethodId } = body
    try {
      if (!id) {
        throw new Error("ID is required");
      }
  

      if (!ExportStatus || !Object.values(ExportStatus).includes(status as ExportStatus)) {
        return NextResponse.json({ error: "Invalid exportStatus value" }, { status: 400 });
      }

      const res = await exportService.editExport(BigInt(id.id), {
        customer,
        quantity,
        status : status as ExportStatus,
        type,
        destination,
        pricePerQuantity,
        adminId: BigInt(adminId), 
        methodId: BigInt(paymentMethodId)
      });
  
      const jsonResponse = JSON.stringify(res, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
    );

    return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error: any) {
      console.error(error.stack); // ตรวจสอบข้อผิดพลาด
      return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
  }

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id =  await params
        const expId =  BigInt(id.id); // แปลง id เป็น BigInt
        const res = await exportService.deleteExport(expId);

        if (!res) {
            return NextResponse.json({ error: "Export not found" }, { status: 404 });
        }

        const jsonResponse = JSON.stringify(res, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error deleting export:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
