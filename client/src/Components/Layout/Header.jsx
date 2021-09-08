import React, { useState, useEffect } from "react";
import { Nav, NavDropdown, Navbar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../Redux/Action/AuthAction";
import { listCategories } from "../../Redux/Action/CategoryAction";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const [cate, setCate] = useState(false);
  const CategoryList = useSelector((state) => state.CategoryList);
  const { loading, error, categories } = CategoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  // console.log(cate);
  const openCategory = () => {
    setCate(!cate);
  };
  if (cate === true) {
    var as = { display: "none" };
  } else {
    as = { display: "block" };
  }
  const [menu, setMenu] = useState(true);

  const openMenu = () => {
    setMenu(!menu);
  };
  if (menu === true) {
    var as = { display: "none" };
  } else {
    as = { display: "block" };
    console.log(menu);
  }

  const userLogin = useSelector((state) => state.userLogin);
  const { userResult } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="success"
      variant="dark"
      className="sticky-top"
    >
      <Container>
        <Navbar.Brand>
          <Link to="/" className="HeaderLogo mr-4 pt-3">
            Herbal Products
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className=" navdiv">
            <Link className="ml-4 mr-4 my-3 navbarItemLink" to="/">
              Home
            </Link>
            <Link className="ml-4 mr-4 my-3 navbarItemLink" to="/products">
              Products
            </Link>
            <Link className="ml-4 mr-4 my-3 navbarItemLink" to="/cart">
              Cart
            </Link>
            <NavDropdown
              active
              title="Categories"
              className="ml-4 my-3 mr-4"
              style={{ fontSize: "18px" }}
            >
              {categories.map((category, index) => (
                <NavDropdown.Item
                  key={index}
                  className="navbarItemCategories navbarItemLink"
                >
                  <Link
                    className=" ml-4 my-3 mr-4 navbarItemLink navbarItemLinkUL"
                    to={`/products/${category._id}`}
                  >
                    {category.title}
                  </Link>
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>

          <Nav className="navdiv ">
            {userResult ? (
              <NavDropdown
                title={userResult.name}
                active
                className="ml-4 mr-4  navbarItemLinklogin"
              >
                <NavDropdown.Item className="navbarItemCategoriesUser">
                  <Link to="/profile">Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item className="navbarItemCategoriesUser">
                  <Link onClick={logoutHandler}>Log-Out</Link>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown.Item className="navbarItemCategoriesUser">
                <Link to="/login">Login</Link>
              </NavDropdown.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
