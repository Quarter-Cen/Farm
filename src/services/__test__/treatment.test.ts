/** @jest-environment node */

// import { PrismaClient } from "@prisma/client";
// import { TreatmentData } from "../treatment";

// const prisma = new PrismaClient();
// const treatmentService = new TreatmentData();

// describe("TreatmentData Tests", () => {
    // เตรียมข้อมูลก่อนการทดสอบ
    //beforeAll(async () => {
        // ลบข้อมูลเก่าในตาราง treatment (เฉพาะในฐานข้อมูลทดสอบ)
        // await prisma.treatment.deleteMany();

        // เพิ่มข้อมูลตัวอย่าง
    //     await prisma.treatment.createMany({
    //         data: [
    //             {
    //                 nameDisease: "Influenza",
    //                 events: "Annual Checkup",
    //                 details: "Mild flu symptoms",
    //                 date: new Date("2022-12-01"),
    //                 drugName: "Paracetamol",
    //                 status: "Completed",
    //                 responsibleMan: "Dr. Smith",
    //                 notation: "Recovered in 3 days",
    //                 veterianId: BigInt(1),
    //                 cowId: BigInt(1),
    //             },
    //             {
    //                 nameDisease: "Bronchitis",
    //                 events: "Follow-up Visit",
    //                 details: "Severe cough and fatigue",
    //                 date: new Date("2023-01-15"),
    //                 drugName: "Amoxicillin",
    //                 status: "Ongoing",
    //                 responsibleMan: "Dr. John",
    //                 notation: "Requires additional care",
    //                 veterianId: BigInt(2),
    //                 cowId: BigInt(2),
    //             },
    //         ],
    //     });
    // });

    // ล้างข้อมูลหลังการทดสอบ
    // afterAll(async () => {
    //     await prisma.treatment.deleteMany();
    //     await prisma.$disconnect();
    // });

    //ฟังก์ชันสร้างข้อมูลการรักษา
    // test("should create a new treatment record", async () => {
    //     const newTreatment = await treatmentService.createTreatmentData(
    //         "Bovine Tuberculosis",
    //         "Routine Check",
    //         "Cattle showing mild symptoms.",
    //         new Date("2025-01-25"),
    //         "Tetracycline",
    //         "Ongoing",
    //         "Dr. John Doe",
    //         "Treatment ongoing",
    //         BigInt(1), // ใช้ BigInt
    //         BigInt(1)  // ใช้ BigInt
    //     )

    //     // ตรวจสอบว่าฟังก์ชันสร้างข้อมูลได้ถูกต้อง
    //     expect(newTreatment).toBeDefined();
    //     expect(newTreatment.nameDisease).toBe("Bovine Tuberculosis");
    //     expect(newTreatment.events).toBe("Routine Check");
    //     expect(newTreatment.details).toBe("Cattle showing mild symptoms.");
    //     expect(newTreatment.date).toEqual(new Date("2025-01-25"));  // ตรวจสอบวันที่
    //     expect(newTreatment.drugName).toBe("Tetracycline");
    //     expect(newTreatment.status).toBe("Ongoing");
    //     expect(newTreatment.responsibleMan).toBe("Dr. John Doe");
    //     expect(newTreatment.notation).toBe("Treatment ongoing");
    //     expect(newTreatment.veterianId).toBe(BigInt(1));
    //     expect(newTreatment.cowId).toBe(BigInt(1));
    // });

    // test("Get Treatment by ID - Success", async () => {
    //     const result = await treatmentService.getTreatmentData(
    //         BigInt(1), // id
    //         null, // nameDisease
    //         null, // events
    //         null, // details
    //         null, // date
    //         null, // drugName
    //         null, // status
    //         null, // responsibleMan
    //         null, // notation
    //         null,
    //         null
    //     );

    //     expect(result).not.toBeNull();
    //     expect(result?.nameDisease).toBe("Influenza");
    //     expect(result?.drugName).toBe("Paracetamol");
    // });

    // test("Get Treatment by Name Disease - Success", async () => {
    //     const result = await treatmentData.getTreatmentData(
    //         null, // id
    //         "Bronchitis", // nameDisease
    //         null, // events
    //         null, // details
    //         null, // date
    //         null, // drugName
    //         null, // status
    //         null, // responsibleMan
    //         null // notation
    //     );

    //     expect(result).not.toBeNull();
    //     expect(result?.id).toEqual(BigInt(2));
    //     expect(result?.responsibleMan).toBe("Dr. John");
    // });

    // test("Get Treatment by Multiple Filters - Success", async () => {
    //     const result = await treatmentData.getTreatmentData(
    //         null,
    //         "Bronchitis",
    //         "Follow-up Visit",
    //         "Severe cough and fatigue",
    //         new Date("2023-01-15"),
    //         "Amoxicillin",
    //         "Ongoing",
    //         "Dr. John",
    //         "Requires additional care"
    //     );

    //     expect(result).not.toBeNull();
    //     expect(result?.id).toEqual(BigInt(2));
    //     expect(result?.status).toBe("Ongoing");
    // });

    // test("Get Treatment - Not Found", async () => {
    //     const result = await treatmentData.getTreatmentData(
    //         BigInt(999), // ID ที่ไม่มีในฐานข้อมูล
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         null,
    //         null
    //     );

    //     expect(result).toBeNull();
    // });

    // test("should update treatment data", async () =>{
    //     const updateTreatment = await treatmentService.updateTreatmentData(
    //         BigInt(1),
    //         "Updated Disease",
    //         "Follow-up Check",
    //         "Cattle showing improved symptoms.",
    //         new Date("2025-02-01"),
    //         undefined,
    //         undefined,
    //         "Dr. Jane Smith",
    //         "Treatment completed",
    //     )
    //     expect(updateTreatment).not.toBeNull()
    //     expect(updateTreatment?.nameDisease).toBe("Updated Disease")
    //     expect(updateTreatment?.events).toBe("Follow-up Check")
    //     expect(updateTreatment?.details).toBe("Cattle showing improved symptoms.")
    //     expect(updateTreatment?.date).toEqual(new Date("2025-02-01"))
    //     expect(updateTreatment?.responsibleMan).toBe("Dr. Jane Smith")
    //     expect(updateTreatment?.notation).toBe("Treatment completed")
    // })

    //Test Delete Function
    // test("Delete Treatment Data Success", async () => {
    //     const deleteTreatment = await treatmentService.deleteTreatmentData(BigInt(2))
    //     expect(deleteTreatment).not.toBeNull();
    //     expect(deleteTreatment?.nameDisease).toBe("Bronchitis")

    //     const checkTreatment = await prisma.treatment.findUnique({
    //         where : {id: BigInt(2)}
    //     })
    //     expect(checkTreatment).toBeNull();
    // })

    // test("should return null when trying to delete a non-existent record", async () => {
    //     const invalidId = BigInt(999); // ID ที่ไม่มีในฐานข้อมูล
    
    //     // เรียกใช้ฟังก์ชัน deleteTreatmentData
    //     const result = await treatmentService.deleteTreatmentData(invalidId);
    
    //     // ตรวจสอบว่าฟังก์ชันคืนค่า null
    //     expect(result).toBeNull();
    //   });
// });
