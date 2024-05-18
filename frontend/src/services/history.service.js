import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/repairvehicles/history');
}

const get = id => {
    return httpClient.get(`/api/repairvehicles/history/${id}`);
}

const create = history => {
    return httpClient.post("/api/repairvehicles/history", history);
}

const update = history => {
    return httpClient.put('/api/repairvehicles/history', history);
}

const remove = id => {
    return httpClient.delete(`/api/repairvehicles/history/${id}`);
}

export default { getAll, create, get, update, remove };