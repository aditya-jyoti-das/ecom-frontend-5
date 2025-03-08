import axios from "axios";
import Host from "./components/Host";

const API = axios.create({
  baseURL: `${Host}api`,
});

// Interceptor to add token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle 401 errors (optional)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: Redirect to login or clear token
      localStorage.removeItem("token");
      alert(error.response + " please login again ");
      window.location.href = "/loginRegister"; // Adjust based on your routing
    }
    return Promise.reject(error);
  }
);

export default API;
