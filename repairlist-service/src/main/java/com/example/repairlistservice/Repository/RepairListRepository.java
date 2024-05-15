package com.example.repairlistservice.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.repairlistservice.Entity.RepairListEntity;

@Repository
public interface RepairListRepository extends JpaRepository<RepairListEntity, Long> {
    
}
