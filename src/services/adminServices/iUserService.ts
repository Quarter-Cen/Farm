import { Gender, User } from "@prisma/client";

export interface iUserService {
    createUser(firstName: string,
          lastName: string,
          gender: Gender, 
          employmentDurationHours: number,
          workLocation: string,
          salary: number,
          startDate: Date,
          workHour: number,
          phoneNumber: string,
          address: string,
          birthdate: Date,
          email: string,
          password: string) : Promise<User | null>
}
