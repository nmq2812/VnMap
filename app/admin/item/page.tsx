"use client";

import { useEffect, useState } from "react";
import { CreateItemTab } from "./main";

export default function ItemPage() {

    const [data, setData] = useState<{ id: number, name: string, zipcode: string }[]>([]);
    const [outDated, setOutDated] = useState<boolean>(true);

    useEffect(() => {

        if (!outDated) return;

        fetch("http://localhost:8000/api/v1/offices/")
            .then((res) => res.json())
            .then(data => {
                return data.map((office: any) => {
                    return { id: data.id, name: office.name, zipcode: office.zipcode }
                })
            })
            .then((data) => {
                setData(data);
                setOutDated(false);
            })
    }, [outDated])

    return (
        <CreateItemTab zipcodes={data} needRefresh={() => setOutDated(true)} />
    )
}