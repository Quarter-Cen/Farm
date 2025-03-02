import { PrismaClient, ProductReport } from "@prisma/client";

const prisma = new PrismaClient();

async function getAllExports(): Promise<ProductReport[]> {
        try {
            return await prisma.productReport.findMany();
        } catch (error) {
            console.error('Error fetching all exports:', error);
            return [];
        }
    }