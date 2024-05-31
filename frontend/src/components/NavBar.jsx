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
              <Nav.Link href="/histories">Taller</Nav.Link>
              <Nav.Link href="/vehiclehistories">HU4</Nav.Link>
              <Nav.Link href="/repairs">Precios</Nav.Link>
              <NavDropdown title="Reportes" id="basic-nav-dropdown">
                <NavDropdown.Item href="/reports/1">Reporte 1: Tipos de reparaciones por tipo de vehiculo</NavDropdown.Item>
                <NavDropdown.Item href="/reports/2">Reporte 2: Variaciones en tipos de reparaciones</NavDropdown.Item>
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