import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import RepairListService from "../services/repairlist.service";

const RepairList = () => {
  const [repairs, setRepairs] = useState([]);
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

  useEffect(() => {
    RepairListService.getAll()
      .then(response => {
        setRepairs(response.data);
      })
      .catch(error => {
        console.error(`Error fetching data: ${error}`);
      });
  }, []);

  const handleEdit = (repairType, motorType, value) => {
    setRepairs(repairs.map(repair => repair.repairType === repairType && repair.motorType === motorType ? {...repair, cost: value} : repair));
  };

  const handleSave = () => {
    repairs.forEach(repair => {
      RepairListService.update(repair)
        .then(response => {
          console.log(`Changes for repair type ${repair.repairType} and motor type ${repair.motorType} saved successfully`);
        })
        .catch(error => {
          console.error(`Error saving changes: ${error}`);
        });
    });
  };

  return (
    <div className="container" style={{ marginTop: "30px"}}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tipo de Reparación / Tipo de Motor</th>
            {motorTypes.map(motor => (
              <th key={motor.id}>{motor.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {repairTypes.map((repairType) => (
            <tr key={repairType.id}>
              <td>{repairType.name}</td>
              {motorTypes.map(motor => {
                const repair = repairs.find(r => r.repairType === repairType.id && r.motorType === motor.id);
                return (
                  <td key={motor.id}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="number"
                        placeholder="Ingrese costo"
                        value={repair ? repair.cost : 0}
                        onChange={(e) => handleEdit(repairType.id, motor.id, parseInt(e.target.value))}
                      />
                    </Form.Group>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        </Table>
      <Button variant="info" onClick={handleSave}>
        Guardar Cambios
      </Button>
    </div>
  );
};

export default RepairList;
