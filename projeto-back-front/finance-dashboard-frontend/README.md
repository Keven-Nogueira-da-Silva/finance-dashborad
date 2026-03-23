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
