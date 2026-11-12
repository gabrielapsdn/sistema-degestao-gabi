# GestãoPro - Sistema de Gestão de Funcionários e Tarefas

> **Projeto Desenvolvido por:** Gabriela do Nascimento  
> **Turma:** 3º Ano B  
> **Disciplina:** Desenvolvimento de Sistemas / Gestão de Aplicações

---

## 📌 Sobre o Projeto

O **GestãoPro** é uma aplicação Fullstack desenvolvida para o gerenciamento corporativo integrado de colaboradores e atribuição de tarefas/atividades com prazos de entrega.

O sistema conta com uma interface moderna, responsiva e intuitiva, inspirada nos melhores padrões de dashboards executivos contemporâneos.

---

## 🚀 Funcionalidades

### 👥 Gestão de Funcionários
- **Cadastro Completo:** Registro de colaboradores com Nome, E-mail corporativo, CPF (com máscara automática) e Senha criptografada (bcrypt).
- **Listagem e Busca:** Visualização em tabela com avatares personalizados e busca em tempo real por nome, e-mail ou CPF.
- **Edição:** Atualização simplificada dos dados cadastrais com opção de manter ou atualizar senha.
- **Exclusão Segura:** Modal de confirmação para prevenir exclusões acidentais, respeitando as regras de integridade do banco (impede exclusão de funcionários com tarefas vinculadas).

### 📋 Gestão de Tarefas
- **Criação de Atividades:** Registro de tarefas com Título, Data de Entrega e associação ao funcionário responsável.
- **Visualização de Cronograma:** Tabela com badges visuais de data, identificação do responsável e busca rápida por título ou colaborador.
- **Atualização e Remoção:** Edição ágil de demandas e exclusão com diálogo de confirmação.

### 📊 Painel Executivo (Dashboard)
- Indicadores em tempo real:
  - Total de Colaboradores cadastrados.
  - Total de Tarefas registradas.
  - Tarefas ativas com prazo vigente.
  - Alocações ativas no time.
- Navegação rápida em abas e notificações flutuantes (toasts) com fechamento automático.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:**
  - [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
  - CSS3 Moderno (Custom Properties, Flexbox, CSS Grid, Glassmorphism)
  - Ícones vetoriais SVG integrados
- **Backend:**
  - [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
  - [Prisma ORM](https://www.prisma.io/) com PostgreSQL
  - [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) para hash seguro de senhas
  - CORS configurado

---

## ⚙️ Como Executar a Aplicação

### 1. Backend (API)
```bash
# Navegue até a pasta do backend
cd backend

# Configure o arquivo .env com a string do seu banco PostgreSQL
# Exemplo baseado no .env.example:
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/sistema_gestao?schema=public"

# Inicie o servidor em modo de desenvolvimento
npm run dev
# O servidor iniciará em http://localhost:3000
```

### 2. Frontend
```bash
# Em outro terminal, navegue até a pasta do frontend
cd frontend

# Inicie o servidor Vite
npm run dev
# A aplicação estará acessível em http://localhost:5173
```

---

## 📜 Direitos Autorais

&copy; 2026 **Gabriela do Nascimento - Turma 3º B**. Todos os direitos reservados.

