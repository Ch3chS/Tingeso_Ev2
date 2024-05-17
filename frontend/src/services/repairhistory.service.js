import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/repairvehicles/repairhistory');
}

const get = id => {
    return httpClient.get(`/api/repairvehicles/repairhistory/${id}`);
}

const create = repairHistory => {
    return httpClient.post("/api/repairvehicles/repairhistory", repairHistory);
}

const update = repairHistory => {
    return httpClient.put('/api/repairvehicles/repairhistory', repairHistory);
}

const remove = id => {
    return httpClient.delete(`/api/repairvehicles/repairhistory/${id}`);
}

export default { getAll, create, get, update, remove };
