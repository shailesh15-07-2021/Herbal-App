import axios from "axios";

export default function setAuthorizationToken(etoken) {
  if (etoken) {
    axios.defaults.headers.common["Authorization"] = etoken;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
