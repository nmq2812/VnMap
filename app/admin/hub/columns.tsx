import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { DeleteHubDialog, EditHubDialog } from "./hub-dialog";
import { DataTableColumnHeader } from "./column-header";

export type Hub = {
    zipcode: string | undefined;
    id: number
    name: string
    address: string
    manager: string
    phone: string
}

export const columns: ColumnDef<Hub>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Mã" />
            )
        }
    },

    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Tên" />
            )
        },
    },
    {
        accessorKey: "address",
        header: "Địa chỉ",
    },
    {
        accessorKey: "manager",
        header: "Quản lý",
    },
    {
        accessorKey: "phone",
        header: "Số điện thoại",
    },
    {
        id: "actions",
        header: "Thao tác",
        cell: ({ row, table }) => {
            const hub = row.original;
            const meta: any = table.options.meta;
            return (
                <div className="flex gap-3">
                    <EditHubDialog hub={hub} />
                    <DeleteHubDialog callback={() => { console.log(meta); }} hub={hub} />
                </div>
            )
        },
    },
]