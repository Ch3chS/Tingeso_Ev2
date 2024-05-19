package com.example.reportservice.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.reportservice.Service.ReportService;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/report1/{year}/{month}")
    public ResponseEntity<List<List<Long>>> getReport1(@PathVariable int year, @PathVariable int month) {
        List<List<Long>> reportData = reportService.generateReport1(year, month);
        return ResponseEntity.ok(reportData);
    }


    @GetMapping("/report2/{year}/{month}")
    public ResponseEntity<List<List<Long>>> getReport2(@PathVariable int year, @PathVariable int month) {
        List<List<Long>> reportData = reportService.generateReport2(year, month);
        return ResponseEntity.ok(reportData);
    }

}