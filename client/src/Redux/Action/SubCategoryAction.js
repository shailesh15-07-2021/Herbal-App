import axios from "axios";
import {
  SUB_CATEGORY_DETAILS_FAILS,
  SUB_CATEGORY_DETAILS_REQUEST,
  SUB_CATEGORY_DETAILS_SUCCESS,
  SUB_CATEGORY_LIST_FAILS,
  SUB_CATEGORY_LIST_REQUEST,
  SUB_CATEGORY_LIST_SUCCESS,
} from "../Constant/SubCategoryConstant";

export const listSubCategories = () => async (dispatch) => {
  try {
    dispatch({ type: SUB_CATEGORY_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:5000/sub-category/find");
    dispatch({
      type: SUB_CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUB_CATEGORY_LIST_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSubCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SUB_CATEGORY_DETAILS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:5000/sub-category/find/${id}`
    );
    dispatch({
      type: SUB_CATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUB_CATEGORY_DETAILS_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
