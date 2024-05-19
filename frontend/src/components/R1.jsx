import React, { useEffect, useState } from 'react';
import reportService from '../services/report.service';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';

const R1 = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [data, setData] = useState([]);

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

    const vehicleTypes = [
        { id: 1, name: "Sedan" },
        { id: 2, name: "Hatchback" },
        { id: 3, name: "SUV" },
        { id: 4, name: "Pickup" },
        { id: 5, name: "Furgoneta" }
    ];

    useEffect(() => {
        reportService.getReport1(year, month)
            .then(response => {
                setData(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, [year, month]);

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    return (
        <div className="container">
            <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="formYear">
                            <Form.Label>Año:</Form.Label>
                            <Form.Control type="number" value={year} onChange={handleYearChange} className="rounded" style={{backgroundColor: 'white', color: 'black'}} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="formMonth">
                            <Form.Label>Mes:</Form.Label>
                            <Form.Control type="number" value={month} onChange={handleMonthChange} className="rounded" style={{backgroundColor: 'white', color: 'black'}} />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        {vehicleTypes.map(vehicleType => (
                            <th key={vehicleType.id}>{vehicleType.name}</th>
                        ))}
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {repairTypes.map((repairType, index) => (
                        <React.Fragment key={repairType.id}>
                            <tr>
                                <td rowSpan="2">{repairType.name}</td>
                                {(data[index * 2] ?? []).map((count, i) => (
                                    <td key={i}>{count}</td>
                                ))}
                            </tr>
                            <tr>
                                {(data[index * 2 + 1] ?? []).map((cost, i) => (
                                    <td key={i}>{cost}</td>
                                ))}
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default R1;
