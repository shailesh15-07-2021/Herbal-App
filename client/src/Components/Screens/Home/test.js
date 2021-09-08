import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../../../Redux/Action/ProductAction";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function NowPlaying({ movie }) {
  const dispatch = useDispatch();

  const result = useSelector((state) => state.productList.result);
  // console.log(result);
  const CategoryList = useSelector((state) => state.CategoryList);
  const { loading, error, categories } = CategoryList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <Container>
      <div className="clearfix mt-5 mb-2">
        <h4 className="float-left">Now Playing</h4>
        <Link className="float-right text-uppercase" to="/">
          see all
        </Link>
      </div>
      <Slider {...settings}>
        {result.map(function (product, index) {
          return (
            <div
              className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat"
              key={index}
            >
              <div className="featured__item">
                <div className="featured__item__pic set-bg">
                  <Link to={`/product-detail/${product._id}`}>
                    <Col>
                      <Card>
                        <Card.Img
                          variant="top"
                          src={product.image}
                          alt={product.name}
                          style={{ width: "270px", height: "250px" }}
                        />
                        <Card.Body>
                          <span>{movie.title}</span>
                        </Card.Body>
                      </Card>
                    </Col>
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
                  <p
                    style={{
                      fontSize: "16px",
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
                  </p>
                  <h6>
                    <i className="fa fa-inr"></i>
                    {"" + product.price}
                  </h6>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </Container>
  );
}
