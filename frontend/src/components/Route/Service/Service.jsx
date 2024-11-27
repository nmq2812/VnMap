import React from "react";

const Service = () => {
  return (
    <div>
      <section class="bg-white">
        <div class="max-w-screen-xl px-4 pn-8 mx-auto lg:pb-24 lg:px-6">
          <div class="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
            <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900">
              Dịch vụ nổi bật
            </h2>
          </div>
          <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            <div class="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 rounded-lg">
              <div className="flex">
                <img
                  src="https://admin.ems.com.vn/filemedia/service/ems%20ti%C3%AAu%20chu%E1%BA%A9n.png"
                  alt=""
                  className="flex w-[150px]"
                />
                <h3 class="mt-[54px] ml-4 text-2xl font-semibold text-[#0072bc]">
                  <a href="">MP Tài liệu</a>
                </h3>
              </div>
              <p class="font-light text-black sm:text-lg mb-8 text-justify">
                MP Tài liệu là dịch vụ nhận gửi, vận chuyển và phát các loại
                thư, tài liệu trong nước theo chỉ tiêu thời gian tiêu chuẩn được
                Tổng công ty MP công bố.
              </p>
              <a
                href="#"
                class="text-black bg-[#f7941e] hover:bg-[#fab35c] focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Chi tiết
              </a>
            </div>

            <div class="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 rounded-lg">
              <div className="flex">
                <img
                  src="https://admin.ems.com.vn/filemedia/service/ems%20h%E1%BB%8Fa%20t%E1%BB%91c-1605777129.png"
                  alt=""
                  className="flex w-[150px]"
                />
                <h3 class="mt-[54px] ml-4 text-2xl font-semibold text-[#0072bc]">
                  <a href="">MP Hỏa tốc</a>
                </h3>
              </div>
              <p class="font-light text-black sm:text-lg mb-8 text-justify">
                MP Hỏa tốc là là dịch vụ chất lượng cao có chỉ tiêu thời gian
                toàn trình rút ngắn so với dịch vụ MP Tài liệu/Hàng hóa nhanh,
                trong đó bưu gửi được ưu tiên chuyển phát đến...
              </p>
              <a
                href="#"
                class="text-black bg-[#f7941e] hover:bg-[#fab35c] focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Chi tiết
              </a>
            </div>

            <div class="flex flex-col max-w-lg p-6 mx-auto text-center text-gray-900 rounded-lg">
              <div className="flex">
                <img
                  src="https://admin.ems.com.vn/filemedia/service/ems%20tm%C4%91t%20nhanh.1609605341.png"
                  alt=""
                  className="flex w-[150px]"
                />
                <h3 class="mt-[54px] ml-4 text-2xl font-semibold text-[#0072bc]">
                  <a href="">MP Tài liệu</a>
                </h3>
              </div>
              <p class="font-light text-black sm:text-lg mb-8 text-justify">
                Dịch vụ MP Thương mại điện tử là dịch vụ chuyển phát cho khách
                hàng Thương mại điện tử (TMĐT) và thực hiện thu hộ/không thu hộ
                một khoản tiền theo yêu cầu để ...
              </p>
              <a
                href="#"
                class="text-black bg-[#f7941e] hover:bg-[#fab35c] focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Chi tiết
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Service;
