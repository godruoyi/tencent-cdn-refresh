import axios from 'axios'

const instance = axios.create({
    baseURL: '',
    timeout: 5000,
    withCredentials: false
})

instance.interceptors.request.use(function (request) {
    return request
})

instance.interceptors.response.use(response => response.data, (error) =>  {
    if (response && response.status >= 200 && response.status < 300) {
        return response
    }

    return Promise.reject(error)
})

module.exports = instance
