import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/vehicles');
}

const get = id => {
    return httpClient.get(`/api/vehicles/${id}`);
}

const create = vehicle => {
    return httpClient.post("/api/vehicles", vehicle);
}

const update = vehicle => {
    return httpClient.put('/api/vehicles', vehicle);
}

const remove = id => {
    return httpClient.delete(`/api/vehicles/${id}`);
}

const getVehicleByLicensePlate = licensePlate => {
  return httpClient.get(`/api/vehicles/byLicensePlate/${licensePlate}`);
}

export default { getAll, create, get, update, remove, getVehicleByLicensePlate };
