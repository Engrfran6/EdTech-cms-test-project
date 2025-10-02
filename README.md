A simple Content Management System (CMS) built with Remix
, Supabase
, Prisma
, and Tailwind CSS
.
It supports authentication, article management (CRUD), rich text editing (TipTap), and a tree view for nested articles.

🚀 Deployed Live: https://traibetech-cms.vercel.app

Features

🔐 Authentication (login, register, logout) via Supabase

🍪 Secure sessions with Remix cookie storage

📝 Create, edit, delete articles with TipTap rich text editor

🌲 Nested article hierarchy with tree view navigation

🎨 Styled with Tailwind CSS

📦 Database handled with Prisma + Supabase Postgres

📄 Example project structure with protected routes

Tech Stack

Framework: Remix + Vite

Database: Supabase (Postgres)

ORM: Prisma

UI: Tailwind CSS

Editor: TipTap

Deployment: Vercel

Getting Started

1. Clone Repo
   git clone https://github.com/<your-username>/traibetech-cms.git
   cd traibetech-cms

2. Install Dependencies
   npm install

3. Setup Environment

Create a .env file (see .env.example below):

# Supabase

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Remix session secret

SESSION_SECRET=super-secret-key

# Database

DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres

4. Setup Database (Prisma)
   npx prisma migrate dev --name init
   npx prisma generate

5. Run Dev Server
   npm run dev

App will be running on http://localhost:5173
.

Deployment (Vercel)

Push repo to GitHub

Import project on Vercel

Set Environment Variables in Vercel (from .env)

Deploy 🎉

Project Structure
app/
routes/ # Remix routes (articles, auth, etc.)
components/ # Shared UI components
utils/ # Supabase, session, prisma helpers
styles/ # Tailwind global styles
prisma/
schema.prisma # DB schema

Scripts
npm run dev # Start dev server
npm run build # Build for production
npm run start # Start production server
npm run prisma # Prisma CLI
