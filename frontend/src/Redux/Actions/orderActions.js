import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  GET_ALL_ORDER,
  ORDER_LIST_SUCCESS,
} from "../Constants/orderContants";
import { CART_CLEAR_ITEMS } from "../Constants/cartConstants";
import { logout } from "./userActions";

// CREATE ORDER
export const createOrder =
  (...dateOrder) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`api/order`, { ...dateOrder }, config);
      console.log(data);
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      dispatch({ type: CART_CLEAR_ITEMS, payload: data });

      localStorage.removeItem("cartItems");
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not Authorized token expired, Please Login again.") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: message,
      });
    }
  };

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:3000/api/user/get-order/${id}`,
      config
    );
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized token expired, Please Login again.") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// ALL ORDER
export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_ALL_ORDER });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`api/order/all-order-in-point`, config);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized token expired, Please Login again.") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    });
  }
};
