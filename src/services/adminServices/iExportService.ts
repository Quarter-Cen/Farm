import { Export } from "@prisma/client";

export interface iExportService {
  addExport(
    cowName: string,
    customer: string,
    quantity: number,
    status: string,
    type: string,
    destination: string,
    pricePerQuantity: number
  ): Promise<Export | null>
  editExport(id: bigint, updatedData: Partial<Export>) : Promise<Export | null>
  deleteExport(id: bigint): Promise<string>
  getAllExports(): Promise<Export[]>
  getExportByID(id: bigint): Promise<Export | null>
}

