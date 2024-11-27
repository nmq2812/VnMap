import React from "react";
import styles from "../../../styles/styles";
const Partner = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 mt-20 cursor-pointer rounded-xl`}
    >
      <div class="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
        <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900">
          Đối tác của MagicPost
        </h2>
      </div>
      <div className="flex flex-wrap justify-center w-full">
        <div className="flex items-start sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-4 w-full">
          <img
            src="https://admin.ems.com.vn/filemedia/linkwebsite/173214lalamove_logo_2017-05.1609380493.webp"
            alt=""
            style={{ width: "100%", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-4 w-full">
          <img
            src="https://admin.ems.com.vn/filemedia/linkwebsite/0009-japan-post.webp"
            style={{ width: "100%", objectFit: "contain" }}
            alt=""
          />
        </div>
        <div className="flex items-start sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-4 w-full">
          <img
            src="https://admin.ems.com.vn/filemedia/linkwebsite/1200px-Hongkong_Post_Logo.svg.webp"
            style={{ width: "100%", objectFit: "contain" }}
            alt=""
          />
        </div>
        <div className="flex items-start sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-4 w-full">
          <img
            src="https://admin.ems.com.vn/filemedia/linkwebsite/New_Logo_JNE.webp"
            style={{ width: "100%", objectFit: "contain" }}
            alt=""
          />
        </div>
        <div className="flex items-start sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 mb-4 w-full">
          <img
            src="https://admin.ems.com.vn/filemedia/linkwebsite/Geopost_logo.svg.webp"
            style={{ width: "100%", objectFit: "contain" }}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Partner;
