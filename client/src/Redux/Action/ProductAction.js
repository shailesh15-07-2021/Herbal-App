import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILS,
  CLEAR_ERROR,
} from "../Constant/ProductConstant";

export const listProducts = (keyword, currentPage, price, category, id) => {
  return function (dispatch) {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
      payload: true,
    });

    let OPTIONS = {
      url: `http://localhost:5000/product/find`,
      method: "POST",
      data: {
        keyword: keyword,
        price: price,
        category: category,
        currentPage: currentPage,
        id: id,
      },
      headers: {
        "content-type": "application/json",
      },
    };

    axios(OPTIONS)
      .then((res) => {
        dispatch(loadProductPre(res.data));
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_LIST_FAILS,
          payload: false,
          error: error,
          msg: "Failed to load the products",
        });
      });
  };
};
export const loadProductPre = (data) => {
  return {
    type: PRODUCT_LIST_SUCCESS,
    result: data.result,
    payload: false,
    msg: "SUCCESS",
  };
};

export const listProductDetails = (id, result) => {
  return function (dispatch) {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
      payload: result,
    });
    let OPTION = {
      url: `http://localhost:5000/product/findOne/${id}`,
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };

    axios(OPTION)
      .then((res) => {
        dispatch(loadProductDetailPre(res.data));
        // console.log(res.data);
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_DETAILS_FAILS,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const loadProductDetailPre = (data) => {
  return {
    type: PRODUCT_DETAILS_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

// clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
