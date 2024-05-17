import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <Container className="sticky-top">
      <Navbar expand="lg">
          <Navbar.Brand href="/home">AutoFix</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/vehicles">Vehiculos</Nav.Link>
              <Nav.Link href="/histories">Historiales</Nav.Link>
              <NavDropdown title="Reportes" id="basic-nav-dropdown">
                <NavDropdown.Item href="/reports/1">Reporte 1: Valores de los Vehículos para la formula</NavDropdown.Item>
                <NavDropdown.Item href="/reports/2">Reporte 2: Tipos de reparaciones por Tipo de vehículo</NavDropdown.Item>
                <NavDropdown.Item href="/reports/3">Reporte 3: Tiempos promedio de reparación por Marca</NavDropdown.Item>
                <NavDropdown.Item href="/reports/4">Reporte 4: Reparaciones por Tipo de motor</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="ml-auto">
              <Button href="/vouchers/insert">Insertar Bonos</Button>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default NavBar;