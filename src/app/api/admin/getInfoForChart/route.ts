import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  // ดึงข้อมูลการนำเข้า (FoodImp)
  const foodImports = await prisma.foodImp.findMany({
    where: {
      date: {
        gte: sixMonthsAgo
      }
    },
    select: {
      date: true,
      quantity: true
    }
  });

  // ดึงข้อมูลการใช้ (StockUsage)
  const stockUsages = await prisma.stockUsage.findMany({
    where: {
      usedAt: {
        gte: sixMonthsAgo
      }
    },
    select: {
      usedAt: true,
      quantity: true
    }
  });

  // แปลงข้อมูลให้เป็นกลุ่มตามเดือน
  const importData = groupByMonth(foodImports, 'date');
  const usageData = groupByMonth(stockUsages, 'usedAt');

  console.log(usageData);
  
  return new Response(JSON.stringify({ importData, usageData }), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// ฟังก์ชันช่วยกลุ่มข้อมูลตามเดือน
function groupByMonth(data, dateField) {
  return data.reduce((acc, { [dateField]: date, quantity }) => {
    if (!date) {
      console.error("Invalid date:", date); // ให้แสดงข้อความหากพบค่า date เป็น undefined หรือ null
      return acc;
    }
    const parsedDate = new Date(date); // แปลงค่าของ date ให้เป็น Date object
    const month = `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, '0')}`; // ใช้ปีและเดือนเป็นคีย์
    if (!acc[month]) acc[month] = 0;
    acc[month] += quantity;
    return acc;
  }, {});
}
