import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";

import axios from "axios";
const PostOfficeLookupPage = () => {
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [allPointInCity, setAllPointInCity] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (city === "HN") {
            await axios
                .get("http://localhost:4000/api/point/city")
                .then((res) => {
                    console.log(res.data);
                    setAllPointInCity(res.data);
                });
        }
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
                            TRA CỨU BƯU CỤC
                        </span>
                    </div>
                    <section className="bg-white">
                        <div class="max-w-screen-md px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:pb-24 lg:pt-10 lg:px-6">
                            <div className="w-[100%] p-[20px] bg-white shadow-[2px_10px_25px_5px_rgba(0,0,0,0.1)] mb-[30px] rounded-lg">
                                <form
                                    onSubmit={handleSubmit}
                                    className="w-full"
                                >
                                    <div className="w-full pb-2">
                                        <label className="block pb-2 text-gray-700 font-medium">
                                            Quốc gia
                                        </label>
                                        <select
                                            name=""
                                            id=""
                                            value={country}
                                            onChange={(e) =>
                                                setCountry(e.target.value)
                                            }
                                            className="w-[100%] border h-[40px] rounded-[5px]"
                                        >
                                            <option
                                                value=""
                                                className="block border pb-2 pl-2"
                                            >
                                                Chọn quốc gia
                                            </option>
                                            {Country &&
                                                Country.getAllCountries().map(
                                                    (item) => (
                                                        <option
                                                            className="block pb-2 ml-2"
                                                            key={item.isoCode}
                                                            value={item.isoCode}
                                                        >
                                                            {item.name}
                                                        </option>
                                                    ),
                                                )}
                                        </select>
                                    </div>

                                    <div className="w-full pb-2">
                                        <label className="block pb-2 text-gray-700 font-medium">
                                            Tỉnh/Thành phố
                                        </label>
                                        <select
                                            name=""
                                            id=""
                                            value={city}
                                            onChange={(e) =>
                                                setCity(e.target.value)
                                            }
                                            className="w-[100%] border h-[40px] rounded-[5px]"
                                        >
                                            <option
                                                value=""
                                                className="block border pb-2"
                                            >
                                                Chọn Tỉnh/TP
                                            </option>
                                            {State &&
                                                State.getStatesOfCountry(
                                                    country,
                                                ).map((item) => (
                                                    <option
                                                        className="block pb-2"
                                                        key={item.isoCode}
                                                        value={item.isoCode}
                                                    >
                                                        {item.name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>

                                    <div className="w-full my-4">
                                        <button className="flex items-center justify-center py-4 text-white bg-[#f7941e] hover:bg-[#0072bc] hover:-translate-y-1 transition-all duration-500 leading-6 font-[500] text-[18px] w-full h-full rounded-md">
                                            Tra cứu
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="w-[100%] p-[20px] bg-[#f7f7f7] mb-[30px] rounded-lg">
                                <div className="">
                                    <h3 className="flex items-center font-[700] text-[20px] leading-6 text-[#0054a6] mb-[20px] justify-between">
                                        DANH SÁCH BƯU CỤC
                                        <i className="text-[#313131] text-[16px]">
                                            {allPointInCity &&
                                                allPointInCity.length}{" "}
                                            bưu cục
                                        </i>
                                    </h3>
                                </div>
                                {allPointInCity &&
                                    allPointInCity.map((pointItem) => {
                                        return (
                                            <div
                                                key={pointItem._id}
                                                className="overflow-auto max-h-[624px]"
                                            >
                                                <div className="p-[21px] bg-[#fff] border-b-[1px] solid border-b-[#0054a6] cursor-pointer">
                                                    <div className="flex items-center mb-[10px]">
                                                        <svg
                                                            width="12"
                                                            height="16"
                                                            viewBox="0 0 12 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M11.7785 14.9717L9.80094 10.7886C9.76148 10.7052 9.6931 10.6412 9.6111 10.6063L8.62731 10.1684L10.3319 7.31138C10.336 7.30452 10.3399 7.29758 10.3435 7.29049C10.6824 6.629 10.8543 5.91418 10.8543 5.16603C10.8543 3.90747 10.3607 2.72756 9.46458 1.84371C8.56857 0.960055 7.38152 0.48278 6.12219 0.500475C4.89911 0.517438 3.74751 1.00872 2.87947 1.88387C2.01152 2.75897 1.52953 3.91453 1.52226 5.13776C1.51781 5.88527 1.69444 6.62964 2.03294 7.29046C2.03657 7.29752 2.04041 7.3045 2.04448 7.31135L3.74909 10.1683L2.75961 10.6087C2.67867 10.6447 2.61334 10.7085 2.57548 10.7886L0.598034 14.9717C0.531852 15.1116 0.559772 15.2779 0.667995 15.3886C0.776188 15.4992 0.941774 15.5309 1.08319 15.468L3.56047 14.3651L6.03776 15.468C6.13359 15.5106 6.24301 15.5106 6.33884 15.468L8.81613 14.3651L11.2934 15.468C11.3418 15.4895 11.393 15.5 11.4439 15.5C11.5414 15.5 11.6374 15.4614 11.7086 15.3886C11.8167 15.2779 11.8446 15.1116 11.7785 14.9717ZM2.68649 6.94256C2.40143 6.38205 2.25879 5.7764 2.26256 5.14218C2.2751 3.02024 4.01118 1.27002 6.1325 1.24063C7.19205 1.22639 8.19099 1.62732 8.9448 2.37079C9.69884 3.11443 10.1141 4.10712 10.1141 5.16606C10.1141 5.79181 9.97142 6.38941 9.69005 6.94256L6.50613 12.2789C6.40892 12.4418 6.25148 12.4594 6.18829 12.4594C6.12506 12.4594 5.96762 12.4418 5.87044 12.2789L2.68649 6.94256ZM8.9666 13.6218C8.87077 13.5792 8.76134 13.5792 8.66551 13.6218L6.18823 14.7247L3.71094 13.6218C3.61511 13.5792 3.50569 13.5792 3.40986 13.6218L1.69371 14.3859L3.18603 11.2292L4.13109 10.8086L5.23464 12.6582C5.43691 12.9972 5.79339 13.1996 6.18817 13.1996C6.58294 13.1996 6.93943 12.9972 7.14169 12.6582L8.24525 10.8086L9.19039 11.2293L10.6826 14.3859L8.9666 13.6218Z"
                                                                fill="#313131"
                                                            ></path>
                                                            <path
                                                                d="M6.18923 3.47656C5.25776 3.47656 4.5 4.23433 4.5 5.16576C4.5 6.0972 5.25776 6.85496 6.18923 6.85496C7.12066 6.85499 7.87843 6.0972 7.87843 5.16576C7.87843 4.23433 7.12066 3.47656 6.18923 3.47656ZM6.18923 6.11474C5.66596 6.11477 5.24021 5.68909 5.24021 5.16576C5.24021 4.64249 5.66593 4.21678 6.18923 4.21678C6.7125 4.21678 7.13821 4.64249 7.13821 5.16576C7.13821 5.68903 6.7125 6.11474 6.18923 6.11474Z"
                                                                fill="#313131"
                                                            ></path>
                                                        </svg>
                                                        <h3 className="font-[500] text-[18px] leading-[24px] mb-0 ml-2">
                                                            {
                                                                pointItem.pointName
                                                            }
                                                        </h3>
                                                    </div>
                                                    <div className="pl-[20px] mb-[10px]">
                                                        <p className="leading-[21px] text-[#313131] mb-[5px]">
                                                            {
                                                                pointItem.pointAddress
                                                            }
                                                        </p>
                                                        <p>
                                                            {
                                                                pointItem.pointProvince
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PostOfficeLookupPage;
