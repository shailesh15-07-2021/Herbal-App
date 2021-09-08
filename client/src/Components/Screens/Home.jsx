import React from "react";
import Category from "./Home/Category";
import FeatureProduct from "./Home/FeatureProduct";
import LatestProduct from "./Home/LatestProduct";
import SubCategory from "./Home/SubCategory";

const Home = () => {
  return (
    <div>
      {/* Category Banner Start */}
      <div className="category">
        <Category />
      </div>
      {/* Category Banner End */}

      {/* Featured Section Start*/}
 
      <FeatureProduct />


      {/* Banner Begin */}
      <div className="banner">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="banner__pic">
                <img src="img/banner/banner-1.jpg" alt="banner page" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="banner__pic">
                <img src="img/banner/banner-2.jpg" alt="banner page" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Featured Section End */}

      {/* Sub Categories Start */}
      <div className="subcategory">
        <SubCategory />
      </div>

      {/* Sub Categories End */}

      {/* Banner End */}
      {/* <LatestProduct /> */}
      {/* Latest Product Section End */}
    </div>
  );
};

export default Home;
