"use client";

import * as React from "react";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Button } from "./ui/button";
import { redirect, useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {

    const router = useRouter()

    const formSchema = z.object({
        username: z.string().min(2).max(50),
        password: z.string({
            required_error: "Mật khẩu không được để trống"
        }).min(2),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "kkknnn",
            password: "kkknnn",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)

        const resp = await fetch("http://localhost:8000/api/v1/auth/token", {
            method: "POST",
            body: new URLSearchParams({
                username: values.username,
                password: values.password,
            }),
        })
        console.log(resp)

        if (!resp.ok) {
            return
        }

        const token: { access_token: string, token_type: string } = await resp.json()

        const user = await fetch("http://localhost:8000/api/v1/auth/users/me", {
            headers: {
                Authorization: `${token.token_type} ${token.access_token}`
            }
        }).then(res => res.json());

        const userData = {
            ...user,
            authHeader: `${token.token_type} ${token.access_token}`
        }

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("token", token.access_token);

        router.push("/admin/order")
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="ppvan" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Tên người dùng được cấp cho nhân viên
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mật khẩu</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>

                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="mt-4" type="submit">Đăng nhập</Button>
                </form>
            </Form>
        </div>
    )
}