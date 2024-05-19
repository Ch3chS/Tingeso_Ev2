import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/repairvehicles/vouchers');
}

const create = data => {
    return httpClient.post("/api/repairvehicles/vouchers", data);
}

const get = id => {
    return httpClient.get(`/api/repairvehicles/vouchers/${id}`);
}

const update = data => {
    return httpClient.put('/api/repairvehicles/vouchers', data);
}

const remove = id => {
    return httpClient.delete(`/api/repairvehicles/vouchers/${id}`);
}

const getByBrandId = brandId => {
    return httpClient.get(`/api/repairvehicles/vouchers/brand/${brandId}`);
}

export default { getAll, create, get, update, remove, getByBrandId };