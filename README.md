# PDB Homes — Nigerian Luxury Real Estate Platform

A premier, high-converting digital storefront and property platform built for **PDB Homes**, engineered with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase / PostgreSQL**.

Specializing in prime Nigerian residential enclaves including **Banana Island**, **Old Ikoyi**, **Victoria Island**, **Lekki Phase 1**, **Eko Atlantic**, and **Maitama & Asokoro, Abuja**.

---

## 🌟 Key Features

* **Nigerian Currency & Prime Markets:** All prices formatted in **Nigerian Naira (₦ / NGN)** with localized enclaves across Lagos, Abuja, and Port Harcourt.
* **Admin-Controlled Public Listings:** Per strict brokerage guidelines, **no house is displayed publicly until the administrator creates or publishes it from the Admin Dashboard**.
* **Hidden Admin Portal (`/admin`):**
  * Direct secret URL access (no visible button or link anywhere on the public website).
  * Secure administrative authentication (`admin@pdbhomes.com` / `admin123`).
  * Add, edit, and delete luxury property listings.
  * 1-click **"Load Demo Nigerian Estates"** button to preview Banana Island and Maitama trophy properties.
  * Real-time tracking of **Consultation & Viewing Requests** (`leads`).
  * Real-time tracking of **Client Buy / Sell Property Mandates** (`client_requests`).
  * Real-time tracking of **Seller Property Valuations** (`property_valuations`).
* **Client Buy / Sell Request Engine (`/request`):** Clients can submit exact requirements for houses they want to buy or list for sale (target location, budget in Naira, bedrooms, and contact info).
* **Supabase Cloud Integration:**
  * Uses `@supabase/supabase-js` for real-time tracking of consultations, viewings, and property mandates.
  * Complete turnkey SQL DDL in [`db/supabase_schema.sql`](./db/supabase_schema.sql).
  * Zero-downtime in-memory fallback for local development before Supabase keys are added.
* **Instant Home Valuation Engine (`/valuation`):** 3-step interactive questionnaire calculating equity estimates in Naira based on localized land registry averages.
* **Clean Brand Presentation:** Clean luxury aesthetic with deep slate navy (`#0F172A`) and warm champagne accents (`#C5A880`), free of unwanted decorative icons.

---

## 🚀 Getting Started

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/majolat2000/pdbhomes.git
cd pdbhomes

# Install dependencies
npm install
```

### 2. Connect Supabase (Optional for Live Database)
1. Create a free project at [supabase.com](https://supabase.com).
2. In Supabase **SQL Editor**, paste and execute [`db/supabase_schema.sql`](./db/supabase_schema.sql).
3. Copy `.env.example` to `.env.local` and add your keys:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Access Admin Portal
Go directly to:
```
http://localhost:3000/admin
```
* **Default Email:** `admin@pdbhomes.com`
* **Default Password:** `admin123`

---

## 🧪 Testing the Production Build

```bash
npm run build
npm start
```
