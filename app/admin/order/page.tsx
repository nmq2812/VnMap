import { useEffect } from "react"
import { OrderManagerTab } from "./main"


export async function getItems() {
    const response = await fetch("http://localhost:8000/api/v1/items")

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    return response.json()
}


async function getZipcodes() {
    const response1 = await fetch("http://localhost:8000/api/v1/offices/")
    const response2 = await fetch("http://localhost:8000/api/v1/hubs/")


    if (!response1.ok || !response2.ok) {
        throw new Error(response1.statusText)
    }

    const data1 = await response1.json()
    const data2 = await response2.json()

    const data = data1.concat(data2).map((office: any) => {
        return { name: office.name, zipcode: office.zipcode }
    })

    return data;
}



export default function OrderManagerPage() {

    return <OrderManagerTab />
}