-- =========================================================================
-- PDB Homes: Supabase Database Schema (Nigerian Luxury Real Estate)
-- Paste this script into your Supabase Dashboard -> SQL Editor and Run
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROPERTIES TABLE (Only listed properties will appear publicly)
CREATE TABLE IF NOT EXISTS public.properties (
    id TEXT PRIMARY KEY,
    mls_id TEXT UNIQUE,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    property_type TEXT NOT NULL,
    listing_status TEXT NOT NULL DEFAULT 'FOR_SALE', -- 'FOR_SALE', 'FOR_RENT', 'PENDING', 'SOLD'
    price NUMERIC NOT NULL, -- In Nigerian Naira (NGN)
    rental_frequency TEXT, -- 'ANNUALLY', 'MONTHLY'
    bedrooms INT NOT NULL DEFAULT 1,
    bathrooms NUMERIC(3, 1) NOT NULL DEFAULT 1.0,
    square_feet INT NOT NULL,
    lot_size_acres NUMERIC,
    year_built INT,
    address TEXT NOT NULL,
    city TEXT NOT NULL, -- Ikoyi, Lekki, Victoria Island, Banana Island, Maitama
    state TEXT NOT NULL, -- Lagos, Abuja FCT, Rivers
    postal_code TEXT,
    country TEXT DEFAULT 'Nigeria',
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    is_featured BOOLEAN DEFAULT FALSE,
    is_exclusive BOOLEAN DEFAULT FALSE,
    primary_image TEXT NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    amenities JSONB DEFAULT '[]'::jsonb,
    mls_metadata JSONB DEFAULT '{}'::jsonb,
    agent_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. LEADS TABLE (Viewing Appointments & Consultation Inquiries)
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY,
    property_id TEXT REFERENCES public.properties(id) ON DELETE SET NULL,
    agent_id TEXT,
    lead_type TEXT NOT NULL, -- 'SCHEDULE_VIEWING', 'INQUIRY', 'VALUATION', 'CONTACT'
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT,
    preferred_date DATE,
    preferred_time TEXT,
    status TEXT NOT NULL DEFAULT 'NEW', -- 'NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CLIENT BUY & SELL REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.client_requests (
    id TEXT PRIMARY KEY,
    request_intent TEXT NOT NULL, -- 'BUY' or 'SELL'
    property_type TEXT NOT NULL, -- 'Detached Duplex', 'Mansion', 'Terrace', etc.
    target_location TEXT NOT NULL, -- 'Banana Island', 'Ikoyi', 'Lekki', 'Maitama'
    budget_min NUMERIC, -- in Naira
    budget_max NUMERIC, -- in Naira
    selling_price NUMERIC, -- in Naira (if selling)
    bedrooms INT,
    bathrooms INT,
    additional_notes TEXT,
    client_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    preferred_timeline TEXT,
    status TEXT NOT NULL DEFAULT 'NEW', -- 'NEW', 'REVIEWING', 'MATCHED', 'CLOSED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. PROPERTY VALUATIONS TABLE
CREATE TABLE IF NOT EXISTS public.property_valuations (
    id TEXT PRIMARY KEY,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT,
    property_type TEXT NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms NUMERIC(3, 1) NOT NULL,
    square_feet INT NOT NULL,
    property_condition TEXT NOT NULL,
    estimated_min_value NUMERIC NOT NULL,
    estimated_max_value NUMERIC NOT NULL,
    owner_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    status TEXT DEFAULT 'PENDING_REVIEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_properties_city ON public.properties (city);
CREATE INDEX IF NOT EXISTS idx_properties_price ON public.properties (price);
CREATE INDEX IF NOT EXISTS idx_leads_created ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_requests_created ON public.client_requests (created_at DESC);

-- Enable Row Level Security (RLS) - public read/write permissions for anon client
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_valuations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous select on active properties
CREATE POLICY "Public can view properties" ON public.properties
    FOR SELECT USING (true);

-- Allow anonymous insert for leads, client_requests, and valuations
CREATE POLICY "Public can insert leads" ON public.leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert client requests" ON public.client_requests
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert valuations" ON public.property_valuations
    FOR INSERT WITH CHECK (true);

-- Allow full access for anon/authenticated (controlled by Admin dashboard)
CREATE POLICY "Admin full access properties" ON public.properties
    FOR ALL USING (true);

CREATE POLICY "Admin full access leads" ON public.leads
    FOR ALL USING (true);

CREATE POLICY "Admin full access client requests" ON public.client_requests
    FOR ALL USING (true);

CREATE POLICY "Admin full access valuations" ON public.property_valuations
    FOR ALL USING (true);
