import setAuthorizationToken from "../../Utils/setAuthorization";
import jwt from "jsonwebtoken";
import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  SIGNOUT_USER,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  SET_CURRENT_USER,
  USER_DETAILS_RESET,
} from "../Constant/AuthConstant";
import { ORDER_LIST_MY_RESET } from "../Constant/OrderConstant";

//Login Action
export const login = (email, password) => {
  return function (dispatch) {
    dispatch({
      type: USER_LOGIN_REQUEST,
      payload: true,
    });

    let OPTIONS = {
      url: `http://localhost:5000/login/`,
      method: "POST",
      data: {
        email: email,
        password: password,
      },
      headers: {
        "content-type": "application/json",
      },
    };

    axios(OPTIONS)
      .then((res) => {
        const msg = res.data.msg;
        if (msg === "Success") {
          const etoken = res.data.token;
          localStorage.setItem("etoken", etoken);
          setAuthorizationToken(etoken);
          // console.log(etoken);

          dispatch(setCurrentUser(jwt.decode(etoken)));
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: msg,
            isSigninIn: true,
          });
        } else {
          dispatch({
            type: USER_LOGIN_FAIL,
            payload: msg,
            isSigninIn: false,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: USER_LOGIN_FAIL,
          loading: false,
          payload: error.message,
        });
      });
  };
};

// logout Action
export const logout = () => {
  return function (dispatch) {
    dispatch({
      type: USER_LOGIN_REQUEST,
      payload: true,
    });
    localStorage.removeItem("etoken");
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
    dispatch({
      type: SIGNOUT_USER,
      payload: false,
    });
    dispatch({
      type: USER_LOGIN_FAIL,
      loading: false,
      payload: "",
    });
    window.location.href = "/";
  };
};

// SET CURRENT USER ACTION
export const setCurrentUser = (result) => {
  // console.log(result);
  return {
    type: SET_CURRENT_USER,
    payload: result,
  };
};

// User Register
export const register = (name, email, password, contact) => {
  return function (dispatch) {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: true,
    });

    let OPTIONS = {
      url: `http://localhost:5000/signup`,
      method: "POST",
      data: {
        name: name,
        email: email,
        contact: contact,
        password: password,
      },
      headers: {
        "content-type": "application/json",
      },
    };

    axios(OPTIONS)
      .then((res) => {
        const msg = res.data.msg;
        if (msg === "Success") {
          dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: msg,
            isSigninIn: false,
          });
        } else {
          dispatch({
            type: USER_REGISTER_FAIL,
            payload: msg,
            isSigninIn: false,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: USER_REGISTER_FAIL,
          loading: false,
          payload: error.message,
        });
      });
  };
};

// get user details
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const token = localStorage.getItem("etoken");
    console.log(token);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "token",
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/find/${id}`,
      config
    );
    console.log(data);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Update Action

export const updateUserProfile = (user, id) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const token = localStorage.getItem("etoken");
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "token",
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/update/${id}`,
      user,
      config
    );
    console.log(data);
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
