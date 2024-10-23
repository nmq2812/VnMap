"use client";

import { Brand } from "@/components/brand"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ClipboardCheck, LogOut, Package, PieChart, Settings, Store, User, Users, Warehouse } from "lucide-react"
import { SidebarNav } from "@/components/admin-nav"
import { RedirectType, redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";

interface AdminLayoutProps {
    children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const navigationLinks = [
        {
            title: "Thống kê",
            href: "/admin/statistics",
            icon: <PieChart strokeWidth={1} />,
            allow: ["admin", "president"]
        },
        {
            title: "Tạo đơn hàng",
            href: "/admin/item",
            icon: <Package strokeWidth={1} absoluteStrokeWidth />,
            allow: ["admin", "office_staff"]
        },
        {
            title: "Quản lý đơn hàng",
            href: "/admin/order",
            icon: <ClipboardCheck strokeWidth={1} />,
            allow: ["admin", "president", "hub_manager", "office_manager", "hub_staff", "office_staff"]
        },
        {
            title: "Quản lý Nhân viên",
            href: "/admin/staff",
            icon: <Users strokeWidth={1} />,
            allow: ["admin", "president", "hub_manager", "office_manager"]
        },
        {
            title: "Quản lý điểm tập kết",
            href: "/admin/hub",
            icon: <Warehouse strokeWidth={1} />,
            allow: ["admin", "president"]
        },
        {
            title: "Quản lý điểm giao dịch",
            href: "/admin/office",
            icon: <Store strokeWidth={1} />,
            allow: ["admin", "president"]
        },
    ]

    const [user, setUser] = useState<{ username: string, role: string }>(
        {
            username: "",
            role: "",
        }
    );
    const [allowLinks, setAllowLinks] = useState<typeof navigationLinks>([]);

    useEffect(() => {
        const temp = localStorage.getItem("userData");
        if (!temp) redirect("/login");
        const userData = JSON.parse(temp);
        const allowLinks = navigationLinks.filter((link) => link.allow.includes(userData.role));

        setUser(userData);
        setAllowLinks(allowLinks);
    }, [])



    function logOut() {
        localStorage.setItem("userData", "");
        redirect("/login", RedirectType.replace);
    }

    return (
        <div className="flex gap-2 h-screen w-full p-1 rounded-lg">
            <Toaster></Toaster>
            <aside className="w-1/6 border rounded-lg bg-background shadow">
                <div className="flex flex-col px-2 py-3 h-full">
                    <div className="p-2 mb-2 bg-card">
                        <Brand title="Magic Post" />
                    </div>

                    <div className="flex items-center justify-start gap-2 p-4 mb-4">
                        <User />
                        <div className="flex flex-col items-center">
                            <p className="font-large">@{user.username}</p>
                            <p className="text-muted-foreground">{user.role}</p>
                        </div>
                    </div>

                    <SidebarNav items={allowLinks} />

                    <span className="flex-1"></span>

                    <NavLink href="/login" >
                        <LogOut strokeWidth={1} />
                        <Button variant={"ghost"} onClick={() => logOut()}>
                            <p>Đăng xuất</p>
                        </Button>
                    </NavLink>
                </div>
            </aside >
            <main className="w-5/6 h-full border shadow p-2 rounded-lg">
                {children}
            </main>

        </div >
    )
}


function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-4 w-full p-2 py-4 hover:bg-muted rounded-lg",
                "w-full"
            )}
        >
            {children}
        </Link>
    )
}