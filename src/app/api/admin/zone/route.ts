import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export async function GET() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  // ดึงข้อมูลการรายงานผลิตภัณฑ์ (ProductReport) ที่เกิดขึ้นในช่วง 6 เดือนที่ผ่านมา
  const productReports = await prisma.productReport.groupBy({
    by: ['cowZone', 'date'], // แบ่งกลุ่มตาม zone และ date
    where: {
      date: {
        gte: sixMonthsAgo, // จำกัดข้อมูลตั้งแต่ 6 เดือนที่ผ่านมา
      }
    },
    _sum: {
      quantityOfProduct: true, // นับจำนวนผลิตภัณฑ์
    },
    orderBy: {
      date: 'asc', // จัดเรียงข้อมูลตามวันที่
    },
  });

  // แปลงข้อมูลให้อยู่ในรูปแบบที่เหมาะสมสำหรับการใช้งาน
  const result = groupByMonthAndZone(productReports);

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
}

// ฟังก์ชันช่วยในการจัดกลุ่มข้อมูลตามเดือนและ zone
function groupByMonthAndZone(data) {
  const grouped = {};

  data.forEach(({ cowZone, date, _sum }) => {
    const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
    if (!grouped[month]) {
      grouped[month] = {
        "Zone A": 0,
        "Zone B": 0,
        "Zone C": 0,
        "Zone D": 0,
      };
    }
    grouped[month][`Zone ${cowZone}`] += _sum.quantityOfProduct; // บวกจำนวนผลิตภัณฑ์ตาม zone
  });

  return grouped;
}
