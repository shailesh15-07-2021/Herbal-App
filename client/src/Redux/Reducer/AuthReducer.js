import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  SET_CURRENT_USER,
  SIGNOUT_USER,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
} from "../Constant/AuthConstant";

const intialState = {
  isSigninIn: false,
  loading: false,
  email: "",
  password: "",
  userType: "",
  action: "Signin",
  userResult: {},
  response: [],
  singledata: [],
  msg: "",
};

export const userLoginReducer = (state = intialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        isSigninIn: action.isSigninIn,
        loading: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
        isSigninIn: false,
        msg: action.payload,
        loading: action.loading,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        userResult: action.payload,
        isSigninIn: true,
      };
    case SIGNOUT_USER:
      return {
        ...state,
        isSigninIn: action.payload,
      };

    default:
      return state;
  }
};

// USER REGISTER REDUCER
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// GET USER DETAILS REDUCER
export const userDetailsReducer = (state = intialState, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        result: action.result,
        loading: action.payload,
        msg: action.msg,
      };
    case USER_DETAILS_FAIL:
      return {
        ...state,
        error: action.error,
        loading: action.payload,
        msg: action.msg,
      };
    case USER_DETAILS_RESET:
      return {
        user: {},
      };

    default:
      return state;
  }
};

// DETAILS UPDATE REDUCER
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };

    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };

    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
