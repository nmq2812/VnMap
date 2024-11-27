// import React from "react";
// import { FiPackage } from "react-icons/fi";
// import { Link } from "react-router-dom";
// import { HiOutlineClipboardList } from "react-icons/hi";
// import brand from "../../../images/logo1.png";
// import { CgProfile } from "react-icons/cg";
// const StaffHeader = () => {
//   return (
//     <div className="w-full h-[60px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
//       <div className="h-[60px]">
//         <Link to="/">
//           <img
//             src={brand}
//             alt=""
//             className="800px:h-[100%] object-contain 800px:ml-10px cursor-pointer h-[80%] mt-[6px]"
//           />
//         </Link>
//       </div>
//       <div className="flex items-center">
//         <div className="flex items-center ">
//           <Link to="/staff/quan-ly-buu-gui">
//             <HiOutlineClipboardList
//               color="#555"
//               size={30}
//               className="800px:mx-5 cursor-pointer mx-3"
//             />
//           </Link>
//           <Link to="/staff/tao-buu-gui">
//             <FiPackage
//               color="#555"
//               size={30}
//               className="800px:mx-5 cursor-pointer mx-3"
//             />
//           </Link>

//           <div className="800px:mx-5 800px:cursor-pointer 800px:flex mr-3">
//             <Link to="/staff/profile/st0001">
//               <CgProfile color="#555" size={30} />
//             </Link>
//             <div className="800px:block hidden 800px:pt-[2px]">
//               <span className="text-[13px] text-[#555] font-bold pl-2 ">
//                 Nguyễn Thị Binh
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default StaffHeader;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo1.png";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const StaffHeader = () => {
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
              <img src={logo} class="h-6 mr-3 sm:h-9" alt="MagicPost Logo" />
            </Link>
            <div class="flex items-center  lg:order-2">
              <div className="800px:mx-5 800px:cursor-pointer 800px:flex mr-3">
                <Link to={`/staff/profile/${userInfo._id}`}>
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
                      href="/staff/quan-ly-buu-gui"
                      class="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:bg-[#f7941e] rounded lg:bg-transparent lg:text-[#0072bc] lg:p-0"
                      aria-current="page"
                    >
                      Quản lý bưu gửi
                    </a>
                  </li>

                  <li>
                    <a
                      href="/tao-buu-gui"
                      class="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:bg-[#f7941e] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#0072bc] lg:p-0"
                    >
                      Tạo bưu gửi
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
                      href="/staff/quan-ly-buu-gui"
                      class="block py-2 pl-3 pr-4 text-white bg-[#f7941e] rounded lg:bg-transparent lg:text-[#f7941e] lg:p-0 "
                      aria-current="page"
                    >
                      Quản lý bưu gửi
                    </a>
                  </li>

                  <li>
                    <a
                      href="/staff/tao-buu-gui"
                      class="block py-2 pl-3 pr-4 text-white border-b border-gray-100 hover:bg-[#f7941e] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#f7941e] lg:p-0 "
                    >
                      Tạo bưu gửi
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

export default StaffHeader;
