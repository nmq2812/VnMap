import { BellIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


type CardProps = React.ComponentProps<typeof Card>

export default function Services() {
    return (
        <div className="h-screen grid place-items-center gap-2 bg-gray-100" id="services">
            <div className="">
                <h1 className="grid place-items-center text-3xl font-bold tracking-tight m-1">Dịch vụ</h1>
                <div className="grid grid-cols-3 mt-8 gap-x-16">
                    <Card >
                        <CardHeader>
                            <CardTitle>Dịch vụ giao hàng</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Chúng tôi cung cấp dịch vụ vận chuyển trong ngày đối với các loại hàng hóa phổ thông và dịch vụ giao hàng siêu tốc 24/7 đối với các đơn hàng vừa và nhỏ</p>
                        </CardContent>
                    </Card>
                    <Card >
                        <CardHeader>
                            <CardTitle>Dịch vụ đóng gói và vận chuyển</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Chúng tôi không chỉ là đối tác vận chuyển đáng tin cậy mà còn là người hỗ trợ đắc lực cho các nhu cầu đóng gói, bảo quản, và vận chuyển hàng hóa . Đội ngũ chúng tôi tuân thủ nghiêm ngặt các quy định an toàn và đảm bảo rằng hàng hóa của bạn luôn được vận chuyển một cách an toàn và hiệu quả. </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Dịch vụ theo dõi và quản lý</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Công ty chúng tôi cung cấp hệ thống theo dõi trực tuyến và thường xuyên cập nhật báo cáo định kỳ về các hoạt động vận chuyển để khách hàng có thể kiểm tra tình trạng của đơn hàng.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
