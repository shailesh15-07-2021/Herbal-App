import {
  PRODUCT_FIND_BY_CATEGORY_FAIL,
  PRODUCT_FIND_BY_CATEGORY_REQUEST,
  PRODUCT_FIND_BY_CATEGORY_SUCCESS,
} from "../Constant/ProductByCategoryConstant";

const initialState = {
  loading: false,
  action: "Filter Products",
  result: [],
  response: {},
  singledata: [],
  msg: "",
  error: "",
};

export const productsByCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_FIND_BY_CATEGORY_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case PRODUCT_FIND_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        result: action.result,
        loading: action.payload,
        msg: action.msg,
      };
    case PRODUCT_FIND_BY_CATEGORY_FAIL:
      return {
        ...state,
        error: action.error,
        loading: action.payload,
        msg: action.msg,
      };

    default:
      return state;
  }
};
