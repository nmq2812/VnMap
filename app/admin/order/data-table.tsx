"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { DataTablePagination } from "./pagination";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Item } from "./columns";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ZipcodeInput } from "../item/comboxbox";
import { useToast } from "@/components/ui/use-toast";


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    zipcodes: { id: number, name: string, zipcode: string }[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
    zipcodes,
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
        initialState: {
            pagination: {
                pageSize: 20,
            },
        },
    })



    return (
        <div className="flex h-full flex-col justify-between gap-3">

            <div className="flex justify-between items-center py-4 px-1">
                <Input
                    placeholder="Tìm mã vận đơn"
                    value={(table.getColumn("id")?.getFilterValue() as number) ?? ""}
                    onChange={(event) => {
                        table.getColumn("id")?.setFilterValue(event.target.value)
                        console.log(event.target.value)
                    }
                    }
                    className="max-w-sm"
                />

                <div className="flex gap-3">
                    <CreateOrderDialog zipcodes={zipcodes} table={table} />
                    <ConfirmOrderDialog zipcodes={zipcodes} table={table} />
                </div>
            </div>

            <div className="rounded-md overflow-y-auto flex-1">
                <Table className="border rounded overflow-hidden">
                    <TableHeader className="bg-muted sticky top-0">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="overflow-auto">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
    )
}

interface OrderDialogProps {
    table: any,
    zipcodes: { id: number, name: string, zipcode: string }[],
}

interface OrderFormProps {
    table: any,
    zipcodes: { id: number, name: string, zipcode: string }[],
    onSubmit: (values: z.infer<typeof createOrderSchema>) => void
}

const createOrderSchema = z.object({
    zipcode: z.string().regex(/^\d{5}$/),
})

function CreateOrderForm({ zipcodes, table, onSubmit }: OrderFormProps) {

    const form = useForm<z.infer<typeof createOrderSchema>>({
        resolver: zodResolver(createOrderSchema),
        defaultValues: {
            zipcode: "",
        },
    })

    return (
        <Form {...form} >
            <form id="order-create" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="zipcode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mã bưu chính</FormLabel>
                            <FormControl>
                                <ZipcodeInput form={form} field={field} zipcodes={zipcodes} />
                            </FormControl>
                            <FormDescription>
                                Mã bưu chính của điểm giao dịch hoặc tập kết mục tiêu.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

function CreateOrderDialog({ zipcodes, table }: OrderDialogProps) {

    const [open, setOpen] = useState(false);
    const { toast } = useToast()

    function onSubmit(values: z.infer<typeof createOrderSchema>) {

        setOpen(false);

        const selected = table.getSelectedRowModel().rows.map((row: { original: any; }) => {
            return row.original
        })

        const payload = {
            items: selected,
            zipcode: values.zipcode
        }

        fetch(`http://localhost:8000/api/v1/items/move`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(payload),
        }).then(resp => resp.json())
            .then(data => {
                document?.getElementById("refresh-item")?.click();
                // console.log(document?.getElementById("refresh-hub"));
                toast({
                    description: "Đã tạo đơn hàng thành công.",
                })

                console.log(data);
            })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Tạo đơn chuyển hàng</Button>
            </DialogTrigger>
            <DialogContent className="w-[800px]">
                <DialogHeader>
                    <DialogTitle>Tạo đơn chuyển hàng</DialogTitle>
                    <DialogDescription>
                        Tạo đơn chuyển hàng đến điểm tập kết hoặc giao dịch
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <CreateOrderForm onSubmit={onSubmit} table={table} zipcodes={zipcodes}></CreateOrderForm>
                </div>
                <DialogFooter>

                    <Button form="order-create" type="submit">Tạo đơn chuyển hàng</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}



function ConfirmOrderDialog({ zipcodes, table }: OrderDialogProps) {


    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    function onSubmit(values: z.infer<typeof createOrderSchema>) {

        setOpen(false);

        const selected = table.getSelectedRowModel().rows.map((row: { original: any; }) => {
            return row.original
        })

        const payload = {
            items: selected,
            zipcode: values.zipcode
        }

        fetch(`http://localhost:8000/api/v1/items/confirm`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(payload),
        }).then(resp => resp.json())
            .then(data => {
                document?.getElementById("refresh-item")?.click();
                // console.log(document?.getElementById("refresh-hub"));
                toast({
                    description: "Đã xác nhận đơn thành công",
                })

                console.log(data);
            })

        console.log(values)
        console.log(selected)
    }


    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button variant="default">Xác nhận đơn hàng</Button>
            </DialogTrigger>
            <DialogContent className="w-[800px]">
                <DialogHeader>
                    <DialogTitle>Xác nhận đơn hàng</DialogTitle>
                    <DialogDescription>
                        Xác nhận đơn hàng đã về đơn đến điểm tập kết hoặc giao dịch. Các đơn đã được chọn trong bảng sẽ được xác nhận trong hệ thống
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <CreateOrderForm onSubmit={onSubmit} table={table} zipcodes={zipcodes}></CreateOrderForm>
                </div>
                <DialogFooter>
                    <Button form="order-create" type="submit">Xác nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}