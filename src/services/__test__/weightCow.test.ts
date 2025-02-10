/** @jest-environment node */
// import { PrismaClient } from "@prisma/client";
// import { WeightData } from "../weightData";

// const prisma = new PrismaClient();
// const weightData = new WeightData();

// beforeAll(async () => {
//     // เตรียมข้อมูลในฐานข้อมูลสำหรับทดสอบ
//     await prisma.cow.createMany({
//         data: [
//             { name: "Cow 1", gender: "Female", age: 3, weight: 200, birthDate: new Date("2022-01-01"), breed: "Holstein", healthStatus: "Healthy", recordedAt: new Date("2025-01-01") },
//             { name: "Cow 2", gender: "Male", age: 4, weight: 250, birthDate: new Date("2021-01-01"), breed: "Angus", healthStatus: "Healthy", recordedAt: new Date("2025-01-01") },
//             { name: "Cow 3", gender: "Female", age: 5, weight: 300, birthDate: new Date("2020-01-01"), breed: "Jersey", healthStatus: "Healthy", recordedAt: new Date("2025-02-01") },
//             { name: "Cow 4", gender: "Female", age: 5, weight: 180, birthDate: new Date("2020-01-01"), breed: "Jersey", healthStatus: "Healthy", recordedAt: new Date("2025-02-01") },
//             { name: "Cow 5", gender: "Male", age: 6, weight: 180, birthDate: new Date("2019-01-01"), breed: "Holstein", healthStatus: "Sick", recordedAt: new Date("2025-03-01") },
//             { name: "Cow 6", gender: "Male", age: 6, weight: 180, birthDate: new Date("2019-01-01"), breed: "Holstein", healthStatus: "Sick", recordedAt: new Date("2025-03-01") }
//         ],
//     });
// });

// afterAll(async () => {
//     // ลบข้อมูลออกจากฐานข้อมูลหลังการทดสอบ
//     await prisma.cow.deleteMany({});
//     await prisma.$disconnect();
// });

// test("should calculate average, min, and max weights grouped by month", async () => {
//     const result = await weightData.getWeight(null, null);

//     // ตรวจสอบผลลัพธ์
//     // expect(result).toHaveLength(2); // ควรมี 2 เดือนในผลลัพธ์
//     expect(result).toEqual(
//         expect.arrayContaining([
//             {
//                 month: "ม.ค.",
//                 averageWeight: 225, // (200 + 250) / 2
//                 minWeight: 200,
//                 maxWeight: 250
//             },
//             {
//                 month: "ก.พ.",
//                 averageWeight: 240, // (300 + 180) / 2
//                 minWeight: 180,
//                 maxWeight: 300
//             },
//             {
//                 month: "มี.ค.",
//                 averageWeight: 180, // (300 + 180) / 2
//                 minWeight: 180,
//                 maxWeight: 180
//             }
//         ])
//     );
// });

// test("should return an empty array when no data exists", async () => {
//     // ล้างข้อมูลเพื่อทดสอบกรณีไม่มีข้อมูล
//     await prisma.cow.deleteMany({});
//     const result = await weightData.getWeight(null, null);

//     expect(result).toEqual([]); // ผลลัพธ์ควรเป็น array ว่าง
// });

// test("should filter weights by specified weight and recordedAt", async () => {
//     // ใส่ข้อมูลกลับเข้าไป
//     await prisma.cow.create({
//         data: {
//             name: "Cow 5",
//             gender: "Female",
//             age: 7,
//             weight: 250,
//             birthDate: new Date("2018-01-01"),
//             breed: "Holstein",
//             healthStatus: "Healthy",
//             recordedAt: new Date("2025-01-01")
//         }
//     });

//     const result = await weightData.getWeight(250, new Date("2025-01-01"));

//     // ตรวจสอบผลลัพธ์
//     expect(result).toHaveLength(1);
//     expect(result[0]).toEqual({
//         month: "ม.ค.",
//         averageWeight: 250,
//         minWeight: 250,
//         maxWeight: 250
//     });
// });