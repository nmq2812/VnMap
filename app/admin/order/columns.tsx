import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./column-header"
import { Checkbox } from "@/components/ui/checkbox"
import { EditItemDialog } from "../item/item-dialog"


enum ItemType {
    DOCUMENT = "document",
    GOODS = "goods",
}

enum ItemStatus {
    PENDING = "pending",
    ON_DELIVERY = "on delivery",
    SHIPPED = "shipped",
    SUCCESS = "success",
    FAILED = "failed"
}


export interface Item {
    id: number
    sender_name: string
    sender_address: string
    sender_phone: string
    sender_zipcode: string
    receiver_name: string
    receiver_address: string
    receiver_phone: string
    receiver_zipcode: string
    cod: number
    weight: number
    fee: number
    type: ItemType
    status: ItemStatus
    notes?: string
    created_at: string
    updated_at: string
}

function formatVietnameseCurrency(amount: number): string {
    const formattedAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    return formattedAmount.replace(/\u200B/g, ''); // Remove zero-width space that might be added in some environments
}

export const columns: ColumnDef<Item>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Mã vận đơn" />
        ),
    },

    {
        accessorKey: "sender_name",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Người gửi" />
            )
        }
    },
    {
        accessorKey: "receiver_name",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Người nhận" />
            )
        }
    },
    {
        accessorKey: "fee",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Phí chuyển hàng" />
            )
        },
        cell: ({ row }) => {
            const fee = parseInt(row.getValue("fee"));
            return formatVietnameseCurrency(fee);
        }
    },

    {
        accessorKey: "current_pos",
        header: "Vị trí hiện tại",
        cell: ({ row }) => {
            const current_pos = row.getValue("current_pos");
            return current_pos;
        }
    },

    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <DataTableColumnHeader column={column} title="Trạng thái" />
            )
        },
        cell: ({ row }) => {
            switch (row.getValue("status")) {
                case ItemStatus.PENDING:
                    return "Đang chờ";
                case ItemStatus.ON_DELIVERY:
                    return "Đang vận chuyển";
                case ItemStatus.SHIPPED:
                    return "Đang giao hàng";
                case ItemStatus.SUCCESS:
                    return "Thành công";
                case ItemStatus.FAILED:
                    return "Thất bại";
            }
        }
    },
    {
        id: "actions",
        header: "Thao tác",
        cell: ({ row }) => {
            const item = row.original;
            return (
                <div className="flex gap-3">
                    <EditItemDialog item={item} />
                </div>
            )
        },
    }
]