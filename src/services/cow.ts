import { PrismaClient, Cow } from "@prisma/client";
import { ICowData } from "./cowData/ICowData";

const prisma = new PrismaClient();

export class CowData implements ICowData {
    //ฟังก์ชันดึงข้อมูลวัว
    async getCowData(
        id: bigint | null,
        name: string | null,
        gender: string | null,
        age: number | null,
        weight: number | null,
        birthdate: Date | null,
        breed: string | null,
        healthStatus: string | null,
        recordedAt: Date | null
        // veterianId: bigint | null
    ): Promise<Cow | null> {
        const whereClause: any = {};

        if (id) whereClause.id = id;
        if (name) whereClause.name = name;
        if (gender) whereClause.gender = gender;
        if (age) whereClause.age = age;
        if (weight) whereClause.weight = weight;
        if (birthdate) whereClause.birthDate = birthdate;
        if (breed) whereClause.breed = breed;
        if (healthStatus) whereClause.healthStatus = healthStatus;
        if (recordedAt) whereClause.recordedAt = recordedAt;
        // if (veterianId) whereClause.veterianId = veterianId;

        console.log(whereClause)
        return await prisma.cow.findFirst({
            where: whereClause,
        });
    }

    // ฟังก์ชันแก้ไขข้อมูลวัว
    async editCowData(
        id: bigint,
        name?: string,
        gender?: string,
        age?: number,
        weight?: number,
        birthdate?: Date,
        breed?: string,
        healthStatus?: string,
        recordedAt?: Date
    ): Promise<Cow | null> {
        return await prisma.cow.update({
            where: { id },
            data: {
                name,
                gender,
                age,
                weight,
                birthDate: birthdate,
                breed,
                healthStatus,
                recordedAt
            },
        });
    }

    //ฟังก์ชันเพิ่มข้อมูลวัว
    async createCowData(
        name: string, 
        gender: string, 
        age: number, 
        weight: number,
        birthdate: Date, 
        breed: string, 
        healthStatus: string,
        recordedAt: Date,
        veterianId: bigint
    ): Promise<Cow> {
        return await prisma.cow.create({
            data: {
                name,
                gender,
                age,
                weight,
                birthDate: birthdate,
                breed,
                healthStatus,
                recordedAt,
                veterianId
            }
        })
    }

    //ฟังก์ชันลบข้อมูลวัว
    // async deleteCowData(id: bigint): Promise<Cow | null> {
    //     try {
    //         return await prisma.cow.delete({
    //             where: { id },
    //         })
    //     } catch (error) {
    //         console.log("Error deleting cow data:", error)
    //         return null
    //     }
    // }
}
