import React, { useState } from "react";
import PointLeaderHeader from "../../../components/Company/Layout/PointLeaderHeader";
import { BiLinkExternal } from "react-icons/bi";
import { FaRegListAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
const OrderStatsPage = () => {
    const [allOrder, setAllOrder] = useState([]);
    const [statistical, setStatistical] = useState();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const handleStatistical = async (e) => {
        setStatistical(e.target.value);
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        if (
            e.target.value === "Hàng gửi tại điểm giao dịch" ||
            e.target.value === "Hàng đi tại điểm tập kết"
        ) {
            await axios
                .get(
                    "http://localhost:4000/api/order/all-order-create-point",
                    config,
                )
                .then((res) => {
                    setAllOrder(res.data);
                    toast.success("Lấy dữ liệu thành công!!");
                })
                .catch((err) => {
                    setAllOrder([]);
                    toast.error("Lấy dữ liệu không thành công!!");
                });
        } else if (
            e.target.value === "Hàng nhận tại điểm giao dịch" ||
            e.target.value === "Hàng đến tại điểm tập kết"
        ) {
            await axios
                .get(
                    "http://localhost:4000/api/order/all-order-in-point",
                    config,
                )
                .then((res) => {
                    setAllOrder(res.data);
                    toast.success("Lấy dữ liệu thành công!!");
                })
                .catch((err) => {
                    setAllOrder([]);
                    toast.error("Lấy dữ liệu không thành công!!");
                });
        } else {
            setAllOrder([]);
        }
    };

    return (
        <div>
            <PointLeaderHeader />
            <div className=" sm:mx-[50px] sm:px-[10px] sm:py-5 sm:min-h-[800px] min-h-[1000px] py-5 px-[10px]">
                {/* Title */}
                <div className="w-full h-[65px] px-[10px] mb-3">
                    <div className="w-full float-left block text-[#26B99A]">
                        <h3 className="mx-[9px] text-[24px] flex font-[500]">
                            <FaRegListAlt size={24} className="mr-2 mt-[7px]" />
                            Thông kê hàng
                        </h3>
                        <h5 className="text-[14px] font-[500] leading-[18px] ml-11">
                            <a href="/" className="flex text-[#31708f]">
                                <ins>Quản lý nhân viên</ins>
                                <BiLinkExternal
                                    size={14}
                                    className="ml-1 mt-[2px]"
                                />
                            </a>
                        </h5>
                    </div>
                </div>

                <div>
                    <div className="block w-full overflow-x-auto">
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <div class="items-center justify-between pb-4">
                                <div className="pt-0 px-[5px] pb-[6px] relative w-full float-left mt-[5px] clear-both min-h-[1px]">
                                    <div className="mx-0 mb-[10px] text-[#31708f] w-[30%]">
                                        <select
                                            name="service"
                                            id="service"
                                            value={statistical}
                                            onChange={handleStatistical}
                                            className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                        >
                                            <option value="null">
                                                Thống kê theo
                                            </option>
                                            {userInfo.role ===
                                            "head of transaction point" ? (
                                                <>
                                                    <option value="Hàng gửi tại điểm giao dịch">
                                                        Hàng gửi tại điểm giao
                                                        dịch
                                                    </option>
                                                    <option value="Hàng nhận tại điểm giao dịch">
                                                        Hàng nhận tại điểm giao
                                                        dịch
                                                    </option>
                                                </>
                                            ) : (
                                                <>
                                                    <option value="Hàng đi tại điểm tập kết">
                                                        Hàng đi tại điểm tập kết
                                                    </option>
                                                    <option value="Hàng đến tại điểm tập kết">
                                                        Hàng đến tại điểm tập
                                                        kết
                                                    </option>
                                                </>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <table class="w-full text-sm text-left text-gray-500 ">
                                <thead class="text-xs font-[500] text-white uppercase bg-[#0072bc] ">
                                    <tr>
                                        <td class="w-[5%] px-6 py-3 border solid border-[#fff]">
                                            STT
                                        </td>
                                        <td class="px-6 py-3 border solid border-[#fff]">
                                            Mã đơn hàng
                                        </td>
                                        <td class="px-6 py-3 border solid border-[#fff]">
                                            Tên sản phẩm
                                        </td>
                                        <td class="px-6 py-3 border solid border-[#fff]">
                                            Trạng thái
                                        </td>
                                        <td class="px-6 py-3 border solid border-[#fff]">
                                            Người gửi
                                        </td>
                                        <td class="px-6 py-3 border solid border-[#fff]">
                                            Người nhận
                                        </td>
                                        <td class="px-6 py-3 border solid border-[#fff]">
                                            Giá (VNĐ)
                                        </td>
                                        <td class="px-6 py-3 border solid border-[#fff]">
                                            Phí (VNĐ)
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allOrder.map((orderItem, i) => {
                                        return (
                                            <tr class="bg-white hover:bg-gray-50 ">
                                                <td class="px-6 py-4 border border-dashed border-[#ddd] font-medium text-gray-900 whitespace-nowrap ">
                                                    {i + 1}
                                                </td>
                                                <td class="px-6 py-4 border border-dashed border-[#ddd] font-medium text-gray-900 whitespace-nowrap ">
                                                    {orderItem._id}
                                                </td>
                                                <td class="px-6 py-4 border border-dashed border-[#ddd]">
                                                    {orderItem.productName}
                                                </td>
                                                <td class="px-6 py-4 border border-dashed border-[#ddd]">
                                                    {orderItem.orderStatus}
                                                </td>
                                                <td class="px-6 py-4 border border-dashed border-[#ddd]">
                                                    {orderItem.senderName}
                                                </td>
                                                <td class="px-6 py-4 border border-dashed border-[#ddd]">
                                                    {orderItem.recipientName}
                                                </td>
                                                <td class="px-6 py-4 border border-dashed border-[#ddd]">
                                                    {orderItem.productPrice}
                                                </td>
                                                <td class="px-6 py-4 border border-dashed border-[#ddd]">
                                                    {orderItem.shippingFee}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderStatsPage;
