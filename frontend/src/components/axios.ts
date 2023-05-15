import axios from "axios";

const requestToApi = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

export default requestToApi;
