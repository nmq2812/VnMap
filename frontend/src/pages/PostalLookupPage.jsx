import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

import moment from "moment";
import { toast } from "react-toastify";
import axios from "axios";
const PostalLookupPage = () => {
    const [searchOrder, setSearchOrder] = useState("");
    const [infoOrder, setInfoOrder] = useState();
    console.log(infoOrder);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(123);
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
                            TRA CỨU BƯU GỬI
                        </span>
                    </div>
                    <section class="bg-white">
                        <div class="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:pb-24 lg:pt-8 lg:px-6">
                            <div class="shadow-[2px_10px_25px_5px_rgba(0,0,0,0.1)] p-[40px] rounded-lg">
                                <div className="mb-[18px] text-[16px] flex leading-6">
                                    <img
                                        className="w-[32px] h-[32px] mr-[10px]"
                                        src="https://ems.com.vn/img/icon/order-search.png"
                                        alt=""
                                    />
                                    <div>Mã bưu gửi (VD: EB125966888VN)</div>
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
                                                    Ghi chú: Nhập đúng mã bưu
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
                            <div class="max-w-screen-lg px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:pb-24 lg:pt-8 lg:px-6">
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
                                        <div className="text-[16px] leading-[21px] text-[#313131] px-[15px]">
                                            <div>
                                                Trạng thái:{" "}
                                                <span className="font-[700] text-[16x] leading-[27px] text-[#313131] ml-5">
                                                    {infoOrder[0].orderStatus}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="block w-full overflow-x-auto">
                                        <table class="table w-full border-collapse rounded-md text-center mr-[3px] mb-4">
                                            <thead className="bg-[#0072bc]">
                                                <tr>
                                                    <th class="p-[20px] border solid border-[#fff] leading-[30px] text-[18px] font-[700] text-[#fff] text-center ">
                                                        Số hiệu bưu gửi
                                                    </th>
                                                    <th class="p-[20px] border solid border-[#fff] leading-[30px] text-[18px] font-[700] text-[#fff] text-center ">
                                                        Khối lượng (gram)
                                                    </th>
                                                    <th class="p-[20px] border solid border-[#fff] leading-[30px] text-[18px] font-[700] text-[#fff] text-center ">
                                                        Nơi gửi
                                                    </th>
                                                    <th class="p-[20px] border solid border-[#fff] leading-[30px] text-[18px] font-[700] text-[#fff] text-center ">
                                                        Nơi nhận
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="p-[20px] border-[2px] border-dashed border-[#ddd]">
                                                        {infoOrder[0]._id}
                                                    </td>
                                                    <td class="p-[20px] border-[2px] border-dashed border-[#ddd]">
                                                        {
                                                            infoOrder[0]
                                                                .productWeight
                                                        }
                                                    </td>
                                                    <td class="p-[20px] border-[2px] border-dashed border-[#ddd]">
                                                        {
                                                            infoOrder[0]
                                                                .senderAddress
                                                        }
                                                    </td>
                                                    <td class="p-[20px] border-[2px] border-dashed border-[#ddd]">
                                                        {
                                                            infoOrder[0]
                                                                .recipientAddress
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* <div className="bg-[#0072bc] rounded-t-lg px-[26px] py-[30px] flex flex-wrap ">
                  <div className="border-r-[1px] solid border-r-[#fff] px-[2px] md:px-[5px] lg:px-[15px]">
                    <div className="text-[#fff] text-[14px] leading-[21px]">
                      Số hiệu bưu gửi
                    </div>
                    <p className="font-[700] text-[18px] leading-[27px] text-[#fff] mb-0 text-ellipsis">
                      EU103280832VN
                    </p>
                  </div>

                  <div className="border-r-[1px] solid border-r-[#fff] px-[33px]">
                    <div className="text-[#fff] text-[14px] leading-[21px]">
                      Khối lượng (gram)
                    </div>
                    <p className="font-[700] text-[18px] leading-[27px] text-[#fff] mb-0 text-ellipsis">
                      30
                    </p>
                  </div>

                  <div className="border-r-[1px] solid border-r-[#fff] px-[58px]">
                    <div className="text-[#fff] text-[14px] leading-[21px]">
                      Nơi gửi
                    </div>
                    <p className="font-[700] text-[18px] leading-[27px] text-[#fff] mb-0 text-ellipsis">
                      12910 - Thăng Long
                    </p>
                  </div>

                  <div className=" pl-[58px] pr-[15px]">
                    <div className="text-[#fff] text-[14px] leading-[21px]">
                      Nơi nhận
                    </div>
                    <p className="font-[700] text-[18px] leading-[27px] text-[#fff] mb-0 text-ellipsis">
                      20 - Quảng Ninh
                    </p>
                  </div>
                </div> */}
                                </div>

                                <div>
                                    <div className="mb-[35px]">
                                        <h3 className="font-[700] text-[20px] leading-6 text-[#0072bc]">
                                            THÔNG TIN TRẠNG THÁI
                                        </h3>
                                    </div>
                                    <div className="block w-full overflow-x-auto">
                                        <table class="table w-full border-collapse rounded-md text-center mr-[3px] mb-4">
                                            <thead className="bg-[#0072bc]">
                                                <tr>
                                                    <th class="p-[20px] border solid border-[#fff] leading-[30px] text-[18px] font-[700] text-[#fff] text-center ">
                                                        Ngày
                                                    </th>
                                                    <th class="p-[20px] border solid border-[#fff] leading-[30px] text-[18px] font-[700] text-[#fff] text-center ">
                                                        Giờ
                                                    </th>
                                                    <th class="p-[20px] border solid border-[#fff] leading-[30px] text-[18px] font-[700] text-[#fff] text-center ">
                                                        Trạng thái
                                                    </th>
                                                    <th class="p-[20px] border solid border-[#fff] leading-[30px] text-[18px] font-[700] text-[#fff] text-center">
                                                        Vị trí
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="p-[20px] border-[2px] border-dashed border-[#ddd]">
                                                        {moment(
                                                            infoOrder[0]
                                                                .updatedAt,
                                                        ).format("l")}
                                                    </td>
                                                    <td class="p-[20px] border-[2px] border-dashed border-[#ddd]">
                                                        {moment(
                                                            infoOrder[0]
                                                                .updatedAt,
                                                        ).format("LT")}
                                                    </td>
                                                    <td class="p-[20px] border-[2px] border-dashed border-[#ddd]">
                                                        {
                                                            infoOrder[0]
                                                                .orderStatus
                                                        }
                                                    </td>
                                                    <td class="p-[20px] border-[2px] border-dashed border-[#ddd]">
                                                        {
                                                            infoOrder[0]
                                                                .orderLocation
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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

//ET051174907VN
//EU103280832VN
export default PostalLookupPage;
