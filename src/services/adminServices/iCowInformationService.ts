import { $Enums, Cow } from "@prisma/client";

export interface iCowInformationService {
  AddCow(
    name: string,
    gender: string,
    age: number,
    birthDate: Date,
    breed: string,
    healthStatus: $Enums.HealthStatus,
    weight: number,
    
  ): Promise<Cow | null>
  editCow(id: bigint, data: {
    name: string;
    gender: string;
    age: number;
    weight: number;
    birthDate: Date;
    breed: string;
    healthStatus: $Enums.HealthStatus;
    veterianId: bigint | null;
  }): Promise<Cow>
  deleteCow(id: bigint): Promise<Cow | null>
  getAllCow(): Promise<Cow[]>
  getCowByID(id: bigint): Promise<Cow | null>
}
