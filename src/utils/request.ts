import axios from 'axios';


const httpInstance = axios.create({
    baseURL: 'http://127.0.0.1:5000/api',
    timeout: 5000,
})



httpInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

httpInstance.interceptors.response.use(
    (response) => {
        // 响应码处理
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
)


export default httpInstance;




