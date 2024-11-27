import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const IntroductionPage = () => {
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
              GIỚI THIỆU
            </span>
          </div>
          <section class="bg-white">
            <div class="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:pb-24 lg:pt-8 lg:px-6">
              <div class="shadow-xl pt-[21px] pb-[26px] rounded-lg">
                <ul className="box-border border-l-[5px] border-solid border-[#f7941e] px-[30px] py-[10px]">
                  <li className="text-[20px] font-normal leading-7 mb-5">
                    <p className="justify">
                      Tên giao dịch:{" "}
                      <span class="text-[#0072bc]">
                        {" "}
                        Tổng công ty Chuyển phát nhanh Bưu điện – Công ty Cổ
                        phần{" "}
                      </span>
                    </p>
                  </li>
                  <li className="text-[20px] font-normal leading-7 mb-5">
                    <p className="justify">
                      Tên viết tắt:{" "}
                      <span class="text-[#0072bc]">
                        {" "}
                        Tổng công ty MagicPost{" "}
                      </span>
                    </p>
                  </li>
                  <li className="text-[20px] font-normal leading-7 mb-5">
                    <p className="justify">
                      Tên giao dịch quốc tế:{" "}
                      <span class="text-[#0072bc]"> Magic Post </span>
                    </p>
                  </li>
                  <li className="text-[20px] font-normal leading-7 mb-5">
                    <p className="justify">
                      Tên viết tắt quốc tế:{" "}
                      <span class="text-[#0072bc]"> MP Việt Nam </span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section class="bg-white ">
            <div class="max-w-screen-xl px-4 pb-8 mx-auto space-y-12 lg:space-y-20 lg:pb-24 lg:px-6">
              <div class="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                <div class="text-gray-900 sm:text-lg">
                  <h2 class="mb-4 text-xl font-bold tracking-tight text-[#0072bc] ">
                    TỔNG QUAN
                  </h2>
                  <p class="mb-4 font-[400] text-justify lg:text-base">
                    Tổng công ty Chuyển phát nhanh Bưu điện - CTCP đã được thành
                    lập vào ngày 24/01/2005 theo Quyết định phê duyệt Đề án số
                    29/QĐ-ĐABC-HĐQT của Hội đồng quản trị Tổng Công ty Bưu chính
                    Viễn thông Việt Nam, nay là Tập đoàn Bưu chính viễn thông
                    Việt Nam (VNPT) với 3 chi nhánh tại Hà Nội, Đà Nẵng và TP.
                    Hồ Chí Minh.
                  </p>
                  <p class="mb-4 font-[400] text-justify lg:text-base">
                    Chính thức đi vào hoạt động từ ngày 01/01/2006, là đơn vị
                    duy nhất được Tổng công ty Bưu điện Việt Nam cho phép quản
                    lý, khai thác và kinh doanh dịch vụ chuyển phát nhanh EMS
                    trong nước và quốc tế. EMS cũng là thương hiệu dịch vụ
                    chuyển phát toàn cầu của liên minh bưu chính thế giới UPU,
                    hiện đang được khai thác bởi bưu chính của gần 200 quốc gia
                    và vùng lãnh thổ trên toàn thế giới.
                  </p>
                  <p class="mb-4 font-[400] text-justify lg:text-base">
                    Nhằm năng lực tài chính, mở ra nhiều cơ hội phát triển trong
                    hoạt động kinh doanh, năm 2013 Tổng công ty thực hiện tăng
                    vốn điều lệ từ 70 tỷ đồng lên 91,591 tỷ đồng theo Nghị quyết
                    Đại hội đồng cổ đông thường niên năm 2013. Trong kỳ Đại hội
                    đồng cổ đông thường niên năm ….vốn điều lệ của Tổng Công ty
                    cũng đã được tiếp tục tăng lên…
                  </p>
                  <p class="mb-4 font-[400] text-justify lg:text-base">
                    Năm 2017, thực hiện chỉ đạo của Tổng Công ty Bưu điện Việt
                    Nam, Công ty đã hoàn tất đề án chuyển đổi mô hình từ Công ty
                    sang Tổng công ty. Cũng trong năm 2017, Chi nhánh Hà Nội
                    được thành lâp điều chỉnh và hoàn thiện mô hình tổ chức sản
                    xuất tại Tổng Công ty, đáp ứng nhu cầu phát triển SXKD trong
                    tình hình mới.
                  </p>
                </div>
                <img
                  class=" w-full mb-4 rounded-lg lg:mb-0 lg:flex"
                  src="http://admin.ems.com.vn/filemedia/upload/NIK_3510%201.1626321005.png"
                  alt="gioi-thieu"
                />
              </div>
            </div>
          </section>

          <section class="bg-white ">
            <div class="max-w-screen-xl px-4 pb-8 pt-8 mx-auto space-y-12 lg:space-y-20 lg:pb-24 lg:pt-6 lg:px-6">
              <div class="flex flex-col-reverse items-center  lg:grid lg:grid-cols-2 xl:gap-16">
                <img
                  class=" w-full mb-4 rounded-lg lg:mb-0 lg:flex"
                  src="http://admin.ems.com.vn/filemedia/upload/TIMEstudio-180908-162.1626321089.jpg"
                  alt="nhan-su"
                />
                <div class="text-gray-900 sm:text-lg ">
                  <h2 class="mb-4 text-xl font-bold tracking-tight text-[#0072bc] ">
                    NHÂN SỰ
                  </h2>
                  <p class="mb-4 font-[400] text-justify lg:text-base">
                    Với gần 2.300 CBCNV tại Hà Nội, Đà Nẵng, TP. Hồ Chí Minh và
                    các nhân viên kinh doanh tại một số thị trường trọng điểm
                    trên toàn mạng lưới, Tổng công ty đã xây dựng được nguồn
                    nhân lực chất lượng cao, tinh thông nghiệp vụ, giàu kinh
                    nghiệm và nhiệt huyết với nghề.
                  </p>
                  <p class="mb-4 font-[400] text-justify lg:text-base">
                    Tổng công ty luôn xây dựng các cơ chế, chính sách thu hút
                    lực lượng lao động chất lượng cao với các chính sách đãi ngộ
                    phù hợp để khuyến khích và phát huy tối đa năng lực, tạo
                    điều kiện để các cá nhân phát triển và yên tâm cống hiến.
                  </p>
                  <p class="mb-2 font-[400] text-justify lg:text-base">
                    Bên cạnh đó, các cơ chế chính sách về lao động tiền lương
                    của người lao động trong toàn Tổng công ty cũng liên tục
                    được cải tiến, hướng tới người lao động để đảm bảo công
                    việc, quyền lợi về sức khỏe, thu nhập đời sống của người lao
                    động không ngừng được nâng cao, năm sau cao hơn năm trước.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section class="bg-white ">
            <div class="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:pb-24 lg-pt-6 lg:px-6">
              <div class="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                <div class="text-gray-900 sm:text-lg ">
                  <h2 class="mb-4 text-xl font-bold tracking-tight text-[#0072bc] ">
                    HỆ THỐNG KHAI THÁC
                  </h2>
                  <p class="mb-4 font-[400] text-justify lg:text-base">
                    Hệ thống khai thác của EMS Việt Nam bao gồm ba Trung tâm
                    Khai thác vùng tại Hà Nội, Đà Nẵng, Tp HCM: phân hướng và
                    đóng chuyển các bưu gửi EMS tại khu vực miền Bắc, miền Trung
                    và miền Nam đi 63 bưu điện Tỉnh/Thành phố trên cả nước và
                    các nước trên thế giới; 02 bưu cục khai thác quốc tế thực
                    hiện khai thác bưu gửi đi và đến quốc tế đặt tại Hà Nội và
                    TP HCM.
                  </p>
                  <p class="mb-4 font-[400] text-justify lg:text-base">
                    Ngoài ra, trên mạng lưới của Bưu điện Việt Nam hiện có 5 bưu
                    cục khai thác quốc tế thực hiện khai thác bưu gửi đi và đến
                    quốc tế (02 Bưu cục Ngoại dịch đặt tại Hà Nội và TP Hồ Chí
                    Minh, 01 Bưu cục kiểm quan đặt tại Đà Nẵng, 2 Bưu cục cửa
                    khẩu đặt tại Lào Cai, Lạng Sơn); 3 Trung tâm khai thác chia
                    chọn vùng miền Bắc, miền Trung, miền Nam đặt tại Hà Nội, Đà
                    Nẵng, TP Hồ Chí Minh; 78 bưu cục khai thác cấp 1 đảm nhiệm
                    khai thác cấp vùng, trung tâm tỉnh/thành phố; 597 bưu cục
                    khai thác cấp 2 đảm nhận phần khai thác cấp quận, huyện, khu
                    vực.
                  </p>
                </div>
                <img
                  class=" w-full mb-4 rounded-lg lg:mb-0 lg:flex"
                  src="http://admin.ems.com.vn/filemedia/upload/TIMEstudio-180825-044.1626321275.jpg"
                  alt="gioi-thieu"
                />
              </div>
            </div>
          </section>

          <section class="bg-white ">
            <div class="max-w-screen-xl px-4 pb-8 pt-8 mx-auto space-y-12 lg:space-y-20 lg:pb-24 lg:pt-6 lg:px-6">
              <div class="flex flex-col-reverse items-center  lg:grid lg:grid-cols-2 xl:gap-16">
                <img
                  class=" w-full mb-4 rounded-lg lg:mb-0 lg:flex"
                  src="http://admin.ems.com.vn/filemedia/upload/TIMEstudio-180909-347.1626321330.jpg"
                  alt="he-thong-phat"
                />
                <div class="text-gray-900 sm:text-lg ">
                  <h2 class="mb-4 text-xl font-bold tracking-tight text-[#0072bc] ">
                    HỆ THỐNG PHÁT
                  </h2>
                  <p class="mb-4 font-[400] text-justify lg:text-base">
                    Ngoài các Trung tâm phát hàng tại Hà Nội, Đà Nẵng và TP. Hồ
                    Chí Minh, các bưu gửi EMS được phát tới người nhận thông qua
                    hệ thống phát của 63 Bưu điện tỉnh, thành phố trực thuộc
                    Tổng Công ty Bưu điện Việt Nam.
                  </p>
                  <p class="mb-4 font-[400] text-justify lg:text-base">
                    Tại các Bưu điện trung tâm tỉnh, huyện, khu vực đã thành lập
                    655 Bưu cục phát và giao nhiệm vụ quản lý tuyến phát cho 817
                    Bưu cục giao dịch cấp 3 để tổ chức đi phát, thu gom tại địa
                    chỉ khách hàng và quản lý khâu sau phát. Tại các địa bàn
                    trung tâm tỉnh lỵ, huyện lỵ và các xã có gần 11.800 bưu tá
                    thực hiện phát, thu gom bưu gửi và chuyển phát bưu phẩm, bưu
                    kiện từ trung tâm huyện xuống các bưu cục 3, điểm BĐ-VHX với
                    tổng số tuyến phát là 11.900 tuyến.
                  </p>
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

export default IntroductionPage;
