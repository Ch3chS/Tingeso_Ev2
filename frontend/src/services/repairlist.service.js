import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/repairlist');
}

const get = id => {
    return httpClient.get(`/api/repairlist/${id}`);
}

const create = repair => {
    return httpClient.post("/api/repairlist", repair);
}

const update = repair => {
    return httpClient.put('/api/repairlist', repair);
}

const remove = id => {
    return httpClient.delete(`/api/repairlist/${id}`);
}

export default { getAll, create, get, update, remove };
