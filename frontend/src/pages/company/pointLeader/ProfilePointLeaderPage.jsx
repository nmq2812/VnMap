import React, { useState } from "react";
import PointLeaderHeader from "../../../components/Company/Layout/PointLeaderHeader";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { logout } from "../../../Redux/Actions/userActions";
const ProfilePointLeaderPage = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const dispatch = useDispatch();

    const employeeCode = userInfo._id;
    const [userName, setUserName] = useState(userInfo.userName);
    const [phone, setPhone] = useState(userInfo.phone);
    const postOfficeId = userInfo.postOfficeId;
    const email = userInfo.email;
    const [address, setAddress] = useState(userInfo.address);
    const navigate = useNavigate();
    if (!userInfo) {
        navigate("/");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(employeeCode, userName, phone, postOfficeId, address);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios
            .put(
                `http://localhost:4000/api/user/edit-user`,
                {
                    userName: userName,
                    phone: phone,
                    email: email,
                    address: address,
                },
                config,
            )
            .then((res) => {
                const data = {
                    ...res.data,
                    token: userInfo.token,
                };
                toast.success("Thay đổi thông tin thành công!!");
                localStorage.setItem("userInfo", JSON.stringify(data));
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch((error) => {
                toast.error("Thay đổi thông tin không thành công!!");
            });
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
    };

    const handleLogOut = async () => {
        navigate("/");
        dispatch(logout());
    };
    return (
        <div>
            <PointLeaderHeader />
            <div className=" sm:mx-[50px] sm:px-[10px] sm:py-5 sm:min-h-[800px] min-h-[1000px] py-5 px-[10px]">
                {/* Title */}
                <div className="w-full h-[65px] px-[10px] mb-3">
                    <div className="w-full float-left block text-[#26B99A]">
                        <h3 className="mx-[9px] text-[24px] flex font-[500]">
                            <FaUser size={24} className="mr-2 mt-1" />
                            Quản lý thông tin tài khoản
                        </h3>
                        <h5 className="text-[14px] font-[500] leading-[18px] ml-11">
                            <button
                                onClick={handleLogOut}
                                className="flex text-[#31708f]"
                            >
                                <ins>Đăng xuất</ins>
                                <IoMdLogOut
                                    size={14}
                                    className="ml-1 mt-[2px]"
                                />
                            </button>
                        </h5>
                    </div>
                </div>

                <div className="mx-[-10px] float-left w-full">
                    {/* Cập nhật thông tin cá nhân */}
                    <div>
                        <div className="md:w-[60%] md:relative md:min-h-[1px] md:px-[10px] md:float-left w-full relative min-h-[1px] px-[10px] float-left">
                            <div className="relative w-full h-[100%] mb-[10px] px-[17px] py-[10px] inline-block bg-white border border-solid border-[#e6e9ed] opacity-100 transition-all">
                                <div className="border-b-[2px] border-solid border-b-[#e6e9ed] text-[#26B99A] pt-[1px] pb-[6px] px-[5px] mb-[10px]">
                                    <h2 className="mt-[5px] mb-[6px] block truncate text-[18px] font-[500]">
                                        Thông tin cá nhân
                                    </h2>
                                </div>

                                {/* content nhan vien */}
                                <div className="pt-0 px-[5px] pb-[6px] relative w-full float-left mt-[5px] mb-4 clear-both">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mx-0 mb-[10px] text-[#31708f]">
                                            <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                Mã trưởng điểm
                                                <span className="text-[#a94442]">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                value={employeeCode}
                                                className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                            />
                                        </div>

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
                                                        value={userName}
                                                        onChange={(e) =>
                                                            setUserName(
                                                                e.target.value,
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
                                                        value={phone}
                                                        onChange={(e) =>
                                                            setPhone(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mx-0 mb-[10px] text-[#31708f]">
                                            <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                Mã bưu cục
                                                <span className="text-[#a94442]">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                value={postOfficeId}
                                                className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                            />
                                        </div>

                                        <div className="mx-0 mb-[24px] text-[#31708f]">
                                            <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                Địa chỉ
                                                <span className="text-[#a94442]">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                value={address}
                                                onChange={(e) =>
                                                    setAddress(e.target.value)
                                                }
                                                className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                            />
                                        </div>

                                        <div className="mx-0">
                                            <button
                                                type="submit"
                                                className="mr-[5px] inline-block transition-all text-center w-full cursor-pointer text-white bg-[#26B99A]  font-normal align-middle border-none px-3 py-[6px] leading-[1.43] text-[14px] whitespace-nowrap"
                                            >
                                                Cập nhật thông tin cá nhân
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Thay đổi mật khẩu */}
                    <div>
                        <div className="md:relative md:min-h-[1px] md:float-left md:px-[10px] md:w-[40%] md:h-auto relative min-h-[1px] float-left px-[10px] w-full">
                            <div className="relative w-full h-[100%] mb-[10px] px-[17px] py-[10px] inline-block bg-white border border-solid border-[#e6e9ed] opacity-100 transition-all">
                                <div className="border-b-[2px] border-solid border-b-[#e6e9ed] text-[#26B99A] pt-[1px] pb-[6px] px-[5px] mb-[10px]">
                                    <h2 className="mt-[5px] mb-[6px] block truncate text-[18px] font-[500]">
                                        Thay đổi mật khẩu
                                    </h2>
                                </div>

                                <div className="pt-0 px-[5px] pb-[6px] relative w-full float-left mt-[5px] clear-both">
                                    <form onSubmit={handleUpdatePassword}>
                                        <div className="mx-0 mb-[10px] text-[#31708f]">
                                            <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                Mật khẩu cũ
                                                <span className="text-[#a94442]">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="password"
                                                placeholder=""
                                                className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                            />
                                        </div>

                                        <div className="mx-0 mb-[10px] text-[#31708f]">
                                            <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                Mật khẩu mới
                                                <span className="text-[#a94442]">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="password"
                                                placeholder=""
                                                className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                            />
                                        </div>

                                        <div className="mx-0 mb-[10px] text-[#31708f]">
                                            <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                                Nhập lại mật khẩu mới
                                                <span className="text-[#a94442]">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="password"
                                                placeholder=""
                                                className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                            />
                                        </div>
                                        <div className="border-t-[1px] border-solid border-t-[#e5e5e5] bg-white h-[1px] my-5 relative"></div>

                                        <div className="mx-0 mb-[20px]">
                                            <button
                                                type="submit"
                                                className="mr-[5px] inline-block transition-all text-center w-full cursor-pointer text-white bg-[#26B99A] mb-0 font-normal align-middle border-none px-3 py-[6px] leading-[1.43] text-[14px] whitespace-nowrap"
                                            >
                                                Cập nhật mật khẩu
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePointLeaderPage;
