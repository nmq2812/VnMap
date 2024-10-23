"use client";

import Clock from "./my-clock";

export interface AdminTitleProps {
    title: string
}

export function AdminTitle({ title }: AdminTitleProps) {
    return (
        <div className="w-full flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <Clock />
        </div>
    )
}