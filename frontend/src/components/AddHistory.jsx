import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toLocalDate, toLocalTime } from "../utils";
import historyService from "../services/history.service";
import vehicleService from "../services/vehicle.service";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import AsyncSelect from 'react-select/async';

const AddHistory = () => {
  const [licensePlate, setLicensePlate] = useState("");
  const navigate = useNavigate();

  const loadOptions = (inputValue, callback) => {
    vehicleService
      .getAll()
      .then((response) => {
        const vehicles = response.data;
        const options = vehicles
          .filter(vehicle => vehicle.licensePlate.includes(inputValue))
          .map(vehicle => ({ value: vehicle.licensePlate, label: vehicle.licensePlate }));
        callback(options);
      })
      .catch((error) => {
        console.log("Se ha producido un error al intentar mostrar listado de todos los vehículos.", error);
      });
  };

  const saveHistory = (e) => {
    e.preventDefault();

    const enteredDate = new Date();
    const enteredDateStr = toLocalDate(enteredDate);
    const enteredTimeStr = toLocalTime(enteredDate);
    const history = { totalCost: 0, enteredDate: enteredDateStr, enteredTime: enteredTimeStr, completedDate: null, completedTime: null, releaseDate: null, releaseTime: null, licensePlate };
    console.log("Guardando history:", history);
    historyService
      .create(history)
      .then((response) => {
        console.log("Historial ha sido añadido.", response.data);
        navigate("/histories");
      })
      .catch((error) => {
        console.log(
          "Ha ocurrido un error al intentar crear nuevo historial.",
          error
        );
      });
  };

  return (
    <Container>
      <h3> Nuevo Historial </h3>
      <hr />
      <Form onSubmit={saveHistory}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Patente del Vehículo</Form.Label>
              <AsyncSelect cacheOptions defaultOptions loadOptions={loadOptions} onChange={(e) => setLicensePlate(e.value)} />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
      <hr />
      <Link to="/histories">Volver a la lista</Link>
    </Container>
  );
};

export default AddHistory;
