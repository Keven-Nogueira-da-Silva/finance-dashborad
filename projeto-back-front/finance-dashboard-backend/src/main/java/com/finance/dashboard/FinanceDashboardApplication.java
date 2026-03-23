package com.finance.dashboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EntityScan("com.finance.dashboard.model")
@EnableJpaRepositories("com.finance.dashboard.repository")
public class FinanceDashboardApplication {
	public static void main(String[] args) {
		SpringApplication.run(FinanceDashboardApplication.class, args);
	}
}
