import axios from "axios";
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_FORGOT_PASSWORD_FAIL,
    USER_FORGOT_PASSWORD_REQUEST,
    USER_FORGOT_PASSWORD_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_RESET_PASSWORD_FAIL,
    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
} from "../Constants/userContants";
import { ORDER_LIST_MY_RESET } from "../Constants/orderContants";
import { toast } from "react-toastify";

// LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(
            "http://localhost:4000/api/user/login",
            { email, password },
            config,
        );
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        toast.success("Đăng nhập thành công!!");
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
        toast.error("Đăng nhập không thành công!!");
    }
};

// LOGOUT
export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem("userInfo");
        dispatch({ type: USER_LOGOUT });
        dispatch({ type: USER_DETAILS_RESET });
        dispatch({ type: ORDER_LIST_MY_RESET });
        await axios.get("http://localhost:4000/api/user/logout");
        document.location.href = "/login";
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// REGISTER
export const register =
    (firstName, lastName, email, mobile, password) => async (dispatch) => {
        try {
            dispatch({ type: USER_REGISTER_REQUEST });
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "api/user/register",
                { firstName, lastName, email, mobile, password },
                config,
            );
            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

            document.location.href = "/login";
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };

// FORGOT PASSWORD
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: USER_FORGOT_PASSWORD_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        await axios.post("api/user/forgot-password-token", { email }, config);
        dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS });
    } catch (error) {
        dispatch({
            type: USER_FORGOT_PASSWORD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// USER DETAILS
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(`api/user/${id}`, config);
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not Authorized token expired, Please Login again.") {
            dispatch(logout());
        }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        });
    }
};

// UPDATE PROFILE
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
        const {
            userLogin: { userInfo },
        } = getState();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.put(`api/user/edit-user`, user, config);
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
        dispatch(logout());
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not Authorized token expired, Please Login again.") {
            dispatch(logout());
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        });
    }
};

// UPDATE PROFILE
export const resetPasswordUser =
    (token, password) => async (dispatch, getState) => {
        try {
            dispatch({ type: USER_RESET_PASSWORD_REQUEST });
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.put(
                `http://localhost:3000/api/user/reset-password/${token}`,
                { password },
                config,
            );
            console.log(data);
            dispatch({ type: USER_RESET_PASSWORD_SUCCESS, payload: data });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            if (
                message === "Not Authorized token expired, Please Login again."
            ) {
                dispatch(logout());
            }
            dispatch({
                type: USER_RESET_PASSWORD_FAIL,
                payload: message,
            });
        }
    };
