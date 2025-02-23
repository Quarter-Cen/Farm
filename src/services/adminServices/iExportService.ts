import { Export } from "@prisma/client";
import { ExportStatus } from '@prisma/client'
export interface iExportService {
  addExport(
    customer: string,
    quantity: number,
    status: ExportStatus,
    type: string,
    destination: string,
    pricePerQuantity: number,
    adminID : bigint,
    paymentID : bigint
  ): Promise<Export | null>
  editExport(id: bigint, updatedData: Partial<Export>) : Promise<Export | null>
  deleteExport(id: bigint): Promise<string>
  getAllExports(): Promise<Export[]>
  getExportByID(id: bigint): Promise<Export | null>
}

