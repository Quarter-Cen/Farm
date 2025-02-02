import { PrismaClient } from "@prisma/client";
import { IHealthCounts } from "./healthCounts/IHealthCounts";

const prisma = new PrismaClient();

export class HealthCountData implements IHealthCounts {
    async getCattleHealthStats(): Promise<{ month: string; count: number; }[]> {
        try {
            // ดึงข้อมูลโคที่ได้รับการรักษาพร้อมวันที่
            const treatments = await prisma.treatment.findMany({
                select: {
                    cowId: true,
                    date: true,
                },
            });

            // จัดกลุ่มข้อมูลตามเดือน (Unique Cow ID ในแต่ละเดือน)
            const groupedData = treatments.reduce((acc, treatment) => {
                const month = new Date(treatment.date).toLocaleString("default", {
                    month: "short",
                });

                if (!acc[month]) {
                    acc[month] = new Set<string>(); // ใช้ Set ป้องกันนับโคซ้ำ
                }

                acc[month].add(treatment.cowId.toString());
                return acc;
            }, {} as Record<string, Set<string>>);

            // แปลงเป็นรูปแบบ { month, count }
            const transformedData = Object.entries(groupedData).map(([month, cows]) => ({
                month,
                count: cows.size,
            }));
            console.log(transformedData)
            return transformedData;
        } catch (error) {
            console.error("Error fetching cattle health issue data:", error);
            return [];
        }
    }
}