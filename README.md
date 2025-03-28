# PizzaShop - Frontend

Bem-vindo ao PizzaShop, uma aplicação web para gerenciamento de pedidos de uma pizzaria. Este projeto inclui um dashboard com métricas de receita e pedidos, 
uma interface para visualizar e gerenciar pedidos, autenticação de usuários e um sistema de perfil de loja. Construído com React, TypeScript, 
Tailwind CSS e outras tecnologias modernas, o PizzaShop é ideal para donos de pizzarias que desejam monitorar e administrar suas operações de forma eficiente.

## 🖼️ Capturas de Tela

Aqui estão algumas capturas de tela do **PizzaShop**:

![image](https://github.com/user-attachments/assets/b1052fcf-0e90-4a43-8134-2c3cecb39c17)
*Tela de login do sistema.*

![image](https://github.com/user-attachments/assets/3e5a44c3-65a4-4f10-a36f-21621c25da0a)
*Dashboard com métricas de vendas e pedidos.*

![image](https://github.com/user-attachments/assets/36f6e8b2-bf83-4e3e-8dc2-f62302b687a9)
*Tela de gerenciamento de pedidos com filtros avançados.*

## 🚀 Tecnologias Utilizadas

- Frontend: React, TypeScript, Vite
- Estilização: Tailwind CSS, shadcn/ui
- Gerenciamento de Estado: React Query (@tanstack/react-query)
- Roteamento: React Router DOM
- Mocks: MSW (Mock Service Worker)
- Gráficos: Recharts
- Datas: date-fns, react-day-picker
- Testes: Playwright (E2E)
- Linting e Formatação: ESLint, Prettier
- Gerenciador de Pacotes: PNPM

## 🎯 Funcionalidades

- 📌 **Autenticação de usuários** (login e registro)
- 🛒 **Gerenciamento de pedidos** (criação, atualização e cancelamento)
- 📊 **Dashboard interativo** com métricas de vendas
- 🍕 **Catálogo de produtos** com os itens disponíveis
- 🎨 **Suporte a tema claro/escuro**
- 🔍 **Filtros e pesquisa avançada** para pedidos e produtos


## 📂 Estrutura do Projeto

```
📦 src
 ┣ 📂 api          # Lógica de chamadas à API
 ┣ 📂 assets       # Logos e imagens
 ┣ 📂 components   # Componentes reutilizáveis
 ┃ ┣ 📂 theme      # Gerenciamento de tema (dark/light)
 ┃ ┗ 📂 ui         # Componentes da UI como botões, inputs, etc.
 ┣ 📂 pages        # Páginas da aplicação
 ┣ 📂 lib          # Configuração de Axios, React Query e utilitários
 ┣ 📜 App.tsx      # Componente raiz
 ┣ 📜 main.tsx     # Ponto de entrada da aplicação
 ┗ 📜 global.css   # Estilos globais
```

## ⚡ Como Rodar o Projeto

### 1️⃣ Instale as dependências
```sh
pnpm install
```

### 2️⃣ Inicie o servidor de desenvolvimento
```sh
pnpm run dev
```

A aplicação estará disponível em **http://localhost:5173** 🚀

## 🛠️ Configuração e Temas

- As cores e temas podem ser alterados em `src/components/theme/theme-provider.tsx`.
- Configurações do Tailwind estão em `tailwind.config.ts`.

## ✅ Testes

Para rodar os testes end-to-end com **Playwright**:
```sh
pnpm dev:test
```

Made by [@dmardoqueu](github.com/dmardoqueu)
