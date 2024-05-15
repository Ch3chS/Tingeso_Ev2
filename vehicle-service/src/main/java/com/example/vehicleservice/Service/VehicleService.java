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

    
}