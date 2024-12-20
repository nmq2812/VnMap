import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo1.png";
import { useSelector } from "react-redux";

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [userName, setUserName] = useState(localStorage.getItem("userName"));
    const userLogin = useSelector((state) => state.userLogin);
    const { error, loading, userInfo } = userLogin;
    console.log(userInfo);

    if (userInfo == null && localStorage.getItem("UserInfo") != null) {
        console.log(userInfo);
        setOpenMenu(!openMenu);
    }

    return (
        <>
            <header class="fixed w-full">
                <nav class="bg-white border-gray-200 py-2.5">
                    <div class="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                        <Link to="/" class="flex items-center">
                            <img
                                src={logo}
                                class="h-6 mr-3 sm:h-9"
                                alt="MagicPost Logo"
                            />
                        </Link>
                        <div class="flex items-center lg:order-2">
                            <a
                                href="./login"
                                class="text-white bg-[#f7941e] hover:bg-[#fab35c] focus:ring-4 focus:ring-yellow-300 font-semibold rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-3 sm:mr-2 lg:mr-0 "
                            >
                                {!userName ? "Đăng nhập" : userName}
                            </a>
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
                                            href="/"
                                            class="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-[#f7941e] rounded lg:bg-transparent lg:text-[#0072bc] lg:p-0"
                                            aria-current="page"
                                        >
                                            Trang chủ 1
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/tra-cuu-don-gui"
                                            class="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-[#f7941e] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#0072bc] lg:p-0"
                                        >
                                            Tra cứu đơn gửi
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/tra-cuu-buu-cuc"
                                            class="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-[#f7941e] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#0072bc] lg:p-0"
                                        >
                                            Tra cứu bưu cục
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/gioi-thieu"
                                            class="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-[#f7941e] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#0072bc] lg:p-0"
                                        >
                                            Giới thiệu
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/lien-he"
                                            class="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-[#f7941e] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#0072bc] lg:p-0"
                                        >
                                            Liên hệ
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
                                            href="/"
                                            class="block py-2 pl-3 pr-4 text-white bg-[#f7941e] rounded lg:bg-transparent lg:text-[#0072bc] lg:p-0 "
                                            aria-current="page"
                                        >
                                            Trang chủ
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/tra-cuu-don-gui"
                                            class="block py-2 pl-3 pr-4 text-black border-b border-gray-100 hover:bg-[#f7941e] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#0072bc] lg:p-0 "
                                        >
                                            Tra cứu đơn gửi
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/tra-cuu-buu-cuc"
                                            class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-[#f7941e] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#0072bc] lg:p-0 "
                                        >
                                            Tra cứu bưu cục
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/gioi-thieu"
                                            class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-[#f7941e] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#0072bc] lg:p-0 "
                                        >
                                            Giới thiệu
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="lien-he"
                                            class="block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-[#f7941e] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#0072bc] lg:p-0 "
                                        >
                                            Liên hệ
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

export default Header;
