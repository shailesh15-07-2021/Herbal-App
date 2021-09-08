import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../Redux/Action/OrderAction";
import Message from "../Shared/Message";
import CheckOutStep from "../Shared/CheckOutSteps";
import { removeFromCart } from "../../Redux/Action/CartAction";

const PlaceOrder = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  const userLogin = useSelector((state) => state.userLogin);

  console.log(cart);

  //fun for decimal
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimal(
    cart.cartItems.reduce(
      (acc, item) => acc + Number(item.price) * Number(item.qty),
      0
    )
  );
  cart.shippingPrice = addDecimal(cart.cartItems < 500 ? 50 : 0);
  cart.taxPrice = addDecimal(Number((0.18 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        userResult: userLogin.userResult,
      })
    );
    dispatch(removeFromCart());
  };

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
  }, [history, success]);
  return (
    <>
      <CheckOutStep step1 step2 step3 step4 />
      <Row className="mt-3">
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item style={{ background: "#f3f3f3" }}>
              <h3>Shipping Details</h3>
              <p>
                <strong>Address : </strong>
                {cart.shippingAddress.address}&nbsp;
                {cart.shippingAddress.city}&nbsp;
                {cart.shippingAddress.postalcode}&nbsp;
                {cart.shippingAddress.country}&nbsp;
              </p>
            </ListGroup.Item>
            <ListGroup.Item style={{ background: "#f3f3f3" }}>
              <h3>Payment Method</h3>
              <p>
                <strong>{cart.paymentMethod}</strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item style={{ background: "#f3f3f3" }}>
              <h3>Order Items</h3>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      style={{ background: "#f3f3f3" }}
                    >
                      <Row>
                        <Col md={2}>
                          <Image
                            style={{ width: "100%" }}
                            src={"http://localhost:5000/" + item.image}
                            alt={item.name}
                            fluid
                          />
                        </Col>
                        <Col style={{ marginTop: "22px", fontSize: "14px" }}>
                          <Link
                            to={`/product-detail/${item.product}`}
                            style={{
                              listStyle: "none",
                              textDecoration: "none",
                            }}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col
                          md={4}
                          style={{ marginTop: "22px", fontSize: "14px" }}
                        >
                          {item.qty} X {item.price} = {item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item style={{ background: "#f3f3f3" }}>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col style={{ fontSize: "14px" }}>Items</Col>
                  <Col style={{ fontSize: "14px" }}>{cart.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col style={{ fontSize: "14px" }}>Shipping</Col>
                  <Col style={{ fontSize: "14px" }}>{cart.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col style={{ fontSize: "14px" }}>Tax</Col>
                  <Col style={{ fontSize: "14px" }}>{cart.taxPrice}</Col>
                </Row>

                <Row>
                  <Col style={{ fontSize: "14px" }}>Total</Col>
                  <Col style={{ fontSize: "14px" }}>{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <Button
                type="button"
                style={{ fontSize: "15px" }}
                className="btn-block btn btn-lg btn-success"
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
