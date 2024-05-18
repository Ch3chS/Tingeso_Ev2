import { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import { Table, Button, Form } from "react-bootstrap";
import vehicleService from "../services/vehicle.service";
import repairHistoryService from "../services/repairhistory.service";
import historyService from "../services/history.service";
import repairListService from "../services/repairlist.service";
import { toLocalDate, toLocalTime } from '../utils.js';

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

const motorTypes = [
  { id: 1, name: "Gasolina" },
  { id: 2, name: "Diésel" },
  { id: 3, name: "Híbrido" },
  { id: 4, name: "Eléctrico" },
];

const AddRepair = () => {
    const { id } = useParams();
    const [repairs, setRepairs] = useState([]);
    const [selectedRepairs, setSelectedRepairs] = useState([]);
    const [vehicle, setVehicle] = useState(null);
  
    useEffect(() => {
      historyService.get(id)
        .then((response) => {
          const history = response.data;
          return vehicleService.getVehicleByLicensePlate(history.licensePlate);
        })
        .then((response) => {
          setVehicle(response.data);
          return repairListService.getAll();
        })
        .then((response) => {
          const repairList = response.data;
          if (vehicle) {
            const filteredRepairs = repairList.filter(repair => repair.motorType === vehicle.motorType);
            const repairsWithNames = filteredRepairs.map(repair => {
              const repairType = repairTypes.find(type => type.id === repair.repairType);
              const motorType = motorTypes.find(type => type.id === repair.motorType);
              return { ...repair, repairTypeName: repairType.name, motorTypeName: motorType.name };
            });
            // Ordenar las reparaciones por el ID del tipo de reparación
            const sortedRepairs = repairsWithNames.sort((a, b) => a.repairType - b.repairType);
            setRepairs(sortedRepairs);
          }
        })
        .catch((error) => {
          console.log("Error al obtener las reparaciones: ", error);
        });
    }, [id, vehicle]);
  
    const handleSelect = (repairId) => {
      setSelectedRepairs(prevState => [...prevState, repairId]);
    };
  
    const handleAddRepairs = () => {
      const currentDate = new Date();
      selectedRepairs.forEach((repairId) => {
        const repair = repairs.find(repair => repair.id === repairId);
        const repairHistory = { 
          historyId: Number(id), 
          repairType: repair.repairType, 
          cost: repair.cost, 
          repairDate: toLocalDate(currentDate), 
          repairTime: toLocalTime(currentDate)
        };
        console.log("Enviando al backend: ", repairHistory); 
        repairHistoryService.create(repairHistory)
          .then(() => {
            window.location.href = `/history/${id}/repairs`;
          })
          .catch((error) => {
            console.log("Error al agregar la reparación al historial: ", error);
          });
      });
    };
    
    
  
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Tipo de Reparación</th>
              <th>Tipo de Motor</th>
              <th>Costo</th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((repair) => (
              <tr key={repair.id}>
                <td>
                  <Form.Check type="checkbox" onChange={() => handleSelect(repair.id)} />
                </td>
                <td>{repair.repairTypeName}</td>
                <td>{repair.motorTypeName}</td>
                <td>{repair.cost}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Link to={`/history/${id}/addRepair`}>
          <Button variant="primary" style={{ marginBottom: '10px' }} onClick={handleAddRepairs}>Agregar Reparaciones</Button>
        </Link>
        <hr />
        <Link to={`/history/${id}/repairs`}>Volver a la lista</Link>
      </div>
    );
  };
  
  export default AddRepair;
  