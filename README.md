# 🚀 Next.js SaaS + RBAC

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Turborepo](https://img.shields.io/badge/Turborepo-2.5.8-ff6d70?style=flat-square&logo=turborepo)
![Fastify](https://img.shields.io/badge/Fastify-5.6.1-white?style=flat-square&logo=fastify)
![Prisma](https://img.shields.io/badge/Prisma-6.16.3-2D3748?style=flat-square&logo=prisma)

Um boilerplate completo para **SaaS multi-tenant** com autenticação robusta e sistema de autorização baseado em **RBAC (Role-Based Access Control)**. Desenvolvido com as melhores práticas e arquitetura monorepo para máxima escalabilidade e reutilização de código.

## 📋 Índice

- [🎯 Visão Geral](#-visão-geral)
- [🏗️ Arquitetura Monorepo](#️-arquitetura-monorepo)
- [📦 Estrutura dos Pacotes](#-estrutura-dos-pacotes)
- [🔐 Sistema RBAC](#-sistema-rbac)
- [🌟 Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [⚡ Como Executar](#-como-executar)
- [🔄 Fluxos de Trabalho](#-fluxos-de-trabalho)

## 🎯 Visão Geral

Este projeto é uma solução completa para **SaaS B2B**, implementando:

- 🏢 **Multi-tenancy** com organizações isoladas
- 👥 **Sistema de convites** e gerenciamento de membros
- 🔒 **Autenticação** via email/senha e OAuth (GitHub)
- 🛡️ **Autorização granular** com RBAC
- 💰 **Sistema de billing** integrado
- 📊 **Dashboard administrativo** completo

## 🏗️ Arquitetura Monorepo

Utilizando **Turborepo** para gerenciar um monorepo escalável com compartilhamento máximo de código:

```
📁 next-saas-rbac/
├── 🚀 apps/           # Aplicações principais
├── 📦 packages/       # Pacotes compartilhados
└── ⚙️ config/         # Configurações compartilhadas
```

### 🎯 Benefícios da Arquitetura

- ✅ **Reutilização de código** entre frontend e backend
- ✅ **Tipagem compartilhada** com TypeScript
- ✅ **Build otimizado** com cache inteligente
- ✅ **Configurações centralizadas** (ESLint, Prettier, TypeScript)
- ✅ **Versionamento unificado** de dependências

## 📦 Estrutura dos Pacotes

### 🌐 Apps

#### 🔧 API (`apps/api`)
**Backend RESTful** construído com **Fastify** e **Prisma**

**🛠️ Tecnologias:**
- ![Fastify](https://img.shields.io/badge/Fastify-5.6.1-white?style=flat-square&logo=fastify) Framework web ultra-rápido
- ![Prisma](https://img.shields.io/badge/Prisma-6.16.3-2D3748?style=flat-square&logo=prisma) ORM type-safe
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)
- ![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens)
- ![Swagger](https://img.shields.io/badge/Swagger-Docs-85EA2D?style=flat-square&logo=swagger)

**🔑 Características:**
- API documentada com Swagger UI
- Validação de dados com Zod
- Middlewares de autenticação JWT
- Migrations automáticas com Prisma
- Tratamento centralizado de erros

#### 💻 Web (`apps/web`)
**Frontend moderno** com **Next.js 15** e **React 19**

**🛠️ Tecnologias:**
- ![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js) Framework React
- ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
- ![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)
- ![Radix UI](https://img.shields.io/badge/Radix%20UI-Components-black?style=flat-square)
- ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.90.2-FF4154?style=flat-square)

**🔑 Características:**
- Server-side rendering otimizado
- Componentes acessíveis com Radix UI
- State management com TanStack Query
- Tema dark/light com next-themes
- Formulários otimizados com validação

### 📚 Packages Compartilhados

#### 🔐 Auth (`packages/auth`)
**Sistema de autorização** centralizado com **CASL**

```typescript
// Exemplo de uso
const ability = createAbility(user, organization)
if (ability.can('update', 'Project')) {
  // Permitir edição do projeto
}
```

**🛠️ Tecnologias:**
- ![CASL](https://img.shields.io/badge/CASL-6.7.3-blue?style=flat-square) Autorização declarativa
- **Zod** para validação de tipos

**🔑 Funcionalidades:**
- Definição de roles e permissões
- Validação de recursos por contexto
- Tipagem forte com TypeScript

#### 🌍 Env (`packages/env`)
**Validação de variáveis** de ambiente com **t3-env**

```typescript
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(32),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  }
})
```

### ⚙️ Configurações (`config/`)

#### 📏 ESLint Config (`config/eslint-config`)
Configurações padronizadas para diferentes contextos:
- `base.js` - Regras base para TypeScript
- `next.js` - Específicas para Next.js
- `node.js` - Para aplicações Node.js

#### 🎨 Prettier (`config/prettier`)
Formatação consistente em todo o monorepo

#### 📝 TypeScript Config (`config/tsconfig`)
Configurações TypeScript otimizadas:
- `library.json` - Para pacotes compartilhados
- `nextjs.json` - Para aplicações Next.js
- `node.json` - Para APIs Node.js

## 🔐 Sistema RBAC

### 👤 Roles Disponíveis

| Role | Descrição | Ícone |
|------|-----------|-------|
| **Admin** | Administrador com amplos poderes | 🛠️ |
| **Member** | Membro padrão da organização | 👥 |
| **Billing** | Acesso apenas a informações financeiras | 💰 |

### 🛡️ Matriz de Permissões

|                          |  Admin | Member | Billing |
| ------------------------ |  ----- | ------ | ------- |
| 🏢 Gerenciar organização | ✅     | ❌      | ❌   |
| 🔥 Excluir organização   | ❌     | ❌      | ❌   |
| 📧 Convidar membros      | ✅     | ❌      | ❌   |
| 🔄 Transferir propriedade| ❌     | ❌      | ❌   |
| 👥 Listar membros        | ✅     | ✅      | ✅   |
| 📋 Gerenciar projetos    | ✅     | ⚠️      | ❌   |
| 💰 Acessar billing       | ✅     | ❌      | ✅   |

> ⚠️ = Permitido com condições (ex: apenas projetos próprios)

### 🔒 Regras de Negócio

- **Ownership Transfer**: Apenas owners podem transferir propriedade
- **Project Management**: Membros podem gerenciar apenas projetos próprios
- **Self Management**: Membros podem sair da própria organização
- **Domain Auto-join**: Usuários com email do domínio podem auto-ingressar

## 🌟 Funcionalidades

### 🔐 Autenticação
- ✅ Login via email/senha com bcrypt
- ✅ OAuth com GitHub
- ✅ Recuperação de senha via email
- ✅ Registro de conta com validação

### 🏢 Organizações
- ✅ Criação e gerenciamento de organizações
- ✅ Sistema de convites por email
- ✅ Auto-join por domínio de email
- ✅ Transferência de propriedade

### 👥 Gestão de Membros
- ✅ Convites com roles específicos
- ✅ Atualização de permissões
- ✅ Remoção de membros

### 📊 Projetos
- ✅ CRUD completo de projetos
- ✅ Associação a organizações
- ✅ Controle de acesso por role

### 💰 Billing
- ✅ Cálculo automático: $20/projeto + $10/membro

## 🛠️ Tecnologias

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
- ![Fastify](https://img.shields.io/badge/Fastify-5.6.1-white?style=flat-square&logo=fastify)
- ![Prisma](https://img.shields.io/badge/Prisma-6.16.3-2D3748?style=flat-square&logo=prisma)
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=flat-square&logo=postgresql)
- ![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=flat-square&logo=jsonwebtokens)

### Frontend
- ![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)
- ![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)
- ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
- ![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)
- ![Radix UI](https://img.shields.io/badge/Radix%20UI-Components-black?style=flat-square)

### DevOps & Tooling
- ![Turborepo](https://img.shields.io/badge/Turborepo-2.5.8-ff6d70?style=flat-square&logo=turborepo)
- ![ESLint](https://img.shields.io/badge/ESLint-Code%20Quality-4B32C3?style=flat-square&logo=eslint)
- ![Prettier](https://img.shields.io/badge/Prettier-Code%20Format-F7B93E?style=flat-square&logo=prettier)

## ⚡ Como Executar

### 📋 Pré-requisitos
- Node.js 18+
- PostgreSQL
- npm 10+

### 🚀 Instalação

```bash
# Clonar repositório
git clone https://github.com/marquesmaycon/next-saas-rbac.git
cd next-saas-rbac

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Executar migrations
cd apps/api
npm run db:migrate

# Executar em modo desenvolvimento
npm run dev
```

### 🌐 URLs de Acesso
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3333
- **API Docs**: http://localhost:3333/documentation
- **Prisma Studio**: `npm run db:studio`

## 🔄 Fluxos de Trabalho

### 👤 Fluxo de Usuário
1. **Registro** → Validação de email → Ativação da conta
2. **Login** → Geração de JWT → Acesso ao dashboard
3. **Criação de Org** → Torna-se Owner → Pode convidar membros
4. **Convites** → Email enviado → Aceite/Rejeição → Ingresso na org

### 🏢 Fluxo Organizacional
1. **Setup Inicial** → Configuração de domínio → Auto-join
2. **Gestão de Projetos** → Criação → Atribuição → Controle de acesso
3. **Billing** → Cálculo automático

### 🔒 Fluxo de Autorização
1. **Request** → Extração do JWT → Validação do usuário
2. **Context Loading** → Busca organização → Determina role
3. **Permission Check** → CASL valida → Permite/Nega acesso

---

<div align="center">

**Desenvolvido com ❤️ por [Maycon Marques](https://github.com/marquesmaycon)**

⭐ Se este projeto te ajudou, considere dar uma estrela!

</div>