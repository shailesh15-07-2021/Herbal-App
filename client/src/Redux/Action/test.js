export const listMyOrders = (userResult) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
      payload: userResult,
    });

    const token = localStorage.getItem("etoken");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "token",
      },
    };

    const data = await axios.post(
      "http://localhost:5000/order/find",
      userResult,
      config
    );
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data.data.orders,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
