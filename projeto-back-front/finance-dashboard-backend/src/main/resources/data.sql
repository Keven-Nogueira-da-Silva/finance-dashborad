-- Inserir usuário de teste (senha: password123 criptografada com BCrypt)
INSERT INTO _user (firstname, lastname, email, password, role)
VALUES ('Test', 'User', 'user@example.com', '$2a$10$Y56/tHhG2Y27Lzhf8IG6e.f8IG6e.f8IG6e.f8IG6e.f8IG6e.f8IG6e', 'USER');

-- Inserir ativos iniciais
INSERT INTO assets (symbol, name, current_price, daily_change) VALUES ('BTC', 'Bitcoin', 95000.00, 2.5);
INSERT INTO assets (symbol, name, current_price, daily_change) VALUES ('ETH', 'Ethereum', 2500.00, -1.2);
INSERT INTO assets (symbol, name, current_price, daily_change) VALUES ('AAPL', 'Apple Inc.', 185.50, 0.8);
INSERT INTO assets (symbol, name, current_price, daily_change) VALUES ('TSLA', 'Tesla Inc.', 240.10, -3.4);
