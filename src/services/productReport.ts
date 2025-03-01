import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createProductReport(date: Date, quantityOfProduct: number, cowZone: string, supervisorId: bigint) {
  try {
    if (!date || !quantityOfProduct || !cowZone || !supervisorId) {
      throw new Error("Missing required fields");
    }

    const newProductReport = await prisma.productReport.create({
      data: {
        date: date,
        quantityOfProduct: quantityOfProduct,
        cowZone: cowZone, 
        supervisor: {
          connect: { id: supervisorId } 
        }
      }
    });

    console.log("Product Report Created:", newProductReport);
    return newProductReport;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating product report:", error.message);
    } else {
      console.error("Unknown error occurred:", error);
    }
    throw error;
  }
}
