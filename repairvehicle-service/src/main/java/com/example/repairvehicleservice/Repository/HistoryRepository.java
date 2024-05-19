package com.example.repairvehicleservice.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.repairvehicleservice.Entity.HistoryEntity;

@Repository
public interface HistoryRepository extends JpaRepository<HistoryEntity, Long> {

    public List<HistoryEntity> findByLicensePlate(String licensePlate);

    public List<HistoryEntity> findByLicensePlateOrderByIdAsc(String licensePlate);

    @Query("SELECT h FROM HistoryEntity h WHERE h.licensePlate = :licensePlate AND h.completedDate >= :oneYearAgo")
    public List<HistoryEntity> findByLicensePlateAndCompletedAfter(String licensePlate, LocalDate oneYearAgo);
    
}
