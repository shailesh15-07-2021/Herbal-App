import {
  PRODUCT_FIND_BY_PRICE_REQUEST,
  PRODUCT_FIND_BY_PRICE_SUCCESS,
  PRODUCT_FIND_BY_PRICE_FAIL,
} from "../Constant/ProductByPriceConstant";

const initialState = {
  loading: false,
  action: "Filter Products",
  result: [],
  response: {},
  singledata: [],
  msg: "",
  error: "",
};

export const productsByPriceReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_FIND_BY_PRICE_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case PRODUCT_FIND_BY_PRICE_SUCCESS:
      return {
        ...state,
        result: action.result,
        loading: action.payload,
        msg: action.msg,
      };
    case PRODUCT_FIND_BY_PRICE_FAIL:
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
