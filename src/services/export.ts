import { PrismaClient } from "@prisma/client/extension";
import { iExportService } from "./adminServices/iExportService";
import { Export } from "@prisma/client";

const prisma = new PrismaClient();

export class ExportService implements iExportService {
    async addExport(customer: string, quantity: number, status: string, type: string, destination: string, pricePerQuantity: number): Promise<Export | null> {
        try {
            if(customer == '' || status =='' || type == ''|| destination ==''){
                console.error('No field has to be empty')
                return null
            }
            return await prisma.export.create({
                data: {
                    customer: customer,
                    quantity: quantity,
                    status: status,
                    type: type,
                    destination: destination,
                    pricePerQuantity: pricePerQuantity
                },
            })
        } catch (exception){
            console.error('Error adding export: ', exception)
            return null
        }
    }

    async deleteExport(id: bigint): Promise<string> {
        try {
            await prisma.export.delete({
                where: {
                    id: id,
                },
            });
            return 'Export deleted successfully';
        } catch (error) {
            console.error(error);
            return 'Error deleting Export';
        }
    }

    async editExport(id: bigint, updatedData: Partial<Export>): Promise<Export | null> {
        try {
            const updatedExport = await prisma.export.update({
                where: { id: id },
                data: updatedData,
            });
            return updatedExport;
        } catch (error) {
            console.error('Error editing export:', error);
            return null;
        }
    }

    async getAllExports(): Promise<Export[]> {
        try {
            return await prisma.export.findMany();
        } catch (error) {
            console.error('Error fetching all exports:', error);
            return [];
        }
    }

    async getExportByID(id: bigint): Promise<Export | null> {
        try {
            return await prisma.cow.findUnique({
                where: { id: id },
            });
        } catch (error) {
            console.error('Error fetching export by ID:', error);
            return null;
        }
    }
}
