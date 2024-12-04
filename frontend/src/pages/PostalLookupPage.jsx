import React, { useState, useEffect } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
import RouteMap from "../components/map";

// Function to fetch coordinates from the API
async function fetchCoordinates(location) {
    const response = await fetch(
        `https://tmdt.fimo.edu.vn/nominatim/search?q=${encodeURIComponent(
            //`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            location,
        )}`, //&format=json&addressdetails=1
    );
    const data = await response.json();
    return data.length > 0 ? { lat: data[0].lat, lon: data[0].lon } : null;
}

const PostalLookupPage = () => {
    const [searchOrder, setSearchOrder] = useState("");
    const [infoOrder, setInfoOrder] = useState(null);
    const [routeLink, setRouteLink] = useState(null);

    useEffect(() => {
        if (infoOrder) {
            const fetchRouteLink = async () => {
                const senderLocation = infoOrder[0].senderAddress;
                const recipientLocation = infoOrder[0].recipientAddress;

                const senderCoords = await fetchCoordinates(senderLocation);
                const recipientCoords = await fetchCoordinates(
                    recipientLocation,
                );
                console.log(senderCoords, recipientCoords);

                if (senderCoords && recipientCoords) {
                    const link = `https://tmdt.fimo.edu.vn/maps/route?point=${senderCoords.lat}%2C${senderCoords.lon}&point=${recipientCoords.lat}%2C${recipientCoords.lon}&profile=truck&layer=OpenStreetMap`;
                    //const link = `https://www.openstreetmap.org/directions?engine=graphhopper_foot&route=${senderCoords.lat}%2C${senderCoords.lon}%3B${recipientCoords.lat}%2C${recipientCoords.lon}`;

                    setRouteLink(link);
                }
            };

            fetchRouteLink();
        }
    }, [infoOrder, searchOrder]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .get(`http://localhost:4000/api/order/${searchOrder}`)
            .then((res) => {
                toast.success("Tìm kiếm đơn hàng thành công!!");
                setInfoOrder([res.data]);
            })
            .catch((err) => {
                toast.error("Tìm kiếm đơn hàng thất bại!!");
                console.log(err);
            });
    };

    return (
        <div>
            <Header />
            <div>
                <div className="block top-16">
                    <img
                        src="https://i.imgur.com/xLuYgb1.jpg"
                        className="object-cover h-[340px] w-full"
                        alt=""
                    />
                </div>
                <div>
                    <div className="max-w-screen-xl px-4 pt-8 mx-auto lg:space-y-20 lg:px-6">
                        <span className="text-[#f7941e] text-4xl items-center lg:font-[500] lg:text-[45px] lg:leading-[55px]">
                            TRA CỨU ĐƠN GỬI
                        </span>
                    </div>
                    <section className="bg-white">
                        <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:pb-24 lg:pt-8 lg:px-6">
                            <div className="shadow-[2px_10px_25px_5px_rgba(0,0,0,0.1)] p-[40px] rounded-lg">
                                <div className="mb-[18px] text-[16px] flex leading-6">
                                    <img
                                        className="w-[32px] h-[32px] mr-[10px]"
                                        src="https://ems.com.vn/img/icon/order-search.png"
                                        alt=""
                                    />
                                    <div>Mã đơn gửi (VD: EB125966888VN)</div>
                                </div>
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex flex-wrap mr-[-15px] ml-[-15px]">
                                            <div className="grow-0 shrink-0 basis-3/4 max-w-[75%] w-full px-[15px]">
                                                <input
                                                    type="text"
                                                    value={searchOrder}
                                                    onChange={(e) =>
                                                        setSearchOrder(
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Nhập mã bưu gửi"
                                                    className="w-full border solid border-[#edecec] rounded py-[13px] px-[20px]"
                                                />
                                            </div>
                                            <div className="grow-0 shrink-0 basis-1/4 max-w-[25%]  w-full px-[15px]">
                                                <button
                                                    onClick={handleSubmit}
                                                    className="flex items-center justify-center text-white bg-[#f7941e] hover:bg-[#0072bc] hover:-translate-y-1 transition-all duration-500 leading-6 font-[500] text-[18px] w-full h-full rounded-md"
                                                >
                                                    Tra cứu
                                                </button>
                                            </div>
                                            <div className="mt-[20px] text-[14px] pl-[15px]">
                                                <i>
                                                    Ghi chú: Nhập đúng mã đơn
                                                    gửi để tra cứu thành công
                                                </i>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                    {infoOrder && (
                        <section className="bg-white">
                            <div className="max-w-screen-lg px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:pb-24 lg:pt-8 lg:px-6">
                                <div className="mb-[70px]">
                                    <div className="mb-[35px]">
                                        <h3 className="font-[700] text-[20px] leading-6 text-[#0072bc]">
                                            THÔNG TIN BƯU GỬI
                                        </h3>
                                    </div>
                                    <div className="px-[23px] py-[24px] bg-[#fafafa] border-b-[1px] border-dashed border-b-[#afafaf] flex flex-wrap">
                                        <div className="text-[16px] leading-[21px] text-[#313131] px-[15px] basis-[100%] shrink-0 md:basis-1/3 grow-0 md:max-w-[33.333%]">
                                            <div>
                                                Nước gửi:{" "}
                                                <span className="font-[700] text-[16x] leading-[27px] text-[#313131] ml-5">
                                                    VN-VIETNAM
                                                </span>
                                            </div>
                                        </div>

                                        <div className="text-[16px] leading-[21px] text-[#313131] px-[15px] basis-[100%] shrink-0 md:basis-2/3 grow-0 md:max-w-[66.66667%]">
                                            <div>
                                                Địa chỉ gửi:{" "}
                                                <span className="font-[700] text-[16px] leading-[27px] text-[#313131] ml-5">
                                                    {infoOrder[0].senderAddress}
                                                    {" - "}
                                                    {
                                                        infoOrder[0]
                                                            .senderProvince
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-[23px] py-[24px] bg-[#fafafa] border-b-[1px] border-dashed border-b-[#afafaf] flex flex-wrap">
                                        <div className="text-[16px] leading-[21px] text-[#313131] px-[15px] basis-[100%] shrink-0 md:basis-1/3 grow-0 md:max-w-[33.333%]">
                                            <div>
                                                Nước nhận:{" "}
                                                <span className="font-[700] text-[16x] leading-[27px] text-[#313131] ml-5">
                                                    VN-VIETNAM
                                                </span>
                                            </div>
                                        </div>

                                        <div className="text-[16px] leading-[21px] text-[#313131] px-[15px] basis-[100%] shrink-0 md:basis-2/3 grow-0 md:max-w-[66.66667%]">
                                            <div>
                                                Địa chỉ nhận:{" "}
                                                <span className="font-[700] text-[16px] leading-[27px] text-[#313131] ml-5">
                                                    {
                                                        infoOrder[0]
                                                            .recipientAddress
                                                    }
                                                    {" - "}
                                                    {
                                                        infoOrder[0]
                                                            .recipientProvince
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-[23px] py-[24px] bg-[#fafafa]">
                                        <div className="text-[16px] leading-[21px] text-[#313131] px-[15px] basis-[100%] shrink-0 md:basis-1/3 grow-0 md:max-w-[33.333%]">
                                            <div>
                                                Cập nhật:{" "}
                                                <span className="font-[700] text-[16x] leading-[27px] text-[#313131] ml-5">
                                                    {moment(
                                                        infoOrder[0].updatedAt,
                                                    ).format(
                                                        "DD/MM/YYYY HH:mm:ss",
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-[23px] py-[24px] bg-[#fafafa]">
                                        {/* <div>
                                            {routeLink ? (
                                                <a
                                                    href={routeLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Xem lộ trình đường đi
                                                </a>
                                            ) : (
                                                <p>Đang lấy lộ trình...</p>
                                            )}
                                        </div> */}
                                        <RouteMap mapLink={routeLink} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PostalLookupPage;
