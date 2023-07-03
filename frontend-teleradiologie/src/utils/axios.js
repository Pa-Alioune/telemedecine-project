import axios from "axios";
import { API_URL } from "./url";
export default axios.create({
    baseURL: API_URL
});