/** @jest-environment node */
import { HealthCountData } from "../healthCounts";

describe("HealthIssueData", () => {
    const healthIssueData = new HealthCountData();

    it("should return correct cattle health stats per month", async () => {
        // (prisma.treatment.findMany as jest.Mock).mockResolvedValue([
        //     { cowId: 1, recordedAt: new Date("2025-01-15") },
        //     { cowId: 2, recordedAt: new Date("2025-01-20") },
        //     { cowId: 1, recordedAt: new Date("2025-02-05") },
        //     { cowId: 3, recordedAt: new Date("2025-02-10") },
        //     { cowId: 2, recordedAt: new Date("2025-02-20") },
        // ]);

        const result = await healthIssueData.getCattleHealthStats();

        expect(result).toEqual(
            ([
                { month: "ม.ค.", count: 1 },
                { month: "ก.พ.", count: 1 },
                { month: "มี.ค.", count: 1 },
                { month: "เม.ย.", count: 1 },
                { month: "พ.ค.", count: 1 },
                { month: "มิ.ย.", count: 2 },
            ])
        );
    })
})