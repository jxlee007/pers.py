import axios from "axios";

//create instance with base URL
const api = axios.create({
    baseURL: "http://localhost:8000"
});

//export axios instance
export default api;