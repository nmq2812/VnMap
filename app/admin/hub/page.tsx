"use client";

import { useEffect, useState } from "react";
import { Hub } from "./columns"
import HubManagementTab from "./main"




export default function HubManagementPage() {

    const [data, setData] = useState<Hub[]>([])
    const [outDated, setOutDated] = useState<boolean>(true);

    useEffect(() => {
        if (!outDated) return

        fetch("http://localhost:8000/api/v1/hubs/")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setOutDated(false)
            })
    }, [outDated])


    return (
        <HubManagementTab hubs={data} needRefresh={() => setOutDated(true)} />
    )
}
