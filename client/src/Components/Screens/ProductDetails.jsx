import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Ratting from "../Shared/Ratting";

import {
  listProductDetails,
  listProducts,
} from "../../Redux/Action/ProductAction";
import { Button } from "react-bootstrap";

const ProductDetails = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector(
    (state) => state.productDetails.singledata
  );
  // console.log(productDetails);

  const products = useSelector((state) => state.productList.result);
  // console.log(products);

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, match]);

  const addToCartHandler = (qty) => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <div>
      <section
        className="breadcrumb-section mb-3"
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
                <h2 style={{ color: "#fff" }}>{productDetails.name} Details</h2>
                <div className="breadcrumb__option">
                  <Link style={{ color: "#fff" }} to="/">
                    Home
                  </Link>
                  <span> Shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      <Link to="/" className="btn btn-warning mt-3" style={{ color: "black" }}>
        <i className="fa fa-arrow-left "></i>
        &nbsp; GO BACK
      </Link>
      {/* Product Details Section Begin */}

      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="product__details__pic">
              <div className="product__details__pic__item">
                <img
                  className="product__details__pic__item--large "
                  src={"http://localhost:5000/" + productDetails.image}
                  alt={productDetails.name}
                  style={{
                    width: "auto",
                    height: "350px",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="product__details__text">
              <h3>{productDetails.name}</h3>
              <div className="product__details__rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-half-o" />
                <span>
                  <Ratting
                    value={productDetails.rating}
                    text={`${productDetails.numReviews} Reviews`}
                  />
                </span>
              </div>
              <div className="product__details__price">
                {productDetails.price}
              </div>
              <p>{productDetails.des}</p>
              <div className="product__details__quantity mb-3">
                <div className="quantity">
                  <div className="pro-qty">
                    <input
                      type="number"
                      name="qty"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <Button
                className="btn-block btn btn-success btn-lg"
                style={{ fontSize: "16px" }}
                type="button"
                onClick={addToCartHandler}
              >
                ADD TO CART
              </Button>
              <Link to="" className="heart-icon">
                <span className="icon_heart_alt" />
              </Link>
              <ul>
                <li>
                  <b>Availability</b> <span>In Stock</span>
                </li>
                <li>
                  <b>Shipping</b>
                  <span>
                    01 day shipping. <samp>Free pickup today</samp>
                  </span>
                </li>
                <li>
                  <b>Weight</b> <span>0.5 kg</span>
                </li>
                <li>
                  <b>Share on</b>
                  <div className="share">
                    <Link to="">
                      <i className="fa fa-facebook" />
                    </Link>
                    <Link to="">
                      <i className="fa fa-twitter" />
                    </Link>
                    <Link to="">
                      <i className="fa fa-instagram" />
                    </Link>
                    <Link to="">
                      <i className="fa fa-pinterest" />
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="product__details__tab">
              <ul className="nav ">
                <li className="nav-item mr-5">
                  <h4 className="nav-link active mb-3" aria-selected="true">
                    Description
                  </h4>
                  <p>{productDetails.des}</p>
                </li>
                <li className="nav-item ml-5">
                  <h4 className="nav-link mb-3" aria-selected="false">
                    Information
                  </h4>
                  <p>{productDetails.subDes}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section End */}

      {/* Related Product Section Begin */}
      <section className="related-product">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title related__product__title">
                <h2 className="filterHeader">Related Product</h2>
              </div>
            </div>
          </div>

          <div className="row ">
            {products.map((product, index) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 relatedProduct"
                key={index}
              >
                <div className="product__item">
                  <div
                    className="product__item__pic set-bg px-2"
                    style={{ textAlign: "center" }}
                  >
                    <img
                      src={"http://localhost:5000/" + product.image}
                      alt={product.name}
                      style={{
                        width: "250px",
                        height: "250px",
                        borderRadius: "15px",
                      }}
                    />
                    <ul className="product__item__pic__hover">
                      <li>
                        <Link to="">
                          <i className="fa fa-heart" />
                        </Link>
                      </li>
                      <li>
                        <Link to="">
                          <i className="fa fa-retweet" />
                        </Link>
                      </li>
                      <li>
                        <Link to="">
                          <i className="fa fa-shopping-cart" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6>
                      <Link to="{`/product-detail/${product._id}`}">
                        {product.name}
                      </Link>
                    </h6>
                    <h5>{product.price}</h5>
                    <p>{product.des}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
