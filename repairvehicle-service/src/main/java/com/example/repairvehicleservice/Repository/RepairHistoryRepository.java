package com.example.repairvehicleservice.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.repairvehicleservice.Entity.RepairHistoryEntity;

@Repository
public interface RepairHistoryRepository extends JpaRepository<RepairHistoryEntity, Long> {
 
    public List<RepairHistoryEntity> findByHistoryId(int historyId);

}