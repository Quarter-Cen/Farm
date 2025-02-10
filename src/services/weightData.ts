import { PrismaClient, Cow } from "@prisma/client";
import { IWeightData } from "./WeightData/IweightData";

const prisma = new PrismaClient();

export class WeightData implements IWeightData {
    async getWeight(
        weight: number | null,
        recordedAt: Date | null
    ): Promise<
        {
            month: string;
            averageWeight: number;
            minWeight: number;
            maxWeight: number;
        }[]
    > {
        try {
            const result = await prisma.cow.findMany({
                where: {
                    ...(weight ? { weight } : {}), // ถ้ามี weight ให้กรองตาม weight
                    ...(recordedAt && !isNaN(recordedAt.getTime())
                        ? { recordedAt }
                        : {}), // ตรวจสอบ recordedAt
                },
                orderBy: {
                    recordedAt: "asc", // เรียงตามวันที่
                },
            });
            console.log("📌 Raw Data from Database:", result); // Debug

            // ถ้าผลลัพธ์ว่าง ให้ return ค่ากลับเลย
            if (result.length === 0) {
                console.log("⚠️ No data found.");
                return [];
            }

            // จัดกลุ่มข้อมูลตามเดือน
            const groupedData = result.reduce((acc, entry) => {
                const month = new Date(entry.recordedAt).toLocaleString("default", {
                    month: "short", // ได้ชื่อเดือนแบบย่อ เช่น "Jan"
                });

                if (!acc[month]) {
                    acc[month] = [];
                }

                acc[month].push(entry.weight); // เพิ่มน้ำหนักในเดือนนั้น
                return acc;
            }, {} as Record<string, number[]>);

            console.log("📌 Grouped Data:", groupedData); // Debug

            // แปลงข้อมูลที่จัดกลุ่มเป็นรูปแบบ Object Array พร้อมคำนวณ
            const transformedData = Object.entries(groupedData).map(
                ([month, weights]) => ({
                    month, // ชื่อเดือน
                    averageWeight:
                        weights.reduce((sum, w) => sum + w, 0) / weights.length, // คำนวณค่าเฉลี่ย
                    minWeight: Math.min(...weights), // คำนวณน้ำหนักต่ำสุด
                    maxWeight: Math.max(...weights), // คำนวณน้ำหนักสูงสุด
                })
            );

            console.log("Transformed Data:", transformedData); // Debug ข้อมูลที่แปลง
            return transformedData;
        } catch (error) {
            console.error("Error fetching cow weight data:", error);
            return [];
        }
    }
}
