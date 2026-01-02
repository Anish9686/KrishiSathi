import axios from "axios";
import { getToken, saveToken, clearToken } from "./auth";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // Required for HttpOnly cookies
});

// Request Interceptor: Add Access Token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("adminToken") || getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 and Refresh Token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 (Unauthorized) and not already trying to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axios.get("http://localhost:5000/api/auth/refresh", {
                    withCredentials: true,
                });

                if (res.data.token) {
                    saveToken(res.data.token);
                    originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                clearToken();
                // Redirect logic can be added here or in components
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
