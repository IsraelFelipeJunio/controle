package com.example.demo.resource;

import com.example.demo.model.DashboardDTO;
import com.example.demo.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardResource {

    @Autowired
    private DashboardService dashboardService;


    @GetMapping
    public DashboardDTO listarDashboard() {
        return dashboardService.carregaDashboard();
    }

}
