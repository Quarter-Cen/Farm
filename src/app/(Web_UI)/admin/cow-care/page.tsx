"use client";
import { useEffect, useState } from "react";

interface Cow {
    healthStatus: string;
}

export default function AdminCowCare() {
    const [cowData, setCowData] = useState<Cow[]>([]);

    useEffect(() => {
        fetch("/api/admin/cow-info")
            .then((res) => res.json())
            .then((data: Cow[]) => {
                console.log(data)
                setCowData(data);
            })
            .catch((error) => {
                console.error("Error fetching cow info:", error);
                
            });
    }, [])

    return (
        <>
            <h1>Cow Care Page</h1>
        </>
    )
}