import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo1.png";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PresidentHeader = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const navigate = useNavigate();
    useEffect(() => {
        if (!userInfo) {
            navigate("/");
        }
    }, [userInfo, navigate]);
    return (
        <>
            <header class="sticky w-full top-0 left-0 z-30">
                <nav class="bg-[#0072bc] border-gray-200 py-2.5">
                    <div class="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                        <Link to="/" class="flex items-center">
                            <img
                                src={logo}
                                class="h-6 mr-3 sm:h-9"
                                alt="MagicPost Logo"
                            />
                        </Link>
                        <div class="flex items-center  lg:order-2">
                            <div className="800px:mx-5 800px:cursor-pointer 800px:flex mr-3">
                                <Link
                                    to={`/pointleader/profile/${userInfo._id}`}
                                >
                                    <CgProfile color="#f7941e" size={30} />
                                </Link>
                                <div className="800px:block hidden 800px:pt-[2px]">
                                    <span className="text-[13px] text-[#fff] font-bold pl-2 ">
                                        {userInfo.userName}
                                    </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                                onClick={() => setOpenMenu(!openMenu)}
                            >
                                <svg
                                    class="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                <svg
                                    class="hidden w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        {openMenu === true ? (
                            <div
                                class="items-center justify-between w-full lg:flex lg:w-auto lg:order-1"
                                id="mobile-menu-2"
                            >
                                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                    <li>
                                        <a
                                            href="/president/he-thong-diem"
                                            class="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:bg-[#f7941e] rounded lg:bg-transparent lg:text-[#0072bc] lg:p-0"
                                            aria-current="page"
                                        >
                                            Hệ thống điểm
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/president/quan-ly-tai-khoan-truong-diem"
                                            class="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:bg-[#f7941e] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#0072bc] lg:p-0"
                                        >
                                            Tài khoản trưởng điểm
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/president/thong-ke-hang"
                                            class="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:bg-[#f7941e] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#0072bc] lg:p-0"
                                        >
                                            Thống kê hàng
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div
                                class="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
                                id="mobile-menu-2"
                            >
                                <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                    <li>
                                        <a
                                            href="/president/he-thong-diem"
                                            class="block py-2 pl-3 pr-4 text-white bg-[#f7941e] rounded lg:bg-transparent lg:text-[#f7941e] lg:p-0 "
                                            aria-current="page"
                                        >
                                            Hệ thống điểm
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/president/quan-ly-tai-khoan-truong-diem"
                                            class="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:bg-[#f7941e] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#f7941e] lg:p-0 "
                                        >
                                            Quản lý tài khoản trưởng điểm
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/president/thong-ke-hang"
                                            class="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:bg-[#f7941e] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#f7941e] lg:p-0 "
                                        >
                                            Thống kê hàng
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
};

export default PresidentHeader;
