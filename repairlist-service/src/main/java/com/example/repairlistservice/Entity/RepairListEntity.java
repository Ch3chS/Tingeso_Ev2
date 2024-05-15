package com.example.repairlistservice.Entity;

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
public class RepairListEntity {
    // LLave primaria
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;

    // Atributos
    private int cost;   // Costo de reparación

    // LLaves foraneas
    private int repairType;                       // Tipo de reparación
    private int motorType;                        // TIpo de motor
}
