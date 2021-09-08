import axios from "axios";
import {
  MAIN_CATEGORY_LIST_REQUEST,
  MAIN_CATEGORY_LIST_SUCCESS,
  MAIN_CATEGORY_LIST_FAILS,
  MAIN_CATEGORY_DETAILS_REQUEST,
  MAIN_CATEGORY_DETAILS_SUCCESS,
  MAIN_CATEGORY_DETAILS_FAILS,
} from "../Constant/MainCategoryConstant";

export const listMainCategories = () => async (dispatch) => {
  try {
    dispatch({ type: MAIN_CATEGORY_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:5000/sub-category/find");
    dispatch({
      type: MAIN_CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MAIN_CATEGORY_LIST_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMainCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MAIN_CATEGORY_DETAILS_REQUEST });
    const { data } = await axios.get(
      `http://localhost:5000/sub-category/find/${id}`
    );
    dispatch({
      type: MAIN_CATEGORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MAIN_CATEGORY_DETAILS_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
