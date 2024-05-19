package com.example.reportservice.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.reportservice.Model.HistoryModel;
import com.example.reportservice.Model.RepairHistoryModel;
import com.example.reportservice.Model.VehicleModel;

@Service
public class ReportService {

    @Autowired
    RestTemplate restTemplate;

    public List<RepairHistoryModel> getRepairHistories(int year, int month) {
        ResponseEntity<List<RepairHistoryModel>> response = restTemplate.exchange(
            "http://repairvehicle-service/api/repairvehicles/repairhistory",
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<RepairHistoryModel>>() {}
        );
    
        List<RepairHistoryModel> repairHistories = response.getBody();
    
        // Filtra las historias de reparación por año y mes
        repairHistories = repairHistories.stream()
            .filter(repairHistory -> repairHistory.getRepairDate().getYear() == year && repairHistory.getRepairDate().getMonthValue() == month)
            .collect(Collectors.toList());
    
        return repairHistories;
    }
    
    

    public List<HistoryModel> getHistories() {
        ResponseEntity<List<HistoryModel>> response = restTemplate.exchange(
            "http://repairvehicle-service/api/repairvehicles/history",
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<HistoryModel>>() {}
        );
        return response.getBody();
    }

    public List<VehicleModel> getVehicles() {
        ResponseEntity<List<VehicleModel>> response = restTemplate.exchange(
            "http://vehicle-service/api/vehicles",
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<VehicleModel>>() {}
        );
        return response.getBody();
    }


    public Map<Integer, List<Long>> getVehicleTypeToHistoryIds() {
        // Obtén la lista de vehículos
        List<VehicleModel> vehicles = getVehicles();
    
        // Obtén la lista de historias
        List<HistoryModel> histories = getHistories();
    
        // Crea un mapa para almacenar los resultados
        Map<Integer, List<Long>> vehicleTypeToHistoryIds = new HashMap<>();
    
        // Itera sobre cada vehículo
        for (VehicleModel vehicle : vehicles) {
            // Busca las historias correspondientes a este vehículo
            List<Long> historyIdsForVehicle = histories.stream()
                .filter(history -> history.getLicensePlate().equals(vehicle.getLicensePlate()))
                .map(HistoryModel::getId)
                .collect(Collectors.toList());
    
            // Si el tipo de vehículo ya está en el mapa, añade las IDs de las historias a la lista existente
            if (vehicleTypeToHistoryIds.containsKey(vehicle.getVehicleType())) {
                vehicleTypeToHistoryIds.get(vehicle.getVehicleType()).addAll(historyIdsForVehicle);
            } else {
                // Si el tipo de vehículo no está en el mapa, añade una nueva entrada con las IDs de las historias
                vehicleTypeToHistoryIds.put(vehicle.getVehicleType(), historyIdsForVehicle);
            }
        }
    
        return vehicleTypeToHistoryIds;
    }
    
    

    public Map<Integer, List<RepairHistoryModel>> getVehicleTypeToRepairHistories(int year, int month) {
        // Obtén el mapa de los IDs de las historias agrupados por tipo de vehículo
        Map<Integer, List<Long>> vehicleTypeToHistoryIds = getVehicleTypeToHistoryIds();
    
        // Obtén la lista de historias de reparación
        List<RepairHistoryModel> repairHistories = getRepairHistories(year, month);
    
        // Crea un mapa para almacenar los resultados
        Map<Integer, List<RepairHistoryModel>> vehicleTypeToRepairHistories = new HashMap<>();
    
        // Itera sobre cada entrada en el mapa de los IDs de las historias
        for (Map.Entry<Integer, List<Long>> entry : vehicleTypeToHistoryIds.entrySet()) {
            Integer vehicleType = entry.getKey();
            List<Long> historyIds = entry.getValue();
    
            // Busca las historias de reparación que corresponden a los IDs de las historias
            final List<RepairHistoryModel> repairHistoriesForVehicleType = repairHistories.stream()
                .filter(repairHistory -> {
                    boolean contains = historyIds.contains(Long.valueOf(repairHistory.getHistoryId()));
                    return contains;
                })
                .collect(Collectors.toList());
    
            // Añade las historias de reparación al mapa, agrupadas por tipo de vehículo
            vehicleTypeToRepairHistories.put(vehicleType, repairHistoriesForVehicleType);
        }
    
        return vehicleTypeToRepairHistories;
    }
    
    
    

    public List<List<Long>> generateReport1(int year, int month) {
        // Se obtiene el mapa de RepairHistoryModel agrupados por tipo de vehículo
        Map<Integer, List<RepairHistoryModel>> vehicleTypeToRepairHistories = getVehicleTypeToRepairHistories(year, month);
    
        // Se inicializa la matriz
        List<List<Long>> matrix = new ArrayList<>();
    
        // Se itera sobre cada tipo de reparación
        for (int i = 1; i <= 11; i++) {
            final int repairType = i;
    
            // Inicializa las filas para el conteo y la suma de costos
            List<Long> countRow = new ArrayList<>();
            List<Long> costRow = new ArrayList<>();
    
            // Itera sobre cada tipo de vehículo
            for (int j = 1; j <= 5; j++) {
                final int vehicleType = j;  // Declara una nueva variable final en cada iteración
    
                // Filtra las historias de reparación por tipo de reparación y tipo de vehículo
                List<RepairHistoryModel> repairHistoriesForType = vehicleTypeToRepairHistories.getOrDefault(vehicleType, new ArrayList<>())
                    .stream()
                    .filter(repairHistory -> repairHistory.getRepairType() == repairType)
                    .collect(Collectors.toList());
    
                // Añade el conteo y la suma de costos a las filas correspondientes
                countRow.add((long) repairHistoriesForType.size());
                costRow.add(repairHistoriesForType.stream().mapToLong(RepairHistoryModel::getCost).sum());
            }
    
            // Añade la suma total a las filas
            countRow.add(countRow.stream().mapToLong(Long::longValue).sum());
            costRow.add(costRow.stream().mapToLong(Long::longValue).sum());
    
            // Añade las filas a la matriz
            matrix.add(countRow);
            matrix.add(costRow);
        }
    
        return matrix;
    }
    

    public List<List<Long>> generateReport2(int year, int month) {
        // Inicializa la matriz
        List<List<Long>> totals_matrix = new ArrayList<>();
        
        // Para cada uno de los 3 meses
        for (int i = 0; i < 3; i++) {
            // Calcula el año y el mes correctos
            int adjustedYear = year;
            int adjustedMonth = month - i;
            if (adjustedMonth < 1) {
                adjustedMonth += 12;
                adjustedYear--;
            }
        
            // Obtiene el reporte 1 del mes ajustado
            List<List<Long>> report1 = generateReport1(adjustedYear, adjustedMonth);
        
            // Obtiene la última columna (total) para cada tipo de reparación
            List<Long> totals = report1.stream()
                .filter(row -> row.size() == 6)  // Filtra las filas que contienen los totales
                .map(row -> row.get(5))  // Obtiene el último elemento de cada fila
                .collect(Collectors.toList());
        
            // Añade los totales al principio de la matriz
            totals_matrix.add(0, totals);
        }

        // Inicializa la matriz de tasas de variación
        List<List<Long>> variationRates_matrix = new ArrayList<>();

        // Calcula las tasas de variación entre los meses
        for (int i = 0; i < totals_matrix.size() - 1; i++) {
            List<Long> currentMonth = totals_matrix.get(i+1);
            List<Long> previousMonth = totals_matrix.get(i);

            // Inicializa la fila para las tasas de variación
            List<Long> variationRates = new ArrayList<>();

            // Calcula la tasa de variación y añade las columnas al reporte
            for (int j = 0; j < currentMonth.size(); j++) {
                long totalCurrent = currentMonth.get(j);
                long totalPrevious = previousMonth.get(j);
                long variationRate = ((totalCurrent - totalPrevious) * 100) / (totalPrevious != 0 ? totalPrevious : 1);

                // Añade la tasa de variación a la fila
                variationRates.add(variationRate);
            }


            // Añade la fila a la matriz de tasas de variación
            variationRates_matrix.add(variationRates);
        }

        // Inicializa la matriz final
        List<List<Long>> finalMatrix = new ArrayList<>();

        // Agrega las filas a la matriz final en el orden especificado
        for (int i = 0; i < totals_matrix.size(); i++) {
            finalMatrix.add(0, totals_matrix.get(i));
            if (i < variationRates_matrix.size()) {
                finalMatrix.add(0, variationRates_matrix.get(i));
            }
        }


        // Crea una variable temporal para almacenar finalMatrix
        List<List<Long>> tempMatrix = finalMatrix;

        // Transpone la matriz final para convertir las filas en columnas
        List<List<Long>> transposedMatrix = IntStream.range(0, tempMatrix.get(0).size())
            .mapToObj(i -> tempMatrix.stream().map(list -> list.get(i)).collect(Collectors.toList()))
            .collect(Collectors.toList());

        finalMatrix = transposedMatrix;


        return finalMatrix;
    }
    

    
}