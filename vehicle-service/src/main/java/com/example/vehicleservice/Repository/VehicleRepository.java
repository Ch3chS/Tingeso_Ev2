package com.example.vehicleservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.vehicleservice.Entity.VehicleEntity;
import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<VehicleEntity, Long> {

    public List<VehicleEntity> findByLicensePlate(String licensePlate);

}