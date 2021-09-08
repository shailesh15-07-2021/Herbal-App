import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const [error, setError] = useState("");
  const [state, setState] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    console.log(e);
    let { name, value } = e.target.value;
    setState({ ...state, [name]: value });
  };

  const { email } = state;

  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (!email) {
      setError("Please input all input Field");
    } else {
      const { data } = axios.post(
        "http://localhost:5000/subscribe/create",
        state,
        config
      );
      console.log(data);
    }
   
  };
  return (
    <footer className="footer spad" style={{ background: "#e5e5e5" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer__about">
              <div className="footer__about__logo">
                <Link to="./index.html">
                  <img src="img/logo.png" alt='Herbal Products' />
                </Link>
              </div>
              <ul>
                <li>Address: Mayur Vihar Delhi</li>
                <li>Phone: +91 999-999-9999</li>
                <li>Email: herbalproducts@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
            <div className="footer__widget">
              <h6>Useful Links</h6>
              <ul>
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
                <li>
                  <Link to="testimonial">Testimonial</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to="/about">Who We Are</Link>
                </li>
                <li>
                  <Link to="/services">Our Services</Link>
                </li>

                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="footer__widget">
              <h6>Join Our Newsletter Now</h6>
              <p>
                Get E-mail updates about our latest shop and special offers.
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your mail"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                />
                <button type="submit" className="site-btn">
                  Subscribe
                </button>
              </form>
              <div className="footer__widget__social">
                <Link to="#">
                  <i className="fa fa-facebook" />
                </Link>
                <Link to="#">
                  <i className="fa fa-instagram" />
                </Link>
                <Link to="#">
                  <i className="fa fa-twitter" />
                </Link>
                <Link to="#">
                  <i className="fa fa-pinterest" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-fluid py-0 my-0"
        style={{ background: "#4795ff" }}
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="footer__copyright">
              <div className="footer__copyright__text text-center">
                <p>
                  Copyright © All rights reserved | with
                  <i className="fa fa-heart" aria-hidden="true" /> by
                  <Link to="#"> Flyweis Technology Private Limited</Link>
                </p>
              </div>
              <div className="footer__copyright__payment"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
