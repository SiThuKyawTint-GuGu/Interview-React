import axios from "axios";

const ax = axios.create({
    baseURL: 'http://localhost:8000/api',
})

export default ax;