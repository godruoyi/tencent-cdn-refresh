import axios from "axios";

const instance = axios.create({
    baseURL: "",
    timeout: 5000,
    withCredentials: false
});

instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

instance.interceptors.request.use(function (request) {
    return request;
});

instance.interceptors.response.use(response => response.data, (error) =>  {
    return Promise.reject(error);
});

module.exports = instance;
