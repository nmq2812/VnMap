"use client"

import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import Link from "next/link"


interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string,
        icon: React.ReactNode
    }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
    const pathname = usePathname()

    return (
        <nav
            className={cn(
                "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
                className
            )}
            {...props}
        >
            {items.map((item) => (
                <NavLink className={item.href === pathname ? "bg-muted brightness-95" : ""} key={item.href} href={item.href} title={item.title} icon={item.icon}>
                </NavLink>
            ))}
        </nav>
    )
}


function NavLink({ className, href, icon, title }: { className: string, href: string, icon: React.ReactNode, title: string }) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-4 w-full p-2 py-4 hover:bg-muted rounded-lg",
                "w-full",
                className
            )}
        >
            {icon}
            <p>{title}</p>
        </Link>
    )
}