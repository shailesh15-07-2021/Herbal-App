import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Loader from "../Shared/Loader";
import Message from "../Shared/Message";
import Breadcrumb from "./Product/Breadcrumb";
import { listSubCategories } from "../../Redux/Action/SubCategoryAction";
import { listProducts } from "../../Redux/Action/ProductAction";
import { Card } from "react-bootstrap";
import { Link, params } from "react-router-dom";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const ProductScreen = ({ match }) => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 10000]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const dispatch = useDispatch();

  const SubCategoryList = useSelector((state) => state.SubCategoryList);
  const { subCategories, error, loading } = SubCategoryList;

  const CategoryList = useSelector((state) => state.CategoryList);
  const { categories } = CategoryList;

  const result = useSelector((state) => state.productList.result);
  console.log(result);
  var data = result.filter((val) => {
    return val.SubCategoryObjectID === subCategory;
  });
  console.log(data);

  var data1 = result.filter((val) => {
    return val.categoryObjectID === category;
  });

  if (subCategory !== "") {
    var results = data;
  } else if (category !== "") {
    results = data1;
  } else {
    results = result;
  }
  console.log(subCategory);

  useEffect(() => {
    dispatch(listSubCategories());
    dispatch(listProducts());
  }, []);

  return (
    <div>
      {/* Breadcrumb Section End */}
      <Breadcrumb />

      {/* Product Section Begin */}
      <section className="product spad product-spad">
        <div className="container">
          <div className="row">
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Fragment>
                <div className="col-lg-3 col-md-4 col-sm-4  sidenavBg">
                  <div>
                    {/* <hr className="my-5" /> */}
                    <div className="productCategoriesFilter">
                      <h2 className="pl-2" className="filterHeader">
                        Categories
                      </h2>
                      <div>
                        <ul className="pl-0">
                          {subCategories.map((category) => (
                            <li
                              key={category._id}
                              className="my-3 ml-3 activetintcolor"
                              style={{
                                cursor: "pointer",
                                textDecoration: "none",
                                listStyle: "none",
                                fontSize: "17px",
                                fontWeight: "500",
                              }}
                            >
                              <span
                                onClick={() => setSubCategory(category._id)}
                                style={{
                                  cursor: "pointer",
                                  listStyle: "none",
                                  textDecoration: "none",
                                }}
                              >
                                {category.title}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-8">
                  <div className="container">
                    <div className="row">
                      {results.map((product, index) => (
                        <div
                          className="col-lg-4 col-md-6 col-sm-12"
                          key={index}
                        >
                          <div className="product__item">
                            <Card
                              className="p-1 mb-4 rounded productBg"
                              style={{ textAlign: "center" }}
                            >
                              <div style={{ width: "100%", height: "250px " }}>
                                <Link to={`/product-detail/${product._id}`}>
                                  <Card.Img
                                    src={
                                      "http://localhost:5000/" + product.image
                                    }
                                    style={{
                                      width: "250px",
                                      height: "250px",
                                      borderRadius: "10px",
                                    }}
                                    variant="top"
                                    alt={product.name}
                                  />
                                </Link>
                              </div>
                              <Card.Body>
                                <Link
                                  to={`/product-detail/${product._id}`}
                                  className="decoration_none"
                                >
                                  <Card.Title as="div">
                                    <strong style={{ fontSize: "14px" }}>
                                      {product.name}
                                    </strong>
                                  </Card.Title>
                                </Link>

                                <Card.Text
                                  as="del"
                                  style={{ fontSize: "14px" }}
                                >
                                  <i className="fa fa-inr"></i>
                                  {" " + product.discountPrice}
                                </Card.Text>
                                <Card.Text
                                  as="div"
                                  style={{ fontSize: "14px" }}
                                >
                                  <i className="fa fa-inr"></i>
                                  {" " + product.price}
                                </Card.Text>
                                <Card.Text as="div">{product.subDes}</Card.Text>
                              </Card.Body>
                            </Card>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </section>

      {/* {resPerPage <= count && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )} */}
    </div>
  );
};

export default ProductScreen;
