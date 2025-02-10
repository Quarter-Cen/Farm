/** @jest-environment node */

// import { PrismaClient } from "@prisma/client";
// import { HealthIssueData } from "../healthProblems"; 

// const prisma = new PrismaClient();

// describe("HealthIssueData", () => {
    // let healthIssueData: HealthIssueData;

    // beforeAll(() => {
    //     healthIssueData = new HealthIssueData();
    // });

    // afterEach(async () => {
    //     // ลบข้อมูลหลังจากแต่ละเทสต์
    //     await prisma.treatment.deleteMany();
    // });

    // afterAll(async () => {
    //     await prisma.$disconnect();
    // });

    // test("should return correct disease count", async () => {
    //     // ✅ Arrange: สร้างข้อมูลจำลอง
    //     // await prisma.treatment.createMany({
    //     //     data: [
    //     //         { nameDisease: "ท้องอืด" },
    //     //         { nameDisease: "ท้องอืด" },
    //     //         { nameDisease: "ปอดบวม" },
    //     //         { nameDisease: "อุจจาระร่วง" },
    //     //         { nameDisease: "โรคปากเท้าเปื่อย" },
    //     //         { nameDisease: "ท้องอืด" }
    //     //     ],
    //     // });

    //     // ✅ Act: เรียกใช้งาน getHealthIssues()
    //     const result = await healthIssueData.getHealthIssues();

    //     // ✅ Assert: ตรวจสอบว่าค่าที่ได้ตรงกับที่คาดหวัง
    //     expect(result).toEqual({
    //         "ท้องอืด": 3,
    //         "ปอดบวม": 1,
    //         "อุจจาระร่วง": 1,
    //         "โรคปากเท้าเปื่อย": 1
    //     });
    // });

    // test("should return empty object if no data", async () => {
    //     // ✅ Arrange: ไม่มีข้อมูลในตาราง treatment
    //     await prisma.treatment.deleteMany();

    //     // ✅ Act: เรียกใช้งาน getHealthIssues()
    //     const result = await healthIssueData.getHealthIssues();

    //     // ✅ Assert: ต้องคืนค่าเป็น {}
    //     expect(result).toEqual({});
    // });
// });
