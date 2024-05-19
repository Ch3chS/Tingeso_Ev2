package com.example.reportservice.Model;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoryModel {
    private Long id;
    private int reparationsCost;
    private int discounts;
    private int surcharges;
    private int iva;
    private int totalCost;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate enteredDate;
    @JsonFormat(pattern="HH:mm:ss")
    private LocalTime enteredTime;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate completedDate;
    @JsonFormat(pattern="HH:mm:ss")
    private LocalTime completedTime;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate releaseDate;
    @JsonFormat(pattern="HH:mm:ss")
    private LocalTime releaseTime;
     private String licensePlate;
}
