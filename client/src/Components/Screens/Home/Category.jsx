import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../../Redux/Action/CategoryAction";
import { Link } from "react-router-dom";
import Search from "../../Layout/Search";
import { Route } from "react-router-dom";

const Category = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const cart = useSelector((state) => state.cart);

  //fun for decimal
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimal(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = addDecimal(cart.cartItems < 500 ? 0 : 50);
  cart.taxPrice = addDecimal(Number((0.18 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const loadProducts = (id) => {
    console.log(id);
  };
  return (
    <div>
      <section className="hero">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="hero__search md-6">
                <div className="hero__search__form ml-6">
                  <Route
                    render={({ history }) => <Search history={history} />}
                  />
                </div>
              </div>

              <div
                className="hero__item set-bg"
                style={{
                  backgroundImage: `url(
                    "https://source.unsplash.com/1600x900/?herbal,ayurveda"
                  )`,
                  backgroundRepeat: "no-repeat",
                  color: "#fff",
                }}
              >
                <div className="hero__text">
                  <span style={{ color: "orange" }}>FRUIT FRESH</span>
                  <h2 style={{ color: "orange" }}>
                    Vegetable <br />
                    100% Organic
                  </h2>
                  <p style={{ color: "orange" }}>
                    Free Pickup and Delivery Available
                  </p>
                  <Link
                    to="/products"
                    className="primary-btn"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    SHOP NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
