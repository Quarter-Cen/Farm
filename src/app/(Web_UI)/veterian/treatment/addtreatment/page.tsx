"use client"
import Link from 'next/link'
import React from 'react'

export default function addTreatment() {
    return (
        <>
            <div className='flex items-center justify-center ml-[250px]'>
                <form className='bg-[#88D64C] w-[450px] rounded-lg shadow-lg px-12 py-8'>
                    <div className='text-center pb-2'>
                        <span className='text-2xl font-bold'>ข้อมูลการรักษา</span>
                    </div>
                    <div className='py-1'>
                        <label htmlFor="">ชื่อโรค</label>
                        <input type="text" name='nameDisease' className='border w-full p-1 rounded-md' />
                    </div>
                    <div className='py-1'>
                        <label htmlFor="">น้ำหนัก</label>
                        <input type="text" name='weight' className='border w-full p-1 rounded-md' />
                    </div>
                    <div className='py-1'>
                        <label htmlFor="">เหตุการณ์</label>
                        <input type="text" name='events' className='border w-full p-1 rounded-md' />
                    </div>
                    <div className='py-1'>
                        <label htmlFor="">รายละเอียดอาการ</label>
                        <input type="text" name='details' className='border w-full p-1 rounded-md' />
                    </div>
                    <div className='py-1'>
                        <label htmlFor="">ยารักษา</label>
                        <input type="text" name='drugName' className='border w-full p-1 rounded-md' />
                    </div>
                    <div className='py-1'>
                        <input type="radio" value="Treated" id='radioDefault1' name='status' className='appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#28A745] checked:border-[#28A745] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' />
                        <label htmlFor="Treated">รักษาแล้ว</label>
                    </div>
                    <div className='py-1'>
                        <input type="radio" value="Treated" id='radioDefault1' name='status' className='appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#FD7E14] checked:border-[#FD7E14] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' />
                        <label htmlFor="Treated">กำลังรักษา</label>
                    </div>
                    <div className='py-1'>
                        <input type="radio" value="Treated" id='radioDefault1' name='status' className='appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#FFC107] checked:border-[#FFC107] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer' />
                        <label htmlFor="Treated">รอดำเนินการ</label>
                    </div>
                    <div className='py-1'>
                        <label htmlFor="">หมายเหตุ</label>
                        <input type="text" name='notation' className='border w-full p-1 rounded-md' />
                    </div>
                    <div className='py-1'>
                        <label htmlFor="">วันที่บันทึก</label>
                        <input type="date" name='date' className='border w-full p-1 rounded-md' />
                    </div>
                    <div className='text-center mt-6'>
                        <Link href="/">
                            <button className='hover:bg-[#70b13f] px-3 py-1 mx-6 rounded-sm'>ยืนยัน</button>
                        </Link>
                        <Link href="/veterian/cow">
                            <button className='bg-white px-3 py-1 mx-6 rounded-sm text-black hover:bg-[#88D64C]'>ยกเลิก</button>
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}
