// require("dotenv").config();
import axios from "axios";

const host = "127.0.0.1";
const port = "8080";

const api = axios.create({ baseURL: `http://${host}:${port}/v1` });

export default api;
