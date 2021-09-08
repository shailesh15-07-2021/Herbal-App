import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();
  const SubCategoryList = useSelector((state) => state.SubCategoryList);
  const { subCategories, error, loading } = SubCategoryList;

  const result = useSelector((state) => state.productList.result);

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <form onSubmit={searchHandler}>
      <input
        type="text"
        placeholder="What do yo u need search...."
        className="form-control"
        onchange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="btn">
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
    </form>
  );
};

export default Search;
