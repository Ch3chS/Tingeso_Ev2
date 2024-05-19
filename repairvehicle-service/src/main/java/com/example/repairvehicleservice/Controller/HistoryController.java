package com.example.repairvehicleservice.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.repairvehicleservice.Service.HistoryService;
import com.example.repairvehicleservice.Entity.HistoryEntity;

@RestController
@RequestMapping("/api/repairvehicles/history")
public class HistoryController {

    @Autowired
	HistoryService service;

    @GetMapping("")
	public ResponseEntity<List<HistoryEntity>> listHistory() {
    	List<HistoryEntity> history = service.getAll();
		return ResponseEntity.ok(history);
	}

	@GetMapping("/{id}")
	public ResponseEntity<HistoryEntity> getHistoryById(@PathVariable Long id) {
		HistoryEntity history = service.getById(id);
		return ResponseEntity.ok(history);
	}

	@PostMapping("")
	public ResponseEntity<HistoryEntity> saveHistory(@RequestBody HistoryEntity history) {
		HistoryEntity newHistory = service.save(history);
		return ResponseEntity.ok(newHistory);
	}

	@PutMapping("")
	public ResponseEntity<HistoryEntity> updateHistory(@RequestBody HistoryEntity history){
		HistoryEntity updatedHistory = service.update(history);
		return ResponseEntity.ok(updatedHistory);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteHistoryById(@PathVariable Long id) throws Exception {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/totalCost/{id}")
    public int calculateTotalCost(@PathVariable Long id) {
        return service.totalCost(id);
    }

}
