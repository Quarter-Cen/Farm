import { PrismaClient } from '@prisma/client';
import { ITreatmentData } from "./veterianServices/ITreatmentData";
import { Treatment } from "@prisma/client";
import { HealthStatus } from '@prisma/client';

const prisma = new PrismaClient();

export class TreatmentService implements ITreatmentData {
    async AddTreatmentData(nameDisease: string, events: string, details: string, date: Date, drugName: string, status: HealthStatus, notation: string, veterianId: bigint, cowId: bigint, cowWeight: number): Promise<Treatment | null> {
        console.log("🚀 Creating Treatment Data with values:", {
            nameDisease,
            events,
            details,
            date,
            drugName,
            status,
            notation,
            veterianId,
            cowId,
            cowWeight,
        });
        try {
            if (nameDisease == '' || events == '') {
                console.error('NameDisease and events cannot be empty')
                return null
            }

            // อัปเดต status ของ cow
            await prisma.cow.update({
                where: { id: BigInt(cowId) }, // ตรวจสอบ cowId
                data: { healthStatus: status },      // ใช้ data: { status: status }
            });

            return await prisma.treatment.create({
                data: {
                    nameDisease: nameDisease,
                    events: events,
                    details: details,
                    date: new Date(date),
                    drugName: drugName,
                    status: status,
                    notation: notation,
                    cowWeight: Number(cowWeight),
                    veterianId: BigInt(veterianId),
                    cowId: BigInt(cowId)
                }
            })
        } catch (exception: any) {
            console.log(exception.stack)
            console.error('Error adding cow: ', exception)
            return null
        }
    }

    async deleteTreatmentData(id: bigint): Promise<String> {
        try {
            await prisma.treatment.delete({
                where: { id: id }
            })
            return 'Treatment Daleted Successfully';
        } catch (error) {
            console.error(error);
            return 'Error deleting treatment'
        }
    }

    async editTreatmentData(id: bigint, updatedData: Partial<Treatment>): Promise<Treatment | null> {
        try {
            const updatedTreatment = await prisma.treatment.update({
                where: { id: id },
                data: updatedData
            })
            return updatedTreatment;
        } catch (error) {
            console.error("Error editing treatment:", error)
            return null;
        }
    }

    async getCowWithTreatment(): Promise<(Treatment & { cow: any, veterian: any })[] | null> {

        try {
            const treatments = await prisma.treatment.findMany({
                include: {
                    cow: true,       // ดึงข้อมูลจากตาราง Cow ที่เชื่อมโยงกับ Treatment
                    veterian: true,  // ดึงข้อมูลจากตาราง Veterian ที่ดูแลการรักษานี้
                },
            });

            return treatments;

        } catch (error: any) {
            console.error("Error fetching treatment by ID:", error.stack)
            return null
        }
    }

    async getTreatmentByID(id: bigint): Promise<Treatment | null> {
        try {
            return await prisma.treatment.findUnique({
                where: { id: id }
            });
        } catch (error) {
            console.error("Error fetching treatment by ID:", error)
            return null;
        }
    }

    async getAllTreatmentByVetID(id: bigint): Promise<Treatment[] | null> {
        try {
            return await prisma.treatment.findMany({
                where: {
                    veterianId: id,  // ✅ ค้นหาจาก veterianId
                },
                include: {
                    cow: true, // ✅ รวมข้อมูลวัว (cow)
                    veterian: true, // ✅ รวมข้อมูลสัตวแพทย์ (ถ้าต้องการ)
                },
            });
        } catch (error) {
            console.error("Error getAllTreatmentByVetID", error);
            return null;
        }
    }

}