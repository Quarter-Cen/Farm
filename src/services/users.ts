import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'  // ใช้สำหรับการเข้ารหัสรหัสผ่าน

const prisma = new PrismaClient()

async function createUser(req: Request, res: Response) {
  const { firstName, lastName, gender, employmentDurationHours, workLocation, salary, startDate, workHour, phoneNumber, address, birthdate, email, password, role } = req.body

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' })
    }

    const existingPhone = await prisma.user.findUnique({
      where: {
        phoneNumber: phoneNumber
      }
    })

    if (existingPhone) {
      return res.status(400).json({ message: 'User with this phone number already exists' })
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        gender,
        employmentDurationHours,
        workLocation,
        salary,
        startDate,
        workHour,
        phoneNumber,
        address,
        birthdate,
        email,
        password: hashedPassword,
        admin: role === 'Admin' ? {} : undefined,
        supervisor: role === 'Supervisor' ? {} : undefined,
        dairyWorker: role === 'Dairy Worker' ? {} : undefined,
        veterian: role === 'Veterian' ? {} : undefined,
      }
    })

    return res.status(201).json({ message: 'User created successfully', user: newUser })
  } catch (error) {
    console.error("Error creating user:", error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// ฟังก์ชันในการแก้ไขข้อมูลผู้ใช้
async function updateUser(req: Request, res: Response) {
  const { id } = req.params
  const { firstName, lastName, gender, employmentDurationHours, workLocation, salary, startDate, workHour, phoneNumber, address, birthdate, email, role } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: BigInt(id)
      }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.email !== email) {
      const existingEmail = await prisma.user.findUnique({
        where: {
          email: email
        }
      })
      if (existingEmail) {
        return res.status(400).json({ message: 'User with this email already exists' })
      }
    }

    if (user.phoneNumber !== phoneNumber) {
      const existingPhone = await prisma.user.findUnique({
        where: {
          phoneNumber: phoneNumber
        }
      })
      if (existingPhone) {
        return res.status(400).json({ message: 'User with this phone number already exists' })
      }
    }

    // อัปเดตข้อมูลผู้ใช้
    const updatedUser = await prisma.user.update({
      where: {
        id: BigInt(id)
      },
      data: {
        firstName,
        lastName,
        gender,
        employmentDurationHours,
        workLocation,
        salary,
        startDate,
        workHour,
        phoneNumber,
        address,
        birthdate,
        email,
        admin: role === 'Admin' ? {} : undefined,
        supervisor: role === 'Supervisor' ? {} : undefined,
        dairyWorker: role === 'Dairy Worker' ? {} : undefined,
        veterian: role === 'Veterian' ? {} : undefined,
      }
    })

    return res.status(200).json({ message: 'User updated successfully', user: updatedUser })
  } catch (error) {
    console.error("Error updating user:", error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export { createUser, updateUser }
