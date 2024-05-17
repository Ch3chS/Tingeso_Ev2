package com.example.vehicleservice.Controller;

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
import java.util.List;

import com.example.vehicleservice.Entity.VehicleEntity;
import com.example.vehicleservice.Service.VehicleService;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin("*")
public class VehicleController {
    @Autowired
	VehicleService service;

    @GetMapping("")
	public ResponseEntity<List<VehicleEntity>> listVehicles() {
    	List<VehicleEntity> vehicles = service.getAll();
		return ResponseEntity.ok(vehicles);
	}

	@GetMapping("/{id}")
	public ResponseEntity<VehicleEntity> getVehicleById(@PathVariable Long id) {
		VehicleEntity vehicle = service.getById(id);
		return ResponseEntity.ok(vehicle);
	}

	@PostMapping("")
	public ResponseEntity<VehicleEntity> saveVehicle(@RequestBody VehicleEntity vehicle) {
		VehicleEntity newVehicle = service.save(vehicle);
		return ResponseEntity.ok(newVehicle);
	}

	@PutMapping("")
	public ResponseEntity<VehicleEntity> updateVehicle(@RequestBody VehicleEntity vehicle){
		VehicleEntity updatedVehicle = service.update(vehicle);
		return ResponseEntity.ok(updatedVehicle);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteVehicleById(@PathVariable Long id) throws Exception {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/byLicensePlate/{licensePlate}")
	public ResponseEntity<VehicleEntity> getByLicensePlate(@PathVariable String licensePlate) {
		VehicleEntity vehicle = service.getByLicensePlate(licensePlate);
		return ResponseEntity.ok(vehicle);
	}

	@GetMapping("/getBrand/{brand}")
	public ResponseEntity<String> getBrand(@PathVariable int brand) {
		String brandName = service.getBrandString(brand);
		return ResponseEntity.ok(brandName);
	}

	@GetMapping("/getVehicleType/{vehicleType}")
	public ResponseEntity<String> getVehicleType(@PathVariable int vehicleType) {
		String vehicleTypeName = service.getVehicleTypeString(vehicleType);
		return ResponseEntity.ok(vehicleTypeName);
	}

	@GetMapping("/getMotorType/{motorType}")
	public ResponseEntity<String> getMotorType(@PathVariable int motorType) {
		String motorTypeName = service.getMotorTypeString(motorType);
		return ResponseEntity.ok(motorTypeName);
	}

	
}