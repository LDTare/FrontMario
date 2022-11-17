import axios from "axios";

export default axios.create({
  baseURL: "https://farmaciareu.site/",
  headers: {
    "Content-type": "application/json"
  }
});