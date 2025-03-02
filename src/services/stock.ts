import { PrismaClient, Stock, StockUsage, StockStatus, FoodType, FoodImp } from "@prisma/client";
import { iStockService } from "./adminServices/iStockService";

const prisma = new PrismaClient();

export class StockService implements iStockService {
    async addStock(name: string, date: Date, importFrom: string, type: FoodType, quantity: number, pricePerUnit: number, adminId: bigint): Promise<Stock | null> {
        try {
            // 📌 1. สร้าง log ใน `FoodImp`
            const foodImp = await prisma.foodImp.create({
                data: {
                    name,
                    date,
                    importFrom,
                    type,
                    quantity,
                    pricePerUnit,
                    adminId,
                },
            });

            // 📌 2. ตรวจสอบว่า Stock มี `FoodType` นี้อยู่แล้วหรือไม่
            let stock = await prisma.stock.findFirst({
                where: {
                    type: type,  // ค้นหาด้วย type
                },
            });

            if (stock) {
                // 📌 3. ถ้ามีอยู่แล้ว → อัปเดตจำนวน
                stock = await prisma.stock.update({
                    where: { id: stock.id },
                    data: { quantity: stock.quantity + quantity },
                });
            } else {
                // 📌 4. ถ้ายังไม่มี → สร้างใหม่
                stock = await prisma.stock.create({
                    data: {
                        type,
                        quantity,
                        unit: 1, // กำหนดค่าเริ่มต้น
                        status: StockStatus.AVAILABLE,
                    },
                });
            }


            return stock;
        } catch (error:any) {
            console.error("Error adding stock:", error.stack);
            return null;
        }
    }

    async updateStock(stockId: bigint, quantity: number, status?: StockStatus): Promise<Stock | null> {
        try {
            return await prisma.stock.update({
                where: { id: stockId },
                data: { quantity, status },
            });
        } catch (error) {
            console.error("Error updating stock:", error);
            return null;
        }
    }

    async deleteStock(stockId: bigint): Promise<void> {
        try {
            await prisma.stock.delete({ where: { id: stockId } });
        } catch (error) {
            console.error("Error deleting stock:", error);
            throw new Error("Unable to delete stock");
        }
    }

    async getStockById(stockId: bigint): Promise<Stock | null> {
        try {
            return await prisma.stock.findUnique({ where: { id: stockId } });
        } catch (error) {
            console.error("Error fetching stock by ID:", error);
            return null;
        }
    }

    async getAllStock(): Promise<Stock[]> {
        try {
            return await prisma.stock.findMany();
        } catch (error) {
            console.error("Error fetching all stock:", error);
            return [];
        }
    }

    async useStock(foodType: FoodType, quantity: number, usedById: bigint): Promise<StockUsage | null> {
        try {
            // ค้นหาสต็อกที่ตรงกับ foodType
            const stock = await prisma.stock.findFirst({ where: { type: foodType } });
    
            // ตรวจสอบว่า stock มีอยู่หรือไม่ และจำนวนเพียงพอหรือไม่
            if (!stock || stock.quantity < quantity) {
                throw new Error("Not enough stock available");
            }
    
            // สร้างการใช้งาน stock โดยใช้ stockId จาก stock ที่ได้
            const stockUsage = await prisma.stockUsage.create({
                data: { 
                    stockId: stock.id, // ใช้ stockId แทน foodType
                    quantity, 
                    usedById 
                },
            });
    
            // อัปเดตจำนวน stock หลังจากใช้งาน
            await prisma.stock.update({
                where: { id: stock.id },
                data: { quantity: stock.quantity - quantity },
            });
    
            return stockUsage;
        } catch (error:any) {
            console.error("Error using stock:", error.stack);
            return null;
        }
    }
    

        async getAllFoodImp(): Promise<FoodImp[] | null> {
        
            try {
            const foodImp = await prisma.foodImp.findMany();
            console.log(foodImp)

            return foodImp;
    
            } catch (error:any) {
                console.error("Error fetching order by ID:", error.stack)
            return null
            }
        }

        async getAllUsage(): Promise<any[] | null> {
            try {
                const stockUsages = await prisma.stockUsage.findMany({
                    include: {
                        usedBy: {     // เชื่อมโยงกับ DairyWorker
                            include: {
                                user: true,  // เชื่อมโยงกับ User ผ่าน DairyWorker
                            },
                        },
                    },
                });
        
                // Return the data from stockUsage with dairyworker and user info
                return stockUsages.map((usage) => ({
                    id: usage.id,
                    stockId: usage.stockId,
                    quantity: usage.quantity,
                    usedById: usage.usedById,
                    usedAt: usage.usedAt,
                    usedBy: {
                        id: usage.usedBy.id,
                        userId: usage.usedBy.userId,
                        user: {
                            id: usage.usedBy.user.id,
                            firstName: usage.usedBy.user.firstName,
                            lastName: usage.usedBy.user.lastName,
                            email: usage.usedBy.user.email,
                            phoneNumber: usage.usedBy.user.phoneNumber,
                        },
                    },
                }));
            } catch (error: any) {
                console.error("Error fetching stock usage:", error.stack);
                return null;
            }
        }
        
        

        
    
}
