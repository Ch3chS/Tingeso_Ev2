package com.example.repairvehicleservice.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.repairvehicleservice.Config.RestTemplateConfig;
import com.example.repairvehicleservice.Entity.HistoryEntity;
import com.example.repairvehicleservice.Entity.RepairHistoryEntity;
import com.example.repairvehicleservice.Model.VehicleModel;
import com.example.repairvehicleservice.Repository.HistoryRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Year;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class HistoryService {

    double DISCOUNT_NREPAIRS[][] = {{0.05, 0.07, 0.1, 0.08}, {0.1, 0.12, 0.15, 0.13}, {0.15, 0.17, 0.2, 0.18}, {0.2, 0.22, 0.25, 0.23}};
    double SURCHARGE_KM[][] = {{0, 0, 0, 0, 0}, {0.03, 0.03, 0.05, 0.05, 0.05}, {0.07, 0.07, 0.09, 0.09, 0.09}, {0.12, 0.12, 0.12, 0.12, 0.12}, {0.2, 0.2, 0.2, 0.2, 0.2}};
    double SURCHARGE_AN[][] = {{0, 0, 0, 0, 0}, {0.05, 0.05, 0.07, 0.07, 0.07}, {0.09, 0.09, 0.11, 0.11, 0.11}, {0.15, 0.15, 0.2, 0.2, 0.2}};


    @Autowired
    HistoryRepository repo;

    @Autowired
    RepairHistoryService repairHistoryService;

    @Autowired
    RestTemplate restTemplate;

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



    // -------------- Calculo del costo total ------------------

    public List<HistoryEntity> getByLicensePlateAndCompletedAfter(String licensePlate, LocalDate oneYearAgo) {
        return repo.findByLicensePlateAndCompletedAfter(licensePlate, oneYearAgo);
    }

    public VehicleModel getVehicle(String licensePlate) {
        VehicleModel vehicle = restTemplate.getForObject("http://vehicle-service/api/vehicles/byLicensePlate/" + licensePlate, VehicleModel.class);
        return vehicle;
    }

    public double totalSurcharges(int total, VehicleModel vehicle, HistoryEntity history) {

        double totalSurcharges = -0.2*total ;

        // Recargo por kilometraje
        int mileage = vehicle.getMileage();
        if(mileage <= 5000) {
            totalSurcharges += total * SURCHARGE_KM[0][vehicle.getVehicleType()-1];
        }
        if((5000 < mileage) && (mileage <= 12000)) {
            totalSurcharges += total * SURCHARGE_KM[1][vehicle.getVehicleType()-1];
        }
        if((12000 < mileage) && (mileage <= 25000)) {
            totalSurcharges += total * SURCHARGE_KM[2][vehicle.getVehicleType()-1];
        }
        if((25000 < mileage) && (mileage <= 40000)) {
            totalSurcharges += total * SURCHARGE_KM[3][vehicle.getVehicleType()-1];
        }
        else {
            totalSurcharges += total * SURCHARGE_KM[4][vehicle.getVehicleType()-1];
        }


        // Recargo por antiguedad del vehículo
        int yearsOld = Year.now().getValue() - vehicle.getYear();

        if(yearsOld <= 5) {
            totalSurcharges += total * SURCHARGE_AN[0][vehicle.getVehicleType()-1];
        }
        if((5 < yearsOld) && (yearsOld <= 10)) {
            totalSurcharges += total * SURCHARGE_AN[1][vehicle.getVehicleType()-1];
        }
        if((10 < yearsOld) && (yearsOld <= 15)) {
            totalSurcharges += total * SURCHARGE_AN[2][vehicle.getVehicleType()-1];
        }
        else {
            totalSurcharges += total * SURCHARGE_AN[3][vehicle.getVehicleType()-1];
        }


        // Recargo por retraso en recogida del vehículo
        // Recargo por retraso en recogida del vehículo
        LocalDate releaseDate = history.getReleaseDate();
        LocalDate completedDate = history.getCompletedDate();
        long diff = ChronoUnit.DAYS.between(completedDate, releaseDate);
        if (diff > 0) {
            double discountDays = diff * 0.05;
            totalSurcharges += discountDays * total;
        }

        return totalSurcharges;

    }

    public double totalDiscounts(int total, int motorType, List<HistoryEntity> repairs, HistoryEntity history) {

        double totalDiscounts = 0;
    
        // Descuento por número de reparaciones
        int repairsNumber = repairs.size();
        
        if((0 < repairsNumber) && (repairsNumber <= 2)) {
            totalDiscounts += total * DISCOUNT_NREPAIRS[0][motorType-1];
        }
        else if((2 < repairsNumber) && (repairsNumber <= 5)) {
            totalDiscounts += total * DISCOUNT_NREPAIRS[1][motorType-1];
        }
        else if((5 < repairsNumber) && (repairsNumber <= 9)) {
            totalDiscounts += total * DISCOUNT_NREPAIRS[2][motorType-1];
        }
        else {
            totalDiscounts += total * DISCOUNT_NREPAIRS[3][motorType-1];
        }
    
        // Descuento por día de atención
        LocalDate enteredDate = history.getEnteredDate();
        LocalTime enteredTime = history.getEnteredTime();
        int dayOfWeek = enteredDate.getDayOfWeek().getValue();
        int hourOfDay = enteredTime.getHour();
        if ((dayOfWeek == 1 || dayOfWeek == 4) && (9 <= hourOfDay && hourOfDay < 12)) {
            totalDiscounts += 0.1 * total;
        }
    
        // Descuento por bonos???
        // Este será un caso aparte
    
        return totalDiscounts;
    }

    public int totalCost(Long idHistory) {

        // Se obtiene el historial actual y todos los relacionados a ese vehiculo
        HistoryEntity history = getById(idHistory);

        // Se obtiene el vehiculo
        VehicleModel vehicle = getVehicle(history.getLicensePlate());

        // Se obtienen las reparaciones de ese historial
        List<RepairHistoryEntity> repairHistories = repairHistoryService.getByHistoryId(history.getId().intValue());

        // Se calcula el costo de la suma de las reparaciones
        int repairsCost = 0;
        for (RepairHistoryEntity repairHistory : repairHistories) {
            repairsCost += repairHistory.getCost();
        }
        history.setReparationsCost(repairsCost);

        // Se obtienen las reparaciones realizadas el ultimo año
        LocalDate oneYearAgo = LocalDate.now().minusYears(1);
        List<HistoryEntity> lastYearRepairs = getByLicensePlateAndCompletedAfter(history.getLicensePlate(), oneYearAgo);

        // Se calculan los descuentos y recargos
        double surchargeDouble = totalSurcharges(repairsCost, vehicle, history);
        double discountDouble = totalDiscounts(repairsCost, vehicle.getMotorType(), lastYearRepairs, history);

        // Aproximar valores a enteros y almacenar
        int surcharge = (int) Math.round(surchargeDouble);
        int discount = (int) Math.round(discountDouble);
        history.setSurcharges(surcharge);
        history.setDiscounts(discount);

        // Calcular y almacenar IVA
        int result = repairsCost + surcharge - discount;
        int iva = (int) Math.round(result * 0.19); 
        history.setIva(iva);

        // Calcular y almacenar costo total
        int totalCost = result + iva;
        history.setTotalCost(totalCost);

        // Actualizar historial con los valores calculados
        update(history);

        return totalCost;
    }


}
