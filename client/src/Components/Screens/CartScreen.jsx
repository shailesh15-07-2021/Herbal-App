import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Shared/Message";
import { addToCart, removeFromCart } from "../../Redux/Action/CartAction";
import { Button } from "react-bootstrap";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // console.log(cartItems);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkout = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div>
      <div>
        <section
          className="breadcrumb-section set-bg"
          style={{
            backgroundImage: `url("http://localhost:3000/img/breadcrumb.jpg")`,
            backgroundRepeat: "no-repeat",
            color: "#fff",
          }}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="breadcrumb__text">
                  <h2 style={{ color: "#fff" }}>Shopping Cart</h2>
                  <div className="breadcrumb__option">
                    <Link style={{ color: "#fff" }} to="/">
                      Home
                    </Link>
                    <span>Shopping Cart</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Breadcrumb Section End */}

        {/* Shoping Cart Section Begin */}
        <section className="shoping-cart spad">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                {cartItems.length === 0 ? (
                  <Message>
                    Your Cart is Empty !<Link to="/"> Go Back</Link>
                  </Message>
                ) : (
                  <div className="shoping__cart__table">
                    <table className="table table-bordered">
                      <thead>
                        <tr style={{ background: "#f3f3f3" }}>
                          <th className="shoping__product" width="10%"></th>
                          <th width="60%">Products</th>
                          <th width="10%">Price</th>
                          <th width="10%">Qty</th>
                          <th width="10%"></th>
                        </tr>
                      </thead>
                      {cartItems.map((item) => (
                        <tbody>
                          <tr>
                            <td className="shoping__cart__item" key={item._id}>
                              <img
                                src={"http://localhost:5000/" + item.image}
                                alt={item.name}
                              />
                            </td>
                            <td className="shoping__cart__price">
                              {item.name}
                            </td>
                            <td className="shoping__cart__price">
                              {item.price}
                            </td>
                            <td className="shoping__cart__quantity">
                              <div className="quantity">
                                <div className="pro-qty">
                                  <input
                                    type="number"
                                    name="qty"
                                    value={item.qty}
                                    onChange={(e) =>
                                      dispatch(
                                        addToCart(
                                          item.product,
                                          Number(e.target.value)
                                        )
                                      )
                                    }
                                  />
                                  {/* {[...Array(item.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )} */}
                                </div>
                              </div>
                            </td>
                            <td className="shoping__cart__item__close">
                              <Button
                                type="button"
                                variant="light"
                                onClick={() =>
                                  removeFromCartHandler(item.product)
                                }
                              >
                                <i
                                  className="fa fa-trash text-danger"
                                  aria-hidden="true"
                                ></i>
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="shoping__cart__btns">
                  <Link to="" className="primary-btn cart-btn">
                    CONTINUE SHOPPING
                  </Link>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="shoping__checkout">
                  <h5>Cart Total</h5>
                  <ul>
                    <li>
                      <h2>
                        subtotal (
                        {cartItems.reduce(
                          (acc, item) => acc + Number(item.qty),
                          0
                        )}
                        ) items
                      </h2>

                      {cartItems
                        .reduce(
                          (acc, item) =>
                            acc + Number(item.qty) * Number(item.price),
                          0
                        )
                        .toFixed(2)}
                    </li>
                  </ul>
                  <Button
                    type="button"
                    className="btn-block btn btn-lg btn-success"
                    disabled={cartItems.length === 0}
                    onClick={checkout}
                    style={{ fontSize: "15px", color: "#fff" }}
                  >
                    PROCEED TO CHECKOUT
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartScreen;
