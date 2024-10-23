"use client";

import { useEffect, useState } from "react";
import { Office } from "./columns"
import OfficeManagementTab from "./main"



export default function OfficeManagementPage() {

    const [data, setData] = useState<Office[]>([])
    const [outDated, setOutDated] = useState<boolean>(true);

    useEffect(() => {

        if (!outDated) return

        fetch("http://localhost:8000/api/v1/offices/")
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setOutDated(false);
            })
    }, [outDated])

    return (
        <OfficeManagementTab needRefresh={() => setOutDated(true)} offices={data} />
    )
}
