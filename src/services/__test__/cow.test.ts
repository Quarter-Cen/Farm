/** @jest-environment node */

import { PrismaClient } from "@prisma/client";
import { CowData } from "../cow";

const prisma = new PrismaClient();
const cowdata = new CowData();

describe("CowData Tests", () => {
    // เตรียมข้อมูลตัวอย่างก่อนการทดสอบ
    // beforeAll(async () => {
    //     await prisma.cow.deleteMany(); // ล้างข้อมูลทั้งหมดในตาราง cow
    //     await prisma.cow.createMany({
    //         data: [
    //             {
    //                 id: BigInt(1),
    //                 name: "Bessie",
    //                 gender: "Female",
    //                 age: 5,
    //                 weight: 500,
    //                 birthDate: new Date("2018-01-01"),
    //                 breed: "Holstein",
    //                 healthStatus: "Healthy",
    //                 recordedAt: new Date("2025-01-05"),
    //                 veterianId: BigInt(1)
    //             },
    //             {
    //                 id: BigInt(2),
    //                 name: "Daisy",
    //                 gender: "Female",
    //                 age: 4,
    //                 weight: 450,
    //                 birthDate: new Date("2019-03-01"),
    //                 breed: "Jersey",
    //                 healthStatus: "Healthy",
    //                 recordedAt: new Date("2025-01-15"),
    //                 veterianId: BigInt(1)
    //             },
    //             {
    //                 id: BigInt(3),
    //                 name: "Nom",
    //                 gender: "Female",
    //                 age: 5,
    //                 weight: 500,
    //                 birthDate: new Date("2019-02-01"),
    //                 breed: "Jersey",
    //                 healthStatus: "Healthy",
    //                 recordedAt: new Date("2025-02-10"),
    //                 veterianId: BigInt(1)
    //             },
    //             {
    //                 id: BigInt(4),
    //                 name: "John",
    //                 gender: "Male",
    //                 age: 5,
    //                 weight: 600,
    //                 birthDate: new Date("2019-01-31"),
    //                 breed: "Jersey",
    //                 healthStatus: "Healthy",
    //                 recordedAt: new Date("2025-02-20"),
    //                 veterianId: BigInt(1)
    //             },
    //         ],
    //     });
    // });

    //ล้างข้อมูลหลังการทดสอบทั้งหมด
    // afterAll(async () => {
    //     await prisma.cow.deleteMany();
    //     await prisma.$disconnect();
    // });

    test("Get Cow by ID - Success", async () => {
        const result = await cowdata.getCowData(
            BigInt(1), // id
            "Updated Bessie", // name
            "Male", // gender
            6, // age
            600, //weight
            new Date("2021-04-01"), // birthdate
            "Thai", // breed
            "สุขภาพดี",  // healthStatus
            new Date("2025-01-24"),
            BigInt(2)
        );
        expect(result).not.toBeNull();
        expect(result?.name).toBe("Updated Bessie");
        expect(result?.gender).toBe("Male");
    });

    // test("Get Cow by Name - Success", async () => {
    //     const result = await cowdata.getCowData(
    //         null, // id
    //         "Daisy", // name
    //         null, // gender
    //         null, // age
    //         null, // weight
    //         null, // birthdate
    //         null, // breed
    //         null,  // healthStatus
    //         // null
    //     );
    //     expect(result).not.toBeNull();
    //     expect(result?.id).toEqual(BigInt(2));
    //     expect(result?.breed).toBe("Jersey");
    // });

    // test("Get Cow by Weight - Success", async () => {
    //     const result = await cowdata.getCowData(
    //         null, // id
    //         null, // name
    //         null, // gender
    //         null, // age
    //         500, // weight
    //         null, // birthdate
    //         null, // breed
    //         null,  // healthStatus
    //         // null
    //     );
    //     expect(result).not.toBeNull();
    //     expect(result?.id).toEqual(BigInt(1));
    //     expect(result?.breed).toBe("Holstein");
    // });

    // test("Get Cow - Not Found", async () => {
    //     const result = await cowdata.getCowData(
    //         BigInt(999), // ID ไม่ตรงกับข้อมูลในฐานข้อมูล
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         // null
    //     );
    //     expect(result).toBeNull();
    // });

    // test("Get Cow by Multiple Filters - Success", async () => {
    //     const result = await cowdata.getCowData(
    //         null,
    //         "Bessie",
    //         "Female",
    //         5,
    //         null,
    //         new Date("2018-01-01"),
    //         "Holstein",
    //         "Healthy",
    //         // BigInt(123)
    //     );
    //     expect(result).not.toBeNull();
    //     expect(result?.id).toEqual(BigInt(1));
    //     // expect(result?.veterianId).toEqual(BigInt(123))
    // });

    // test("Get Cow by Multiple Filters - No Match", async () => {
    //     const result = await cowdata.getCowData(
    //         null,
    //         "Unknown", // ชื่อที่ไม่มีในฐานข้อมูล
    //         "Male",    // เพศที่ไม่มีในฐานข้อมูล
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         // null
    //     );
    //     expect(result).toBeNull();
    // });

    // test("editCowData should update cow data", async () => {
    //     const updatedCow = await cowdata.editCowData(
    //         BigInt(1),
    //         "Updated Bessie",
    //         "Male",
    //         6,
    //         600,
    //         new Date("2021-04-01"),
    //         "Thai",
    //         "สุขภาพดี",
    //         new Date("2025-01-24"),
    //         BigInt(2)
    
    //     );
    
    //     expect(updatedCow).not.toBeNull();
    //     expect(updatedCow?.name).toBe("Updated Bessie");
    //     expect(updatedCow?.gender).toBe("Male");
    //     expect(updatedCow?.age).toBe(6);
    //     expect(updatedCow?.weight).toBe(600);
    //     expect(updatedCow?.breed).toBe("Thai");
    //     expect(updatedCow?.recordedAt).toEqual(new Date("2025-01-24"))
    //     expect(updatedCow?.birthDate).toEqual(new Date("2021-04-01"))
    //     expect(updatedCow?.veterianId).toEqual(BigInt(2))
    // });

    // test("createCowData should create a new cow record", async () => {
    //     const newCow = await cowdata.createCowData(
    //         "Bella",
    //         "Female",
    //         3,
    //         300,
    //         new Date("2021-04-01"),
    //         "Holstein",
    //         "Healthy",
    //         new Date("2025-01-25"),
    //         BigInt(1)
    //     );
    
    //     expect(newCow).not.toBeNull();
    //     expect(newCow.name).toBe("Bella");
    //     expect(newCow.gender).toBe("Female");
    //     expect(newCow.age).toBe(3);
    //     expect(newCow.birthDate).toEqual(new Date("2021-04-01"));
    //     expect(newCow.breed).toBe("Holstein");
    //     expect(newCow.healthStatus).toBe("Healthy");
    //     expect(newCow.recordedAt).toEqual(new Date("2025-01-25"));
    //     expect(newCow?.veterianId).toBe(BigInt(1));

    // });

    // test("Delete Cow - Success", async () => {
    //     const result = await cowdata.deleteCowData(BigInt(5));
    //     expect(result).not.toBeNull(); // ควรลบสำเร็จและคืนข้อมูลวัวที่ถูกลบ
    //     expect(result?.name).toBe("Jason");

    //     const checkCow = await prisma.cow.findUnique({
    //         where: { id: BigInt(5) },
    //     });
    //     expect(checkCow).toBeNull(); // ตรวจสอบว่าไม่มีข้อมูลในฐานข้อมูลแล้ว
    // });
});
