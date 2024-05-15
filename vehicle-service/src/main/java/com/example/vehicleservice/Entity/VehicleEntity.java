package com.example.vehicleservice.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    // Atributos
    private String licensePlate; // Patente
    private int year;            // Año de fabricacion
    private int seats;           // Número de asientos
    private int mileage;         // Kilometaje
    private boolean voucherApplied = false;  // Se aplico un bono?
    private String model;        // Modelo del vehiculo

    // LLaves foraneas
    private int brand;        // Marca del vehiculo (1. Toyota, 2. Kia, 3. Honda, 4. Ford, 5. Chevrolet, 6. Hyundai, etc...)
    private int vehicleType;     // Tipo de vehiculo (1. Sedan, 2. Hatchback, 3. SUV, 4. Pickup, 5. Furgoneta)
    private int motorType;       // Tipo de motor (1. gasolina, 2. diésel, 3. híbrido, 4. eléctrico).

    // Métodos
    public void setBonusApplied(boolean b) {
        voucherApplied = b;
    }
    public boolean getVoucherApplied() {
        return voucherApplied;
    }
    
}
