import React, { useState } from "react";

const ProductSearch = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.pushState(`/search/${keyword}`);
    } else {
      history.pushState("/product");
    }
  };
  return (
    <form>
      <form className="product_search_from" onSubmit={searchHandler}>
        <input
          type="text"
          placeholder="Search..."
          className="form-control"
          onchange={(e) => setKeyword(e.target.value)}
        />

        <button type="submit">
          <span className="icon_search" />
        </button>
      </form>
    </form>
  );
};

export default ProductSearch;
