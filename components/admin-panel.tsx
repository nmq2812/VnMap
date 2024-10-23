"use client"

import { Brand } from "./brand"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Image from 'next/image'

import { LogOut, PieChart, Settings, Store, Users } from "lucide-react"


export function AdminPanel(): JSX.Element {
    return (
        <div className="flex gap-2 w-full p-1 h-screen rounded-lg">
            <aside className="w-1/6 border rounded-lg bg-background shadow">
                <div className="flex flex-col px-2 py-3 h-full">
                    <div className="p-2 mb-4 bg-card">
                        <Brand title="Magic Post" />
                    </div>

                    <div>
                        <Image className="object-cover w-24 h-24 mx-auto mb-3 rounded-full" src="https://avatars.githubusercontent.com/ppvan" alt="@ppvan" />
                        <p className="text-center font-large leading-none">Phạm Văn Phúc</p>
                        <p className="text-center text-muted-foreground">Admin</p>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                        <NavLink href="/admin/posts">
                            <PieChart strokeWidth={1} />
                            <p>Thống kê</p>
                        </NavLink>
                        <NavLink href="/admin/posts">
                            <Users strokeWidth={1} />
                            <p>Quản lý nhân viên</p>
                        </NavLink>
                        <NavLink href="/admin/posts">
                            <Store strokeWidth={1} />
                            <p>Quản lý điểm tập kết</p>
                        </NavLink>

                        <NavLink href="/admin/posts">
                            <Settings strokeWidth={1} />
                            <p>Cài đặt tài khoản</p>
                        </NavLink>
                    </div>

                    <span className="flex-1"></span>

                    <NavLink href="/admin/posts">
                        <LogOut strokeWidth={1} />
                        <p>Đăng xuất</p>
                    </NavLink>
                </div>
            </aside >
            <main className="w-5/6 bg-green-400 rounded-lg">
                <header>Some header</header>
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