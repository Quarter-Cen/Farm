import { FoodImp } from "@prisma/client";

export interface iStockInformationService {
    getAllStock() : Promise<FoodImp[]>
    addPurchaseOrder(
        name: string,
        date: Date,
        importFrom: string,
        type: string,
        quantity: number,
        pricePerUnit: number,
        adminId: bigint
      ): Promise<FoodImp | null>
      editStock(id: bigint, updatedData: Partial<FoodImp>) : Promise<FoodImp | null>
      getStockById(id: bigint) : Promise<FoodImp | null>
      deleteStock(id: bigint): Promise<void>
}