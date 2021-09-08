<div className="col-lg-2">
  <div className="hero__categories">
    <div className="hero__categories__all">
      <i className="fa fa-bars" onClick={() => openCategory()} />

      <span>Categories</span>
    </div>
    {loading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">{error}</Message>
    ) : (
      <Row className="sideNavContent" style={as}>
        <div
          style={{
            height: "430px",
            overflow: "auto",
            background: "#f3f3f3",
            scrollBehavior: "smooth",
            color: "black",
            fontWeight: "600",
          }}
        >
          <ul>
            {categories.map((category, index) => (
              <li
                key={index}
                className="mb-2"
                onClick={() => loadProducts(category._id)}
              >
                <Link
                  to={`/products/${category._id}`}
                  style={{
                    cursor: "pointer",
                    listStyle: "none",
                    textDecoration: "none",
                  }}
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Row>
    )}
  </div>
</div>;

















<header className="header">
  <div className="container header__top fluid">
    <div className="row">
      <div className="col-lg-3">
        <div className="header__logo">
          <Link
            to="/"
            style={{
              marginTop: "15px",
              textDecoration: "none",
              listStyle: "none",
            }}
          >
            <h3>Herbal Products</h3>
          </Link>
        </div>
      </div>
      <div className="col-lg-6" style={{ as }}>
        <nav className="header__menu">
          <ul>
            <li className="active">
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>

            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="col-lg-3">
        <div className="header__cart">
          <ul>
            <li>
              <Link to="/cart">
                <i className="fa fa-shopping-bag" />
                <span>{cart.cartItems.length}</span>
              </Link>
            </li>
          </ul>
          <div className="header__top__right__auth">
            {userResult ? (
              <NavDropdown
                title={userResult.name}
                id="username"
                style={{ paddingTop: "10px" }}
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i>
                  &nbsp; Login
                </Nav.Link>
              </LinkContainer>
            )}
          </div>
        </div>
      </div>
    </div>
    <div className="humberger__open">
      <i
        className="fa fa-bars"
        onClick={() => openMenu()}
        style={{ marginTop: "15px" }}
      ></i>
    </div>
  </div>
</header>;