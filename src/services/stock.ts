import { PrismaClient } from "@prisma/client";
import { iStockInformationService } from "./adminServices/iStockService";
import { FoodImp } from "@prisma/client";

const prisma = new PrismaClient();

export class StockService implements iStockInformationService {
    async addPurchaseOrder(
        name: string,
        date: Date,
        importFrom: string,
        type: string,
        quantity: number,
        pricePerUnit: number,
        adminId: bigint
    ): Promise<FoodImp | null> {
        try {
            return await prisma.foodImp.create({
                data: {
                    name: name,
                    date: date,
                    importFrom: importFrom,
                    type: type,
                    quantity: quantity,
                    pricePerUnit: pricePerUnit,
                    adminId: adminId
                },
            });
        } catch (error:any) {
            console.log("Error adding purchase order:", error.stack);
            throw new Error("Failed to add order");
        }
    }

    async deleteStock(id: bigint): Promise<void> {
        try {
            await prisma.foodImp.delete({
                where: { id: id },
            });
        } catch (error) {
            console.error("Error deleting stock:", error);
            throw new Error("Unable to delete stock");
        }
    }

    async editStock(id: bigint, updatedData: Partial<FoodImp>): Promise<FoodImp | null> {
        try {
            return await prisma.foodImp.update({
                where: { id: id },
                data: updatedData,
            });
        } catch (error) {
            console.error("Error editing stock:", error);
            return null;
        }
    }

    async getAllStock(): Promise<FoodImp[]> {
        try {
            return await prisma.foodImp.findMany();
        } catch (error) {
            console.error("Error fetching all stock:", error);
            return [];
        }
    }

    async getStockById(id: bigint): Promise<FoodImp | null> {
        try {
            return await prisma.foodImp.findUnique({
                where: { id: id },
            });
        } catch (error) {
            console.error("Error fetching stock by ID:", error);
            return null;
        }
    }
}
