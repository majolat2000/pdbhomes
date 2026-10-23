# PDB Homes — Luxury Real Estate Web Application

A modern, high-converting digital storefront and property platform built for **PDB Homes**, engineered with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **PostgreSQL**.

---

## 🌟 Key Features

* **Brand Vibe & Design:** Sophisticated architectural layout with deep slate navy (`#0F172A`), champagne gold accents (`#C5A880`), clean typography, and high-resolution imagery.
* **Dynamic Search & Filtering:** Filter listings by city, state, postal code, property type (Estate, Penthouse, Villa, House, Townhouse), status (For Sale, For Rent), price range, bedrooms, and architectural amenities.
* **Interactive Mapping:** Split-screen map view with interactive pins displaying active price badges and preview cards.
* **Single Listing Experience:** High-resolution mosaic photo gallery, architectural specifications bar, detailed description, interactive mortgage/financing calculator, and sticky viewing scheduler.
* **Seller Valuation Engine:** Step-by-step interactive home valuation questionnaire providing immediate market value ranges and capturing high-intent seller leads.
* **Lead Capture & Inquiries:** Strategically placed forms routing viewing appointments, general inquiries, and agent contacts to database storage (`/api/leads`).
* **IDX / MLS Integration Readiness:** Standardized RESO-compliant database schema with JSONB metadata attributes and automated ingestion endpoint (`/api/idx/sync`).
* **PostgreSQL Architecture:** Production-ready schema in `db/schema.sql` with zero-config fallback for seamless local execution out of the box.

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js** v18+ (tested on Node v20/v26)
* **npm** or **pnpm** / **yarn**

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/majolat2000/pdbhomes.git
cd pdbhomes

# Install dependencies
npm install
```

### 3. Environment Variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
If `DATABASE_URL` is configured, PDB Homes will query your PostgreSQL instance. Otherwise, it uses the high-fidelity in-memory luxury properties dataset.

### 4. Database Setup (For PostgreSQL)
Execute the provided DDL script:
```bash
psql -d pdbhomes -f db/schema.sql
```

### 5. Running Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
pdbhomes/
├── db/
│   └── schema.sql                # Production PostgreSQL DDL Schema
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── properties/       # Property listings & filter API
│   │   │   ├── properties/[id]/  # Single property API
│   │   │   ├── leads/            # Viewing & contact lead capture API
│   │   │   ├── valuations/       # Seller instant valuation engine
│   │   │   └── idx/sync/         # RESO / MLS feed ingestion webhook
│   │   ├── layout.tsx            # Global layout with Navbar & Footer
│   │   ├── page.tsx              # Home Page (Hero, Search, Featured, Why Us, Reviews)
│   │   ├── properties/           # Search Catalog & Split Map
│   │   │   └── [id]/             # Single Listing Detail
│   │   ├── valuation/            # Sellers Free Home Valuation Wizard
│   │   ├── about/                # About PDB Homes & Leadership Bios
│   │   └── contact/              # Regional Flagships & Inquiry Form
│   ├── components/
│   │   ├── layout/               # Navbar & Footer
│   │   ├── home/                 # HeroSearch, FeaturedSection, WhyChooseUs, etc.
│   │   ├── properties/           # PropertyCard, PropertyMap, MortgageCalculator
│   │   └── forms/                # ScheduleViewingForm
│   ├── lib/
│   │   ├── db.ts                 # PostgreSQL & In-Memory Data Service
│   │   ├── data/                 # Seed properties & agent profiles
│   │   └── utils.ts              # Formatters & helpers
│   └── types/                    # TypeScript interfaces
└── tailwind.config.ts            # Custom brand tokens & luxury palette
```

---

## 🧪 Testing the Build

To test the production build locally:
```bash
npm run build
npm start
```
