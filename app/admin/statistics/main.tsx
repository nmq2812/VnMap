"use client";

import { AdminTitle } from "@/components/admin-title";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Command, CheckIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";


export interface RevenueChartProps {
    data: { name: string, total: number }[]
}

export interface OrderStatusChartProps {
    data: { name: string, value: number }[]
}

export interface StatsticsProp {
    items: Item[]
}

enum ItemType {
    DOCUMENT = "document",
    GOODS = "goods",
}

enum ItemStatus {
    PENDING = "pending",
    ON_DELIVERY = "on delivery",
    SHIPPED = "shipped",
    SUCCESS = "success",
    FAILED = "failed",
}


interface Item {
    id: number;
    sender_name: string;
    sender_address: string;
    sender_phone: string;
    sender_zipcode: string;
    receiver_name: string;
    receiver_address: string;
    receiver_phone: string;
    receiver_zipcode: string;
    cod: number;
    weight: number;
    fee: number;
    type: ItemType; // Assuming ItemType is a type or interface defined elsewhere
    status: ItemStatus;
    notes?: string;
    created_at: string; // Assuming the date is stored as a string or timestamp
    updated_at: string; // Assuming the date is stored as a string or timestamp
}



export function StatisticsTab() {

    const revenueData = [
        {
            name: "Jan",
            total: Math.floor(Math.random() * 50) + 10,
        },
        {
            name: "Feb",
            total: Math.floor(Math.random() * 50) + 10,
        },
        {
            name: "Mar",
            total: Math.floor(Math.random() * 5) + 10,
        },
        {
            name: "Apr",
            total: Math.floor(Math.random() * 5) + 10,
        },
        {
            name: "May",
            total: Math.floor(Math.random() * 5) + 10,
        },
        {
            name: "Jun",
            total: Math.floor(Math.random() * 5) + 10,
        },
        {
            name: "Jul",
            total: Math.floor(Math.random() * 5) + 10,
        },
        {
            name: "Aug",
            total: Math.floor(Math.random() * 5) + 10,
        },
        {
            name: "Sep",
            total: Math.floor(Math.random() * 5) + 10,
        },
        {
            name: "Oct",
            total: Math.floor(Math.random() * 5) + 10,
        },
        {
            name: "Nov",
            total: Math.floor(Math.random() * 5) + 10,
        },
        {
            name: "Dec",
            total: Math.floor(Math.random() * 5) + 10,
        },
    ]

    const successData = [
        {
            name: "Tỉ lệ đơn hàng thành công",
            value: 1000 + Math.random() * 50
        },
        {
            name: "Tỉ lệ đơn hàng thất bại",
            value: 400 + Math.random() * 50
        }
    ]

    const officeList = [
        "Điểm giao dịch Xã Cao Thành",
        "Điểm giao dịch Xã Trung Tú",
        "Điểm giao dịch Xã Viên An",
        "Điểm giao dịch Xã Trầm Lộng",
        "Điểm giao dịch Xã Tảo Dương Văn",
        "Điểm giao dịch Xã Vần Chải",
        "Điểm giao dịch Xã Xà Phìn",
        "Điểm giao dịch Xã Phố Là",
        "Điểm giao dịch Xã Phố Cáo",
        "Điểm giao dịch Xã Lũng Thầu",
        "Điểm giao dịch Thị trấn Nguyên Bình",
        "Điểm giao dịch Xã Phan Thanh",
        "Điểm giao dịch Xã Ca Thành",
        "Điểm giao dịch Xã Mai Long",
        "Điểm giao dịch Xã Thanh Thịnh",
        "Điểm giao dịch Xã Bình Văn",
        "Điểm giao dịch Xã Thanh Mai",
        "Điểm giao dịch Xã Như Cố",
        "Điểm giao dịch Thị trấn Đồng Tâm",
        "Điểm giao dịch Xã Bình An",
        "Điểm giao dịch Xã Minh Quang",
        "Điểm giao dịch Xã Khuôn Hà",
        "Điểm giao dịch Xã Thượng Lâm",
        "Điểm giao dịch Xã Hồng Quang",
        "Điểm giao dịch Xã Hoàng Liên",
        "Điểm giao dịch Phường Cầu Mây",
        "Điểm giao dịch Xã Thanh Bình",
        "Điểm giao dịch Xã Liên Minh",
        "Điểm giao dịch Xã Tả Van",
        "Điểm giao dịch Xã Noọng Hẹt",
        "Điểm giao dịch Xã Hua Thanh",
        "Điểm giao dịch Xã Thanh Luông",
        "Điểm giao dịch Xã Phu Luông",
        "Điểm giao dịch Xã Thanh Yên",
        "Điểm giao dịch Xã Nậm Sỏ",
        "Điểm giao dịch Xã Hố Mít",
        "Điểm giao dịch Xã Mường Khoa",
        "Điểm giao dịch Xã Phúc Khoa",
        "Điểm giao dịch Xã Nậm Cần",
        "Điểm giao dịch Phường Chiềng Cơi",
        "Điểm giao dịch Phường Chiềng Sinh",
        "Điểm giao dịch Xã Chiềng Cọ",
        "Điểm giao dịch Xã Hua La",
        "Điểm giao dịch Phường Quyết Tâm",
        "Điểm giao dịch Xã Tân Lĩnh",
        "Điểm giao dịch Xã Lâm Thượng",
        "Điểm giao dịch Xã Phan Thanh",
        "Điểm giao dịch Xã Mường Lai",
        "Điểm giao dịch Xã Vĩnh Lạc",
        "Điểm giao dịch Xã Thượng Cốc",
    ]

    const hubList = [
        "Điểm tập kết Thành phố Hà Nội",
        "Điểm tập kết Tỉnh Hà Giang",
        "Điểm tập kết Tỉnh Cao Bằng",
        "Điểm tập kết Tỉnh Bắc Kạn",
        "Điểm tập kết Tỉnh Tuyên Quang",
        "Điểm tập kết Tỉnh Lào Cai",
        "Điểm tập kết Tỉnh Điện Biên",
        "Điểm tập kết Tỉnh Lai Châu",
        "Điểm tập kết Tỉnh Sơn La",
        "Điểm tập kết Tỉnh Yên Bái",
        "Điểm tập kết Tỉnh Hoà Bình",
        "Điểm tập kết Tỉnh Thái Nguyên",
        "Điểm tập kết Tỉnh Lạng Sơn",
        "Điểm tập kết Tỉnh Quảng Ninh",
        "Điểm tập kết Tỉnh Bắc Giang",
        "Điểm tập kết Tỉnh Phú Thọ",
        "Điểm tập kết Tỉnh Vĩnh Phúc",
        "Điểm tập kết Tỉnh Bắc Ninh",
    ]

    const [revenue, setRevenue] = useState(revenueData);
    const [success, setSuccess] = useState(successData);

    function updateData(value: string) {
        if (value.startsWith("Điểm tập kết")) {
            const data = revenueData.map(data => {
                return {
                    name: data.name, total: Math.floor(Math.random() * 70) + 30
                }
            })
            setRevenue(data);
        } else if (value.startsWith("Điểm giao dịch")) {
            const data = revenueData.map(data => {
                return {
                    name: data.name, total: Math.floor(Math.random() * 50) + 10
                }
            })
            setRevenue(data);
        } else {
            const data = revenueData.map(data => {
                return {
                    name: data.name, total: Math.floor(Math.random() * 320) + 300
                }
            })
            setRevenue(data);
        }


        const data = successData.map(data => {
            return {
                name: data.name, value: Math.floor(Math.random() * 320) + 300
            }
        })

        setSuccess(data);

    }

    return (
        <div className="h-full flex justify-center flex-col gap-4 p-3">


            <div className="flex items-center justify-between">
                <AdminTitle title="Doanh thu" />
            </div>

            <div>
                <Select onValueChange={updateData}>
                    <SelectTrigger className="w-1/3">
                        <SelectValue placeholder="Chọn điểm giao dịch hoặc tập kết" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectGroup>
                            <SelectLabel>Các điểm tập kết</SelectLabel>
                            {hubList.map((office, index) => <SelectItem key={index} value={office}>{office}</SelectItem>)}
                        </SelectGroup>

                        <SelectGroup>
                            <SelectLabel>Các điểm giao dịch</SelectLabel>
                            {officeList.map((office, index) => <SelectItem key={index} value={office}>{office}</SelectItem>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex-1 w-full flex items-center p-6 border rounded">
                <RevenueChart data={revenue} />
                <OrderStatusChart data={success} />
            </div>
        </div>
    )
}

function OrderStatusChart({ data }: OrderStatusChartProps) {

    interface RenderLabelProp {
        cx: number
        cy: number
        midAngle: number
        innerRadius: number
        outerRadius: number
        percent: number
        index: number
    }

    const COLORS = ["#A5AA52", "#CE963B"];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: RenderLabelProp) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" className="text-shadow" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return <ResponsiveContainer width={"100%"} height={350}>
        <PieChart title="Tỉ lệ thành công của đơn hàng">
            <Pie
                legendType="circle"
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#888888"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>

            <Legend />
        </PieChart>
    </ResponsiveContainer>
}


export function RevenueChart({ data }: RevenueChartProps) {
    return (

        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} title="Biểu đồ doanh thu hàng tháng">
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value} tr`}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>

        </ResponsiveContainer>

    )
}

const frameworks = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

export function ComboboxDemo() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Select framework..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." className="h-9" />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {frameworks.map((framework) => (
                            <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                {framework.label}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        value === framework.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}