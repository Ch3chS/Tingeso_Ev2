import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { Table, Button } from "react-bootstrap";
import repairhistoryService from "../services/repairhistory.service";
import historyService from "../services/history.service";
import { toLocalDate, toLocalTime } from "../utils";

const repairTypes = [
  { id: 1, name: "Reparación de sistema de frenos" },
  { id: 2, name: "Servicio del sistema de refrigeración" },
  { id: 3, name: "Reparaciones del motor" },
  { id: 4, name: "Reparaciones de la transmisión" },
  { id: 5, name: "Reparación del sistema eléctrico" },
  { id: 6, name: "Reparaciones del sistema de escape" },
  { id: 7, name: "Reparación de neumáticos y ruedas" },
  { id: 8, name: "Reparaciones de la suspensión y dirección" },
  { id: 9, name: "Reparación del sistema de aire acondicionado y calefacción" },
  { id: 10, name: "Reparaciones del sistema de combustible" },
  { id: 11, name: "Reparación y reemplazo de parabrisas y cristales" }
];

const RepairHistoryList = () => {
    const { id } = useParams();
    const [repairHistories, setRepairHistories] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);
  
    useEffect(() => {
      Promise.all([repairhistoryService.getRepairHistory(id), historyService.get(id)])
        .then(([repairHistoriesData, historyData]) => {
          const repairHistoriesWithName = repairHistoriesData.data.map(repairHistory => {
            const repairType = repairTypes.find(type => type.id === repairHistory.repairType);
            return { ...repairHistory, repairType: repairType.name };
          });
          // Ordenar las reparaciones por el ID del tipo de reparación
          const sortedRepairHistories = repairHistoriesWithName.sort((a, b) => a.repairType - b.repairType);
          setRepairHistories(sortedRepairHistories);
          setIsCompleted(historyData.data.completedDate !== null);
        })
        .catch((error) => {
          console.log("Error al obtener el historial de reparaciones: ", error);
        });
    }, [id]);
  
    const handleDelete = (repairHistoryId) => {
      repairhistoryService.remove(repairHistoryId)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error al eliminar el historial de reparación: ", error);
        });
    };
  
    return (
      <div>
        {!isCompleted && (
          <Link to={`/history/${id}/addRepair`}>
            <Button variant="primary" style={{ marginBottom: '10px' }}>Agregar Reparación</Button>
          </Link>
        )}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Reparación</th>
              <th>Fecha de Reparación</th>
              <th>Hora de Reparación</th>
              <th>Costo</th>
              {!isCompleted && <th>Operaciones</th>}
            </tr>
          </thead>
          <tbody>
            {repairHistories.map((repairHistory) => {
              return (
                <tr key={repairHistory.id}>
                  <td>{repairHistory.repairType}</td>
                  <td>{repairHistory.repairDate}</td>
                  <td>{repairHistory.repairTime}</td>
                  <td>{repairHistory.cost}</td>
                  {!isCompleted && (
                    <td>
                      <Button variant="danger" onClick={() => handleDelete(repairHistory.id)}>
                        Eliminar
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <hr />
        <Link to="/histories">Volver a la lista</Link>
      </div>
    );
  };
  
  export default RepairHistoryList;
  
