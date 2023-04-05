import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.unsplash.com/",
});
export default instance;