import React, { useEffect, useState } from "react";
import voucherService from "../services/voucher.service";
import historyService from "../services/history.service";
import vehicleService from "../services/vehicle.service";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

const ApplyVoucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [history, setHistory] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const { id } = useParams(); // ID de la historia
  const navigate = useNavigate();

  const brands = [
    { id: 1, name: "Toyota" },
    { id: 2, name: "Kia" },
    { id: 3, name: "Honda" },
    { id: 4, name: "Ford" },
    { id: 5, name: "Chevrolet" },
    { id: 6, name: "Hyundai" },
    { id: 7, name: "Otra" },
  ];

  useEffect(() => {
    historyService.get(id).then((response) => {
      const historyData = response.data;
      console.log("Historia obtenida: ", historyData);
      setHistory(historyData);

      vehicleService.getVehicleByLicensePlate(historyData.licensePlate).then((response) => {
        const vehicleData = response.data;
        console.log("Vehículo obtenido: ", vehicleData);
        setVehicle(vehicleData);

        voucherService.getAll().then((response) => {
          const filteredVouchers = response.data.filter(
            (voucher) => voucher.amount < historyData.totalCost && voucher.brandId === vehicleData.brand
          );
          console.log("Bonos filtrados: ", filteredVouchers);
          setVouchers(filteredVouchers);
        });
      });
    });
  }, [id]);

  const getBrandName = (brandId) => {
    const brand = brands.find((b) => b.id === brandId);
    return brand ? brand.name : "Desconocida";
  };

  const applyVoucher = (voucherId) => {
    historyService.applyVoucher(id, voucherId).then(() => {
      navigate("/histories");
    });
  };

  return (
    <div className="container">
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre de la Marca</th>
            <th>Monto</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((voucher) => {
            return (
              <tr key={voucher.id}>
                <td>{getBrandName(voucher.brandId)}</td>
                <td>{voucher.amount}</td>
                <td>
                  <Button variant="success" onClick={() => applyVoucher(voucher.id)}>
                    Aplicar bono
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ApplyVoucher;
