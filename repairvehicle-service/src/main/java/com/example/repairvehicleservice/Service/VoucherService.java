package com.example.repairvehicleservice.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.repairvehicleservice.Entity.VoucherEntity;
import com.example.repairvehicleservice.Repository.VoucherRepository;

@Service
public class VoucherService {
    @Autowired
    VoucherRepository repo;

    public ArrayList<VoucherEntity> getAll() {
        return (ArrayList<VoucherEntity>) repo.findAll();
    }

    public VoucherEntity save(VoucherEntity voucher) {
        return repo.save(voucher);
    }

    public VoucherEntity getById(Long id){
        return repo.findById(id).get();
    }

    public List<VoucherEntity> getByBrandId(Long brandId) {
        return repo.findByBrandId(brandId);
    }

    public VoucherEntity update(VoucherEntity voucher) {
        return repo.save(voucher);
    }

    public boolean delete(Long id) throws Exception {
        Optional<VoucherEntity> entity = repo.findById(id);
        if (entity.isPresent()) {
            repo.deleteById(id);
            return true;
        } else {
            throw new Exception("Entity " + id + " does not exist");
        }
    }
}