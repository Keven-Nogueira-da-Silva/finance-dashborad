package com.finance.dashboard.service;

import com.finance.dashboard.model.Asset;
import com.finance.dashboard.repository.AssetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AssetService {

    private final AssetRepository repository;
    private final SimpMessagingTemplate messagingTemplate;
    private final Random random = new Random();



    public List<Asset> getAllAssets() {
        return repository.findAll();
    }

    @Scheduled(fixedRate = 3000) // A cada 3 segundos
    public void simulatePriceChanges() {
        List<Asset> assets = repository.findAll();
        for (Asset asset : assets) {
            // Variação aleatória entre -1% e +1%
            double changePercent = (random.nextDouble() * 2 - 1) / 100;
            BigDecimal change = asset.getCurrentPrice().multiply(new BigDecimal(changePercent));
            BigDecimal newPrice = asset.getCurrentPrice().add(change).setScale(2, RoundingMode.HALF_UP);
            
            asset.setCurrentPrice(newPrice);
            asset.setDailyChange(asset.getDailyChange() + (changePercent * 100));
            repository.save(asset);
        }
        
        // "Empurra" a lista atualizada para os clientes conectados via WebSocket
        messagingTemplate.convertAndSend("/topic/assets", assets);
    }
}
