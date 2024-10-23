import { AdminTitle } from "@/components/admin-title";
import { Separator } from "@/components/ui/separator";
import { AccountForm } from "./account-form";


export function SettingTab() {

    return (
        <div className="h-full flex justify-center flex-col gap-4 p-3">
            <AdminTitle title="Cài đặt tài khoản" />
            <p className="text-sm text-muted-foreground">
                Cập nhật các thông tin hồ sơ. Như họ tên, số điện thoại...
            </p>

            <div className="flex-1">

                <AccountForm />

            </div>
        </div>
    )
}