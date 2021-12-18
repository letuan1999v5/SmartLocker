import axios from "axios";

function setup(instance){
    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if(token){
            // config.headers.access = localStorage.getItem("access");
            // config.headers.username = localStorage.getItem('username');
            // config.headers.name = localStorage.getItem('name');
            config.headers.Authorization = "Bearer" + token;
        }
        return config;
    },
    (err) => {
        console.log(err);
        return Promise.reject(err);
    })
}

function checkToken(instance){
    instance.interceptors.response.use((response) => {
        if (response.headers['content-type'].startsWith('application/json')) {
            return response;
          }
    }, (err) => {
        console.log(err);
        try {
            if(err.response.data){
                return Promise.resolve(err.response);
            }
        } catch (error) {
            return Promise.resolve("Không thể kết nối tới máy chủ");
        }
    })
}

const Interceptor = axios.create({
    baseURL: 'https://localhost:5001/',
    timeout: 5000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
})

setup(Interceptor);
checkToken(Interceptor);

export default Interceptor;



