"use client";

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ControllerRenderProps, UseFormReturn } from "react-hook-form"


interface ZipcodeInputProp {
    form: UseFormReturn<any>
    field: ControllerRenderProps<any, any>
    zipcodes: { id: number, name: string, zipcode: string }[],
}

interface AddressInputProp {
    form: UseFormReturn<any>
}

export function ZipcodeInput({ form, field, zipcodes }: ZipcodeInputProp) {


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
                            ? zipcodes.find(
                                (zipcode) => zipcode.zipcode === field.value
                            )?.zipcode
                            : "Chọn mã bưu chính"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-96 h-96 ">
                <Command>
                    <CommandInput
                        placeholder="Tìm mã bưu chính"
                        className="h-9"
                    />
                    <CommandEmpty>Not found.</CommandEmpty>
                    <CommandGroup className="w-full overflow-y-auto">
                        {zipcodes.map((zipcode) => (
                            <CommandItem
                                value={zipcode.name}
                                key={`${zipcode.id}-${field.name}`}
                                onSelect={() => {
                                    form.setValue(field.name, zipcode.zipcode)
                                }}
                            >
                                {zipcode.name}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        zipcode.zipcode === field.value
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

export function AddressInput({ form }: AddressInputProp) {

    const [provices, setProvices] = React.useState([])
    const [districts, setDistricts] = React.useState([])
    const [wards, setWards] = React.useState([])

    React.useEffect(() => {
        fetch("https://provinces.open-api.vn/api/").then(res => res.json())
            .then(data => data.map((provice: any) => {
                return {
                    name: provice.name,
                    code: provice.code
                }
            }))
            .then(data => setProvices(data))
    }, [])

    const onProvincesChange = (provice: any) => {
        fetch("https://provinces.open-api.vn/api/d/").then(res => res.json())
            .then(data => data.filter((district: any) => district.province_code === provice.code))
            .then(data => data.map((district: any) => {
                return {
                    name: district.name,
                    code: district.code
                }
            }))
            .then(data => setDistricts(data))
    }

    const onDistrictChange = (district: any) => {
        fetch("https://provinces.open-api.vn/api/w/").then(res => res.json())
            .then(data => data.filter((ward: any) => ward.district_code === district.code))
            .then(data => data.map((ward: any) => {
                return {
                    name: ward.name,
                    code: ward.code
                }
            }))
            .then(data => setWards(data))
    }

    return (
        <div className="flex gap-2">
            <FormField
                control={form.control}
                name="provice"
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Tỉnh/Thành phố</FormLabel>
                        <FormControl>
                            <InnerAddressInput onChange={onProvincesChange} form={form} field={field} allowValues={provices} title="Tỉnh/Thành phố"></InnerAddressInput>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Quận/Huyện</FormLabel>
                        <FormControl>
                            <InnerAddressInput onChange={onDistrictChange} form={form} field={field} allowValues={districts} title="Quận/Huyện"></InnerAddressInput>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="ward"
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Xã/Phường</FormLabel>
                        <FormControl>
                            <InnerAddressInput onChange={() => { }} form={form} field={field} allowValues={wards} title="Xã/Phường"></InnerAddressInput>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

interface InnerAddressInputProp {
    form: UseFormReturn<any>
    field: ControllerRenderProps<any, any>
    allowValues: { name: string, code: number }[],
    title: string,
    onChange: (val: { name: string, code: number }) => void
}

function InnerAddressInput({ form, field, allowValues, title, onChange }: InnerAddressInputProp) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl >
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "justify-between w-full",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        <p>
                            {field.value ? field.value : title}
                        </p>
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-96 h-96 ">
                <Command>
                    <CommandInput
                        placeholder={title}
                        className="h-9"
                    />
                    <CommandEmpty>Not found.</CommandEmpty>
                    <CommandGroup className="w-full overflow-y-auto">
                        {allowValues.map((val) => (
                            <CommandItem
                                value={val.name}
                                key={val.code}
                                onSelect={() => {
                                    onChange(val)
                                    form.setValue(field.name, val.name);
                                }}
                            >
                                {val.name}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        val.name === field.value
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