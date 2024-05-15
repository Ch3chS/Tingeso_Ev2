package com.example.reportservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.reportservice.Entity.Report1;
import com.example.reportservice.Entity.Report2;
import com.example.reportservice.Service.ReportService;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/report1/{year}/{month}")
    public ResponseEntity<Report1> getReport1(@PathVariable int year, @PathVariable int month) {
        Report1 report1 = reportService.generateReport1(year, month);
        return ResponseEntity.ok(report1);
    }

    @GetMapping("/report2/{year}/{month}")
    public ResponseEntity<Report2> getReport2(@PathVariable int year, @PathVariable int month) {
        Report2 report2 = reportService.generateReport2(year, month);
        return ResponseEntity.ok(report2);
    }
}