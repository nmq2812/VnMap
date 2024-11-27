import axios from "axios";
import {
  PRODUCT_CHECK_USER_BUY_FAIL,
  PRODUCT_CHECK_USER_BUY_REQUEST,
  PRODUCT_CHECK_USER_BUY_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../Constants/productConstants";
import { logout } from "./userActions";

// PRODUCT LIST
export const listProduct =
  (keyword = "", page = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      // if (keyword !== "") {
      // } else {
      // const { data } = await axios.get(`/api/product?&page=${page}`);
      // dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
      // }
      const { data } = await axios.get(
        `/api/product?title=${keyword}&page=${page}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// SINGLE PRODUCT
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/product/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// PRODUCT REVIEW CREATE
export const createProductReview =
  (prodId, star, comment) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.put(
        `http://localhost:3000/api/product/rating`,
        {
          star,
          comment,
          prodId,
        },
        config
      );
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not Authorized token expired, Please Login again.") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };

// PRODUCT CHECK USER BUY
export const productCheckUser = (prodId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CHECK_USER_BUY_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.get(
      `http://localhost:3000/api/product/checkuser/${prodId}`,
      config
    );
    dispatch({ type: PRODUCT_CHECK_USER_BUY_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized token expired, Please Login again.") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_CHECK_USER_BUY_FAIL,
      payload: message,
    });
  }
};
