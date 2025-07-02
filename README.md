# 📚 Biblioteca Virtual - Projeto Next.js com n8n

Bem-vindo ao repositório **biblioteca-virtual**!  
Este projeto demonstra como criar uma interface de usuário moderna com Next.js e integrá-la a uma poderosa automação de backend usando **n8n**.  
A ideia é simples: permitir o cadastro de livros em sua biblioteca virtual de forma eficiente, combinando um frontend robusto com um fluxo de trabalho de automação flexível.

---

## ✨ Funcionalidades

- **Interface Moderna com Next.js**: Formulário de cadastro de livros construído com React/Next.js para uma experiência de usuário dinâmica e responsiva.
- **Integração Via Webhook do n8n**: Envia os dados do formulário via POST de forma segura para um workflow do n8n.
- **Automação de Backend com n8n**: O n8n recebe os dados do livro e permite ações como armazenar em um banco de dados, enviar notificações (email, Slack, Telegram) ou integrar com planilhas (Google Sheets).
- **Campos de Cadastro de Livro**: Inclui Título, Autor(es), Gênero, Ano de Publicação, ISBN e Breve Descrição/Sinopse.

---

## 🚀 Como Funciona

O projeto opera com um frontend desacoplado do backend de automação:

### 1. Desenvolvimento do Frontend (Next.js)

- A interface do formulário é criada usando Next.js e hospedada em uma plataforma web (Vercel, Netlify, etc.).

### 2. Interação do Usuário

- O usuário acessa a URL da aplicação Next.js no navegador e preenche o formulário.

### 3. Envio de Dados para o n8n

- Ao clicar em "Cadastrar Livro", o formulário envia os dados via requisição POST para o Webhook do n8n:  
  `https://n8n.flory.dev/webhook-test/8a7c32ac-049d-4ba3-8321-a8f30bb45060`

### 4. Processamento no n8n

- O workflow do n8n, que contém o nó **Webhook - DADOS**, captura os dados e executa as ações configuradas.

---

## 🛠️ Configuração e Uso

### Pré-requisitos

- **Node.js e npm/yarn**: Para o desenvolvimento Next.js.
- **Plataforma de hospedagem web**: Para a aplicação Next.js (ex: Vercel, Netlify).
- **Instância do n8n**: Para o backend de automação.

---

### 1. Configurar o Frontend Next.js

Clone este repositório (ou o código da sua aplicação Next.js).

Instale as dependências:

```bash
npm install
# ou
yarn install
