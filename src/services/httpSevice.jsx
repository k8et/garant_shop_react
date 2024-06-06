import axios from "axios";
import configFile from "../config";

const http = axios.create({
    withCredentials: true,
    baseURL: configFile.apiUrl
});

http.interceptors.request.use(
    async function (config) {
        config.headers = { ...config.headers, "ngrok-skip-browser-warning": "69420" };
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (res) => {
        res.data = { content: res.data };
        return res;
    },
    function (error) {
        const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
        if (!expectedErrors) {
            console.log("Что-то пошло не так:", error);
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
};

export default httpService;
