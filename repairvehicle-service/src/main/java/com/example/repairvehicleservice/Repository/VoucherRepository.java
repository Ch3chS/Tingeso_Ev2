package com.example.repairvehicleservice.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.repairvehicleservice.Entity.VoucherEntity;

@Repository
public interface VoucherRepository extends JpaRepository<VoucherEntity, Long> {
    
    List<VoucherEntity> findByBrandId(Long brandId);

}