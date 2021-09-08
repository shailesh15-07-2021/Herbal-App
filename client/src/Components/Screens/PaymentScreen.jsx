import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../Redux/Action/CartAction";
import CheckOutSteps from "../Shared/CheckOutSteps";
import { Link } from "react-router-dom";

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push("/shipping");
  }
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState(
    "upi",
    "credit-card/debit-card",
    "cash-on-delivery"
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <div>
      <section
        className="breadcrumb-section set-bg mb-3"
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
                <h2 style={{ color: "#fff" }}>Payment Method</h2>
                <div className="breadcrumb__option">
                  <Link style={{ color: "#fff" }} to="/">
                    Home
                  </Link>
                  <span>Payment Method</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      <CheckOutSteps step1 step2 step3 />
      <div className="paymentScreen ml-4">
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label
              as="legend"
              style={{ fontSize: "16px" }}
              className="my-3"
            >
              Select Payment Method
            </Form.Label>
            <Col>
              <Form.Check
                style={{ marginTop: "8px", fontSize: "16px" }}
                type="radio"
                label="UPI"
                id="upi"
                name="paymentMethod"
                value="upi"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>

              <Form.Check
                style={{ marginTop: "8px", fontSize: "16px" }}
                type="radio"
                label="Credit Card/Debit Card"
                id="credit-card/debit-card"
                name="paymentMethod"
                value="credit-card/debit-card"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>

              <Form.Check
                style={{ marginTop: "8px", fontSize: "16px" }}
                type="radio"
                label="Cash On Delivery"
                id="cash-on-delivery"
                name="paymentMethod"
                value="cash-on-delivery"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button
            className="my-4"
            type="submit"
            variant="success"
            style={{ fontSize: "14px" }}
          >
            Continue
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default PaymentScreen;
