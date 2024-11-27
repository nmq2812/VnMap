import React, { useState, useEffect } from "react";
import StaffHeader from "../../../components/Company/Layout/StaffHeader";
import { FaPencilAlt } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
const UpdateStatusPage = () => {
    const params = useParams();
    const [orderDetail, setOrderDetail] = useState();
    const [point, setPoint] = useState([]);
    const [senderName, setSenderName] = useState("");
    const [senderNumber, setSenderNumber] = useState("");
    const [senderProvince, setSenderProvince] = useState("");
    const [senderAddress, setSenderAddress] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [recipientNumber, setRecipientNumber] = useState("");
    const [recipientProvince, setRecipientProvince] = useState("");
    const [recipientAddress, setRecipientAddress] = useState("");
    const [productName, setProductName] = useState("");
    const [productType, setProductType] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productWeight, setProductWeight] = useState("");
    const [productQuantity, setProductQuantity] = useState();
    const [productSizeLength, setProductSizeLength] = useState("");
    const [productSizeWidth, setProductSizeWidth] = useState("");
    const [productSizeHeight, setProductSizeHeight] = useState("");
    const [shippingFee, setShippingFee] = useState("");
    const [productTotal, setProductTotal] = useState("");
    const [productNote, setProductNote] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const [orderLocation, setOrderLocation] = useState("");

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const getOrderDetail = async () => {
        await axios
            .get(`http://localhost:4000/api/order/${params.id}`)
            .then((res) => {
                setOrderDetail(res.data);
                setSenderName(res.data.senderName);
                setSenderNumber(res.data.senderNumber);
                setSenderProvince(res.data.senderProvince);
                setSenderAddress(res.data.senderAddress);
                setRecipientName(res.data.recipientName);
                setRecipientNumber(res.data.recipientNumber);
                setRecipientProvince(res.data.recipientProvince);
                setRecipientAddress(res.data.recipientAddress);
                setProductName(res.data.productName);
                setProductType(res.data.productType);
                setProductPrice(res.data.productPrice);
                setProductWeight(res.data.productWeight);
                setProductQuantity(res.data.productQuantity);
                setProductSizeLength(res.data.productSizeLength);
                setProductSizeWidth(res.data.productSizeWidth);
                setProductSizeWidth(res.data.productSizeWidth);
                setProductSizeHeight(res.data.productSizeHeight);
                setShippingFee(res.data.shippingFee);
                setProductTotal(res.data.productTotal);
                setProductNote(res.data.productNote);
                setOrderStatus(res.data.orderStatus);
                setOrderLocation(res.data.orderLocation);
            })
            .catch((err) => {
                toast.error("Truy cập dữ liệu thất bại!!");
            });
    };
    const getAllPoints = async () => {
        await axios.get("http://localhost:4000/api/point").then((res) => {
            console.log(res.data);
            setPoint(res.data);
        });
    };

    useEffect(() => {
        getOrderDetail();
        getAllPoints();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios
            .put(
                `http://localhost:4000/api/order/${orderDetail._id}`,
                {
                    senderName,
                    senderNumber,
                    senderProvince,
                    senderAddress,
                    recipientName,
                    recipientNumber,
                    recipientProvince,
                    recipientAddress,
                    productName,
                    productType,
                    productPrice,
                    productWeight,
                    productQuantity,
                    productSizeLength,
                    productSizeWidth,
                    productSizeHeight,
                    shippingFee,
                    productTotal,
                    productNote,
                    orderStatus,
                    orderLocation,
                },
                config,
            )
            .then((res) => {
                toast.success("Cập nhật đơn hàng thành công!!");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch((error) => {
                toast.error("Cập nhật đơn hàng không thành công!!");
            });
    };

    console.log(orderLocation);

    return (
        <div className="bg-[#f7f7f7]">
            <StaffHeader />
            <div className=" sm:mx-[50px] sm:px-[10px] sm:py-5 sm:min-h-[1000px] min-h-[1000px] py-5 px-[10px]">
                {/* Title */}
                {orderDetail ? (
                    <div>
                        <div className="w-full h-[65px] px-[10px]">
                            <div className="w-full float-left block text-[#26B99A]">
                                <h3 className="mx-[9px] text-[24px] flex font-[500]">
                                    <FaPencilAlt
                                        size={30}
                                        className="mr-2 mt-1"
                                    />
                                    Đơn hàng: {orderDetail._id}
                                </h3>
                                <h5 className="text-[14px] font-[500] leading-[18px] ml-11">
                                    <a
                                        href="/staff/quan-ly-buu-gui"
                                        className="flex text-[#31708f]"
                                    >
                                        <ins>Quản lý bưu gửi</ins>
                                        <BiLinkExternal
                                            size={14}
                                            className="ml-1 mt-[2px]"
                                        />
                                    </a>
                                </h5>
                            </div>
                        </div>

                        {/* Form */}
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="min-h-[1px] float-left px-[10px] w-full">
                                    <div className="mx-[-10px]">
                                        {/* 1 */}
                                        <div className="lg:w-5/12 lg:relative lg:min-h-[1px] lg:px-[10px] lg:float-left w-full relative min-h-[1px] px-[10px] float-left">
                                            <div className="relative w-full h-[100%] mb-[10px] px-[17px] py-[10px] inline-block bg-white border border-solid border-[#e6e9ed] opacity-100 transition-all">
                                                <div className="border-b-[2px] border-solid border-b-[#e6e9ed] text-[#26B99A] pt-[1px] pb-[6px] px-[5px] mb-[10px]">
                                                    <h2 className="mt-[5px] mb-[6px] block truncate text-[18px] font-[500]">
                                                        Người gửi
                                                    </h2>
                                                </div>

                                                {/* content người gửi */}
                                                <div className="pt-0 px-[5px] pb-[6px] relative w-full float-left mt-[5px] mb-6 clear-both">
                                                    <div className="mx-[-10px]">
                                                        <div className="relative min-h-[1px] float-left px-[10px] w-[50%]">
                                                            <div className="mx-0 mb-[10px] text-[#31708f]">
                                                                <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                                    Họ tên
                                                                    <span className="text-[#a94442]">
                                                                        *
                                                                    </span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        senderName
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setSenderName(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    placeholder="Họ tên"
                                                                    className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="relative min-h-[1px] float-left px-[10px] w-[50%]">
                                                            <div className="mx-0 mb-[10px] text-[#31708f]">
                                                                <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                                    Điện thoại
                                                                    <span className="text-[#a94442]">
                                                                        *
                                                                    </span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        senderNumber
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setSenderNumber(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    placeholder="Điện thoại người gửi"
                                                                    className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mx-0 mb-[10px] text-[#31708f]">
                                                        <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                            Quận/Huyện và
                                                            Tỉnh/TP
                                                            <span className="text-[#a94442]">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={
                                                                senderProvince
                                                            }
                                                            onChange={(e) =>
                                                                setSenderProvince(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="VD: Tiền Hải, Thái Bình"
                                                            className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                        />
                                                    </div>

                                                    <div className="mx-0 mb-[10px] text-[#31708f]">
                                                        <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                            Địa chỉ
                                                            <span className="text-[#a94442]">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={
                                                                senderAddress
                                                            }
                                                            onChange={(e) =>
                                                                setSenderAddress(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="Số nhà, tên đường/thôn, ấp..."
                                                            className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="border-b-[2px] border-solid border-b-[#e6e9ed] text-[#26B99A] pt-[1px] pb-[6px] px-[5px] mb-[10px]">
                                                    <h2 className="mt-[5px] mb-[6px] block  text-[18px] font-[500]">
                                                        Người nhận
                                                    </h2>
                                                </div>
                                                {/* content người nhận */}
                                                <div className="pt-0 px-[5px] pb-[6px] relative w-full float-left mt-[5px] clear-both">
                                                    <div className="mx-[-10px]">
                                                        <div className="relative min-h-[1px] float-left px-[10px] w-[50%]">
                                                            <div className="mx-0 mb-[10px] text-[#31708f]">
                                                                <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                                    Họ tên
                                                                    <span className="text-[#a94442]">
                                                                        *
                                                                    </span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        recipientName
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setRecipientName(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    placeholder="Họ tên"
                                                                    className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="relative min-h-[1px] float-left px-[10px] w-[50%]">
                                                        <div className="mx-0 mb-[10px] text-[#31708f]">
                                                            <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                                Số điện thoại
                                                                <span className="text-[#a94442]">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={
                                                                    recipientNumber
                                                                }
                                                                onChange={(e) =>
                                                                    setRecipientNumber(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                placeholder="Số điện thoại"
                                                                className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mx-0 mb-[10px] text-[#31708f]">
                                                        <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                            Quận/Huyện và
                                                            Tỉnh/TP
                                                            <span className="text-[#a94442]">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={
                                                                recipientProvince
                                                            }
                                                            onChange={(e) =>
                                                                setRecipientProvince(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="VD: Tiền Hải, Thái Bình"
                                                            className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                        />
                                                    </div>

                                                    <div className="mx-0 mb-[10px] text-[#31708f]">
                                                        <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                            Địa chỉ
                                                            <span className="text-[#a94442]">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={
                                                                recipientAddress
                                                            }
                                                            onChange={(e) =>
                                                                setRecipientAddress(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="Số nhà, tên đường/thôn, ấp..."
                                                            className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 2 */}
                                        <div className="lg:w-1/3 lg:relative lg:min-h-[1px] lg:px-[10px] lg:float-left w-full relative min-h-[1px] px-[10px] float-left">
                                            <div className="relative w-full h-[100%] mb-[10px] px-[17px] py-[10px] inline-block bg-white border border-solid border-[#e6e9ed] opacity-100 transition-all">
                                                <div className="border-b-[2px] border-solid border-b-[#e6e9ed] text-[#26B99A] pt-[1px] pb-[6px] px-[5px] mb-[10px]">
                                                    <h2 className="mt-[5px] mb-[6px] block truncate text-[18px] font-[500]">
                                                        Thông tin bưu gửi
                                                    </h2>
                                                </div>

                                                <div className="pt-0 px-[5px] pb-[6px] relative w-full float-left mt-[5px]  clear-both">
                                                    <div className="mx-0 mb-[10px] text-[#31708f]">
                                                        <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                            Mã sản phẩm
                                                            <span className="text-[#a94442]">
                                                                *
                                                            </span>
                                                        </label>
                                                        <h5 className="text-[14px]">
                                                            {orderDetail._id}
                                                        </h5>
                                                    </div>
                                                    <div className="mx-0 mb-[10px] text-[#31708f]">
                                                        <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                            Tên sản phẩm
                                                            <span className="text-[#a94442]">
                                                                *
                                                            </span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={productName}
                                                            onChange={(e) =>
                                                                setProductName(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            placeholder="Tên sản phẩm"
                                                            className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                        />
                                                    </div>

                                                    <div className="mx-0 mb-[10px] text-[#31708f]">
                                                        <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                            Loại sản phẩm
                                                            <span className="text-[#a94442]">
                                                                *
                                                            </span>
                                                        </label>
                                                        <select
                                                            name="service"
                                                            id="service"
                                                            value={productType}
                                                            onChange={(e) =>
                                                                setProductType(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                        >
                                                            <option value="null">
                                                                Lựa chọn loại
                                                                sản phẩm
                                                            </option>
                                                            <option value="Tài liệu">
                                                                Tài liệu
                                                            </option>
                                                            <option value="Hàng hóa">
                                                                Hàng hóa
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div className="mx-[-10px]">
                                                        <div className="relative min-h-[1px] float-left px-[10px] w-5/12">
                                                            <div className="mx-0 mb-[10px] text-[#31708f]">
                                                                <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                                    Giá trị
                                                                    <span className="text-[#a94442]">
                                                                        *
                                                                    </span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        productPrice
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) => {
                                                                        if (
                                                                            shippingFee !==
                                                                                "" &&
                                                                            productQuantity
                                                                        ) {
                                                                            setProductTotal(
                                                                                Number(
                                                                                    shippingFee,
                                                                                ) +
                                                                                    productQuantity *
                                                                                        Number(
                                                                                            e
                                                                                                .target
                                                                                                .value,
                                                                                        ),
                                                                            );
                                                                        }
                                                                        setProductPrice(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        );
                                                                    }}
                                                                    placeholder="vnđ"
                                                                    className="transition-all text-right leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="relative min-h-[1px] float-left px-[10px] w-1/3">
                                                            <div className="mx-0 mb-[10px] text-[#31708f]">
                                                                <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                                    K.lượng
                                                                    <span className="text-[#a94442]">
                                                                        *
                                                                    </span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        productWeight
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setProductWeight(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    placeholder="gram"
                                                                    className="transition-all text-right leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="relative min-h-[1px] float-left px-[10px] w-1/4">
                                                            <div className="mx-0 mb-[10px] text-[#31708f]">
                                                                <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                                    S.lượng
                                                                    <span className="text-[#a94442]">
                                                                        *
                                                                    </span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        productQuantity
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) => {
                                                                        if (
                                                                            productPrice !==
                                                                                "" &&
                                                                            shippingFee !==
                                                                                ""
                                                                        ) {
                                                                            setProductTotal(
                                                                                Number(
                                                                                    shippingFee,
                                                                                ) +
                                                                                    e
                                                                                        .target
                                                                                        .value *
                                                                                        Number(
                                                                                            productPrice,
                                                                                        ),
                                                                            );
                                                                        }
                                                                        setProductQuantity(
                                                                            Number(
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            ),
                                                                        );
                                                                    }}
                                                                    placeholder="1"
                                                                    className="transition-all text-right leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mx-0 mb-[10px] text-[#31708f] text-left">
                                                        <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                            Kích thước (nếu có)
                                                        </label>
                                                        <div className="mx-[-10px]">
                                                            <div className="relative min-h-[1px] float-left px-[10px] w-1/3">
                                                                <div className="mx-0 mb-[10px] text-[#31708f]">
                                                                    <input
                                                                        type="text"
                                                                        value={
                                                                            productSizeLength
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            setProductSizeLength(
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                        placeholder="Dài (cm)"
                                                                        className="transition-all text-right leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="relative min-h-[1px] float-left px-[10px] w-1/3">
                                                                <div className="mx-0 mb-[10px] text-[#31708f]">
                                                                    <input
                                                                        type="text"
                                                                        value={
                                                                            productSizeWidth
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            setProductSizeWidth(
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                        placeholder="Rộng (cm)"
                                                                        className="transition-all text-right leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="relative min-h-[1px] float-left px-[10px] w-1/3">
                                                                <div className="mx-0 mb-[10px] text-[#31708f]">
                                                                    <input
                                                                        type="text"
                                                                        value={
                                                                            productSizeHeight
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            setProductSizeHeight(
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                            )
                                                                        }
                                                                        placeholder="Cao (cm)"
                                                                        className="transition-all text-right leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mx-[-10px]">
                                                        <div className="relative min-h-[1px] float-left px-[10px] w-[50%]">
                                                            <div className="mx-0 mb-[10px] text-[#31708f]">
                                                                <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                                    Giá cước
                                                                    <span className="text-[#a94442]">
                                                                        *
                                                                    </span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={
                                                                        shippingFee
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) => {
                                                                        if (
                                                                            productPrice !==
                                                                                "" &&
                                                                            productQuantity
                                                                        ) {
                                                                            setProductTotal(
                                                                                Number(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ) +
                                                                                    productQuantity *
                                                                                        Number(
                                                                                            productPrice,
                                                                                        ),
                                                                            );
                                                                        }
                                                                        setShippingFee(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        );
                                                                    }}
                                                                    placeholder="VNĐ"
                                                                    className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="relative min-h-[1px] float-left px-[10px] w-[50%]">
                                                        <div className="mx-0 mb-[10px] text-[#31708f]">
                                                            <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                                Tổng tiền
                                                                <span className="text-[#a94442]">
                                                                    *
                                                                </span>
                                                            </label>
                                                            <div className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm">
                                                                {productTotal}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mx-0 mb-[10px] text-[#31708f]">
                                                        <label
                                                            for="description"
                                                            className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]"
                                                        >
                                                            Ghi chú
                                                        </label>
                                                        <textarea
                                                            name="description"
                                                            id="description"
                                                            value={productNote}
                                                            onChange={(e) =>
                                                                setProductNote(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            rows="3"
                                                            className="h-auto leading-[30px] w-full px-3 py-[6px] text-[14px] block bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 3 */}
                                        <div className="lg:w-1/4 lg:relative lg:min-h-[1px] lg:px-[10px] lg:float-left w-full relative min-h-[1px] px-[10px] float-left">
                                            <div className="relative w-full h-[100%] mb-[10px] px-[17px] py-[10px] inline-block bg-white border border-solid border-[#e6e9ed] opacity-100 transition-all">
                                                <div className="border-b-[2px] border-solid border-b-[#e6e9ed] text-[#26B99A] pt-[1px] pb-[6px] px-[5px] mb-[10px]">
                                                    <h2 className="mt-[5px] mb-[6px] block truncate text-[18px] font-[500]">
                                                        Trạng thái đơn hàng
                                                    </h2>
                                                </div>

                                                <div className="pt-0 px-[5px] pb-[6px] relative w-full float-left mt-[5px] clear-both min-h-[1px]">
                                                    <div className="mx-0 mb-[10px] text-[#31708f]">
                                                        <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                            Cập nhật trạng thái
                                                            <span className="text-[#a94442]">
                                                                *
                                                            </span>
                                                        </label>
                                                        <select
                                                            name="service"
                                                            id="service"
                                                            value={orderStatus}
                                                            onChange={(e) =>
                                                                setOrderStatus(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                        >
                                                            <option value="null">
                                                                Lựa chọn trạng
                                                                thái
                                                            </option>
                                                            <option value="Chờ lấy hàng">
                                                                Chờ lấy hàng
                                                            </option>
                                                            <option value="Đã lấy hàng">
                                                                Đã lấy hàng
                                                            </option>
                                                            <option value="Đang vận chuyển">
                                                                Đang vận chuyển
                                                            </option>
                                                            <option value="Chờ phát">
                                                                Chờ phát
                                                            </option>
                                                            <option value="Phát thành công">
                                                                Phát thành công
                                                            </option>
                                                            <option value="Phát không">
                                                                Phát không thành
                                                                công
                                                            </option>
                                                            <option value="Chờ chuyển hoàn">
                                                                Chờ chuyển hoàn
                                                            </option>
                                                            <option value="Chuyển hoàn">
                                                                Chuyển hoàn
                                                            </option>
                                                            <option value="Phát hoàn thành công">
                                                                Phát hoàn thành
                                                                công
                                                            </option>
                                                            <option value="Chuyển tiếp">
                                                                Chuyển tiếp
                                                            </option>
                                                            <option value="Vô thừa nhận">
                                                                Vô thừa nhận
                                                            </option>
                                                            <option value="Đơn hàng hủy">
                                                                Đơn hàng hủy
                                                            </option>
                                                            <option value="Bồi thường">
                                                                Bồi thường
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="pt-0 px-[5px] pb-[6px] relative w-full float-left mt-[5px] clear-both min-h-[1px]">
                                                    <div className="mx-0 mb-[10px] text-[#31708f]">
                                                        <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                            Cập nhật vị trí
                                                            <span className="text-[#a94442]">
                                                                *
                                                            </span>
                                                        </label>
                                                        <select
                                                            name="service"
                                                            id="service"
                                                            value={
                                                                orderLocation
                                                            }
                                                            onChange={(e) =>
                                                                setOrderLocation(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                        >
                                                            <option value="null">
                                                                Cập nhật địa
                                                                điểm đơn hàng
                                                            </option>
                                                            {point.map(
                                                                (pointItem) => {
                                                                    return (
                                                                        <option
                                                                            value={
                                                                                pointItem._id
                                                                            }
                                                                        >
                                                                            {
                                                                                pointItem.pointName
                                                                            }
                                                                            :{" "}
                                                                            {
                                                                                pointItem.pointAddress
                                                                            }
                                                                            ,{" "}
                                                                            {
                                                                                pointItem.pointProvince
                                                                            }
                                                                        </option>
                                                                    );
                                                                },
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="mx-0 mb-[20px]">
                                                    <button
                                                        type="submit"
                                                        className="mr-[5px] inline-block transition-all text-center w-full cursor-pointer text-white bg-[#26B99A] mb-0 font-normal align-middle border-none px-3 py-[6px] leading-[1.43] text-[14px] whitespace-nowrap"
                                                    >
                                                        Cập nhật
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-[65px] px-[10px]">
                        <div className="w-full float-left block text-[#26B99A]">
                            <h3 className="mx-[9px] text-[24px] flex font-[500]">
                                <FaPencilAlt size={30} className="mr-2 mt-1" />
                                Không tồn tại đơn hàng: {params.id}
                            </h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UpdateStatusPage;
