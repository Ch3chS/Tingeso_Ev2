package com.example.repairvehicleservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.repairvehicleservice.Entity.HistoryEntity;
import com.example.repairvehicleservice.Repository.HistoryRepository;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class HistoryService {

    @Autowired
    HistoryRepository repo;

    public ArrayList<HistoryEntity> getAll() {
        return (ArrayList<HistoryEntity>) repo.findAll();
    }

    public HistoryEntity getById(Long id){
        return repo.findById(id).get();
    }

    public HistoryEntity save(HistoryEntity history) {
        return repo.save(history);
    }

    public HistoryEntity update(HistoryEntity history) {
        return repo.save(history);
    }

    public boolean delete(Long id) throws Exception {
        Optional<HistoryEntity> entity = repo.findById(id);
        if (entity.isPresent()) {
            repo.deleteById(id);
            return true;
        } else {
            throw new Exception("Entity " + id + " does not exist");
        }
    }
}
