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

import com.example.repairvehicleservice.Entity.VoucherEntity;
import com.example.repairvehicleservice.Service.VoucherService;

@RestController
@RequestMapping("/api/repairvehicles/vouchers")
public class VoucherController {
    @Autowired
	VoucherService service;

    @GetMapping("")
	public ResponseEntity<List<VoucherEntity>> listVouchers() {
    	List<VoucherEntity> vouchers = service.getAll();
		return ResponseEntity.ok(vouchers);
	}

	@GetMapping("/{id}")
	public ResponseEntity<VoucherEntity> getVoucherById(@PathVariable Long id) {
		VoucherEntity voucher = service.getById(id);
		return ResponseEntity.ok(voucher);
	}

	@GetMapping("/brand/{brandId}")
	public ResponseEntity<List<VoucherEntity>> getVouchersByBrand(@PathVariable Long brandId) {
		List<VoucherEntity> vouchers = service.getByBrandId(brandId);
		return ResponseEntity.ok(vouchers);
	}

	@PostMapping("")
	public ResponseEntity<VoucherEntity> saveVoucher(@RequestBody VoucherEntity voucher) {
		VoucherEntity newVoucher = service.save(voucher);
		return ResponseEntity.ok(newVoucher);
	}

	@PutMapping("")
	public ResponseEntity<VoucherEntity> updateVoucher(@RequestBody VoucherEntity voucher){
		VoucherEntity updatedVoucher = service.update(voucher);
		return ResponseEntity.ok(updatedVoucher);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Boolean> deleteVoucherById(@PathVariable Long id) throws Exception {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}