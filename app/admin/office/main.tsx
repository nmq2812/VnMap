"use client";

import Clock from "@/components/my-clock";
import { Input } from "@/components/ui/input";
import { Office, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
// import { AddHubDialog } from "./hub-dialog";

interface OfficeTabProps {
    offices: Office[]
    needRefresh: () => void
}

export default function OfficeManagementTab({ offices, needRefresh }: OfficeTabProps) {


    return (
        <div className="p-3 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">Quản lý điểm giao dịch</h1>
                <Clock />
            </div>

            <div className="flex-1 w-full h-96">

                <Button className="hidden" onClick={() => needRefresh()} id="refresh-office">...</Button>

                <DataTable columns={columns} data={offices} />
            </div>

        </div>
    )
}
