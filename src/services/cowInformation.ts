import { PrismaClient } from "@prisma/client/extension";
import { iCowInformationService } from "./adminServices/iCowInformationService";
import { Cow } from "@prisma/client";

const prisma = new PrismaClient();

export class CowService implements iCowInformationService {
    async AddCow(name: string, gender: string, age: number, birthDate: Date, breed: string, healthStatus: string): Promise<Cow | null > {
        try {
            if(name == '' || gender == ''){
                console.error('Name and gender cannot be empty')
                return null
            }
            return await prisma.cow.create({
                data: {
                    name: name,
                    gender: gender,
                    age: age,
                    birthDate: birthDate,
                    breed: breed,
                    healthStatus: healthStatus
                },
            })
        } catch (exception){
            console.error('Error adding cow: ', exception)
            return null
        }
    }

    async deleteCow(id: bigint): Promise<string> {
        try {
            await prisma.cow.delete({
                where: {
                    id: id,
                },
            });
            return 'Cow deleted successfully';
        } catch (error) {
            console.error(error);
            return 'Error deleting cow';
        }
    }

    async editCow(id: bigint, updatedData: Partial<Cow>): Promise<Cow | null> {
        try {
            const updatedCow = await prisma.cow.update({
                where: { id: id },
                data: updatedData,
            });
            return updatedCow;
        } catch (error) {
            console.error('Error editing cow:', error);
            return null;
        }
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
            return await prisma.cow.findUnique({
                where: { id: id },
            });
        } catch (error) {
            console.error('Error fetching cow by ID:', error);
            return null;
        }
    }
}
