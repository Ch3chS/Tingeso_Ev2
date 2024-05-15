package com.example.repairvehicleservice.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.repairvehicleservice.Entity.HistoryEntity;

@Repository
public interface HistoryRepository extends JpaRepository<HistoryEntity, Long> {

    public List<HistoryEntity> findByLicensePlate(String licensePlate);

    public List<HistoryEntity> findByLicensePlateOrderByIdAsc(String licensePlate);
    
}
