import axios from "axios";
import {
  PRODUCT_FIND_BY_PRICE_REQUEST,
  PRODUCT_FIND_BY_PRICE_SUCCESS,
  PRODUCT_FIND_BY_PRICE_FAIL,
} from "../Constant/ProductByPriceConstant";

export const findProductsByPrice = (lte, gte) => {
  return function (dispatch) {
    dispatch({
      type: PRODUCT_FIND_BY_PRICE_REQUEST,
      payload: true,
    });
    let OPTIONS = {
      url: `http://localhost:5000/product/find`,
      method: "POST",
      data: {
        lte: lte,
        gte: gte,
      },
      headers: {
        "content-type": "application/json",
      },
    };
    axios(OPTIONS)
      .then((res) => {
        dispatch(findProductPre(res.data));
      })
      .catch((error) => {
        dispatch({
          type: PRODUCT_FIND_BY_PRICE_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the products",
        });
      });
  };
};
export const findProductPre = (data) => {
  return {
    type: PRODUCT_FIND_BY_PRICE_SUCCESS,
    result: data.result,
    payload: false,
    msg: "SUCCESS",
  };
};
