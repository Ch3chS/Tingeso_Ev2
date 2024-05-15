package com.example.repairlistservice.Service;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.repairlistservice.Entity.RepairListEntity;
import com.example.repairlistservice.Repository.RepairListRepository;

@Service
public class RepairListService {
    @Autowired
    RepairListRepository repo;

    public ArrayList<RepairListEntity> getAll() {
        return (ArrayList<RepairListEntity>) repo.findAll();
    }

    public RepairListEntity save(RepairListEntity repair) {
        return repo.save(repair);
    }

    public RepairListEntity getById(Long id){
        return repo.findById(id).get();
    }

    public RepairListEntity update(RepairListEntity repair) {
        return repo.save(repair);
    }

    public boolean delete(Long id) throws Exception {
        Optional<RepairListEntity> entity = repo.findById(id);
        if (entity.isPresent()) {
            repo.deleteById(id);
            return true;
        } else {
            throw new Exception("Entity " + id + " does not exist");
        }
    }
}
