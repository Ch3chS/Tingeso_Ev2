package com.example.repairvehicleservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.repairvehicleservice.Entity.RepairHistoryEntity;
import com.example.repairvehicleservice.Repository.RepairHistoryRepository;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class RepairHistoryService {

    @Autowired
    RepairHistoryRepository repo;

    public ArrayList<RepairHistoryEntity> getAll() {
        return (ArrayList<RepairHistoryEntity>) repo.findAll();
    }

    public RepairHistoryEntity getById(Long id){
        return repo.findById(id).get();
    }

    public RepairHistoryEntity save(RepairHistoryEntity repairHistory) {
        return repo.save(repairHistory);
    }

    public RepairHistoryEntity update(RepairHistoryEntity repairHistory) {
        return repo.save(repairHistory);
    }

    public boolean delete(Long id) throws Exception {
        Optional<RepairHistoryEntity> entity = repo.findById(id);
        if (entity.isPresent()) {
            repo.deleteById(id);
            return true;
        } else {
            throw new Exception("Entity " + id + " does not exist");
        }
    }
}
