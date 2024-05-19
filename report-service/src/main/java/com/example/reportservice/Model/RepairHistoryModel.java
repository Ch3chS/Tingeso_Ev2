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
public class RepairHistoryModel {
    private Long id;

    // Atributos
    private int cost;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate repairDate;
    @JsonFormat(pattern="HH:mm:ss")
    private LocalTime repairTime;
    private int repairType;
    private int historyId;
}
