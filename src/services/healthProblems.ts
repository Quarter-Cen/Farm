import { PrismaClient } from "@prisma/client";
import { IHealthProblems } from "./healthProblems/IHealthProblems";

const prisma = new PrismaClient();

export class HealthIssueData implements IHealthProblems {
    async getHealthIssues(): Promise<Record<string, number>> {
        try {
            const treatments = await prisma.treatment.findMany({
                select: { nameDisease: true },
            });

            // นับจำนวนครั้งที่แต่ละโรคเกิดขึ้น
            const diseaseCount = treatments.reduce((acc, { nameDisease }) => {
                acc[nameDisease] = (acc[nameDisease] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            console.log(diseaseCount)
            return diseaseCount;
        } catch (error) {
            console.error("Error fetching health issue data:", error)
            return {};
        }
    }
}