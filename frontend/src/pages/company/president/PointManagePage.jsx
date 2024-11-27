import React, { useState, useEffect } from "react";
import PresidentHeader from "../../../components/Company/Layout/PresidentHeader";
import { BiLinkExternal } from "react-icons/bi";
import { FaRegListAlt } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
const PointManagePage = () => {
    const [searchPoint, setSearchPoint] = useState();
    const [point, setPoint] = useState([]);
    const [open, setOpen] = useState({
        status: false,
        id: null,
    });

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const getAllPoints = async () => {
        await axios.get("http://localhost:4000/api/point").then((res) => {
            setPoint(res.data);
        });
    };
    const handleKeyDownSearch = async (e) => {
        if (e.key === "Enter") {
            await axios
                .get(`http://localhost:4000/api/point/${searchPoint}`)
                .then((res) => {
                    toast.success("Tìm kiếm điểm thành công!!");
                    setPoint([res.data]);
                })
                .catch((err) => {
                    toast.error("Tìm kiếm điểm thất bại!!");
                    console.log(err);
                });
        }
    };

    const deletePoint = async (id) => {
        console.log(id);
        await axios
            .delete(`http://localhost:4000/api/point/delete-point/${id}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })
            .then((res) => {
                toast.success("Thành công!!");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch((err) => {
                toast.error("Xóa thất bại!!");
            });
    };
    const handleDeleteClick = (id) => {
        // Hiển thị modal xác nhận xóa
        console.log(id);
        setOpen({
            status: true,
            id,
        });
    };

    useEffect(() => {
        getAllPoints();
    }, []);
    return (
        <div>
            <PresidentHeader />
            <div className=" sm:mx-[50px] sm:px-[10px] sm:py-5 sm:min-h-[800px] min-h-[1000px] py-5 px-[10px]">
                {/* Title */}
                <div className="w-full h-[65px] px-[10px] mb-3">
                    <div className="w-full float-left block text-[#26B99A]">
                        <h3 className="mx-[9px] text-[24px] flex font-[500]">
                            <FaRegListAlt size={24} className="mr-2 mt-[7px]" />
                            Hệ thống điểm
                        </h3>
                        <h5 className="text-[14px] font-[500] leading-[18px] ml-11">
                            <a
                                href="/president/thong-ke-hang"
                                className="flex text-[#31708f]"
                            >
                                <ins>Thống kê hàng</ins>
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
                                <label for="table-search" class="sr-only">
                                    Search
                                </label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            class="w-5 h-5 text-gray-500 "
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="table-search"
                                        value={searchPoint}
                                        onChange={(e) =>
                                            setSearchPoint(e.target.value)
                                        }
                                        onKeyDown={handleKeyDownSearch}
                                        class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 "
                                        placeholder="Nhập mã điểm"
                                    />
                                </div>
                            </div>

                            <table class="w-full text-sm text-left text-gray-500 ">
                                <thead class="text-xs font-[500] text-white uppercase bg-[#0072bc] ">
                                    <tr>
                                        <td class="w-[5%] px-6 py-3 border solid border-[#fff]">
                                            STT
                                        </td>
                                        <td class="px-6 py-3 border solid border-[#fff]">
                                            Mã điểm
                                        </td>
                                        <td class="px-6 py-3 border solid border-[#fff]">
                                            Loại điểm
                                        </td>
                                        <td class="px-6 py-3 border solid border-[#fff]">
                                            Địa chỉ
                                        </td>
                                        <td class="w-[5%] px-6 py-3 border solid border-[#fff]">
                                            Xóa
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {point.map((pointItem, i) => {
                                        return (
                                            <tr
                                                key={i}
                                                class="bg-white hover:bg-gray-50 "
                                            >
                                                <td class="px-6 py-4 border border-dashed border-[#ddd] font-medium text-gray-900 whitespace-nowrap ">
                                                    {i + 1}
                                                </td>
                                                <td class="px-6 py-4 border border-dashed border-[#ddd] font-medium text-gray-900 whitespace-nowrap ">
                                                    {pointItem._id}
                                                </td>
                                                <td class="px-6 py-4 border border-dashed border-[#ddd]">
                                                    {pointItem.pointName}
                                                </td>
                                                <td class="px-6 py-4 border border-dashed border-[#ddd]">
                                                    {pointItem.pointAddress}{" "}
                                                    {pointItem.pointProvince}
                                                </td>
                                                <td class="px-6 py-4 border border-dashed border-[#ddd] ">
                                                    <span className="font-medium text-red-600 hover:underline cursor-pointer">
                                                        <RiDeleteBin5Line
                                                            size={20}
                                                            onClick={() => {
                                                                handleDeleteClick(
                                                                    pointItem._id,
                                                                );
                                                            }}
                                                        />
                                                    </span>
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
            {open.status && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        {/* Modal content */}
                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3
                                    className="text-lg leading-6 font-medium text-gray-900"
                                    id="modal-headline"
                                >
                                    Xác nhận xóa
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Bạn có chắc chắn muốn xóa không?
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={() => {
                                        deletePoint(open.id);
                                        setOpen({
                                            status: false,
                                            id: null,
                                        });
                                    }}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Xác nhận
                                </button>
                                <button
                                    onClick={() => {
                                        setOpen({
                                            status: false,
                                            id: null,
                                        });
                                    }}
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Hủy bỏ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PointManagePage;
