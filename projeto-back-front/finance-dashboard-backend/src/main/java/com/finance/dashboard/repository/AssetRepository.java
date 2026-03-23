package com.finance.dashboard.repository;

import com.finance.dashboard.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Integer> {
    Optional<Asset> findBySymbol(String symbol);
}
