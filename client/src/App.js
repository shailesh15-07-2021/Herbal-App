import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Header from "./Components/Layout/Header";
import Home from "./Components/Screens/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Footer from "./Components/Layout/Footer";
import ProductScreen from "./Components/Screens/ProductScreen";
import ProductDetails from "./Components/Screens/ProductDetails";
import CartScreen from "./Components/Screens/CartScreen";
import ContactUs from "./Components/Screens/ContactUs";
import ShippingScreen from "./Components/Screens/ShippingScreen";
import PaymentScreen from "./Components/Screens/PaymentScreen";
import PlaceOrder from "./Components/Screens/PlaceOrder";
import OrderScreen from "./Components/Screens/OrderScreen";
import ProfileScreen from "./Components/Screens/ProfileScreen";
import PrivecyPolicy from "./Components/Pages/PrivecyPolicy";
import AboutUs from "./Components/Pages/AboutUs";
import Services from "./Components/Pages/Services";
import Testimonial from "./Components/Pages/Testimonial";
import WhoWeAre from "./Components/Pages/WhoWeAre";
import OrderDetails from "./Components/Screens/OrderDetails";

function App() {
  return (
    <Router>
      <Header />
      <main className="my-3">
        <Container>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/profile" component={ProfileScreen} exact />
          <Route path="/products" component={ProductScreen} exact />
          <Route path="/products/:id" component={ProductScreen} exact />
          <Route path="/product-detail/:id" component={ProductDetails} exact />
          <Route path="/cart/:id?" component={CartScreen} exact />
          <Route path="/shipping" component={ShippingScreen} exact />
          <Route path="/payment" component={PaymentScreen} exact />
          <Route path="/placeorder" component={PlaceOrder} exact />
          <Route path="/order/:id" component={OrderScreen} exact />
          <Route path="/order-detail/:id" component={OrderDetails} exact />
          <Route path="/contact-us" component={ContactUs} exact />
          <Route path="/privacy-policy" component={PrivecyPolicy} exact />
          <Route path="/about-us" component={AboutUs} exact />
          <Route path="/about" component={WhoWeAre} exact />
          <Route path="/services" component={Services} exact />
          <Route path="/testimonial" component={Testimonial} exact />
          <Route path="/search/:keyword" component={ProductScreen} exact />
          {/* <Route path="/blog" component={Blog} exact /> */}
          {/* <Route path="/blog-detail" component={BlogDetail} exact /> */}
          {/* <Route path="/check-out" component={CheckOut} exact /> */}
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
