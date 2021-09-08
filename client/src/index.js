import jwt from "jsonwebtoken";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap.min.css";
import "./index.css";
import App from "./App";
import store from "./Redux/store";
import { logout, setCurrentUser } from "./Redux/Action/AuthAction";
import setAuthorizationToken from "./Redux/Action/setAuthorization";

// console.log(localStorage.etoken);
if (localStorage.etoken) {
  setAuthorizationToken(localStorage.etoken);
  jwt.verify(localStorage.etoken, "secret", function (err, decode) {
    if (err) {
      store.dispatch(logout());
    } else {
      store.dispatch(setCurrentUser(decode));
    }
  });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
