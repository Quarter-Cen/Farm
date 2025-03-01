import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
      const body = await req.json();
      console.log("Received body:", body); 

      const { date, quantityOfProduct, cowZone, supervisorId } = body;

      if (!date || !quantityOfProduct || !cowZone || !supervisorId) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      const newProductReport = await prisma.productReport.create({
        data: {
          date: new Date(date),
          quantityOfProduct,
          cowZone,
          supervisor: {
            connect: { id: BigInt(supervisorId) }
          }
        }
      });

      console.log("Created Product Report:", newProductReport); 

        const jsonResponse = JSON.stringify(newProductReport, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
      );

      return new NextResponse(jsonResponse, { status: 201, headers: { "Content-Type": "application/json" } });
    } catch (error:any) {
      console.error("Error in API:", error.stack);
      return NextResponse.json({ error: "Failed to create product report" }, { status: 500 });
    }
  }