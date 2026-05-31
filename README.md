# Next SaaS RBAC

Monorepo SaaS multi-tenant com autenticação, organizações, convites, projetos e autorização baseada em RBAC usando Next.js, Fastify, Prisma e Turborepo.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-000000?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-5.6.1-000000?logo=fastify)](https://fastify.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-6.16.3-2D3748?logo=prisma)](https://www.prisma.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.5.8-EF4444?logo=turborepo)](https://turbo.build/repo)

## Sobre

O Next SaaS RBAC é uma base completa para aplicações SaaS B2B. O projeto implementa autenticação por e-mail/senha e GitHub OAuth, gestão de organizações, membros, convites, projetos e permissões granulares por papel.

A proposta é demonstrar uma arquitetura escalável em monorepo, com regras de autorização compartilhadas entre frontend e backend e uma separação clara entre apps, pacotes de domínio e configurações comuns.

## Funcionalidades

- Autenticação com e-mail/senha e OAuth via GitHub.
- Organizações multi-tenant com isolamento de contexto.
- Convites para novos membros com definição de papel.
- Papéis de usuário: admin, member e billing.
- Controle de permissões por recurso usando RBAC.
- Gestão de projetos vinculados a organizações.
- API REST com validação de payloads e documentação Swagger.
- Frontend com rotas protegidas, formulários e cache de dados.
- Configuração compartilhada de TypeScript, ESLint e Prettier.

## Stack

- **Next.js 15** para a aplicação web.
- **React 19** para a interface.
- **Fastify 5** para a API.
- **Prisma ORM** para modelagem e acesso ao banco.
- **PostgreSQL** como banco relacional.
- **JWT** para autenticação na API.
- **TanStack Query** para cache e sincronização no frontend.
- **Radix UI** e **Tailwind CSS** para componentes e estilos.
- **Turborepo** para orquestração do monorepo.

## Arquitetura

```txt
.
├── apps/
│   ├── api/         # API Fastify, Prisma, rotas e regras de backend
│   └── web/         # Aplicação Next.js
├── packages/
│   ├── auth/        # Roles, permissões e modelos de autorização
│   └── env/         # Validação centralizada de variáveis de ambiente
└── config/
    ├── eslint-config/
    ├── prettier/
    └── typescript-config/
```

## Como executar

### Pré-requisitos

- Node.js 18 ou superior.
- npm.
- PostgreSQL.

### Instalação

```bash
git clone https://github.com/marquesmaycon/next-saas-rbac.git
cd next-saas-rbac
npm install
```

Crie um arquivo `.env` na raiz do monorepo com as variáveis necessárias para banco, JWT e OAuth.

Execute as migrações:

```bash
npm --workspace @saas/api run db:migrate
```

Inicie os apps:

```bash
npm run dev
```

## Scripts disponíveis

```bash
npm run dev          # Inicia web e API pelo Turborepo
npm run build        # Gera build dos workspaces
npm run lint         # Executa lint nos workspaces
npm run check-types  # Valida tipagem TypeScript
```

Scripts específicos da API:

```bash
npm --workspace @saas/api run db:migrate
npm --workspace @saas/api run db:studio
```

## Destaques técnicos

- RBAC modelado como pacote compartilhado, evitando duplicação de regras.
- Separação entre aplicação web, API e pacotes internos.
- Validação de ambiente centralizada.
- Rotas e payloads validados com Zod.
- Uso de workspaces para manter dependências e scripts organizados.
- Arquitetura preparada para evolução de produto SaaS.

---

<div align="center">
  <img src="https://github.com/marquesmaycon.png" width="100px" style="border-radius: 50%"/>
  <br/>
  <strong>Maycon Marques</strong>
  <br/>
  <br/>

  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayconhenrique/)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/marquesmaycon)
  [![Email](https://img.shields.io/badge/Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:mayconmarquesh@gmail.com)
</div>
