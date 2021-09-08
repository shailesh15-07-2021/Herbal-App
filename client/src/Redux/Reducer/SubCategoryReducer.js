import {
  SUB_CATEGORY_DETAILS_FAILS,
  SUB_CATEGORY_DETAILS_REQUEST,
  SUB_CATEGORY_DETAILS_SUCCESS,
  SUB_CATEGORY_LIST_FAILS,
  SUB_CATEGORY_LIST_REQUEST,
  SUB_CATEGORY_LIST_SUCCESS,
} from "../Constant/SubCategoryConstant";

export const subCategoryListReducer = (
  state = { subCategories: [] },
  action
) => {
  switch (action.type) {
    case SUB_CATEGORY_LIST_REQUEST:
      return { loading: true, subCategories: [] };

    case SUB_CATEGORY_LIST_SUCCESS:
      return { loading: false, subCategories: action.payload };

    case SUB_CATEGORY_LIST_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const subCategoryDetailsReducer = (
  state = { subCategory: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case SUB_CATEGORY_DETAILS_REQUEST:
      return { loading: true, ...state };

    case SUB_CATEGORY_DETAILS_SUCCESS:
      return { loading: false, subCategory: action.payload };

    case SUB_CATEGORY_DETAILS_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
