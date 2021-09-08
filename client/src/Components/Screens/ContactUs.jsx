import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ContactUs = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
    subject: "",
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const { name, email, contact, subject, message } = state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (!email || !message) {
      setError("Please input all input Field");
    } else {
      const { data } = axios.post(
        "http://localhost:5000/contact/create",
        state,
        config
      );
    }
    handleInputChange("");
  };
  return (
    <div>
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
                <h2 style={{ color: "#fff" }}>Contact Us</h2>
                <div className="breadcrumb__option">
                  <Link style={{ color: "#fff" }} to="/">
                    Home
                  </Link>
                  <span>Contact-Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="contact" className="contact section-bg">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <p>
              Magnam dolores commodi suscipit. Necessitatibus eius consequatur
              ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam
              quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea.
              Quia fugiat sit in iste officiis commodi quidem hic quas.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="info-box mb-4">
                <i className="bx bx-map" />
                <h3>Our Address</h3>
                <p>
                  C-18 First Floor, Acharya Niketan, Mayur Vihar, Delhi, 110091
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="info-box  mb-4">
                <i className="bx bx-envelope" />
                <h3>Email Us</h3>
                <p>herbalproducts@gmail.com</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="info-box  mb-4">
                <i className="bx bx-phone-call" />
                <h3>Call Us</h3>
                <p>+91 999-999-9999</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 ">
              <iframe
                className="mb-4 mb-lg-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.764854941385!2d77.29180231545413!3d28.606830291993802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5256229bb57%3A0x3a42f734774450d4!2sTravBond!5e0!3m2!1sen!2sin!4v1630488314984!5m2!1sen!2sin"
                frameBorder={0}
                style={{ border: 0, width: "100%", height: 384 }}
                allowFullScreen
              />
            </div>

            <div className="col-lg-6">
              <form
                className="php-email-form"
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col-md-6 form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      name="name"
                      value={name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="contact Number"
                      name="contact"
                      value={contact}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    name="subject"
                    value={subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <textarea
                    className="form-control"
                    placeholder="Message"
                    name="message"
                    value={message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message" />
                  <div className="sent-message">
                    Your message has been sent. Thank you!
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit">Send Message</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
