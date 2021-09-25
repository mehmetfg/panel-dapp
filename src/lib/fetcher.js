import axios from "axios";

export const fetcher = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    Accept: 'application/json',
})
