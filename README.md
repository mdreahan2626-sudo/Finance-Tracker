# 💎 Welth — AI-Powered Wealth Intelligence & Financial Management Cockpit

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Vercel Deployed](https://img.shields.io/badge/Vercel-Production-000000?style=for-the-badge&logo=vercel)](https://finance-tracker-blue-theta.vercel.app)

> **Live Production Deployment**: [https://finance-tracker-blue-theta.vercel.app](https://finance-tracker-blue-theta.vercel.app)

---

## 📌 Overview

**Welth** is an institutional-grade personal wealth intelligence cockpit engineered with **Next.js 15**, **React 19**, **Tailwind CSS**, and **Supabase PostgreSQL**. It empowers users with automated expense categorization, real-time multi-account tracking, AI-powered receipt scanning via Google Gemini, interactive 3D portfolio simulations, and automated email statement reporting.

---

## ✨ Key Features

### 🏦 1. Multi-Account Cockpit & Real-Time Tracking
- Create and manage multiple accounts (**Savings**, **Current/Checking**).
- Dynamic default account selection with real-time balance aggregation.
- Real-time income and expense logging with automatic balance reconciliation.

### 🤖 2. Autonomous AI Receipt Scanning
- Integrated with **Google Gemini AI** to extract transaction amounts, merchant details, dates, and spending categories directly from receipt uploads.
- Automated OCR processing pipeline eliminating manual data entry.

### 📈 3. Live 3D Wealth Simulator & Interactive Visuals
- **Gyroscopic 3D Wealth Orb** and **Platinum 3D Card** interactive components powered by Spline & WebGL.
- Custom particle mesh animation tracking dynamic cash flow.
- Interactive category expense breakdown donut charts and monthly cash flow visualizations using **Recharts**.

### 🔐 4. Universal Authentication
- **NextAuth.js** unified authentication supporting:
  - **Google OAuth 2.0** ("Continue with Google") with auto-provisioning of user records and default accounts.
  - **Email & Password Authentication** with SHA-256 password hashing.
  - Interactive password visibility toggle (eye icon) and light luxury fintech modal styling.

### 📊 5. Exporting & Automated Email Statements
- **Instant Client-Side Exports**: Generate formatted **PDF financial reports** and **CSV ledgers** with one click.
- **Automated Email Delivery**: Send monthly financial breakdown reports, expense category allocations, and transaction ledgers directly to user inboxes using **Resend** and **Nodemailer**.

### 🛡️ 6. Enterprise Security & Concurrency
- Database connection pooling managed via **Supabase Transaction Pooler (PgBouncer)** with SSL encryption.
- Bot detection, rate limiting, and attack mitigation via **Arcjet**.
- Background cron scheduling and webhook triggers powered by **Inngest**.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router, Server Actions) |
| **Frontend** | [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), Radix UI Primitives, Lucide Icons |
| **Data Visualization** | [Recharts](https://recharts.org/), Spline 3D Runtime |
| **Database & ORM** | [Supabase](https://supabase.com/) (PostgreSQL), [Prisma ORM](https://www.prisma.io/) |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) (Google OAuth + Credentials Provider) |
| **Artificial Intelligence** | [Google Gemini API](https://ai.google.dev/) (Receipt Vision & OCR) |
| **Email Services** | [Resend](https://resend.com/) & [Nodemailer](https://nodemailer.com/) |
| **Automation & Jobs** | [Inngest](https://www.inngest.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** >= 18.18 (Node 20+ or 22 recommended)
- **npm**, **pnpm**, or **yarn**
- A **Supabase PostgreSQL** instance

### 1. Clone the Repository
```bash
git clone https://github.com/mdreahan2626-sudo/Finance-Tracker.git
cd Finance-Tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root:

```env
# Database (Supabase with PgBouncer)
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=10&pool_timeout=20&sslmode=require"
DIRECT_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:5432/postgres?sslmode=require"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-32-chars-long"

# Google OAuth Credentials
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-your-client-secret"

# Supabase Public Keys
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT_REF].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_your_key"

# AI & Automation
GEMINI_API_KEY="your-gemini-api-key"
RESEND_API_KEY="re_your_resend_api_key"
ARCJET_KEY="your_arcjet_key"
```

### 4. Push Database Schema & Generate Client
```bash
npx prisma db push
npx prisma generate
```

### 5. Seed Initial Data (Optional)
```bash
npm run seed
```

### 6. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📦 Production Build & Deployment

To test an optimized production build locally:
```bash
npm run build
npm run prod
```

### Deploying to Vercel
1. Link your repository in [Vercel](https://vercel.com/).
2. Add the environment variables listed in step 3 to your **Vercel Project Settings**.
3. In **Google Cloud Console**, add your live Vercel domain to **Authorized JavaScript origins** and `https://<your-domain>.vercel.app/api/auth/callback/google` to **Authorized redirect URIs**.

---

## 📂 Project Structure

```text
├── actions/                   # Next.js Server Actions (Dashboard, Budget, Email)
│   ├── dashboard.js           # Account & transaction queries
│   ├── budget.js              # Monthly budget optimizer
│   └── send-monthly-statement.js # PDF ledger email delivery
├── app/                       # Next.js App Router
│   ├── (auth)/                # Sign-in & Authentication routes
│   ├── (main)/                # Protected dashboard, transactions, settings
│   │   ├── dashboard/         # Main financial intelligence cockpit
│   │   ├── transaction/       # Transaction creation & AI scanning
│   │   └── account/[id]/      # Detailed account activity ledger
│   ├── api/                   # API routes (NextAuth, Inngest webhooks, Seed)
│   ├── layout.js              # Root application layout
│   └── page.js                # High-conversion 3D landing page
├── components/                # Reusable UI & Widget Components
│   ├── auth-modal.jsx         # Centered modal with Google & password auth
│   ├── exporter.jsx           # PDF, CSV & Email report triggers
│   ├── hero.jsx               # Hero section with 3D controls
│   ├── gyroscopic-wealth-orb.jsx # Three.js interactive 3D orb
│   └── ui/                    # Radix & Tailwind UI primitives
├── lib/                       # Utility functions, Prisma client, Arcjet
├── prisma/                    # Prisma database schema definition
└── public/                    # Static assets & brand media
```

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
