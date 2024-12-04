import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    LoginPage,
    SignupPage,
    HomePage,
    IntroductionPage,
    ContactPage,
    PostalLookupPage,
    PostOfficeLookupPage,
} from "./routes/Routes";
import {
    CreatePostalItemPage,
    ProfileStaffPage,
    PostalManagePage,
    UpdateStatusPage,
    OrderStatsPage,
    CreateAccStaffPage,
    StaffManagePage,
    ProfilePointLeaderPage,
    PointManagePage,
    PointLeaderAccManagePage,
    OrdersPresidentPage,
} from "./routes/CompanyRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/sign-up" element={<SignupPage />} />
                    <Route path="/gioi-thieu" element={<IntroductionPage />} />
                    <Route path="/lien-he" element={<ContactPage />} />
                    <Route
                        path="/tra-cuu-don-gui"
                        element={<PostalLookupPage />}
                    />
                    <Route
                        path="/tra-cuu-buu-cuc"
                        element={<PostOfficeLookupPage />}
                    />
                    <Route
                        path="/staff/tao-buu-gui"
                        element={<CreatePostalItemPage />}
                    />
                    <Route
                        path="/staff/profile/:id"
                        element={<ProfileStaffPage />}
                    />
                    <Route
                        path="/staff/quan-ly-buu-gui"
                        element={<PostalManagePage />}
                    />
                    <Route
                        path="/staff/cap-nhat-trang-thai-don-hang/:id"
                        element={<UpdateStatusPage />}
                    />
                    <Route
                        path="/pointleader/thong-ke-hang"
                        element={<OrderStatsPage />}
                    />
                    <Route
                        path="/pointleader/tao-tai-khoan-nhan-vien"
                        element={<CreateAccStaffPage />}
                    />
                    <Route
                        path="/pointleader/quan-ly-nhan-vien"
                        element={<StaffManagePage />}
                    />
                    <Route
                        path="/pointleader/profile/:id"
                        element={<ProfilePointLeaderPage />}
                    />
                    <Route
                        path="/president/he-thong-diem"
                        element={<PointManagePage />}
                    />
                    <Route
                        path="/president/quan-ly-tai-khoan-truong-diem"
                        element={<PointLeaderAccManagePage />}
                    />
                    <Route
                        path="/president/thong-ke-hang"
                        element={<OrdersPresidentPage />}
                    />
                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </BrowserRouter>
        </div>
    );
};

export default App;
