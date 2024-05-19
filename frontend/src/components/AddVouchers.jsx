import { useEffect, useState } from "react";
import voucherService from "../services/voucher.service";
import { Form, Button, Alert } from "react-bootstrap";

const AddVouchers = () => {
  const brands = [
    { id: 1, name: "Toyota" },
    { id: 2, name: "Kia" },
    { id: 3, name: "Honda" },
    { id: 4, name: "Ford" },
    { id: 5, name: "Chevrolet" },
    { id: 6, name: "Hyundai" },
    { id: 7, name: "Otra" },
  ];

  const [selectedBrand, setSelectedBrand] = useState(brands[0].id);
  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Crea 'quantity' bonos
    for (let i = 0; i < quantity; i++) {
      const voucher = {
        brandId: selectedBrand,
        amount: amount
      };

      voucherService.create(voucher).then(() => {
        setShowAlert(true); // Muestra la alerta cuando se crea un bono
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Marca</Form.Label>
        <Form.Select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Monto</Form.Label>
        <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Cantidad</Form.Label>
        <Form.Control type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit" className="mb-3">
        Insertar bonos
      </Button>

      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Bonos agregados correctamente.
        </Alert>
      )}
    </Form>
  );
};

export default AddVouchers;
