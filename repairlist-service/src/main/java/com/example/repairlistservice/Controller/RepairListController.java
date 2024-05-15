package com.example.repairlistservice.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.repairlistservice.Service.RepairListService;
import com.example.repairlistservice.Entity.RepairListEntity;

@RestController
@RequestMapping("/api/repairlist")
@CrossOrigin("*")
public class RepairListController {

    @Autowired
	RepairListService service;

    @GetMapping("")
	public ResponseEntity<List<RepairListEntity>> listRepairs() {
    	List<RepairListEntity> repairs = service.getAll();
		return ResponseEntity.ok(repairs);
	}

	@GetMapping("/{id}")
	public ResponseEntity<RepairListEntity> getRepairById(@PathVariable Long id) {
		RepairListEntity repair = service.getById(id);
		return ResponseEntity.ok(repair);
	}

	@PostMapping("")
	public ResponseEntity<RepairListEntity> saveRepair(@RequestBody RepairListEntity repair) {
		RepairListEntity newRepair = service.save(repair);
		return ResponseEntity.ok(newRepair);
	}

	@PutMapping("")
	public ResponseEntity<RepairListEntity> updateRepair(@RequestBody RepairListEntity repair){
		RepairListEntity updatedRepair = service.update(repair);
		return ResponseEntity.ok(updatedRepair);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteRepairById(@PathVariable Long id) throws Exception {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
