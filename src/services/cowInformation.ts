import { PrismaClient, HealthStatus  } from "@prisma/client";
import { iCowInformationService } from "./adminServices/iCowInformationService";
import { Cow } from "@prisma/client";

const prisma = new PrismaClient();

export class CowService implements iCowInformationService {
    async AddCow(
        name: string,
        gender: string,
        age: number,
        birthDate: string | Date,
        breed: string,
        healthStatus: HealthStatus,
        weight: number,
        veterianId?: bigint
    ): Promise<Cow> {
        try {

            if (
                !name.trim() ||
                !gender.trim() ||
                age <= 0 ||
                !birthDate ||
                !breed.trim() ||
                !healthStatus.trim() ||
                weight <= 0
            ) {
                throw new Error("Invalid input: Required fields are missing or invalid");
            }

            // แปลง birthDate เป็น Date ถ้าเป็น string
            const formattedBirthDate = typeof birthDate === "string" ? new Date(birthDate) : birthDate;

            return await prisma.cow.create({
                data: {
                    name,
                    gender,
                    age,
                    birthDate: formattedBirthDate,
                    breed,
                    healthStatus,
                    weight,
                    veterianId: veterianId ? BigInt(veterianId) : undefined
                },
            });
        } catch (exception) {
            console.error("Error adding cow:", exception);
            throw new Error("Failed to add cow");
        }
    }


    async deleteCow(id: bigint): Promise<Cow | null> {
            try {
                // ตรวจสอบว่ามีวัวอยู่หรือไม่
                const existingCow = await prisma.cow.findUnique({
                    where: { id }
                });
    
                if (!existingCow) {
                    throw new Error("Cow not found");
                }
    
                // ลบวัว
                return await prisma.cow.delete({
                    where: { id }
                });
            } catch (exception) {
                console.error("Error deleting cow:", exception);
                throw new Error("Failed to delete cow");
            }
        }
    
        async editCow(id: bigint, data: {
            name: string;
            gender: string;
            age: number;
            weight: number;
            birthDate: Date;
            breed: string;
            healthStatus: HealthStatus;
            veterianId: bigint
          }): Promise<Cow> {
            const cow = await this.getCowByID(id);
    
            if (!cow) {
              throw new Error('Cow not found');
            }
        
            return await prisma.cow.update({
              where: { id: id },
              data: {
                ...data,
                healthStatus: data.healthStatus, // ให้ Prisma คาดหวังเป็น HealthStatus
              },
            });
          }
        

    async getAllCow(): Promise<Cow[]> {
        try {
            return await prisma.cow.findMany();
        } catch (error) {
            console.error('Error fetching all cows:', error);
            return [];
        }
    }

    async getCowByID(id: bigint): Promise<Cow | null> {
        try {
            // ค้นหาวัวตาม ID
            const cow = await prisma.cow.findUnique({
                where: { id }
            });

            if (!cow) {
                return null; // ถ้าไม่พบวัว
            }

            return cow;
        } catch (exception) {
            console.error("Error fetching cow:", exception);
            throw new Error("Failed to fetch cow");
        }
    }
}
