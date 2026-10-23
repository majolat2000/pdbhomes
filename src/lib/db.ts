import { Pool } from "pg";
import { Property, Lead, ValuationRequest, PropertyFilterParams } from "@/types";
import { properties as seedProperties } from "./data/properties";
import { agents as seedAgents } from "./data/agents";

// In-memory fallback stores for offline/development runtimes
let memoryProperties: Property[] = [...seedProperties];
let memoryLeads: Lead[] = [];
let memoryValuations: ValuationRequest[] = [];

// Optional PostgreSQL pool if DATABASE_URL is configured
let pool: Pool | null = null;
if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
    });
  } catch (err) {
    console.warn("PostgreSQL initialization skipped, using resilient memory store.", err);
  }
}

export async function getProperties(params?: PropertyFilterParams): Promise<Property[]> {
  if (pool) {
    try {
      // In production with Postgres pool, we can query the properties table
      const res = await pool.query("SELECT * FROM properties ORDER BY created_at DESC");
      if (res.rows.length > 0) {
        return res.rows.map((row) => ({
          ...row,
          propertyType: row.property_type,
          listingStatus: row.listing_status,
          squareFeet: row.square_feet,
          lotSizeAcres: row.lot_size_acres,
          yearBuilt: row.year_built,
          primaryImage: row.primary_image,
          isFeatured: row.is_featured,
          isExclusive: row.is_exclusive,
          agent: seedAgents.find((a) => a.id === row.agent_id) || seedAgents[0],
        }));
      }
    } catch (e) {
      console.warn("PostgreSQL query failed, falling back to in-memory dataset:", e);
    }
  }

  // Memory store filter pipeline
  let results = [...memoryProperties];

  if (params) {
    if (params.location && params.location.trim() !== "") {
      const q = params.location.toLowerCase();
      results = results.filter(
        (p) =>
          p.city.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          p.postalCode.includes(q)
      );
    }

    if (params.propertyType && params.propertyType !== "ALL") {
      results = results.filter((p) => p.propertyType === params.propertyType);
    }

    if (params.listingStatus && params.listingStatus !== "ALL") {
      results = results.filter((p) => p.listingStatus === params.listingStatus);
    }

    if (params.minPrice) {
      results = results.filter((p) => p.price >= (params.minPrice || 0));
    }

    if (params.maxPrice) {
      results = results.filter((p) => p.price <= (params.maxPrice || Infinity));
    }

    if (params.bedrooms) {
      results = results.filter((p) => p.bedrooms >= (params.bedrooms || 0));
    }

    if (params.bathrooms) {
      results = results.filter((p) => p.bathrooms >= (params.bathrooms || 0));
    }

    if (params.amenities && params.amenities.length > 0) {
      results = results.filter((p) =>
        params.amenities!.every((amenity) => p.amenities.includes(amenity))
      );
    }

    if (params.sortBy) {
      if (params.sortBy === "price_asc") {
        results.sort((a, b) => a.price - b.price);
      } else if (params.sortBy === "price_desc") {
        results.sort((a, b) => b.price - a.price);
      } else if (params.sortBy === "sqft_desc") {
        results.sort((a, b) => b.squareFeet - a.squareFeet);
      } else if (params.sortBy === "newest") {
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
    }
  }

  return results;
}

export async function getPropertyById(idOrSlug: string): Promise<Property | null> {
  const property = memoryProperties.find(
    (p) => p.id === idOrSlug || p.slug === idOrSlug
  );
  return property || null;
}

export async function createLead(data: Omit<Lead, "id" | "status" | "createdAt">): Promise<Lead> {
  const newLead: Lead = {
    ...data,
    id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    status: "NEW",
    createdAt: new Date().toISOString(),
  };

  if (pool) {
    try {
      await pool.query(
        `INSERT INTO leads (id, property_id, agent_id, lead_type, first_name, last_name, email, phone, message, preferred_date, preferred_time, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          newLead.id,
          newLead.propertyId || null,
          newLead.agentId || null,
          newLead.leadType,
          newLead.firstName,
          newLead.lastName,
          newLead.email,
          newLead.phone,
          newLead.message || null,
          newLead.preferredDate || null,
          newLead.preferredTime || null,
          newLead.status,
        ]
      );
    } catch (e) {
      console.warn("PostgreSQL lead insert failed, stored in memory instead:", e);
    }
  }

  memoryLeads.unshift(newLead);
  return newLead;
}

export async function createValuation(
  data: Omit<ValuationRequest, "id" | "estimatedMinValue" | "estimatedMaxValue" | "createdAt">
): Promise<ValuationRequest> {
  // Intelligent valuation estimation engine based on square footage, bedrooms, bathrooms & condition
  const basePricePerSqFt = 750;
  const conditionMultipliers = {
    EXCELLENT: 1.35,
    UPDATED: 1.15,
    ORIGINAL: 1.0,
    NEEDS_WORK: 0.85,
  };

  const multiplier = conditionMultipliers[data.condition] || 1.0;
  const baseValue = data.squareFeet * basePricePerSqFt * multiplier;
  const bedroomBonus = data.bedrooms * 45000;
  const bathroomBonus = data.bathrooms * 30000;
  const midEstimate = Math.round(baseValue + bedroomBonus + bathroomBonus);
  const estimatedMinValue = Math.round(midEstimate * 0.94);
  const estimatedMaxValue = Math.round(midEstimate * 1.06);

  const newValuation: ValuationRequest = {
    ...data,
    id: `val-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    estimatedMinValue,
    estimatedMaxValue,
    createdAt: new Date().toISOString(),
  };

  if (pool) {
    try {
      await pool.query(
        `INSERT INTO property_valuations (id, address, city, state, postal_code, property_type, bedrooms, bathrooms, square_feet, property_condition, estimated_min_value, estimated_max_value, owner_name, email, phone)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
        [
          newValuation.id,
          newValuation.address,
          newValuation.city,
          newValuation.state,
          newValuation.postalCode,
          newValuation.propertyType,
          newValuation.bedrooms,
          newValuation.bathrooms,
          newValuation.squareFeet,
          newValuation.condition,
          newValuation.estimatedMinValue,
          newValuation.estimatedMaxValue,
          newValuation.ownerName,
          newValuation.email,
          newValuation.phone,
        ]
      );
    } catch (e) {
      console.warn("PostgreSQL valuation insert failed, stored in memory instead:", e);
    }
  }

  memoryValuations.unshift(newValuation);
  return newValuation;
}

export async function addProperty(property: Property): Promise<Property> {
  memoryProperties.unshift(property);
  return property;
}
