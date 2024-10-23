"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditIcon, Plus, Trash2 } from "lucide-react";
import { Hub } from "./columns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AddressInput } from "../item/comboxbox";
import { useEffect, useState } from "react";
import { UsernameCombox } from "@/components/user-combox";
import { User, Role } from "../staff/columns";
import { useToast } from "@/components/ui/use-toast";

const createHubFormSchema = z.object({
    name: z.string({
        required_error: "Tên điểm tập kết không được trống.",
    }).min(1, "Tên điểm tập kết không được trống."),
    provice: z.string({
        required_error: "Tỉnh/Thành phố không hợp lệ.",
    }),
    district: z.string({
        required_error: "Quận/Huyện không hợp lệ.",
    }),
    ward: z.string({
        required_error: "Phường/Xã không hợp lệ.",
    }),
    manager: z.string({
        required_error: "Quản lý không hợp lệ.",
    }),
    phone: z.string({
        required_error: "Số điện thoại không được trống"
    }).regex(/^\d{10}$/, "Số điện thoại phải là 10 số."),
    zipcode: z.string({
        required_error: "Mã bưu chính không được để trống",
    }).regex(/^\d{5}$/, "Mã bưu chính phải là 5 số."),
})


export function EditHubDialog({ hub }: { hub: Hub }) {

    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    function onSubmit(values: z.infer<typeof createHubFormSchema>) {

        setOpen(false);

        const payload = {
            name: values.name,
            phone: values.phone,
            zipcode: values.zipcode,
            manager: values.manager,
            address: `${values.ward}, ${values.district}, ${values.provice}`
        }

        fetch(`http://localhost:8000/api/v1/hubs/${hub.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(payload),
        }).then(resp => resp.json())
            .then(data => {
                document?.getElementById("refresh-hub")?.click();
                console.log(document?.getElementById("refresh-hub"));
                toast({
                    description: "Điểm tập kết đã cập nhật.",
                })
            })

        // console.log(selected)
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <EditIcon size={16} strokeWidth={1} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật điểm tập kết</DialogTitle>
                    <DialogDescription>
                        Cập nhật thông tin về điểm tập kết tại đây.
                    </DialogDescription>
                </DialogHeader>

                <EditHubForm hub={hub} onSubmit={onSubmit}></EditHubForm>

                <DialogFooter>
                    <Button form="hub-edit" type="submit">Xác nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export function DeleteHubDialog({ hub }: { callback: () => void, hub: Hub }) {

    const { toast } = useToast();
    function onSubmit() {


        fetch(`http://localhost:8000/api/v1/hubs/${hub.id}/`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(() => {
            document?.getElementById("refresh-hub")?.click();
            console.log(document?.getElementById("refresh-hub"));
            toast({
                description: "Điểm tập kết đã xóa.",
            })
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <Trash2 size={16} strokeWidth={1} absoluteStrokeWidth />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Xóa điểm tập kết</DialogTitle>
                    <DialogDescription>
                        Xóa điểm tập kết khỏi hệ thống, thực thể liên quan sẽ setnull.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" onClick={onSubmit} variant={"destructive"}>Xác nhận</Button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


interface CreateHubFormProp {
    onSubmit: (values: z.infer<typeof createHubFormSchema>) => void
}

function CreateHubForm({ onSubmit }: CreateHubFormProp) {


    const form = useForm<z.infer<typeof createHubFormSchema>>({
        resolver: zodResolver(createHubFormSchema),
        defaultValues: {

        },
    })

    const [data, setData] = useState<{ label: string, value: string }[]>([])



    useEffect(() => {
        // @ts-ignore
        const user: { username: string, role: string } = localStorage.getItem("userData");

        fetch("http://localhost:8000/api/v1/auth/users",
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
            .then((res) => res.json())
            .then((data: User[]) => {
                const managers = data
                    .filter((user) => user.role == "hub_manager")
                    .map((user) => ({ label: user.username, value: user.username }))

                console.log(managers);
                setData(managers)
            })
    }, [])

    return (
        <Form {...form} >
            <form id="hub-create" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên điểm tập kết</FormLabel>
                            <FormControl>
                                <Input {...field}></Input>
                            </FormControl>
                            <FormDescription>
                                Tên điểm tập kết. Nên bắt đầu bằng &quot;Điểm tập kết&quot; để dễ xác định
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <AddressInput form={form}></AddressInput>

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Số điện thoại</FormLabel>
                            <FormControl>
                                <Input {...field}></Input>
                            </FormControl>
                            <FormDescription>
                                Số điện thoại bàn của điểm tập kết.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="zipcode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mã bưu chính</FormLabel>
                            <FormControl>
                                <Input {...field}></Input>
                            </FormControl>
                            <FormDescription>
                                Mã bưu chính định danh địa chỉ điểm tập kết.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="manager"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quản lý</FormLabel>
                            <FormControl>
                                <UsernameCombox form={form} field={field} usernames={data}></UsernameCombox>
                            </FormControl>
                            <FormDescription>
                                Tên người dùng của trưởng điểm tập kết.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

interface EditHubFormProp {
    hub: Hub,
    onSubmit: (values: z.infer<typeof createHubFormSchema>) => void
}

function EditHubForm({ hub, onSubmit }: EditHubFormProp) {


    const [province, district, ward] = hub.address.split(", ")

    const form = useForm<z.infer<typeof createHubFormSchema>>({
        resolver: zodResolver(createHubFormSchema),
        defaultValues: {

            provice: province,
            district: district,
            ward: ward,
            name: hub.name,
            manager: hub.manager,
            phone: hub.phone,
            zipcode: hub.zipcode,
        },
    })

    const [data, setData] = useState<{ label: string, value: string }[]>([])

    useEffect(() => {
        fetch("http://localhost:8000/api/v1/auth/users",
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
            .then((res) => res.json())
            .then((data: User[]) => {
                const managers = data
                    .filter((user) => user.role == "hub_manager")
                    .map((user) => ({ label: user.username, value: user.username }))

                console.log(managers);
                setData(managers)
            })
    }, [])

    return (
        <Form {...form} >
            <form id="hub-edit" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên điểm tập kết</FormLabel>
                            <FormControl>
                                <Input {...field}></Input>
                            </FormControl>
                            <FormDescription>
                                Tên điểm tập kết. Nên bắt đầu bằng &quotĐiểm tập kết&quot để dễ xác định
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <AddressInput form={form}></AddressInput>

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Số điện thoại</FormLabel>
                            <FormControl>
                                <Input {...field}></Input>
                            </FormControl>
                            <FormDescription>
                                Số điện thoại bàn của điểm tập kết.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="zipcode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mã bưu chính</FormLabel>
                            <FormControl>
                                <Input {...field}></Input>
                            </FormControl>
                            <FormDescription>
                                Mã bưu chính định danh địa chỉ điểm tập kết.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="manager"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quản lý</FormLabel>
                            <FormControl>
                                <UsernameCombox form={form} field={field} usernames={data}></UsernameCombox>
                            </FormControl>
                            <FormDescription>
                                Tên người dùng của trưởng điểm tập kết.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}


export function AddHubDialog({ callback }: { callback: (row: Hub) => void }) {


    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    function onSubmit(values: z.infer<typeof createHubFormSchema>) {


        setOpen(false);

        const payload = {
            name: values.name,
            phone: values.phone,
            zipcode: values.zipcode,
            manager: values.manager,
            address: `${values.ward}, ${values.district}, ${values.provice}`
        }

        fetch("http://localhost:8000/api/v1/hubs/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(payload),
        }).then(resp => resp.json())
            .then(data => {
                document?.getElementById("refresh-hub")?.click();
                console.log(document?.getElementById("refresh-hub"));
                toast({
                    description: "Điểm tập kết được tạo.",
                })
            })

        // console.log(selected)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className="w-48 p-2 flex justify-around items-center"
                >
                    <Plus strokeWidth={1} />
                    <p>Thêm điểm tập kết</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật điểm tập kết</DialogTitle>
                    <DialogDescription>
                        Cập nhật thông tin về điểm tập kết tại đây.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <CreateHubForm onSubmit={onSubmit} />
                </div>
                <DialogFooter>
                    <Button form="hub-create" type="submit">Xác nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}