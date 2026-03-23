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

---------------------------------------------------------------------------------------------------------------------------------
<img width="2557" height="1255" alt="image" src="https://github.com/user-attachments/assets/4a7ade54-053a-42a7-ae1b-ba9ad59497f7" />

# Finance Dashboard Frontend (React + Vite)

Este é o frontend de alta performance para o Dashboard de Finanças Real-Time.

## Tecnologias
- React 18
- TypeScript
- Vite
- TailwindCSS
- TanStack Query (React Query)
- Recharts (Gráficos)
- SockJS + StompJS (WebSockets)
- Lucide React (Ícones)
- Axios + Interceptors (JWT Refresh Token)

## Como Executar no VS Code
1. Abra o VS Code.
2. Selecione **File > Open Folder** e escolha a pasta `finance-dashboard-frontend`.
3. Abra um terminal integrado no VS Code (`Ctrl + \``).
4. Certifique-se de ter o **Node.js** instalado.
5. Execute `npm install` para baixar as dependências.
6. Execute `npm run dev` para iniciar o servidor de desenvolvimento.
7. O frontend iniciará na porta **5173**.

## Recursos Implementados
- **Autenticação JWT:** Gerenciamento de tokens via localStorage.
- **Refresh Token Automático:** O sistema detecta expiração (403) e tenta renovar o token sem deslogar o usuário.
- **WebSocket em Tempo Real:** Conexão persistente com o backend para atualizações instantâneas de preços sem recarregar a página.
- **Cache de Alta Performance:** Utiliza TanStack Query para gerenciar o estado dos dados e cache de API.
- **Gráficos Dinâmicos:** Visualização em tempo real das variações de preço do Bitcoin.

## Credenciais de Teste
- **Email:** user@example.com
- **Senha:** password123
*(Certifique-se de que o backend está rodando na porta 8080 antes de logar)*



