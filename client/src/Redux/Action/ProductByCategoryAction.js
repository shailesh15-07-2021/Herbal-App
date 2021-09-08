import axios from "axios";
import {
  PRODUCT_FIND_BY_CATEGORY_REQUEST,
  PRODUCT_FIND_BY_CATEGORY_SUCCESS,
  PRODUCT_FIND_BY_CATEGORY_FAIL,
} from "../Constant/ProductByCategoryConstant";

export const findProductsByCategory = (category) => {
  return function (dispatch) {
    dispatch({
      type: PRODUCT_FIND_BY_CATEGORY_REQUEST,
      payload: true,
    });
    let OPTIONS = {
      url: `http://localhost:5000/product/find`,
      method: "POST",
      data: {
        category: category,
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
          type: PRODUCT_FIND_BY_CATEGORY_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the products",
        });
      });
  };
};
export const findProductPre = (data) => {
  return {
    type: PRODUCT_FIND_BY_CATEGORY_SUCCESS,
    result: data.result,
    payload: false,
    msg: "SUCCESS",
  };
};
