import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_CANCEL_FAIL,
  ORDER_CANCEL_SUCCESS,
  ORDER_CANCEL_REQUEST,
} from "../Constant/OrderConstant";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
      payload: order,
    });

    const token = localStorage.getItem("etoken");
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "token",
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/order/create",
      order,
      config
    );
    // console.log(data);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const token = localStorage.getItem("etoken");
    // console.log(`Bearer ${token}`);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/order/find-order-by-id/${id}`,
      config
    );
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const token = localStorage.getItem("etoken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/order/update-payment/${orderId}/pay`,
      paymentResult,
      config
    );
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrders = (userResult) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
      payload: userResult,
    });

    const token = localStorage.getItem("etoken");
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "token",
      },
    };

    const data = await axios.post(
      "http://localhost:5000/order/find",
      userResult,
      config
    );
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data.data.orders,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const cancelOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CANCEL_REQUEST,
      payload: id,
    });

    const token = localStorage.getItem("etoken");
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "token",
      },
    };

    const data = await axios.post(
      `http://localhost:5000/order/delete/${id}`,
      id,
      config
    );
    dispatch({
      type: ORDER_CANCEL_SUCCESS,
      payload: data.data.orders,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CANCEL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
