import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILS,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAILS,
} from "../Constant/CategoryConstant";

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };

    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };

    case CATEGORY_LIST_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const categoryDetailsReducer = (
  state = { category: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return { loading: true, ...state };

    case CATEGORY_DETAILS_SUCCESS:
      return { loading: false, category: action.payload };

    case CATEGORY_DETAILS_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
