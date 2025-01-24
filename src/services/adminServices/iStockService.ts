import { FoodImp } from "@prisma/client";

export interface iCowInformationService {
    getAllStock() : Promise<[FoodImp]>
    addPurchaseOrder(
        name: string,
        date: Date,
        importFrom: string,
        type: string,
        quantity: number,
        pricePerUnit: number
      ): Promise<FoodImp>
      editStock(id: bigint) : Promise<FoodImp>
      deleteStock(id: bigint): Promise<void>
}