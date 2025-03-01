import { Stock, StockUsage, FoodImp, FoodType, StockStatus } from "@prisma/client";

export interface iStockService {
    addStock(name: string, date: Date, importFrom: string, type: FoodType, quantity: number, pricePerUnit: number, adminId: bigint, stockId :bigint): Promise<Stock | null>;
    updateStock(stockId: bigint, quantity: number, status?: StockStatus): Promise<Stock | null>;
    deleteStock(stockId: bigint): Promise<void>;
    getStockById(stockId: bigint): Promise<Stock | null>;
    getAllStock(): Promise<Stock[]>;
    useStock(stockId: bigint, quantity: number, usedById: bigint): Promise<StockUsage | null>;
}
