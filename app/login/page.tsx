import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/login-form";
import { Brand } from "@/components/brand";

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
};

export default function AuthenticationPage() {
    return (
        <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <Link
                href="/"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute right-4 top-4 md:right-8 md:top-8",
                )}
            >
                Trang chủ
            </Link>
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Brand title="Magic Post" />
                </div>
                <div className="relative flex-1 flex-col justify-center content-center mt-auto">
                    <Image
                        className="mb-3"
                        alt="Anh login"
                        src={"/login-cover.png"}
                        width={800}
                        height={800}
                    ></Image>

                    <blockquote className="space-y-2">
                        <p className="text-lg text-justify">
                            Ngành vận chuyển đóng vai trò quan trọng trong hệ
                            thống kinh tế toàn cầu, là cột mốc quyết định sự
                            liên kết giữa các khu vực và quốc gia.
                        </p>
                        <footer className="text-sm text-muted-foreground">
                            Nguyễn Văn Hòa - Chủ tịch tập đoàn MagicPost
                        </footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Đăng nhập
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Chào ngày mới! Cùng chốt nhiều đơn hôm nay nhé!
                        </p>
                    </div>
                    <UserAuthForm />
                </div>
            </div>
        </div>
    );
}
