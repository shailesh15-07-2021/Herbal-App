import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = () => {
  return (
    <section
      className="breadcrumb-section"
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
              <h2 style={{ color: "#fff" }}>All Products</h2>
              <div className="breadcrumb__option">
                <Link style={{ color: "#fff" }} to="/">
                  Home
                </Link>
                <span>Shop</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
