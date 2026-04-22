import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_API;

// Create an Axios instance
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

// Function to set auth token
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Initialize token from localStorage if available
const token = localStorage.getItem("uedc-token");
if (token) {
  setAuthToken(token);
}

export { setAuthToken };
export default axios;
