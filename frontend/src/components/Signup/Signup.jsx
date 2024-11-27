import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import styles from "../../styles/styles.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

const Signup = () => {
    const [visible, setVisible] = useState(false);
    const [point, setPoint] = useState([]);

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedValue(selectedOption);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        await axios
            .post(
                `http://localhost:4000/api/user/register/${selectedValue}`,
                {
                    userName: userName,
                    email: email,
                    password: password,
                    phone: phone,
                    address: address,
                },
                config,
            )
            .then((res) => {
                toast.success("Đăng ký thành công!!");
                setUserName("");
                setEmail("");
                setPassword("");
                setPhone("");
                setAddress("");
            })
            .catch((error) => {
                toast.error("Đăng ký không thành công!!");
            });
    };

    const getAllPoints = async () => {
        await axios.get("http://localhost:4000/api/point").then((res) => {
            console.log(res.data);
            setPoint(res.data);
        });
    };

    useEffect(() => {
        getAllPoints();
    }, []);

    return (
        <div class="h-screen flex justify-center ">
            <div
                class="hidden lg:flex w-full lg:w-1/2 bg-cover bg-[url('https://images.pexels.com/photos/1556991/pexels-photo-1556991.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]
         justify-around items-center "
            >
                <div class="w-full mx-auto px-20 flex-col items-center space-y-6">
                    <h1 class="text-[#f7941e] font-bold text-4xl font-sans">
                        MagicPost
                    </h1>
                    <p class="text-white mt-1">Welcome to my app!!!</p>
                    <div class="flex justify-center lg:justify-start mt-6">
                        <Link
                            to="/"
                            class="hover:bg-[#0072bc] hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-[#0072bc] mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
                        >
                            Go to app
                        </Link>
                    </div>
                </div>
            </div>
            <div class="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
                <div class="w-full px-8 md:px-32 lg:px-24">
                    <form
                        class="bg-white rounded-md shadow-2xl p-5"
                        onSubmit={handleSubmit}
                    >
                        <h1 class="text-gray-800 font-bold text-2xl mb-1 text-center">
                            Register
                        </h1>
                        <p class="text-sm font-normal text-gray-600 mb-6 text-center">
                            Please register your account!
                        </p>
                        <div class="flex items-center border-2 mb-6 py-2 px-3 rounded-2xl outline-none ring-blue-500 border-blue-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <input
                                id="name"
                                class=" pl-2 w-full outline-none border-none "
                                type="name"
                                name="name"
                                autoComplete="name"
                                required
                                placeholder="Your name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div class="flex items-center border-2 mb-6 py-2 px-3 rounded-2xl outline-none ring-blue-500 border-blue-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                />
                            </svg>
                            <input
                                id="email"
                                class=" pl-2 w-full outline-none border-none "
                                type="email"
                                name="email"
                                autoComplete="email"
                                required
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div class="relative flex items-center border-2 mb-6 py-2 px-3 rounded-2xl outline-none ring-blue-500 border-blue-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                class="pl-2 w-full outline-none border-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                type={visible ? "text" : "password"}
                                name="password"
                                autoComplete="current-password"
                                required
                                placeholder="Your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {visible ? (
                                <AiOutlineEye
                                    className="absolute right-2 top-2 cursor-pointer"
                                    size={25}
                                    onClick={() => setVisible(false)}
                                />
                            ) : (
                                <AiOutlineEyeInvisible
                                    className="absolute right-2 top-2 cursor-pointer"
                                    size={25}
                                    onClick={() => setVisible(true)}
                                />
                            )}
                        </div>
                        <div class="flex items-center border-2 mb-6 py-2 px-3 rounded-2xl outline-none ring-blue-500 border-blue-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 20 20"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m16.344 12.168-1.4-1.4a1.98 1.98 0 0 0-2.8 0l-.7.7a1.98 1.98 0 0 1-2.8 0l-2.1-2.1a1.98 1.98 0 0 1 0-2.8l.7-.7a1.981 1.981 0 0 0 0-2.8l-1.4-1.4a1.828 1.828 0 0 0-2.8 0C-.638 5.323 1.1 9.542 4.78 13.22c3.68 3.678 7.9 5.418 11.564 1.752a1.828 1.828 0 0 0 0-2.804Z"
                                />
                            </svg>
                            <input
                                id="phone"
                                class=" pl-2 w-full outline-none border-none "
                                type="text"
                                name="phone"
                                autoComplete="phone"
                                required
                                placeholder="Phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div class="flex items-center border-2 py-2 px-3 relative rounded-2xl outline-none ring-blue-500 border-blue-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6 text-gray-400"
                                fill="none"
                                viewBox="0 0 20 20"
                                stroke="currentColor"
                            >
                                <path
                                    fill="none"
                                    d="M10.001,6.54c-0.793,0-1.438,0.645-1.438,1.438c0,0.792,0.645,1.435,1.438,1.435c0.791,0,1.435-0.644,1.435-1.435C11.437,7.184,10.792,6.54,10.001,6.54z M10.001,8.454c-0.264,0-0.479-0.213-0.479-0.476c0-0.265,0.215-0.479,0.479-0.479c0.263,0,0.477,0.214,0.477,0.479C10.478,8.241,10.265,8.454,10.001,8.454z"
                                />
                                <path
                                    fill="none"
                                    d="M10,3.021c-2.815,0-5.106,2.291-5.106,5.106c0,0.781,0.188,1.549,0.562,2.282c0.011,0.062,0.036,0.12,0.07,0.174l0.125,0.188c0.074,0.123,0.151,0.242,0.225,0.341l3.727,5.65c0.088,0.135,0.238,0.215,0.399,0.215c0.161,0,0.311-0.08,0.4-0.215l3.752-5.68c0.057-0.08,0.107-0.159,0.153-0.232l0.132-0.199c0.033-0.05,0.054-0.104,0.064-0.159c0.401-0.757,0.605-1.551,0.605-2.366C15.107,5.312,12.815,3.021,10,3.021z M13.596,10.152c-0.017,0.03-0.029,0.062-0.039,0.095l-0.056,0.084c-0.043,0.066-0.085,0.133-0.139,0.211L10,15.629l-3.339-5.061c-0.068-0.095-0.132-0.193-0.203-0.309l-0.051-0.078c-0.009-0.031-0.021-0.061-0.038-0.089C6.026,9.458,5.852,8.796,5.852,8.127c0-2.287,1.861-4.148,4.147-4.148c2.288,0,4.149,1.861,4.149,4.148C14.148,8.823,13.963,9.503,13.596,10.152z"
                                ></path>
                            </svg>
                            <input
                                id="address"
                                class=" pl-2 w-full outline-none border-none "
                                type="text"
                                name="address"
                                autoComplete="address"
                                required
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="pt-0 px-[5px] pb-[6px] relative w-full float-left mt-[5px] clear-both min-h-[1px]">
                            <div className="mx-0 mb-[10px] text-[#31708f]">
                                <label className="pt-[8px] mb-0 inline-block max-w-[100%] font-bold text-[13px] leading-[1.48]">
                                    Chọn nơi làm việc
                                    <span className="text-[#a94442]">*</span>
                                </label>
                                <select
                                    value={selectedValue}
                                    onChange={handleSelectChange}
                                    name="service"
                                    id="service"
                                    className="transition-all leading-[30px] w-full h-[34px] pt-[6px] pb-[7px] px-[12px] block text-[14px] bg-white border border-solid border-[#dde2e8] shadow-sm"
                                >
                                    <option value="null">
                                        Lựa chọn nơi làm việc
                                    </option>
                                    {point.map((pointItem) => {
                                        return (
                                            <option value={pointItem._id}>
                                                {pointItem.pointName}:{" "}
                                                {pointItem.pointAddress},{" "}
                                                {pointItem.pointProvince}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                class="block w-full hover:bg-[#f7941e] mt-5 py-2 rounded-2xl bg-[#0072bc] hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                            >
                                Register
                            </button>
                        </div>
                        <div class="flex items-center w-full">
                            <h4>You have had an account?</h4>
                            <Link to="/Login" class="text-blue-600 pl-2">
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
