import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

async function getEmployeeProfile(req: Request, res: Response) {
  const { email } = req.params  // สมมุติว่า email เป็น parameter ใน URL

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email  
      },
      select: {
        firstName: true,
        lastName: true,
        gender: true,
        employmentDurationHours: true,
        workLocation: true,
        salary: true,
        startDate: true,
        workHour: true,
        phoneNumber: true,
        address: true,
        birthdate: true,
        email: true,
        admin: true,       
        supervisor: true,
        dairyWorker: true,
        veterian: true
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // จัดเตรียมข้อมูลสำหรับการตอบกลับ
    let role = ''
    if (user.admin) role = 'Admin'
    else if (user.supervisor) role = 'Supervisor'
    else if (user.dairyWorker) role = 'Dairy Worker'
    else if (user.veterian) role = 'Veterian'

    const profileData = {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      employmentDurationHours: user.employmentDurationHours,
      workLocation: user.workLocation,
      salary: user.salary,
      startDate: user.startDate,
      workHour: user.workHour,
      phoneNumber: user.phoneNumber,
      address: user.address,
      birthdate: user.birthdate,
      email: user.email,
      role: role
    }

    // ส่งข้อมูลโปรไฟล์กลับไปยังผู้ใช้
    return res.status(200).json({ profile: profileData })
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export { getEmployeeProfile }
