-- =========================================================================
-- PDB Homes: PostgreSQL RESO/MLS-Ready Production Database Schema
-- Compatible with PostgreSQL 13+ (Supabase, Neon, AWS RDS, Cloud SQL)
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Agents Table
CREATE TABLE IF NOT EXISTS agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50) NOT NULL,
    title VARCHAR(100) DEFAULT 'Licensed Real Estate Professional',
    license_number VARCHAR(50),
    avatar_url TEXT,
    bio TEXT,
    experience_years INT DEFAULT 10,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Properties Table (RESO / MLS Data Feed Aligned)
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mls_id VARCHAR(100) UNIQUE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    property_type VARCHAR(50) NOT NULL, -- 'HOUSE', 'CONDO', 'TOWNHOUSE', 'VILLA', 'PENTHOUSE', 'ESTATE'
    listing_status VARCHAR(50) NOT NULL DEFAULT 'FOR_SALE', -- 'FOR_SALE', 'FOR_RENT', 'PENDING', 'SOLD'
    price NUMERIC(14, 2) NOT NULL,
    rental_frequency VARCHAR(20), -- 'MONTHLY', 'ANNUALLY'
    bedrooms INT NOT NULL DEFAULT 1,
    bathrooms NUMERIC(3, 1) NOT NULL DEFAULT 1.0,
    square_feet INT NOT NULL,
    lot_size_acres NUMERIC(8, 2),
    year_built INT,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'United States',
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    is_exclusive BOOLEAN DEFAULT FALSE,
    primary_image TEXT NOT NULL,
    images JSONB NOT NULL DEFAULT '[]',
    amenities JSONB NOT NULL DEFAULT '[]',
    mls_metadata JSONB DEFAULT '{}',
    agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fast Indexes for Search, Geolocation & MLS Queries
CREATE INDEX IF NOT EXISTS idx_properties_city_state ON properties (city, state);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties (price);
CREATE INDEX IF NOT EXISTS idx_properties_type_status ON properties (property_type, listing_status);
CREATE INDEX IF NOT EXISTS idx_properties_coords ON properties (latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties (is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_properties_mls ON properties (mls_id);

-- 3. Leads & Viewing Appointments Table
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
    lead_type VARCHAR(50) NOT NULL, -- 'SCHEDULE_VIEWING', 'INQUIRY', 'VALUATION', 'CONTACT'
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    message TEXT,
    preferred_date DATE,
    preferred_time VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'NEW', -- 'NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED'
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Seller Property Valuations Table
CREATE TABLE IF NOT EXISTS property_valuations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    property_type VARCHAR(50) NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms NUMERIC(3, 1) NOT NULL,
    square_feet INT NOT NULL,
    property_condition VARCHAR(50) NOT NULL, -- 'EXCELLENT', 'UPDATED', 'ORIGINAL', 'NEEDS_WORK'
    estimated_min_value NUMERIC(14, 2) NOT NULL,
    estimated_max_value NUMERIC(14, 2) NOT NULL,
    owner_name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING_REVIEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
