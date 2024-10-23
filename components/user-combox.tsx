import { FormControl } from "./ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"


import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./ui/command"
import { Button } from "./ui/button"
import { ControllerRenderProps, UseFormReturn } from "react-hook-form"
import { cn } from "@/lib/utils"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

interface UsernameComboxProp {
    form: UseFormReturn<any>
    field: ControllerRenderProps<any, any>
    usernames: { label: string, value: string }[]
}

export function UsernameCombox({ form, field, usernames }: UsernameComboxProp) {


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
                        <p>{field.value ? field.value : "Chọn tên người dùng"}</p>
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-96 h-96 ">
                <Command>
                    <CommandInput
                        placeholder="Tìm tên người dùng"
                        className="h-9"
                    />
                    <CommandEmpty>Not found.</CommandEmpty>
                    <CommandGroup className="w-full overflow-y-auto">
                        {usernames.map((username) => (
                            <CommandItem
                                value={username.label}
                                key={username.value}
                                onSelect={() => {
                                    form.setValue(field.name, username.value)
                                }}
                            >
                                {username.label}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        username.value === field.value
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
