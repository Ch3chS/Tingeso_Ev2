import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import historyService from "../services/history.service";
import vehicleService from "../services/vehicle.service";

const brands = [
  { id: 1, name: "Toyota" },
  { id: 2, name: "Kia" },
  { id: 3, name: "Honda" },
  { id: 4, name: "Ford" },
  { id: 5, name: "Chevrolet" },
  { id: 6, name: "Hyundai" },
  { id: 7, name: "Otra" },
];

const vehicleTypes = [
  { id: 1, name: "Sedan" },
  { id: 2, name: "Hatchback" },
  { id: 3, name: "SUV" },
  { id: 4, name: "Pickup" },
  { id: 5, name: "Furgoneta" },
];

const motorTypes = [
  { id: 1, name: "Gasolina" },
  { id: 2, name: "Diésel" },
  { id: 3, name: "Híbrido" },
  { id: 4, name: "Eléctrico" },
];

const VehicleHistoryList = () => {
  const [histories, setHistories] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const init = async () => {
    try {
      const response = await historyService.getAll();
      console.log("Historiales obtenidos: ", response.data);
      setHistories(response.data);
      await getVehicles(response.data);
    } catch (error) {
      console.log(
        "Se ha producido un error al intentar mostrar listado de todos los historiales.",
        error
      );
    }
  };

  useEffect(() => {
    init();
  }, []);

  const getVehicles = async (histories) => {
    for (const history of histories) {
      try {
        const response = await vehicleService.getVehicleByLicensePlate(history.licensePlate);
        console.log("Vehículo obtenido: ", response.data);
        setVehicles((prevVehicles) => [...prevVehicles, response.data]);
      } catch (error) {
        console.log("Error al obtener vehículo: ", error);
      }
    }
  };

  return (
    <div className="container">
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Patente Vehiculo</th>
            <th>Marca Vehiculo</th>
            <th>Modelo Vehiculo</th>
            <th>Tipo Vehiculo</th>
            <th>Año Fabricación</th>
            <th>Tipo de motor</th>
            <th>Fecha Ingreso Taller</th>
            <th>Hora Ingreso Taller</th>
            <th>Monto Total Reparaciones</th>
            <th>Monto Recargos</th>
            <th>Monto Dctos</th>
            <th>Sub Total</th>
            <th>Monto IVA</th>
            <th>Costo Total</th>
            <th>Fecha Salida Taller</th>
            <th>Hora Salida Taller</th>
            <th>Fecha Retiro Cliente</th>
            <th>Hora Retiro Cliente</th>
          </tr>
        </thead>
        <tbody>
        {histories.map((historyItem) => {
          const vehicle = vehicles.find((v) => v.licensePlate === historyItem.licensePlate);
          if (!vehicle) {
            console.log("Vehículo no encontrado para la patente: ", historyItem.licensePlate);
            return null;
          }
          const brand = brands.find((b) => b.id === vehicle.brand);
          const vehicleType = vehicleTypes.find((vt) => vt.id === vehicle.vehicleType);
          const motorType = motorTypes.find((mt) => mt.id === vehicle.motorType);

          const subTotal = historyItem.totalCost - historyItem.iva;

            return (
              <tr key={historyItem.id}>
                <td>{historyItem.licensePlate}</td>
                <td>{brand.name}</td>
                <td>{vehicle.model}</td>
                <td>{vehicleType.name}</td>
                <td>{vehicle.year}</td>
                <td>{motorType.name}</td>
                <td>{historyItem.enteredDate}</td>
                <td>{historyItem.enteredTime}</td>
                <td>{historyItem.reparationsCost}</td>
                <td>{historyItem.surcharges}</td>
                <td>{historyItem.discounts}</td>
                <td>{subTotal}</td>
                <td>{historyItem.iva}</td>
                <td>{historyItem.totalCost}</td>
                <td>{historyItem.completedDate}</td>
                <td>{historyItem.completedTime}</td>
                <td>{historyItem.releaseDate}</td>
                <td>{historyItem.releaseTime}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default VehicleHistoryList;
