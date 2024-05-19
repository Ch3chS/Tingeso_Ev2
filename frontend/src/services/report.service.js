import httpClient from "../http-common";

const getReport1 = (year, month) => {
    return httpClient.get(`/api/reports/report1/${year}/${month}`);
}

const getReport2 = (year, month) => {
    return httpClient.get(`/api/reports/report2/${year}/${month}`);
}

export default { getReport1, getReport2 };
