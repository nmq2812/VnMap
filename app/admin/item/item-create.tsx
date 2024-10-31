import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";

import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Brand } from "@/components/brand";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { ZipcodeInput } from "./comboxbox";
import { useToast } from "@/components/ui/use-toast";

enum ItemType {
    DOCUMENT = "document",
    GOODS = "goods",
}

const getPageMargins = () => {
    return `@page { margin: 1cm auto !important; }`;
};

interface ItemCreateFormProp {
    zipcodes: { id: number; name: string; zipcode: string }[];
}

// eslint-disable-next-line react/display-name
export const ItemCreateForm = React.forwardRef(
    ({ zipcodes }: ItemCreateFormProp, ref: React.ForwardedRef<any>) => {
        const formSchema = z.object({
            sender_name: z
                .string()
                .min(2, {
                    message: "Tên người gửi không được để trống",
                })
                .max(100, {
                    message: "Tên người gửi tối đa 100 kí tự",
                }),
            receiver_name: z
                .string()
                .min(2, {
                    message: "Tên người nhận không được để trống",
                })
                .max(100, {
                    message: "Tên người nhận tối đa 100 kí tự",
                }),
            sender_address: z.string().min(2, {
                message: "Địa chỉ người gửi không được để trống",
            }),
            receiver_address: z.string().min(2, {
                message: "Địa chỉ người nhận không được để trống",
            }),
            sender_zipcode: z.string().regex(/^[0-9]{5}$/, {
                message:
                    "Mã bưu chính gửi không phải có 5 chữ số và tồn tại điểm giao dịch",
            }),
            receiver_zipcode: z.string().regex(/^[0-9]{5}$/, {
                message:
                    "Mã bưu chính nhận không phải có 5 chữ số và tồn tại điểm giao dịch",
            }),
            sender_phone: z
                .string()
                .regex(/^(03|05|07|08|09|01[2|6|8|9])([0-9]{8})$/, {
                    message: "Số điện thoại không hợp lệ",
                }),
            receiver_phone: z
                .string()
                .regex(/^(03|05|07|08|09|01[2|6|8|9])([0-9]{8})$/, {
                    message: "Số điện thoại không hợp lệ",
                }),
            cod: z.coerce.number().int().min(0, {
                message: "Phí thu hộ không thể âm",
            }),
            weight: z.coerce.number().min(0, {
                message: "Khối lượng đơn hàng không thể âm",
            }),
            fee: z.coerce
                .number()
                .int({
                    message: "Chi phí vận chuyển phải là số nguyên",
                })
                .min(0, {
                    message: "Chi phí vận chuyển không thể âm",
                }),
            type: z.nativeEnum(ItemType),
            notes: z.string(),
        });

        const { toast } = useToast();

        // 1. Define your form.
        const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                sender_name: "",
                receiver_name: "",
            },
        });

        // 2. Define a submit handler.
        function onSubmit(values: z.infer<typeof formSchema>) {
            console.log(values);

            fetch("http://localhost:8000/api/v1/items/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(values),
            })
                .then((resp) => {
                    if (resp.ok) {
                        toast({
                            description: "Đã tạo đơn hàng",
                        });
                    }

                    return resp.json();
                })
                .catch((err) => {
                    toast({
                        description: "Tạo đơn hàng thất bại",
                    });
                });
        }

        return (
            <Form {...form}>
                <form
                    ref={ref}
                    id="item-create"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full p-1"
                >
                    <style>{getPageMargins()}</style>

                    <div className="flex items-start w-full gap-3">
                        <div className="flex-1">
                            <div className="flex h-28 items-center">
                                <Brand title="Magic Post" />
                                <span className="flex-1"></span>
                            </div>

                            <FormField
                                control={form.control}
                                name="sender_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Họ tên người gửi</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nguyễn Minh Quân"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Họ tên đầy đủ của người gửi hàng
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sender_address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Địa chỉ gửi</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="55 Trần Cung"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Địa chỉ nhà người gửi, không yêu cầu
                                            sự chính xác quá cao
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name="sender_zipcode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mã bưu chính</FormLabel>
                                        <FormControl>
                                            <ZipcodeInput
                                                form={form}
                                                field={field}
                                                zipcodes={zipcodes}
                                            ></ZipcodeInput>
                                        </FormControl>
                                        <FormDescription>
                                            Mã bưu chính là dãy số định danh
                                            điểm giao dịch tại đây
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name="sender_phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Số điện thoại người gửi
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="0981272356"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Số điện thoại người gửi. Bưu cục sẽ
                                            liên hệ trong trường hợp không có
                                            người nhận.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Loại hàng gửi</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Loại hàng gửi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="goods">
                                                        Hàng hóa
                                                    </SelectItem>
                                                    <SelectItem value="document">
                                                        Tài liệu
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>
                                            Hiện chỉ hỗ trợ hàng hóa và tài
                                            liệu.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ghi chú</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Hàng dễ vỡ xin nhẹ tay"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Ghi chú nghiệp vụ thêm
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <div className="flex flex-col gap-3 py-2">
                                <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Cam kết của người gửi
                                </h3>
                                <p className="text-justify text-[0.8rem] text-muted-foreground">
                                    Tôi đồng ý và chấp nhận tất cả các điều
                                    khoản cũng như dịch vụ mà công ty MagicPost
                                    cung cấp. Tôi chấp nhận các điều khoản tại
                                    mặt sau phiếu gửi và cam đoan bưu gửi này
                                    không chứa những mặt hàng nguy hiểm, cám
                                    gửi. Trường hợp không phát được hãy thực
                                    hiện chỉ dẫn tại mục 6, tôi sẽ trả cước
                                    chuyển hoàn.
                                </p>
                            </div>

                            <div className="flex justify-between w-full">
                                <div className="flex-1 flex flex-col gap-3 py-2">
                                    <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Ngày giờ gửi
                                    </h3>
                                    <p className="text-[0.8rem] text-muted-foreground">
                                        {getCurrentTime()}
                                    </p>
                                </div>
                                <div className="flex-1 flex flex-col gap-3 py-2">
                                    <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Chữ ký người gửi
                                    </h3>
                                    <p className="text-[0.8rem] text-muted-foreground h-24"></p>
                                </div>
                            </div>
                        </div>

                        <div className=" flex-1">
                            <div className="flex h-28 items-center">
                                <span className="flex-1"></span>
                                <Image
                                    className="w-24 h-24 object-cover"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Qr-1.svg/220px-Qr-1.svg.png"
                                    alt="qr-code"
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="receiver_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Họ tên người nhận</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Đoàn Văn Phong"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Tên đầy đủ của người nhận
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="receiver_address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Địa chỉ nhận</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="27 Nguyễn Phong Sắc"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Địa chỉ nhà người nhận, không yêu
                                            cầu sự chính xác quá cao
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name="receiver_zipcode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mã bưu chính</FormLabel>
                                        <FormControl>
                                            <ZipcodeInput
                                                form={form}
                                                field={field}
                                                zipcodes={zipcodes}
                                            ></ZipcodeInput>
                                        </FormControl>
                                        <FormDescription>
                                            Mã bưu chính của điểm giao dịch đích
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name="receiver_phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Số điện thoại người nhận
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="ví dụ: 0981272356"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Số điện thoại của người nhận. Bưu
                                            cục sẽ liên lạc qua số này khi đơn
                                            hàng đến nơi
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Khối lượng ước tính
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="0.5"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Khối lượng ước tính hoặc quy đổi của
                                            đơn hàng.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name="fee"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Chi phí vận chuyển
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="12000"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Chi phí vận chuyển đơn hàng
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name="cod"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phí thu hộ</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="50000"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Phí thu hộ khi chuyển đơn hàng
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <div className="flex justify-between w-full">
                                <div className="flex-1 flex flex-col gap-3 py-2">
                                    <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Bưu cục chấp nhận
                                    </h3>
                                    <p className="text-[0.8rem] text-muted-foreground h-24">
                                        {}
                                    </p>
                                </div>
                                <div className="flex-1 flex flex-col gap-3 py-2">
                                    <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Chữ ký người nhận
                                    </h3>
                                    <p className="text-[0.8rem] text-muted-foreground"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        );
    },
);

function getCurrentTime(): string {
    const currentDate: Date = new Date();

    const hours: number = currentDate.getHours();
    const minutes: number = currentDate.getMinutes();

    // Pad single-digit hours and minutes with a leading zero
    const formattedHours: string = hours < 10 ? `0${hours}` : hours.toString();
    const formattedMinutes: string =
        minutes < 10 ? `0${minutes}` : minutes.toString();

    // Get the current date in the specified format
    const formattedDate: string = `${formattedHours}h${formattedMinutes}/${currentDate.getDate()}/${
        currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;

    return formattedDate;
}
