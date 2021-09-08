import { combineReducers } from "redux";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./AuthReducer";
import { cartReducer } from "./CartReducer";
import { categoryDetailsReducer, categoryListReducer } from "./CategoryReducer";
import {
  mainCategoryDetailsReducer,
  mainCategoryListReducer,
} from "./MainCategoryreducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderPayReducer,
  orderCancelReducer,
} from "./OrderReducer";
import { productsByCategoryReducer } from "./ProductByCategoryreducer";
import { productsByPriceReducer } from "./ProductByPriceReducer";
import { productDetailsReducer, productListReducer } from "./ProductReducer";
import {
  subCategoryDetailsReducer,
  subCategoryListReducer,
} from "./SubCategoryReducer";

const rootReducer = combineReducers({
  // Auth Reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,

  // Category Reducer
  CategoryList: categoryListReducer,
  CategoryDetails: categoryDetailsReducer,

  // Sub Category Reducer
  SubCategoryList: subCategoryListReducer,
  SubCategoryDetails: subCategoryDetailsReducer,

  // Main Category Reducer
  mainCategoryList: mainCategoryListReducer,
  mainCategoryDetails: mainCategoryDetailsReducer,

  // Product Reducer
  productList: productListReducer,
  productDetails: productDetailsReducer,

  // Filter Products
  productsByCategory: productsByCategoryReducer,
  productsByPrice: productsByPriceReducer,

  // Cart Reducer
  cart: cartReducer,

  // Order Reducer
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  listMyOrder: orderListMyReducer,
  cancelOrder: orderCancelReducer,
});

export default rootReducer;
