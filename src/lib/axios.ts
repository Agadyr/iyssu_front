import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_END_POINT,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
});

api.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.status === 401) {
        document.cookie = "auth_token=; Max-Age=0; path=/";
        document.cookie = "laravel_session=; Max-Age=0; path=/";  

        window.location.href = "/sign-in";
    }
    return Promise.reject(error);
});

export default api;
