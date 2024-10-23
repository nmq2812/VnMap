"use client";

import Clock from "@/components/my-clock"
import { DataTable } from "./data-table"
import { Item, columns } from "./columns"
import { useEffect, useState } from "react";
import { date } from "zod";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";


interface OrderManagerTabProps {
    orders: Item[]
    zipcodes: { id: number, name: string, zipcode: string }[]
}

export function OrderManagerTab() {

    const [outDate, setOutDate] = useState(true);
    const [orders, setOrders] = useState<Item[]>([]);
    const [zipcodes, setZipcodes] = useState<{ id: number, name: string, zipcode: string }[]>([]);

    useEffect(() => {
        if (!outDate) return

        fetch("http://localhost:8000/api/v1/items", {

        }).then((resp) => resp.json()).then((data) => {
            setOrders(data);
            console.log(data);
            setOutDate(false);
        })

    }, [outDate]);


    useEffect(() => {

        const temp = localStorage.getItem("userData");
        if (!temp) redirect("/login");

        const user: { username: string, role: string } = JSON.parse(temp);

        let url = "http://localhost:8000/api/v1/offices/";

        if (user.role == "hub_staff") {
            url = "http://localhost:8000/api/v1/offices/";

            fetch(url)
                .then((resp) => resp.json())
                .then((data) => {
                    const temp = data.map((office: any) => {
                        return { name: office.name, zipcode: office.zipcode }
                    })

                    setZipcodes(temp);
                    setOutDate(false);
                })

        } else if (user.role == "office_staff") {
            url = "http://localhost:8000/api/v1/hubs/";

            fetch(url)
                .then((resp) => resp.json())
                .then((data) => {
                    const temp = data.map((office: any) => {
                        return { name: office.name, zipcode: office.zipcode }
                    })

                    setZipcodes(temp);
                })
        }


    }, []);


    return (
        <div className="p-3 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Quản lý đơn hàng</h1>
                <Clock />
            </div>

            <Button id="refresh-item" className="hidden" onClick={() => setOutDate(true)}>...</Button>
            <div className="flex-1 w-full h-96">
                <DataTable zipcodes={zipcodes} columns={columns} data={orders} />
            </div>

        </div>
    )
}