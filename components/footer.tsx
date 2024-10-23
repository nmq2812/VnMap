import { Brand } from "./brand"

export function Footer() {

    const footerNavs = [
        {
            href: 'javascript:void()',
            name: 'Terms'
        },
        {
            href: 'javascript:void()',
            name: 'License'
        },
        {
            href: 'javascript:void()',
            name: 'Privacy'
        },
        {
            href: 'javascript:void()',
            name: 'About us'
        }
    ]

    return (
        <footer className="pt-10">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="justify-between sm:flex">
                    <div className="space-y-6">
                        <Brand title="Magic Post" />
                        <p className="max-w-md">
                            Luôn luôn lắng nghe, luôn luôn thấu hiểu.
                        </p>
                    </div>
                    <div className="">
                        <p className="text-gray-700 font-semibold">Liên hệ</p>
                        <div className="flex items-center gap-3 mt-3 sm:block">
                            144 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà nội.
                        </div>
                        <div className="flex items-center gap-3 mt-3 sm:block">
                            Email: <a href="mailto:phuclaplace@gmail.com">phuclaplace@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-3 mt-3 sm:block">
                            Điện thoại: <a href="tel:0123456789">0123456789</a>
                        </div>
                    </div>
                </div>
                <div className="mt-10 py-10 border-t md:text-center">
                    <p>© 2023 Magic Post Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}