import axios from "axios";
import Host from "./components/Host";
const API = axios.create({
  baseURL: `http://${Host}:8080/api`,
});
delete API.defaults.headers.common["Authorization"];
export default API;
