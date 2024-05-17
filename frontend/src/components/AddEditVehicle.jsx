import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import vehicleService from "../services/vehicle.service";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const AddEditVehicle = () => {
  const [licensePlate, setLicensePlate] = useState("");
  const [year, setYear] = useState("");
  const [seats, setSeats] = useState("");
  const [mileage, setMileage] = useState("");
  const [brand, setBrand] = useState(1);
  const [vehicleType, setVehicleType] = useState(1);
  const [motorType, setMotorType] = useState(1);
  const { id } = useParams();
  const [titleVehicleForm, setTitleVehicleForm] = useState("");
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

  const saveVehicle = (e) => {
    e.preventDefault();

    const vehicle = { licensePlate, year, seats, mileage, brand, vehicleType, motorType, id };
    if (id) {
      vehicleService
        .update(vehicle)
        .then((response) => {
          console.log("Vehículo ha sido actualizado.", response.data);
          navigate("/vehicles");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar actualizar datos del vehículo.",
            error
          );
        });
    } else {
      vehicleService
        .create(vehicle)
        .then((response) => {
          console.log("Vehículo ha sido añadido.", response.data);
          navigate("/vehicles");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar crear nuevo vehículo.",
            error
          );
        });
    }
  };

  useEffect(() => {
    if (id) {
      setTitleVehicleForm("Editar Vehículo");
      vehicleService
        .get(id)
        .then((vehicle) => {
          setLicensePlate(vehicle.data.licensePlate);
          setYear(vehicle.data.year);
          setSeats(vehicle.data.seats);
          setMileage(vehicle.data.mileage);
          setBrand(vehicle.data.brand);
          setVehicleType(vehicle.data.vehicleType);
          setMotorType(vehicle.data.motorType);
        })
        .catch((error) => {
          console.log("Se ha producido un error.", error);
        });
    } else {
      setTitleVehicleForm("Nuevo Vehículo");
    }
  }, []);
  

  return (
    <Container>
      <h3> {titleVehicleForm} </h3>
      <hr />
      <Form onSubmit={saveVehicle}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Patente</Form.Label>
              <Form.Control type="text" placeholder="Ingrese patente" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Año de Fabricación</Form.Label>
              <Form.Control type="number" placeholder="Ingrese año de fabricación" value={year} onChange={(e) => setYear(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Número de Asientos</Form.Label>
              <Form.Control type="number" placeholder="Ingrese número de asientos" value={seats} onChange={(e) => setSeats(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Kilometraje</Form.Label>
              <Form.Control type="number" placeholder="Ingrese kilometraje" value={mileage} onChange={(e) => setMileage(e.target.value)} />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Vehículo</Form.Label>
              <Form.Select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
                {vehicleTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de Motor</Form.Label>
              <Form.Select value={motorType} onChange={(e) => setMotorType(e.target.value)}>
                {motorTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Marca</Form.Label>
              <Form.Select value={brand} onChange={(e) => setBrand(e.target.value)}>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
      <hr />
      <Link to="/vehicles">Volver a la lista</Link>
    </Container>
  );
};

export default AddEditVehicle;
