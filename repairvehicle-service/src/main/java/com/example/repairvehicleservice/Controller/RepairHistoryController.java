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

import com.example.repairvehicleservice.Service.RepairHistoryService;
import com.example.repairvehicleservice.Entity.RepairHistoryEntity;

@RestController
@RequestMapping("/api/repairvehicles/repairhistory")
public class RepairHistoryController {

    @Autowired
	RepairHistoryService service;

    @GetMapping("")
	public ResponseEntity<List<RepairHistoryEntity>> listRepairHistory() {
    	List<RepairHistoryEntity> repairHistory = service.getAll();
		return ResponseEntity.ok(repairHistory);
	}

	@GetMapping("/{id}")
	public ResponseEntity<RepairHistoryEntity> getRepairHistoryById(@PathVariable Long id) {
		RepairHistoryEntity repairHistory = service.getById(id);
		return ResponseEntity.ok(repairHistory);
	}

	@PostMapping("")
	public ResponseEntity<RepairHistoryEntity> saveRepairHistory(@RequestBody RepairHistoryEntity repairHistory) {
		RepairHistoryEntity newRepairHistory = service.save(repairHistory);
		return ResponseEntity.ok(newRepairHistory);
	}

	@PutMapping("")
	public ResponseEntity<RepairHistoryEntity> updateRepairHistory(@RequestBody RepairHistoryEntity repairHistory){
		RepairHistoryEntity updatedRepairHistory = service.update(repairHistory);
		return ResponseEntity.ok(updatedRepairHistory);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteRepairHistoryById(@PathVariable Long id) throws Exception {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/byHistory/{historyId}")
    public ResponseEntity<List<RepairHistoryEntity>> getRepairHistoryByHistoryId(@PathVariable int historyId) {
        List<RepairHistoryEntity> repairHistories = service.findByHistoryId(historyId);
        return ResponseEntity.ok(repairHistories);
    }
}
