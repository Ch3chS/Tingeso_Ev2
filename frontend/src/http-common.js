import axios from "axios";

const backendServer = process.env.REACT_APP_BACKEND_SERVER || '192.168.49.2';
const backendPort = process.env.REACT_APP_BACKEND_PORT || '30001';

const httpClient = axios.create({
    baseURL: `http://${backendServer}:${backendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Agregar un interceptor para imprimir la URL de la solicitud por consola
httpClient.interceptors.request.use(config => {
    console.log('URL de la solicitud:', config.url);
    return config;
}, error => {
    return Promise.reject(error);
});

export default httpClient;
