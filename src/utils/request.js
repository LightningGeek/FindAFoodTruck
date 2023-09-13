import axios from "axios";

var req = axios.create({
    //baseURL
    baseURL: "http://127.0.0.1:8000/",

    //set timeout
    timeout: 5000
})

//add request interceptor
req.interceptors.request.use((config)=>{
    //do sth before send the request
    return config;
}, function(error){
    return Promise.reject(error);
});

//add response interceptor
req.interceptors.response.use((response)=>{
    //do sth before get the resposne
    return response;
}, function(error){
    return Promise.reject(error);
});

export default req;