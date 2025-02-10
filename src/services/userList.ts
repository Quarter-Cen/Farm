import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface UserList {
  firstName: string
  lastName: string
  role: string
  email: string
  phoneNumber: string
}

async function getUserList(): Promise<UserList[]> {
  const users = await prisma.user.findMany({
    select: {
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      admin: true,           
      supervisor: true,      
      dairyWorker: true,
      veterian: true,
    }
  })

  return users.map(user => {
    let role = ''
    if (user.admin) role = 'Admin'
    else if (user.supervisor) role = 'Supervisor'
    else if (user.dairyWorker) role = 'Dairy Worker'
    else if (user.veterian) role = 'Veterian'

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      role,
      email: user.email,
      phoneNumber: user.phoneNumber, 
    }
  })
}

// Example usage
getUserList().then(userList => {
  console.log(userList)
}).catch(error => {
  console.error("Error fetching user list:", error)
})
