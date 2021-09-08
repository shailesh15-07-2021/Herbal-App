import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listSubCategories } from "../../../Redux/Action/SubCategoryAction";
import Loader from "../../Shared/Loader";
import Message from "../../Shared/Message";
import { Link } from "react-router-dom";

const SubCategory = () => {
  const dispatch = useDispatch();
  const SubCategoryList = useSelector((state) => state.SubCategoryList);
  const { loading, error, subCategories } = SubCategoryList;
  // console.log(subCategories);

  useEffect(() => {
    dispatch(listSubCategories());
  }, [dispatch]);

  return (
    <section className="featured spad">
      <div className="section-title">
        <h3 className="filterHeader">Famous Categories </h3>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="col-lg-12">
          <div className="row">
            {subCategories.map((category, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6 " key={index}>
                <div className="featured__item">
                  <div
                    className="featured__item__pic set-bg"
                    style={{ margin: "0 0 -40px 0" }}
                  >
                    <Link to={`/products/${category._id}`}>
                      <img
                        src={category.image}
                        alt={category.title}
                        style={{
                          width: "250px",
                          height: "200px",
                          borderRadius: "10px",
                        }}
                      />
                    </Link>
                  </div>
                  <div className="featured__item__text">
                    <p
                      style={{
                        marginTop: "44px",
                        marginBottom: "-10px",
                        fontSize: "16px",
                      }}
                    >
                      <Link
                        to={`/products/${category._id}`}
                        style={{
                          listStyle: "none",
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        {category.title}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SubCategory;
