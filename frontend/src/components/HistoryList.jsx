import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import historyService from "../services/history.service";
import vehicleService from "../services/vehicle.service";
import { Table, Button } from "react-bootstrap";
import { toLocalDate, toLocalTime } from "../utils";

const HistoryList = () => {
  const [histories, setHistories] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  const init = async () => {
    try {
      const response = await historyService.getAll();
      console.log("Mostrando listado de todos los historiales.", response.data);
      setHistories(response.data);
      console.log("Historiales actualizados: ", response.data);
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
        setVehicles((prevVehicles) => [...prevVehicles, response.data]);
        console.log("Vehículo agregado: ", response.data);
      } catch (error) {
        console.log("Error al obtener vehículo: ", error);
      }
    }
  };

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas borrar este historial?"
    );
    if (confirmDelete) {
      historyService
        .remove(id)
        .then((response) => {
          console.log("Historial ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar el historial",
            error
          );
        });
    }
  };

  const handleViewRepairs = (id) => {
    console.log("Printing id", id);
    navigate(`/history/${id}/repairs`);
  };

  const handleComplete = (id) => {
    const completedDate = new Date();
    const completedDateStr = toLocalDate(completedDate);
    const completedTimeStr = toLocalTime(completedDate);

    historyService.get(id)
      .then((response) => {
        const updatedHistory = {
          ...response.data,
          completedDate: completedDateStr,
          completedTime: completedTimeStr
        };

        historyService.update(updatedHistory)
          .then((response) => {
            console.log("Historial completado: ", response.data);
            init();
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  };

  const handleRelease = (id) => {
    const releaseDate = new Date();
    const releaseDateStr = toLocalDate(releaseDate);
    const releaseTimeStr = toLocalTime(releaseDate);

    historyService.get(id)
      .then((response) => {
        const updatedHistory = {
          ...response.data,
          releaseDate: releaseDateStr,
          releaseTime: releaseTimeStr
        };

        historyService.update(updatedHistory)
          .then((response) => {
            console.log("Historial liberado: ", response.data);
            // Llamada a calculateTotalCost
            historyService.calculateTotalCost(id)
              .then((response) => {
                console.log("Costo total calculado: ", response.data);
                // Actualizar los valores en el estado
                setHistories(prevHistories => 
                  prevHistories.map(history => 
                    history.id === id ? {...history, ...response.data} : history
                  )
                );
                init();
              })
              .catch((error) => {
                console.log("Error al calcular el costo total: ", error);
              });
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  };

  const handleApplyBonus = (id) => {
    console.log("Aplicando bono al historial con id: ", id);
    navigate(`/history/${id}/voucher/apply`);
  };

  return (
    <div className="container">
      <br />
      <Link
        to="/history/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button variant="primary">
          Ingresar vehículo al taller
        </Button>
      </Link>
      <br /> <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Patente del Vehículo</th>
            <th>Fecha de Ingreso</th>
            <th>Hora de Ingreso</th>
            <th>Fecha de Completado</th>
            <th>Hora de Completado</th>
            <th>Fecha de Salida</th>
            <th>Hora de Salida</th>
            <th>Costo de Reparaciones</th>
            <th>Descuentos</th>
            <th>Recargos</th>
            <th>IVA</th>
            <th>Costo Total</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {histories.map((historyItem) => {
            const vehicle = vehicles.find((v) => v.licensePlate === historyItem.licensePlate);
            const showApplyBonusButton = vehicle && !vehicle.voucherApplied;
  
            return (
              <tr key={historyItem.id}>
                <td>{historyItem.licensePlate}</td>
                <td>{historyItem.enteredDate}</td>
                <td>{historyItem.enteredTime}</td>
                <td>{historyItem.completedDate}</td>
                <td>{historyItem.completedTime}</td>
                <td>{historyItem.releaseDate}</td>
                <td>{historyItem.releaseTime}</td>
                <td>{historyItem.reparationsCost}</td>
                <td>{historyItem.discounts}</td>
                <td>{historyItem.surcharges}</td>
                <td>{historyItem.iva}</td>
                <td>{historyItem.totalCost}</td>
                <td>
                  <Button variant="success" onClick={() => handleViewRepairs(historyItem.id)}>
                    Ver Reparaciones
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(historyItem.id)}>
                    Eliminar
                  </Button>
                  {!historyItem.completedDate && (
                    <Button variant="warning" onClick={() => handleComplete(historyItem.id)}>
                      Completar
                    </Button>
                  )}
                  {historyItem.completedDate && !historyItem.releaseDate && (
                    <Button variant="primary" onClick={() => handleRelease(historyItem.id)}>
                      Liberar
                    </Button>
                  )}
                  {showApplyBonusButton && historyItem.completedDate && historyItem.releaseDate && (
                    <Button variant="info" onClick={() => handleApplyBonus(historyItem.id)}>
                      Aplicar bono
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default HistoryList;