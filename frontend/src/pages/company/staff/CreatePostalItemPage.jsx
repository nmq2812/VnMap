import React, { useState, useEffect } from "react";
import StaffHeader from "../../../components/Company/Layout/StaffHeader.jsx";
import { FaPencilAlt } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import { toast } from "react-toastify";
import { State } from "country-state-city";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";

const CreatePostalItemPage = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate();
    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        }
    }, [userInfo, navigate]);

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
    const [productQuantity, setProductQuantity] = useState(1);
    const [productSizeLength, setProductSizeLength] = useState("");
    const [productSizeWidth, setProductSizeWidth] = useState("");
    const [productSizeHeight, setProductSizeHeight] = useState("");
    const [shippingFee, setShippingFee] = useState("");
    const [productTotal, setProductTotal] = useState("");
    const [productNote, setProductNote] = useState("");
    const [serviceExtra, setServiceExtra] = useState();
    const [serviceLetCusSee, setServiceLetCusSee] = useState(false);
    const [serviceFragile, setServiceFragile] = useState(false);
    console.log({
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
        serviceExtra,
        serviceLetCusSee,
        serviceFragile,
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios
            .post(
                `http://localhost:4000/api/order/create-order`,
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
                    serviceExtra,
                    serviceLetCusSee,
                    serviceFragile,
                },
                config,
            )
            .then((res) => {
                toast.success("Tạo đơn hàng thành công!!");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                navigate(-1);
            })
            .catch((error) => {
                toast.error("Tạo đơn hàng không thành công!!");
            });
    };

    return (
        <div className="bg-[#f7f7f7]">
            <StaffHeader />
            <div className=" sm:mx-[50px] sm:px-[10px] sm:py-5 sm:min-h-[1000px] min-h-[1000px] py-5 px-[10px]">
                {/* Title */}
                <div className="w-full h-[65px] px-[10px]">
                    <div className="w-full float-left block text-[#26B99A]">
                        <h3 className="mx-[9px] text-[24px] flex font-[500]">
                            <FaPencilAlt size={30} className="mr-2 mt-1" />
                            Tạo bưu gửi
                        </h3>
                        <h5 className="text-[14px] font-[500] leading-[18px] ml-11">
                            <a href="/" className="flex text-[#31708f]">
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
                                                            placeholder="Họ tên"
                                                            value={senderName}
                                                            onChange={(e) =>
                                                                setSenderName(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
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
                                                            placeholder="Điện thoại người gửi"
                                                            value={senderNumber}
                                                            onChange={(e) =>
                                                                setSenderNumber(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mx-0 mb-[10px] text-[#31708f]">
                                                <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                    Tỉnh/TP
                                                    <span className="text-[#a94442]">
                                                        *
                                                    </span>
                                                </label>
                                                <select
                                                    name=""
                                                    id=""
                                                    value={senderProvince}
                                                    onChange={(e) =>
                                                        setSenderProvince(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-[100%] border h-[40px] rounded-[5px]"
                                                >
                                                    <option value="">
                                                        Chọn Tỉnh/TP
                                                    </option>
                                                    {State.getStatesOfCountry(
                                                        "VN",
                                                    ).map((item) => (
                                                        <option
                                                            key={item.isoCode}
                                                            value={item.isoCode}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </select>
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
                                                    placeholder="Số nhà, tên đường/thôn, ấp..."
                                                    value={senderAddress}
                                                    onChange={(e) =>
                                                        setSenderAddress(
                                                            e.target.value,
                                                        )
                                                    }
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
                                                            placeholder="Họ tên"
                                                            value={
                                                                recipientName
                                                            }
                                                            onChange={(e) =>
                                                                setRecipientName(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                        />
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
                                                            placeholder="Số điện thoại"
                                                            value={
                                                                recipientNumber
                                                            }
                                                            onChange={(e) =>
                                                                setRecipientNumber(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mx-0 mb-[10px] text-[#31708f]">
                                                <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                    Tỉnh/TP
                                                    <span className="text-[#a94442]">
                                                        *
                                                    </span>
                                                </label>
                                                <select
                                                    name=""
                                                    id=""
                                                    value={recipientProvince}
                                                    onChange={(e) =>
                                                        setRecipientProvince(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-[100%] border h-[40px] rounded-[5px]"
                                                >
                                                    <option value="">
                                                        Chọn Tỉnh/TP
                                                    </option>
                                                    {State.getStatesOfCountry(
                                                        "VN",
                                                    ).map((item) => (
                                                        <option
                                                            key={item.isoCode}
                                                            value={item.isoCode}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    ))}
                                                </select>
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
                                                    placeholder="Số nhà, tên đường/thôn, ấp..."
                                                    value={recipientAddress}
                                                    onChange={(e) =>
                                                        setRecipientAddress(
                                                            e.target.value,
                                                        )
                                                    }
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
                                                    Tên sản phẩm
                                                    <span className="text-[#a94442]">
                                                        *
                                                    </span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Tên sản phẩm"
                                                    value={productName}
                                                    onChange={(e) =>
                                                        setProductName(
                                                            e.target.value,
                                                        )
                                                    }
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
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                >
                                                    <option value="null">
                                                        Lựa chọn loại sản phẩm
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
                                                            placeholder="vnđ"
                                                            value={productPrice}
                                                            onChange={(e) => {
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
                                                                    e.target
                                                                        .value,
                                                                );
                                                            }}
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
                                                            placeholder="gram"
                                                            value={
                                                                productWeight
                                                            }
                                                            onChange={(e) =>
                                                                setProductWeight(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
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
                                                            placeholder="1"
                                                            value={
                                                                productQuantity
                                                            }
                                                            onChange={(e) => {
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
                                                                        e.target
                                                                            .value,
                                                                    ),
                                                                );
                                                            }}
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
                                                                placeholder="Dài (cm)"
                                                                value={
                                                                    productSizeLength
                                                                }
                                                                onChange={(e) =>
                                                                    setProductSizeLength(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                className="transition-all text-right leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="relative min-h-[1px] float-left px-[10px] w-1/3">
                                                        <div className="mx-0 mb-[10px] text-[#31708f]">
                                                            <input
                                                                type="text"
                                                                placeholder="Rộng (cm)"
                                                                value={
                                                                    productSizeWidth
                                                                }
                                                                onChange={(e) =>
                                                                    setProductSizeWidth(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                className="transition-all text-right leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="relative min-h-[1px] float-left px-[10px] w-1/3">
                                                        <div className="mx-0 mb-[10px] text-[#31708f]">
                                                            <input
                                                                type="text"
                                                                placeholder="Cao (cm)"
                                                                value={
                                                                    productSizeHeight
                                                                }
                                                                onChange={(e) =>
                                                                    setProductSizeHeight(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
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
                                                            placeholder="15000 VNĐ"
                                                            value={shippingFee}
                                                            onChange={(e) => {
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
                                                                    e.target
                                                                        .value,
                                                                );
                                                            }}
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
                                                            e.target.value,
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
                                                Bưu gửi
                                            </h2>
                                        </div>

                                        <div className="pt-0 px-[5px] pb-[6px] relative w-full float-left mt-[5px] clear-both min-h-[1px]">
                                            <div className="mx-0 mb-[10px] text-[#31708f]">
                                                <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                    Dịch vụ vẫn chuyển
                                                    <span className="text-[#a94442]">
                                                        *
                                                    </span>
                                                </label>
                                                <div className="text-[14px]">
                                                    Chuyển phát nhanh
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-0 px-[5px] pb-[6px] relative w-full float-left mt-[5px] clear-both min-h-[1px]">
                                            <div className="mx-0 mb-[10px] text-[#31708f]">
                                                <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                    Dịch vụ cộng thêm
                                                </label>
                                                <select
                                                    name="service"
                                                    id="service"
                                                    value={serviceExtra}
                                                    onChange={(e) =>
                                                        setServiceExtra(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                >
                                                    <option value="null">
                                                        Dịch vụ cộng thêm
                                                    </option>
                                                    <option value="Giao hàng thu">
                                                        Giao hàng thu tiền
                                                    </option>
                                                    <option value="Thu thập hồ sơ và báo phát hình ảnh">
                                                        Thu thập hồ sơ và báo
                                                        phát hình ảnh
                                                    </option>
                                                    <option value="Thu hộ phí ship hàng">
                                                        Thu hộ phí ship hàng
                                                    </option>
                                                    <option value="Thu hộ phí hủy đơn hàng">
                                                        Thu hộ phí hủy đơn hàng
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="pt-0 px-[5px] pb-[6px] relative w-full float-left mt-[5px] clear-both min-h-[1px]">
                                            <label class="relative inline-flex items-center cursor-pointer mb-[5px]">
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) =>
                                                        setServiceLetCusSee(
                                                            !serviceLetCusSee,
                                                        )
                                                    }
                                                    class="sr-only peer"
                                                />
                                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#26b99a]"></div>
                                                <span class="ml-3 font-bold text-[13px] leading-[1.48] text-[#31708f]">
                                                    Cho khách xem hàng
                                                </span>
                                            </label>
                                        </div>

                                        <div className="pt-0 px-[5px] pb-[6px] relative w-full float-left mt-[5px] mb-[10px] clear-both min-h-[1px]">
                                            <label class="relative inline-flex items-center cursor-pointer mb-[5px]">
                                                <input
                                                    type="checkbox"
                                                    onChange={(e) =>
                                                        setServiceFragile(
                                                            !serviceFragile,
                                                        )
                                                    }
                                                    class="sr-only peer"
                                                />
                                                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#26b99a]"></div>
                                                <span class="ml-3 font-bold text-[13px] leading-[1.48] text-[#31708f]">
                                                    Hàng chất lỏng, pin sạc
                                                </span>
                                            </label>
                                        </div>

                                        <div className="mx-0 mb-[20px]">
                                            <button
                                                type="submit"
                                                className="mr-[5px] inline-block transition-all text-center w-full cursor-pointer text-white bg-[#26B99A] mb-0 font-normal align-middle border-none px-3 py-[6px] leading-[1.43] text-[14px] whitespace-nowrap"
                                            >
                                                TẠO BƯU GỬI
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePostalItemPage;
