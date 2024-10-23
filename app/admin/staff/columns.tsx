import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DataTableColumnHeader } from "./column-header";

// import { DeleteHubDialog, EditHubDialog } from "./hub-dialog";

export type Role = "admin" | "president" | "hub_manager" | "office_manager" | "hub_staff" | "office_staff";


export type User = {
    id: number
    username: string
    fullname: string
    birth: string
    phone: string
    role: Role
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Id" />
        ),
    },

    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Tên người dùng" />
            )
        },
        cell: ({ row }) => {
            const name: string = row.getValue("username")

            return <div>{name}</div>
        }
    },
    {
        accessorKey: "fullname",
        header: "Họ và tên",
    },
    {
        accessorKey: "birth",
        header: "Ngày sinh",
    },
    {
        accessorKey: "phone",
        header: "Số điện thoại",
    },
    {
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Chức vụ" />
            )
        },
    }
]