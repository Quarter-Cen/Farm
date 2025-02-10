import { PrismaClient, ProductReport } from "@prisma/client";
import { Role } from './loginServices/roles/supervisorRole';

const prisma = new PrismaClient();

export class ProductReportService {

    async getAllProductReports(): Promise<ProductReport[]> {
        return await prisma.productReport.findMany();
    }

    async getProductReportByID(id: bigint): Promise<ProductReport | null> {
        return await prisma.productReport.findUnique({
            where: { id: id },
        });
    }
    

    async addProductReport(
        date: Date,
        quantityOfProduct: number,
        cowZone: string,
        supervisorId: bigint,
        role: Role 
    ): Promise<ProductReport | null> {
        if (role.getRoleName() !== "Supervisor" && role.getRoleName() !== "DairyWorker") {
            console.error("You do not have permission to add this report");
            return null;
        }

        return await prisma.productReport.create({
            data: { date, quantityOfProduct, cowZone, supervisorId },
        });
    }

    async editProductReport(id: bigint, updatedData: Partial<ProductReport>): Promise<ProductReport | null> {
        return await prisma.productReport.update({
            where: { id: id },
            data: updatedData,
        });
    }

    async deleteProductReport(id: bigint): Promise<string> {
        await prisma.productReport.delete({ where: { id: id } });
        return "ProductReport deleted successfully";
    }
}
