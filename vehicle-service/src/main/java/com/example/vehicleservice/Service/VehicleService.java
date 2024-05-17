package com.example.vehicleservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vehicleservice.Entity.VehicleEntity;
import com.example.vehicleservice.Repository.VehicleRepository;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class VehicleService {
    @Autowired
    VehicleRepository repo;

    public ArrayList<VehicleEntity> getAll() {
        return (ArrayList<VehicleEntity>) repo.findAll();
    }

    public VehicleEntity save(VehicleEntity vehicle) {
        return repo.save(vehicle);
    }

    public VehicleEntity getById(Long id){
        return repo.findById(id).get();
    }

    public VehicleEntity getByLicensePlate(String licensePlate) {
        return repo.findByLicensePlate(licensePlate).get(0);
    }

    public VehicleEntity update(VehicleEntity vehicle) {
        return repo.save(vehicle);
    }

    public boolean delete(Long id) throws Exception {
        Optional<VehicleEntity> entity = repo.findById(id);
        if (entity.isPresent()) {
            repo.deleteById(id);
            return true;
        } else {
            throw new Exception("Entity " + id + " does not exist");
        }
    }


    // Para obtener nombres de los tipos

    public String getBrandString(int brand) {
        String brandName;
        switch(brand) {
            case 1:
                brandName = "Toyota";
                break;
            case 2:
                brandName = "Kia";
                break;
            case 3:
                brandName = "Honda";
                break;
            case 4:
                brandName = "Ford";
                break;
            case 5:
                brandName = "Chevrolet";
                break;
            case 6:
                brandName = "Hyundai";
                break;
            case 7:
                brandName = "Otra";
                break;
            default:
                brandName = "Error";
        }
        return brandName;
    }
    

    public String getVehicleTypeString(int vehicleType) {
        String vehicleTypeName;
        switch(vehicleType) {
            case 1:
                vehicleTypeName = "Sedan";
                break;
            case 2:
                vehicleTypeName = "Hatchback";
                break;
            case 3:
                vehicleTypeName = "SUV";
                break;
            case 4:
                vehicleTypeName = "Pickup";
                break;
            case 5:
                vehicleTypeName = "Furgoneta";
                break;
            default:
                vehicleTypeName = "Error";
        }
        return vehicleTypeName;
    }

    public String getMotorTypeString(int motorType) {
        String motorTypeName;
        switch(motorType) {
            case 1:
                motorTypeName = "Gasolina";
                break;
            case 2:
                motorTypeName = "Diésel";
                break;
            case 3:
                motorTypeName = "Híbrido";
                break;
            case 4:
                motorTypeName = "Eléctrico";
                break;
            default:
                motorTypeName = "Error";
        }
        return motorTypeName;
    }

    
}