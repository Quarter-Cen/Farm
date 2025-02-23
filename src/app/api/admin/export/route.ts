import { NextRequest, NextResponse } from "next/server";
import { ExportService } from "@/services/export";
import { ExportStatus } from '@prisma/client'
let exportService = new ExportService()

export async function GET(req: NextRequest) {
    try {
        const exp = await exportService.getAllExports();

        if (!exp || exp.length === 0) {
            return NextResponse.json({ error: "Export not found" }, { status: 404 });
        }

        const jsonResponse = JSON.stringify(exp, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        return new NextResponse(jsonResponse, { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        console.error("Error fetching Export:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


export async function POST(req: Request) {
    const body = await req.json();
    const { customer,quantity,status,type,destination,pricePerQuantity,adminId,paymentMethodId } = body
    if (!Object.values(ExportStatus).includes(status as ExportStatus)) {
        throw new Error('Invalid exportStatus value');
    }
    try {
      const newExport = await exportService.addExport(
          customer,
          quantity,
          status as ExportStatus,
          type,
          destination,
          pricePerQuantity,
          BigInt(adminId),
          BigInt(paymentMethodId)
        );
  
          const jsonResponse = JSON.stringify(newExport, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
        );

        return new NextResponse(jsonResponse, { status: 201, headers: { "Content-Type": "application/json" } });
    } catch (error:any) {
      console.error(error.stack);
      return NextResponse.json({ error: 'Failed to create export' }, { status: 500 });
    }
  }
  

