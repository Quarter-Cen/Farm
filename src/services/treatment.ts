import { PrismaClient, Treatment } from "@prisma/client";
import { ITreatmentData } from "./treatmentData/ITreatmentData";

const prisma = new PrismaClient();

export class TreatmentData implements ITreatmentData {
    async getTreatmentData(
        id: bigint | null,
        nameDisease: string | null,
        events: string | null,
        details: string | null,
        date: Date | null,
        drugName: string | null,
        status: string | null,
        responsibleMan: string | null,
        notation: string | null,
        veterianId: bigint | null,
        cowId: bigint | null
    ): Promise<Treatment | null> {
        const whereClause: any = {};

        if (id) whereClause.id = id;
        if (nameDisease) whereClause.nameDisease = nameDisease;
        if (events) whereClause.events = events;
        if (details) whereClause.details = details;
        if (date) whereClause.date = date;
        if (drugName) whereClause.drugName = drugName;
        if (status) whereClause.status = status;
        if (responsibleMan) whereClause.responsibleMan = responsibleMan;
        if (notation) whereClause.notation = notation;
        if (veterianId) whereClause.veterianId = veterianId;
        if (cowId) whereClause.cowId = cowId;

        console.log(whereClause);
        return await prisma.treatment.findFirst({
            where: whereClause
        })
    }

    async createTreatmentData(
        nameDisease: string,
        events: string,
        details: string,
        date: Date,
        drugName: string,
        status: string,
        responsibleMan: string,
        notation: string,
        veterianId: bigint,  // ID ของสัตวแพทย์
        cowId: bigint        // ID ของวัว
    ): Promise<Treatment> {
        try {
            // สร้างข้อมูลการรักษาใหม่
            const treatment = await prisma.treatment.create({
                data: {
                    nameDisease,
                    events,
                    details,
                    date,
                    drugName,
                    status,
                    responsibleMan,
                    notation,
                    veterianId,  // เชื่อมโยงกับ veterinId
                    cowId,       // เชื่อมโยงกับ cowId
                },
            });

            return treatment;  // คืนค่าข้อมูลการรักษาที่ถูกเพิ่มเข้าไป
        } catch (error) {
            console.error("Error creating treatment data:", error);
            throw new Error("Error creating treatment data");
        }
    }

    async updateTreatmentData(
        id: bigint,
        nameDisease?: string,
        events?: string,
        details?: string,
        date?: Date,
        drugName?: string,
        status?: string,
        responsibleMan?: string,
        notation?: string
    ): Promise<Treatment | null> {
        try {
            // การอัปเดตข้อมูลการรักษาโดยใช้ prisma.update
            const updatedTreatment = await prisma.treatment.update({
                where: { id },
                data: {
                    nameDisease,
                    events,
                    details,
                    date,
                    drugName,
                    status,
                    responsibleMan,
                    notation,
                },
            });
            return updatedTreatment;
        } catch (error) {
            console.error("Error updating treatment data:", error);
            return null;
        }
    }

    async deleteTreatmentData(
        id: bigint
    ): Promise<Treatment | null> {
        try {
            return await prisma.treatment.delete({
                where : {id}
            })
        }catch (error) {
            console.log("Error deleting treatment data:", error)
            return null
        }
    }
}