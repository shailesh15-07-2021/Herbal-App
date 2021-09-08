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
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_CANCEL_FAIL,
  ORDER_CANCEL_SUCCESS,
  ORDER_CANCEL_REQUEST,
} from "../Constant/OrderConstant";

// const initialState = {
//   orderData: [],
//   orderDetail: {},
//   response: {},
//   singledata: [],
//   loading: true,
//   success: false,
//   msg: "",
//   error: "",
// };

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,

        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { orderItems: [], loading: true, shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };

    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };

    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true };

    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };

    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };

    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return { loading: true };

    case ORDER_LIST_MY_SUCCESS:
      return { loading: false, orders: action.payload };

    case ORDER_LIST_MY_FAIL:
      return { loading: false, error: action.payload };

    case ORDER_LIST_MY_RESET:
      return { order: [] };

    default:
      return state;
  }
};

export const orderCancelReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_CANCEL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_CANCEL_SUCCESS:
      return {
        ...state,

        orders: state.result.filter(
          (item) => item._id !== action.result.data._id
        ),
        response: action.result.msg,
        loading: false,
        msg: action.msg,
      };
    case ORDER_CANCEL_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        msg: action.msg,
      };
    default:
      return state;
  }
};
