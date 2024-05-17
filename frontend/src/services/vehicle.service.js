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

const getBrand = brand => {
  return httpClient.get(`/api/vehicles/getBrand/${brand}`);
}

const getVehicleType = vehicleType => {
  return httpClient.get(`/api/vehicles/getVehicleType/${vehicleType}`);
}

const getMotorType = motorType => {
  return httpClient.get(`/api/vehicles/getMotorType/${motorType}`);
}

export default { getAll, create, get, update, remove, getVehicleByLicensePlate, getBrand, getVehicleType, getMotorType };
