import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditIcon, Plus, Trash2 } from "lucide-react";
import { Office } from "./columns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { User } from "../staff/columns";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UsernameCombox } from "@/components/user-combox";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { Hub } from "../hub/columns";
import { AddressInput } from "../item/comboxbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { useToast } from "@/components/ui/use-toast";


const createOfficeFormSchema = z.object({
    name: z.string({
        required_error: "Tên điểm giao dịch không được trống.",
    }).min(1, "Tên điểm giao dịch không được trống."),

    hub_id: z.number().int({
        message: "Tập kết không hợp lệ.",
    }),

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


interface AddOfficeFormProp {
    onSubmit: (values: z.infer<typeof createOfficeFormSchema>) => void
}

function AddOfficeForm({ onSubmit }: AddOfficeFormProp) {

    const form = useForm<z.infer<typeof createOfficeFormSchema>>({
        resolver: zodResolver(createOfficeFormSchema),
        defaultValues: {

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
                    .filter((user) => user.role == "office_manager")
                    .map((user) => ({ label: user.username, value: user.username }))

                console.log(managers);
                setData(managers)
            })
    }, [])

    const [hubs, setHubs] = useState<{ id: number, name: string }[]>([])

    useEffect(() => {
        fetch("http://localhost:8000/api/v1/hubs")
            .then((res) => res.json())
            .then((data: Hub[]) => {
                const hubs = data
                    .map((hub) => ({ id: hub.id, name: hub.name }))
                setHubs(hubs)
            })
    }, [])

    return (
        <Form {...form} >
            <form id="office-create" onSubmit={form.handleSubmit(onSubmit)}>

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên điểm giao dịch</FormLabel>
                            <FormControl>
                                <Input {...field}></Input>
                            </FormControl>
                            <FormDescription>
                                Tên điểm giao dịch. Nên bắt đầu bằng &quot;Điểm giao dịch&quot; để dễ xác định
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="hub_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Điểm tập kết</FormLabel>
                            <FormControl>
                                <HubIDInput hubs={hubs} form={form} field={field}></HubIDInput>
                            </FormControl>
                            <FormDescription>
                                Mã của điểm tập kết của điểm giao dịch.
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
                                Số điện thoại bàn của điểm giao dịch.
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
                                Mã bưu chính định danh địa chỉ điểm giao dịch.
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
                                Tên người dùng của trưởng điểm giao dịch.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}





interface EditOfficeFormProp {
    office: Office,
    onSubmit: (values: z.infer<typeof createOfficeFormSchema>) => void
}

function EditOfficeForm({ office, onSubmit }: EditOfficeFormProp) {


    const [province, district, ward] = office.address.split(", ")

    const form = useForm<z.infer<typeof createOfficeFormSchema>>({
        resolver: zodResolver(createOfficeFormSchema),
        defaultValues: {

            provice: province,
            district: district,
            ward: ward,
            name: office.name,
            manager: office.manager,
            phone: office.phone,
            zipcode: office.zipcode,
            hub_id: office.hub_id,
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
                    .filter((user) => user.role == "office_manager")
                    .map((user) => ({ label: user.username, value: user.username }))

                console.log(managers);
                setData(managers)
            })
    }, [])

    const [hubs, setHubs] = useState<{ id: number, name: string }[]>([])

    useEffect(() => {
        fetch("http://localhost:8000/api/v1/hubs")
            .then((res) => res.json())
            .then((data: Hub[]) => {
                const hubs = data
                    .map((hub) => ({ id: hub.id, name: hub.name }))
                setHubs(hubs)
            })
    }, [])

    return (
        <Form {...form} >
            <form id="office-edit" onSubmit={form.handleSubmit(onSubmit)}>

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên điểm giao dịch</FormLabel>
                            <FormControl>
                                <Input {...field}></Input>
                            </FormControl>
                            <FormDescription>
                                Tên điểm giao dịch. Nên bắt đầu bằng &quot;Điểm giao dịch&quot; để dễ xác định
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="hub_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Điểm tập kết</FormLabel>
                            <FormControl>
                                <HubIDInput hubs={hubs} form={form} field={field}></HubIDInput>
                            </FormControl>
                            <FormDescription>
                                Mã của điểm tập kết của điểm giao dịch.
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
                                Số điện thoại bàn của điểm giao dịch.
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
                                Mã bưu chính định danh địa chỉ điểm giao dịch.
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
                                Tên người dùng của trưởng điểm giao dịch.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}


export function EditOfficeDialog({ office }: { office: Office }) {

    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    function onSubmit(data: z.infer<typeof createOfficeFormSchema>) {
        setOpen(false);

        const payload = {
            name: data.name,
            phone: data.phone,
            zipcode: data.zipcode,
            manager: data.manager,
            address: `${data.ward}, ${data.district}, ${data.provice}`
        }

        fetch(`http://localhost:8000/api/v1/offices/${office.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(payload),
        }).then(resp => {

            console.log(resp)

            return resp.json()
        })
            .then(data => {

                console.log(data);

                document?.getElementById("refresh-office")?.click();
                toast({
                    description: "Điểm giao dịch đã cập nhật.",
                })
            })

        console.log(data);
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                    <EditIcon size={16} strokeWidth={1} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl w-[800px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật điểm giao dịch</DialogTitle>
                    <DialogDescription>
                        Cập nhật thông tin về điểm giao dịch tại đây.
                    </DialogDescription>
                </DialogHeader>

                <EditOfficeForm office={office} onSubmit={onSubmit}></EditOfficeForm>

                <DialogFooter>
                    <Button form="office-edit" type="submit">Xác nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export function DeleteOfficeDialog({ office }: { office: Office }) {

    // const [open, setOpen] = useState(false);
    const { toast } = useToast();

    function onDelete() {
        fetch(`http://localhost:8000/api/v1/offices/${office.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        }).then((resp) => {
            console.log(resp);

            return resp.json();
        }).then((data) => {
            console.log(data);

            document?.getElementById("refresh-office")?.click();
            toast({
                description: "Điểm giao dịch đã xóa.",
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
                    <DialogTitle>Xóa điểm giao dịch</DialogTitle>
                    <DialogDescription>
                        Xóa điểm giao dịch khỏi hệ thống, thực thể liên quan sẽ setnull.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="submit" onClick={onDelete} variant={"destructive"}>Xác nhận</Button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function AddOfficeDialog() {

    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    function onSubmit(values: z.infer<typeof createOfficeFormSchema>) {
        setOpen(false);

        const payload = {
            name: values.name,
            phone: values.phone,
            zipcode: values.zipcode,
            manager: values.manager,
            hub_id: values.hub_id,
            address: `${values.ward}, ${values.district}, ${values.provice}`
        }

        fetch(`http://localhost:8000/api/v1/offices/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(payload),
        }).then(resp => {

            console.log(resp)

            return resp.json()
        })
            .then(data => {

                console.log(data);

                document?.getElementById("refresh-office")?.click();
                toast({
                    description: "Điểm giao dịch đã được tạo thành công.",
                })
            })
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    className="w-48 p-2 flex justify-around items-center"
                >
                    <Plus strokeWidth={1} />
                    <p>Thêm điểm giao dịch</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Tạo điểm giao dịch</DialogTitle>
                    <DialogDescription>
                        Tạo điểm giao dịch mới.
                    </DialogDescription>
                </DialogHeader>
                <AddOfficeForm onSubmit={onSubmit} />
                <DialogFooter>
                    <Button form="office-create" type="submit">Xác nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


interface HubIDInputProp {
    form: UseFormReturn<any>
    field: ControllerRenderProps<any, any>
    hubs: { name: string, id: number }[]
}

function HubIDInput({ form, field, hubs }: HubIDInputProp) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "justify-between w-full",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value
                            ? hubs.find(
                                (zipcode) => zipcode.id === field.value
                            )?.id
                            : "Chọn điểm tập kết"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-96 h-96 ">
                <Command>
                    <CommandInput
                        placeholder="Tìm điểm giao dịch"
                        className="h-9"
                    />
                    <CommandEmpty>Not found.</CommandEmpty>
                    <CommandGroup className="w-full overflow-y-auto">
                        {hubs.map((zipcode) => (
                            <CommandItem
                                value={zipcode.name}
                                key={zipcode.id}
                                onSelect={() => {
                                    form.setValue(field.name, zipcode.id)
                                }}
                            >
                                {zipcode.name}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        zipcode.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
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