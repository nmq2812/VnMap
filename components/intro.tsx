import Image from "next/image";

export function Intro() {
    return (
        <div className="h-screen grid grid-col-2 place-items-center" id="intro">

            <div>
                <Image
                    src="/background.png"
                    width={960}
                    height={960}
                    alt="Picture of the author"
                />
            </div>

            <p className="fade-in">
                <h1 className="text-3xl font-bold tracking-tight m-1">MagicPost xin chào! </h1>
                <h3>Rất vui khi được đồng hành cùng bạn!</h3>
                <h3>Với hàng loạt các điểm dịch vụ ở khắp mọi miền tổ quốc cùng đội ngũ nhân viên đông đảo, MagicPost luôn luôn sẵn sàng phục vụ khách hàng</h3>
            </p>


            <div className="animate-bounce"></div>
        </div>
    )
}