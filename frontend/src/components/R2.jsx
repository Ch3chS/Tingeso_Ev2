import React, { useEffect, useState } from 'react';
import reportService from '../services/report.service';
import { Table, Form, Row, Col } from 'react-bootstrap';

const R2 = () => {
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

    const months = [
        { id: 1, name: "Enero" },
        { id: 2, name: "Febrero" },
        { id: 3, name: "Marzo" },
        { id: 4, name: "Abril" },
        { id: 5, name: "Mayo" },
        { id: 6, name: "Junio" },
        { id: 7, name: "Julio" },
        { id: 8, name: "Agosto" },
        { id: 9, name: "Septiembre" },
        { id: 10, name: "Octubre" },
        { id: 11, name: "Noviembre" },
        { id: 12, name: "Diciembre" }
    ];

    useEffect(() => {
        reportService.getReport2(year, month)
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

    const getMonthName = (monthIndex) => {
        if (monthIndex < 0) monthIndex += 12;
        return months[monthIndex].name;
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
                        <th>Total {getMonthName(month - 1)}</th>
                        <th>%Variación</th>
                        <th>Total {getMonthName(month - 2)}</th>
                        <th>%Variación</th>
                        <th>Total {getMonthName(month - 3)}</th>
                    </tr>
                </thead>
                <tbody>
                    {repairTypes.map((repairType, index) => (
                        <React.Fragment key={repairType.id}>
                            <tr>
                                <td>{repairType.name}</td>
                                {(data[index * 2] ?? []).map((value, i) => (
                                    <td key={i}>{i % 2 === 1 ? value + "%" : value}</td>
                                ))}
                            </tr>
                            <tr>
                                <td></td>
                                {(data[index * 2 + 1] ?? []).map((value, i) => (
                                    <td key={i}>{i % 2 === 1 ? value + "%" : value}</td>
                                ))}
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default R2;
