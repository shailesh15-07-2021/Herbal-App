import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../Shared/FormContainer";
import CheckOutSteps from "../Shared/CheckOutSteps";
import { saveShippingAddress } from "../../Redux/Action/CartAction";
import { Link } from "react-router-dom";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [landMark, setLandMark] = useState(shippingAddress.landMark);
  const [city, setCity] = useState(shippingAddress.city);
  const [stateName, setStateName] = useState(shippingAddress.stateName);
  const [country, setCountry] = useState(shippingAddress.country);
  const [postalcode, setPostalcode] = useState(shippingAddress.postalcode);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(
      saveShippingAddress({
        address,
        landMark,
        city,
        postalcode,
        stateName,
        country,
      })
    );
    history.push("/payment");
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
                <h2 style={{ color: "#fff" }}>Shiping Address</h2>
                <div className="breadcrumb__option">
                  <Link style={{ color: "#fff" }} to="/">
                    Home
                  </Link>
                  <span>Shiping Address</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      <CheckOutSteps step1 step2 />
      <FormContainer style={{ background: "#f3f3f3" }}>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label style={{ fontSize: "14px" }}>Address</Form.Label>
            <Form.Control
              style={{ fontSize: "14px" }}
              type="text"
              placeholder="Full Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="Landmark">
            <Form.Label style={{ fontSize: "14px" }}>landMark</Form.Label>
            <Form.Control
              style={{ fontSize: "14px" }}
              type="text"
              placeholder="LandMark"
              value={landMark}
              onChange={(e) => setLandMark(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label style={{ fontSize: "14px" }}>City</Form.Label>
            <Form.Control
              style={{ fontSize: "14px" }}
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="state">
            <Form.Label style={{ fontSize: "14px" }}>State</Form.Label>
            <Form.Control
              style={{ fontSize: "14px" }}
              type="text"
              placeholder="State Name"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="postalcode">
            <Form.Label style={{ fontSize: "14px" }}>PostalCode</Form.Label>
            <Form.Control
              style={{ fontSize: "14px" }}
              type="text"
              placeholder="Area Pincode"
              value={postalcode}
              onChange={(e) => setPostalcode(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="country">
            <Form.Label style={{ fontSize: "14px" }}>Country</Form.Label>
            <Form.Control
              style={{ fontSize: "14px" }}
              type="text"
              placeholder="Country Name"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="success"
            className="btn-block my-4 btn-lg"
            style={{ fontSize: "15px" }}
          >
            continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ShippingScreen;
