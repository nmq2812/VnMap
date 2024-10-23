import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EditIcon } from "lucide-react";
import * as z from "zod";
import { Item } from "../order/columns";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UsernameCombox } from "@/components/user-combox";
import { Input } from "postcss";
import { AddressInput } from "./comboxbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


enum ItemStatus {
    PENDING = "pending",
    ON_DELIVERY = "on delivery",
    SHIPPED = "shipped",
    SUCCESS = "success",
    FAILED = "failed"
}


const updateItemFormSchema = z.object({
    status: z.nativeEnum(ItemStatus)
})


export function EditItemDialog({ item }: { item: Item }) {

    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof updateItemFormSchema>>({
        resolver: zodResolver(updateItemFormSchema),
        defaultValues: {
        },
    });

    function onSubmit(values: z.infer<typeof updateItemFormSchema>) {

        setOpen(false);

        const payload = {
            status: values.status,
        }

        fetch(`http://localhost:8000/api/v1/items/${item.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(payload),
        }).then(resp => resp.json())
            .then(data => {

                console.log(data);

                document?.getElementById("refresh-item")?.click();
                toast({
                    description: "Đơn hàng đã cập nhật.",
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
                    <DialogTitle>Cập nhật trạng thái đơn hàng</DialogTitle>
                    <DialogDescription>
                        Cập nhật trạng thái đơn hàng trong hệ thống
                    </DialogDescription>
                </DialogHeader>

                <Form {...form} >
                    <form id="item-edit" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField

                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Loại hàng gửi</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Trạng thái" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">Đang chờ</SelectItem>
                                                <SelectItem value="on delivery">Đang vận chuyển</SelectItem>
                                                <SelectItem value="shipped">Đang giao hàng</SelectItem>
                                                <SelectItem value="success">Thành công</SelectItem>
                                                <SelectItem value="failed">Thất bại</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        >

                        </FormField>
                    </form>
                </Form>

                <DialogFooter>
                    <Button form="item-edit" type="submit">Xác nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}