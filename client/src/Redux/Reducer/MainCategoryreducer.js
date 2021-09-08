import {
  MAIN_CATEGORY_LIST_REQUEST,
  MAIN_CATEGORY_LIST_SUCCESS,
  MAIN_CATEGORY_LIST_FAILS,
  MAIN_CATEGORY_DETAILS_REQUEST,
  MAIN_CATEGORY_DETAILS_SUCCESS,
  MAIN_CATEGORY_DETAILS_FAILS,
} from "../Constant/MainCategoryConstant";

export const mainCategoryListReducer = (
  state = { mainCategories: [] },
  action
) => {
  switch (action.type) {
    case MAIN_CATEGORY_LIST_REQUEST:
      return { loading: true, mainCategories: [] };

    case MAIN_CATEGORY_LIST_SUCCESS:
      return { loading: false, mainCategories: action.payload };

    case MAIN_CATEGORY_LIST_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const mainCategoryDetailsReducer = (
  state = { mainCategory: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case MAIN_CATEGORY_DETAILS_REQUEST:
      return { loading: true, ...state };

    case MAIN_CATEGORY_DETAILS_SUCCESS:
      return { loading: false, mainCategory: action.payload };

    case MAIN_CATEGORY_DETAILS_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
