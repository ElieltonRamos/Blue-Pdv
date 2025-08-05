
# 🛍️ Blue PDV - Sistema de Ponto de Venda 🛍️

<p align="center"><strong>Repository FullStack</strong></p>

O **Blue PDV** é um sistema de Ponto de Venda simples, porém completo, com **cadastro de produtos**, **fluxo de caixa**, e muito mais.  
Este repositório contém tanto o **frontend** quanto o **backend** da aplicação.

---

## 📑 Índice

- [🚀 Tecnologias Usadas](#-tecnologias-usadas)
- [💻 Ambiente de Desenvolvimento](#-ambiente-de-desenvolvimento)
- [⚙️ Instalação](#-instalação)
- [📦 Uso com Docker](#-uso-com-docker)
- [📞 Contato](#-contato)
- [📄 Licença](#-licença)

---

## 🚀 Tecnologias Usadas

- [Node.js](https://nodejs.org/en/docs)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/get-started/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express.js](https://expressjs.com/pt-br/)
- [AngularJS]()
- [MySQL]()
- [Swagger]()

---

## 💻 Ambiente de Desenvolvimento

Você pode executar o projeto de duas formas:

### 🔹 Com Docker (Recomendado)

Usamos Docker para empacotar e isolar o aplicativo em contêineres, garantindo consistência na implantação e facilidade no gerenciamento de dependências.

> 🔗 [Instalar Docker](https://docs.docker.com/engine/install/ubuntu/)  
> 🔗 [Instalar Docker Compose](https://docs.docker.com/compose/install/)

### 🔹 Localmente com Node.js

Para rodar localmente, instale o Node.js:

> 🔗 [Instalar Node.js](https://nodejs.org/en/download/package-manager)

Certifique-se de ter essas ferramentas configuradas corretamente antes de iniciar.

---

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone git@github.com:ElieltonRamos/Blue-Pdv.git
cd Blue-Pdv
```

### 2. Instale as dependências

#### Frontend:

```bash
cd frontend && npm install
```

#### Backend (em outro terminal):

```bash
cd backend && npm install
```

### 3. Inicie os servidores

#### Backend:

```bash
cd backend
npm run dev
```

#### Frontend:

```bash
cd frontend
npm run dev
```

### 4. Configure o banco de dados MySQL

#### Com Docker:

```bash
docker compose up db -d
```

#### Ou localmente:

Configure um banco MySQL com:
- Porta: `3306`
- Usuário: `root`
- Senha: `password`

> Após iniciar o banco, execute o seguinte comando na pasta `backend`:

```bash
npm run db:reset
```

---

## 📦 Uso com Docker

### 1. Inicie os containers

```bash
docker compose up -d --build
```

A aplicação será iniciada automaticamente. Isso pode levar alguns minutos.

### 2. Visualize os logs

#### Backend:

```bash
docker logs -f backend
```

#### Frontend:

```bash
docker logs -f frontend
```

---

## 🪛 Instaladores (Windows)

Na pasta `Installer`, você encontrará instaladores para facilitar o setup:

- `BluePDVApp-setup.exe` – Instala o frontend (interface visual)
- `BluePDVServer-Setup.exe` – Instala o backend (servidor)
- `mysql-installer.msi` – Instala o banco de dados MySQL
- `Config-database/` – Contém os scripts para configurar o banco de dados

---

## Contact

Elielton Ramos

[![e-mail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:elieltonramos14@gmail.com)
[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/elielton-ramos/)
[![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](elielton6554)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/elieltonramos08/)

---

## Licensa para uso

Open Source

Este projeto é de código aberto e está disponível para a comunidade. Sinta-se à vontade para explorar, clonar e contribuir com o projeto.

---

## Agradecimentos

Agradeço por todas as horas dedicadas, desafios superados e lições aprendidas durante o desenvolvimento deste projeto. Cada linha de código escrita foi um passo em direção ao meu crescimento como desenvolvedor e ao sucesso desta empreitada.

Gostaria também de expressar minha gratidão a todos os recursos educacionais, documentação e comunidades online que forneceram orientação, inspiração e suporte durante todo este processo.