import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import vehicleService from "../services/vehicle.service";
import { Table, Button } from "react-bootstrap";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  const init = async () => {
    try {
      const response = await vehicleService.getAll();
      console.log("Mostrando listado de todos los vehículos.", response.data);
      
      const vehiclesWithDetails = await Promise.all(response.data.map(async vehicle => {
        const brandName = await vehicleService.getBrand(vehicle.brand);
        const vehicleTypeName = await vehicleService.getVehicleType(vehicle.vehicleType);
        const motorTypeName = await vehicleService.getMotorType(vehicle.motorType);
        
        return {
          ...vehicle,
          brand: brandName,
          vehicleType: vehicleTypeName,
          motorType: motorTypeName,
        };
      }));

      setVehicles(vehiclesWithDetails);
    } catch (error) {
      console.log(
        "Se ha producido un error al intentar mostrar listado de todos los vehículos.",
        error
      );
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm(
      "¿Esta seguro que desea borrar este vehículo?"
    );
    if (confirmDelete) {
      vehicleService
        .remove(id)
        .then((response) => {
          console.log("Vehículo ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar al vehículo",
            error
          );
        });
    }
  };

  const handleEdit = (id) => {
    console.log("Printing id", id);
    navigate(`/vehicle/edit/${id}`);
  };

  return (
    <div className="container">
      <br />
      <Link
        to="/vehicle/add"
        style={{ textDecoration: "none", marginBottom: "1rem" }}
      >
        <Button variant="primary">
          Añadir Vehículo
        </Button>
      </Link>
      <br /> <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Patente</th>
            <th>Año de Fabricación</th>
            <th>Número de Asientos</th>
            <th>Kilometraje</th>
            <th>Modelo</th>
            <th>Marca</th>
            <th>Tipo de Vehículo</th>
            <th>Tipo de Motor</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => {
            return (
              <tr key={vehicle.id}>
                <td>{vehicle.licensePlate}</td>
                <td>{vehicle.year}</td>
                <td>{vehicle.seats}</td>
                <td>{vehicle.mileage}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.vehicleType}</td>
                <td>{vehicle.motorType}</td>
                <td>
                  <Button variant="info" onClick={() => handleEdit(vehicle.id)}>
                    Editar
                  </Button>
                  {' '}
                  <Button variant="danger" onClick={() => handleDelete(vehicle.id)}>
                    Eliminar
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

export default VehicleList;
