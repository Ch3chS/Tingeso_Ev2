package com.example.repairvehicleservice.Entity;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoryEntity {
    
    // LLave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
 
    // Atributos
    private int reparationsCost;                  // Suma reparaciones
    private int discounts;                        // Descuentos totales
    private int surcharges;                       // Recargos totales
    private int iva;                              // IVA (19%)
    private int totalCost;                        // Costo total de reparación

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate enteredDate; // Fecha de ingreso al taller
    @JsonFormat(pattern="HH:mm:ss")
    private LocalTime enteredTime; // Hora de ingreso al taller

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate completedDate; // Fecha en que se completo la reparación
    @JsonFormat(pattern="HH:mm:ss")
    private LocalTime completedTime; // Hora en que se completo la reparación

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate releaseDate; // Fecha en que salió del taller
    @JsonFormat(pattern="HH:mm:ss")
    private LocalTime releaseTime; // Hora en que salió del taller

 
     // LLaves foraneas
     private String licensePlate;                  // Patente del vehiculo
}
