import React, { useState, useEffect } from "react";
import PointLeaderHeader from "../../../components/Company/Layout/PointLeaderHeader";
import { BiLinkExternal } from "react-icons/bi";
import { FaRegListAlt } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
const CreateAccStaffPage = () => {
    const [allStatusStaff, setAllStatusStaff] = useState([]);
    const [open, setOpen] = useState({
        status: false,
        id: null,
    });

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const getAllStatusStaff = async () => {
        await axios
            .get("http://localhost:4000/api/user/all-users", {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setAllStatusStaff(res.data);
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
        getAllStatusStaff();
    }, []);

    const updateStatusStaff = async (id) => {
        await axios
            .post(
                `http://localhost:4000/api/user/edit-state`,
                { id },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                },
            )
            .then((res) => {
                console.log(res.data);
                toast.success("Thành công!!");
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch((err) => {
                toast.error("Cập nhật nhân viên thất bại!!");
            });
    };

    const deleteStaff = async (id) => {
        console.log(id);
        await axios
            .delete(`http://localhost:4000/api/user/delete-user/${id}`, {
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

    return (
        <div>
            <PointLeaderHeader />
            <div className=" sm:mx-[50px] sm:px-[10px] sm:py-5 sm:min-h-[800px] min-h-[1000px] py-5 px-[10px]">
                {/* Title */}
                <div className="w-full h-[65px] px-[10px] mb-3">
                    <div className="w-full float-left block text-[#26B99A]">
                        <h3 className="mx-[9px] text-[24px] flex font-[500]">
                            <FaRegListAlt size={24} className="mr-2 mt-[7px]" />
                            Danh sách tài khoản cần xác nhận
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
                            <table class="w-full text-sm text-left text-gray-500 ">
                                <thead class="text-xs font-[500] text-white uppercase bg-[#0072bc] ">
                                    <tr>
                                        <td class="w-[5%] px-6 py-3 border solid border-[#fff]">
                                            STT
                                        </td>
                                        <td class="px-6 py-3 border solid border-[#fff]">
                                            Họ tên
                                        </td>
                                        <td class="px-6 py-3 border solid border-[#fff]">
                                            Email
                                        </td>
                                        <td class="px-6 py-3 border solid border-[#fff]">
                                            Số điện thoại
                                        </td>
                                        <td class="w-[10%] px-6 py-3 border solid border-[#fff]">
                                            Xác nhận
                                        </td>
                                        <td class="w-[5%] px-6 py-3 border solid border-[#fff]">
                                            Xóa
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allStatusStaff.map((staffItem, i) => {
                                        return (
                                            <tr class="bg-white hover:bg-gray-50 ">
                                                <td class="px-6 py-4 border border-dashed border-[#ddd] font-medium text-gray-900 whitespace-nowrap ">
                                                    {i + 1}
                                                </td>
                                                <td class="px-6 py-4 border border-dashed border-[#ddd] font-medium text-gray-900 whitespace-nowrap ">
                                                    {staffItem.userName}
                                                </td>
                                                <td class="px-6 py-4 border border-dashed border-[#ddd]">
                                                    {staffItem.email}
                                                </td>
                                                <td class="px-6 py-4 border border-dashed border-[#ddd]">
                                                    {staffItem.phone}
                                                </td>
                                                <td class="px-6 py-4 border border-dashed border-[#ddd]">
                                                    <button
                                                        onClick={() => {
                                                            updateStatusStaff(
                                                                staffItem._id,
                                                            );
                                                        }}
                                                        className="font-medium text-blue-600  hover:underline cursor-pointer"
                                                    >
                                                        Xác nhận
                                                    </button>
                                                </td>
                                                <td class="px-6 py-4 border border-dashed border-[#ddd] ">
                                                    <span className="font-medium text-red-600 hover:underline cursor-pointer">
                                                        <RiDeleteBin5Line
                                                            size={20}
                                                            onClick={() => {
                                                                handleDeleteClick(
                                                                    staffItem._id,
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
                                        deleteStaff(open.id);
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

export default CreateAccStaffPage;
