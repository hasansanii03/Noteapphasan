import axios from "axios";

// Imposta la variabile d'ambiente in base al tuo framework
// Usa process.env se sei su Create React App, oppure import.meta.env se usi Vite
const API_URL = process.env.REACT_APP_BASE_URL; 
// Se usi Vite, commenta la riga sopra e decommenta quella qui sotto:
// const API_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: { // CORRETTO: prima era "heders"
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // CORRETTO: prima era "rejext"
    }
);

export default axiosInstance;