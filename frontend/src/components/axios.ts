import axios from "axios";
import Cookies from "cookies-js";

const requestToApi = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
  headers: {
    "X-CSRFToken": Cookies.get("csrftoken"),  
  },
});

export default requestToApi;
