package com.example.reportservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleModel {

    private Long id;
    private String licensePlate;
    private int year;
    private int seats;
    private int mileage;
    private boolean voucherApplied;
    private String model;
    private int brand;
    private int vehicleType;
    private int motorType;

    public void setVoucherApplied(boolean b) {
        voucherApplied = b;
    }

    public boolean getVoucherApplied() {
        return voucherApplied;
    }
}