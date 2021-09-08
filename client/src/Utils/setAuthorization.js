import axios from "axios";

export default function setAuthorizationToken(etoken) {
  if (etoken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${etoken}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
