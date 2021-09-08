import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../../../Redux/Action/ProductAction";
import { Card } from "react-bootstrap";

const FeatureProduct = () => {
  const dispatch = useDispatch();

  const result = useSelector((state) => state.productList.result);
  // console.log(result);
  const CategoryList = useSelector((state) => state.CategoryList);
  const { loading, error, categories } = CategoryList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <section className="featured spad">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h3 className="filterHeader">Featured Products </h3>
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="row">
            {result.map((product, index) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat"
                key={index}
              >
                <div className="featured__item">
                  <div className="featured__item__pic set-bg">
                    <Link to={`/product-detail/${product._id}`}>
                      <Card.Img
                        // src={"img/featured/feature-2.jpg"}
                        src={product.image}
                        variant="top"
                        alt={product.name}
                        style={{
                          width: "250px",
                          height: "250px",
                          borderRadius: "10px",
                        }}
                      />
                    </Link>
                    <ul className="featured__item__pic__hover">
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
                  <div className="featured__item__text">
                    <h6
                      style={{
                        fontSize: "18px",
                      }}
                    >
                      <Link
                        to={`/product-detail/${product._id}`}
                        style={{
                          listStyle: "none",
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        {product.name}
                      </Link>
                    </h6>
                    <p
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      <i className="fa fa-inr"></i>
                      {" " + product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureProduct;
