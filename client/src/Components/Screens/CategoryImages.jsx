import React from "react";

const CategoryImages = () => {
  return (
    <div>
      <section classname="categories">
        <div classname="container">
          <div classname="row">
            <div classname="categories__slider owl-carousel">
              <div classname="col-lg-3">
                <div classname="categories__item set-bg">
                  <img src="img/categories/cat-1.jpg" alt="product category" />
                  <h5>
                    <a href="">Fresh Fruit</a>
                  </h5>
                </div>
              </div>
              <div classname="col-lg-3">
                <div classname="categories__item set-bg">
                  <img src="img/categories/cat-2.jpg" alt="category" />
                  <h5>
                    <a href="">Dried Fruit</a>
                  </h5>
                </div>
              </div>
              <div classname="col-lg-3">
                <div classname="categories__item set-bg">
                  <img src="img/categories/cat-3.jpg" alt="category" />
                  <h5>
                    <a href="">Vegetables</a>
                  </h5>
                </div>
              </div>
              <div classname="col-lg-3">
                <div classname="categories__item set-bg">
                  <img src="img/categories/cat-4.jpg" alt="category" />
                  <h5>
                    <a href="">drink fruits</a>
                  </h5>
                </div>
              </div>
              <div classname="col-lg-3">
                <div classname="categories__item set-bg">
                  <img src="img/categories/cat-5.jpg" alt="category" />
                  <h5>
                    <a href="">drink fruits</a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryImages;
