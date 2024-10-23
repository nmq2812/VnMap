"use client"

import { AdminTitle } from "@/components/admin-title"

import { ScrollArea } from "@radix-ui/react-scroll-area"
import { ItemCreateForm } from "./item-create"
import { Button } from "@/components/ui/button"
import { useRef } from "react"
import { useReactToPrint } from "react-to-print";

interface CreateItemTabProp {
    zipcodes: { id: number, name: string, zipcode: string }[],
    needRefresh: () => void
}

export function CreateItemTab({ zipcodes, needRefresh }: CreateItemTabProp) {

    const componentRef = useRef<HTMLFormElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

    return (
        <div className="h-full flex justify-center flex-col gap-4 p-3">

            <div className="flex items-center justify-between">
                <AdminTitle title="Tạo đơn hàng" />
            </div>
            <Button id="refresh-item" className="hidden" onClick={() => needRefresh()}>...</Button>
            <ScrollArea className="flex-1 w-full overflow-y-auto p-6 border rounded">
                <ItemCreateForm zipcodes={zipcodes} ref={componentRef} />

                <div className="flex gap-2">
                    <span className="flex-1"></span>

                    <Button onClick={handlePrint} variant={"secondary"}>In giấy biên nhận</Button>
                    <Button form="item-create" type="submit">Tạo đơn hàng</Button>
                </div>
            </ScrollArea>
        </div>
    )
}



