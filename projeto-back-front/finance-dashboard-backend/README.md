# Finance Dashboard Backend (Java Spring Boot)

Este é o backend de alta performance para o Dashboard de Finanças Real-Time.

## Tecnologias
- Java 17
- Spring Boot 3.4.1
- Spring Security + JWT (JSON Web Token)
- Spring WebSockets (STOMP + SockJS)
- Spring Data JPA + H2 Database
- Lombok

## Como Executar no IntelliJ IDEA
1. Abra o IntelliJ IDEA.
2. Selecione **Open** e escolha a pasta `finance-dashboard-backend`.
3. O IntelliJ irá detectar o arquivo `pom.xml` e baixar as dependências do Maven.
4. Localize a classe `FinanceDashboardApplication.java` em `src/main/java/com/finance/dashboard/`.
5. Clique com o botão direito e selecione **Run 'FinanceDashboardApplication'**.
6. O servidor iniciará na porta **8080**.

## Endpoints Principais
- `POST /api/v1/auth/register`: Registrar novo usuário.
- `POST /api/v1/auth/authenticate`: Login (retorna Access e Refresh Token).
- `POST /api/v1/auth/refresh-token`: Renovar Access Token.
- `GET /api/v1/assets`: Listar ativos (requer JWT).
- `WS /ws`: Endpoint WebSocket para atualizações em tempo real.

## Usuário Padrão para Teste
- **Email:** user@example.com
- **Senha:** password123
*(O sistema cria este usuário automaticamente no banco H2 ao iniciar se não existir)*
