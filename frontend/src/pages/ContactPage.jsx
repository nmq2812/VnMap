import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const ContactPage = () => {
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
              LIÊN HỆ
            </span>
          </div>
          <section class="bg-white">
            <div class="max-w-screen-xl px-4 pn-8 mx-auto lg:pb-24 lg:px-6 lg:mt-3">
              <div class="space-y-8 lg:grid lg:grid-cols-3 sm:grid-cols-3 sm:grid sm:gap-6 sm:space-y-0 xl:gap-10 lg:space-y-0">
                <div class="flex flex-col max-w-lg p-6 mx-autotext-gray-900 rounded-lg">
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                    className="w-[50px] h-[50px] mb-[8px]"
                  />
                  <div class="text-[22px] leading-[27px] font-[700] mb-[20px] text-[#0072bc]">
                    Trụ sở chính
                  </div>

                  <ul>
                    <li className="font-[400] text-[16px] leading-6 text-[#313131]">
                      Địa chỉ: Tầng 4 , Toà nhà FLC Landmark Tower, ngõ 5 Lê Đức
                      Thọ, Mỹ Đình 2, Nam Từ Liêm, Hà Nội
                    </li>
                    <li className="font-[400] text-[16px] leading-6 text-[#313131]">
                      Điện thoại: 1900 22 22 77
                    </li>
                    <li className="font-[400] text-[16px] leading-6 text-[#313131]">
                      Email: cskh@magicpost.com.vn
                    </li>
                  </ul>
                </div>

                <div class="flex flex-col max-w-lg p-6 mx-autotext-gray-900 rounded-lg">
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                    className="w-[50px] h-[50px] mb-[8px]"
                  />
                  <div class="text-[22px] leading-[27px] font-[700] mb-[20px] text-[#0072bc]">
                    Chi nhánh tại Đà Nẵng
                  </div>

                  <ul>
                    <li className="font-[400] text-[16px] leading-6 text-[#313131]">
                      Địa chỉ: 868 Nguyễn Hữu Thọ, Cẩm Lệ, Đà Nẵng
                    </li>
                    <li className="font-[400] text-[16px] leading-6 text-[#313131]">
                      Điện thoại: 1900 22 22 77
                    </li>
                    <li className="font-[400] text-[16px] leading-6 text-[#313131]">
                      Email: cskh@magicpost.com.vn
                    </li>
                  </ul>
                </div>

                <div class="flex flex-col max-w-lg p-6 mx-autotext-gray-900 rounded-lg">
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                    className="w-[50px] h-[50px] mb-[8px]"
                  />
                  <div class="text-[22px] leading-[27px] font-[700] mb-[20px] text-[#0072bc]">
                    Chi nhánh tại TP. Hồ Chí Minh
                  </div>

                  <ul>
                    <li className="font-[400] text-[16px] leading-6 text-[#313131]">
                      Địa chỉ: 36 Bis Ba Vì, Phường 4, Tân Bình, TP.HCM
                    </li>
                    <li className="font-[400] text-[16px] leading-6 text-[#313131]">
                      Điện thoại: 1900 22 22 77
                    </li>
                    <li className="font-[400] text-[16px] leading-6 text-[#313131]">
                      Email: cskh@magicpost.com.vn
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section class="bg-white ">
            <div class="max-w-screen-xl px-4 pb-8 pt-8 mx-auto space-y-12 lg:space-y-20 lg:pb-24 lg:pt-6 lg:px-6">
              <div class="flex flex-col-reverse items-center lg:grid lg:grid-cols-2 xl:gap-16">
                <div>
                  <img
                    class=" w-full mb-4 rounded-lg lg:mb-4 lg:flex"
                    src="https://ems.com.vn/_next/static/images/img-contact1-effb3eda225cc89caec0a1281d616ddd.png"
                    alt="nhan-su"
                  />
                  <div className="font-[500] leading-6 text-[18px] text-[#313131] mb-[20px]">
                    Hỗ trợ trực tuyến 24/7 thông tin giá cước và dịch vụ
                  </div>
                  <div>
                    <a href="https://zalo.me/973689767">
                      <div className="flex items-center">
                        <img
                          className="w-[26px] h-[26px] mr-[12px] shrink-0"
                          src="data:image/png;base64,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"
                          alt=""
                        />
                        <div>
                          <div className="font-[500] leading-4 text-[14px] text-[#313131]">
                            Nguyễn Thị Cẩm Thơ
                          </div>
                          <p className="m-0 font-[300] leading-[15px] text-[12px] text-[#313131]">
                            Tư vấn viên miền Bắc
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="pt-[40px] px-[35px] pb-[32px] bg-white shadow-[2px_10px_25px_5px_rgba(0,0,0,0.1)] rounded">
                  <div className="mb-[10px] flex items-center pb-4">
                    <img
                      className="w-[52px] h-[50px] shrink-0 mr-[5px]"
                      src="data:image/png;base64,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"
                      alt=""
                    />
                    <div className="font-[500] leading-6 text-[18px] text-[#313131]">
                      LIÊN HỆ VỚI CHÚNG TÔI
                    </div>
                  </div>
                  <form>
                    <div class="w-full m-auto text-center">
                      <div class="text-color-primary-dark grid gap-6 mb-6">
                        <input
                          type="text"
                          class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-3 focus:outline-none focus:border-color-secondary"
                          placeholder="Tên của bạn"
                        />
                        <input
                          type="email"
                          class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-3 focus:outline-none focus:border-color-secondary"
                          placeholder="Email của bạn"
                        />
                      </div>

                      <textarea
                        rows="4"
                        class="text-color-primary-dark mb-[24px] bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-3 focus:outline-none focus:border-color-secondary"
                        placeholder="Tin nhắn"
                      ></textarea>

                      <button class="w-full border-solid px-[2.25rem] py-[14px] mt-1 text-black bg-[#f7941e] hover:bg-[#fab35c] focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm text-center">
                        Gửi yêu cầu
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
