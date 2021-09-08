import React, { useState, useEffect } from "react";
import axios from "axios";
import { ORDER_PAY_RESET } from "../../Redux/Constant/OrderConstant";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getOrderDetails, payOrder } from "../../Redux/Action/OrderAction";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Shared/Message";
import Loader from "../Shared/Loader";

const OrderDetails = ({ match }) => {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  console.log(order);

  const userLogin = useSelector((state) => state.userLogin);
  const { userResult } = userLogin;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successpay } = orderPay;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successpay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successpay]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <section
        className="breadcrumb-section set-bg my-4"
        style={{
          backgroundImage: `url("http://localhost:3000/img/breadcrumb.jpg")`,
          backgroundRepeat: "no-repeat",
          color: "#fff",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2 style={{ color: "#fff" }}>
                  {userResult.name} Order Details
                </h2>
                <div className="breadcrumb__option">
                  <Link style={{ color: "#fff" }} to="/">
                    Home
                  </Link>
                  <span>Order Details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>
        <h2 className="mb-3">Order Details</h2>
        <Row>
          <Col md={8}>
            <ListGroup.Item variant="flush">
              <h2>Shipping</h2>
              <p>
                <strong>Name : </strong>
                {userResult.name}
              </p>
              <p>
                <strong>Email : </strong>
                {userResult.email}
              </p>
              <p>
                <strong>Address :</strong>
                {order.shippingAddress.address}&nbsp;
                {order.shippingAddress.city}&nbsp;
                {order.shippingAddress.postalcode}&nbsp;
                {order.shippingAddress.country}&nbsp;
              </p>
              {order.isDeliverd ? (
                <Message variant="success">Paid On {order.isDeliverd}</Message>
              ) : (
                <Message variant="danger">Not Deliverd</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method :</strong>
                <strong>{order.paymentMethod}</strong>
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid On {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={"http://localhost:5000/" + item.image}
                            alt={item.name}
                            style={{ width: "100%" }}
                            fluid
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X <i className="fa fa-inr"></i>
                          {" " + item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>
                      <i className="fa fa-inr"></i>
                      {" " + order.itemsPrice}
                    </Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>
                      <i className="fa fa-inr"></i>
                      {" " + order.shippingPrice}
                    </Col>
                  </Row>
                  <Row>
                    <Col>Tax</Col>
                    <Col>
                      <i className="fa fa-inr"></i>
                      {" " + order.taxPrice}
                    </Col>
                  </Row>
                  <Row>
                    <Col>Total</Col>
                    <Col>
                      <i className="fa fa-inr"></i>
                      {" " + order.totalPrice}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <Message variant="danger">{error}</Message>}
                </ListGroup.Item>
              </ListGroup>
            </Card>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  // <PayPalButton
                  //   amount={order.totalPrice}
                  //   onSuccess={successPaymentHandler}
                  // />
                  successPaymentHandler()
                )}
              </ListGroup.Item>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderDetails;
