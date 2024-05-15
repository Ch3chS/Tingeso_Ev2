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
public class RepairHistoryEntity {
    // LLave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    // Atributos
    private int cost;                             // Monto de reparación
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate repairDate;                 // Fecha de reparación
    @JsonFormat(pattern="HH:mm:ss")
    private LocalTime repairTime;                 // Hora de reparación


    // LLaves foraneas
    private int repairType;                       // Tipo de reparación
    private int historyId;                        // Historia asociada
}
