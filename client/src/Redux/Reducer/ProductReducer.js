import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILS,
  CLEAR_ERROR,
} from "../Constant/ProductConstant";

const initialState = {
  loading: false,
  action: "load Product",
  result: [],
  response: {},
  singledata: [],
  msg: "",
  error: "",
};

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        result: action.result,
        loading: action.payload,
        msg: action.msg,
      };
    case PRODUCT_LIST_FAILS:
      return {
        ...state,
        error: action.error,
        loading: action.payload,
        msg: action.msg,
      };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const productDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        singledata: action.result,
        loading: action.payload,
        msg: action.msg,
      };

    case PRODUCT_DETAILS_FAILS:
      return {
        error: action.error,
        loading: action.payload,
        msg: action.msg,
      };

    default:
      return state;
  }
};
