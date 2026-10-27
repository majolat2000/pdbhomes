import { Property, Lead, ValuationRequest, PropertyFilterParams, ClientRequest } from "@/types";
import { agents as seedAgents } from "./data/agents";
import { demoNigerianProperties } from "./data/properties";
import { supabase, isSupabaseConfigured } from "./supabase";

// In-memory fallback stores (Zero public properties by default until admin adds them)
let memoryProperties: Property[] = [];
let memoryLeads: Lead[] = [];
let memoryValuations: ValuationRequest[] = [];
let memoryClientRequests: ClientRequest[] = [];

// =========================================================================
// PROPERTIES
// =========================================================================

export async function getProperties(params?: PropertyFilterParams): Promise<Property[]> {
  // If Supabase is configured, query from Supabase
  if (isSupabaseConfigured() && supabase) {
    try {
      let query = supabase.from("properties").select("*").order("created_at", { ascending: false });

      if (params?.listingStatus && params.listingStatus !== "ALL") {
        query = query.eq("listing_status", params.listingStatus);
      }
      if (params?.propertyType && params.propertyType !== "ALL") {
        query = query.eq("property_type", params.propertyType);
      }
      if (params?.minPrice) {
        query = query.gte("price", params.minPrice);
      }
      if (params?.maxPrice) {
        query = query.lte("price", params.maxPrice);
      }
      if (params?.bedrooms && params.bedrooms > 0) {
        query = query.gte("bedrooms", params.bedrooms);
      }

      const { data, error } = await query;
      if (!error && data) {
        let results: Property[] = data.map((row: any) => ({
          id: row.id,
          mlsId: row.mls_id,
          title: row.title,
          slug: row.slug,
          description: row.description,
          propertyType: row.property_type,
          listingStatus: row.listing_status,
          price: Number(row.price),
          rentalFrequency: row.rental_frequency,
          bedrooms: row.bedrooms,
          bathrooms: row.bathrooms,
          squareFeet: row.square_feet,
          lotSizeAcres: row.lot_size_acres,
          yearBuilt: row.year_built,
          address: row.address,
          city: row.city,
          state: row.state,
          postalCode: row.postal_code,
          country: row.country || "Nigeria",
          latitude: row.latitude || 6.45,
          longitude: row.longitude || 3.42,
          isFeatured: row.is_featured,
          isExclusive: row.is_exclusive,
          primaryImage: row.primary_image,
          images: row.images || [],
          amenities: row.amenities || [],
          mlsMetadata: row.mls_metadata || {},
          agent: seedAgents.find((a) => a.id === row.agent_id) || seedAgents[0],
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        }));

        if (params?.location && params.location.trim() !== "") {
          const q = params.location.toLowerCase();
          results = results.filter(
            (p) =>
              p.city.toLowerCase().includes(q) ||
              p.state.toLowerCase().includes(q) ||
              p.address.toLowerCase().includes(q) ||
              p.title.toLowerCase().includes(q)
          );
        }

        return results;
      }
    } catch (e) {
      console.warn("Supabase properties query failed, using memory store:", e);
    }
  }

  // Memory store filter pipeline (starts with 0 listings until admin adds or loads them)
  let results = [...memoryProperties];

  if (params) {
    if (params.location && params.location.trim() !== "") {
      const q = params.location.toLowerCase();
      results = results.filter(
        (p) =>
          p.city.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q)
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
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
        .single();

      if (!error && data) {
        return {
          id: data.id,
          mlsId: data.mls_id,
          title: data.title,
          slug: data.slug,
          description: data.description,
          propertyType: data.property_type,
          listingStatus: data.listing_status,
          price: Number(data.price),
          rentalFrequency: data.rental_frequency,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          squareFeet: data.square_feet,
          lotSizeAcres: data.lot_size_acres,
          yearBuilt: data.year_built,
          address: data.address,
          city: data.city,
          state: data.state,
          postalCode: data.postal_code,
          country: data.country || "Nigeria",
          latitude: data.latitude,
          longitude: data.longitude,
          isFeatured: data.is_featured,
          isExclusive: data.is_exclusive,
          primaryImage: data.primary_image,
          images: data.images || [],
          amenities: data.amenities || [],
          mlsMetadata: data.mls_metadata || {},
          agent: seedAgents.find((a) => a.id === data.agent_id) || seedAgents[0],
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    } catch (e) {
      console.warn("Supabase getPropertyById failed:", e);
    }
  }

  const property = memoryProperties.find(
    (p) => p.id === idOrSlug || p.slug === idOrSlug
  );
  return property || null;
}

export async function addProperty(property: Property): Promise<Property> {
  const propertyToAdd = {
    ...property,
    id: property.id || `prop-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    country: property.country || "Nigeria",
    createdAt: property.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("properties").insert([
        {
          id: propertyToAdd.id,
          mls_id: propertyToAdd.mlsId,
          title: propertyToAdd.title,
          slug: propertyToAdd.slug,
          description: propertyToAdd.description,
          property_type: propertyToAdd.propertyType,
          listing_status: propertyToAdd.listingStatus,
          price: propertyToAdd.price,
          rental_frequency: propertyToAdd.rentalFrequency,
          bedrooms: propertyToAdd.bedrooms,
          bathrooms: propertyToAdd.bathrooms,
          square_feet: propertyToAdd.squareFeet,
          lot_size_acres: propertyToAdd.lotSizeAcres,
          year_built: propertyToAdd.yearBuilt,
          address: propertyToAdd.address,
          city: propertyToAdd.city,
          state: propertyToAdd.state,
          country: propertyToAdd.country,
          latitude: propertyToAdd.latitude,
          longitude: propertyToAdd.longitude,
          is_featured: propertyToAdd.isFeatured,
          is_exclusive: propertyToAdd.isExclusive,
          primary_image: propertyToAdd.primaryImage,
          images: propertyToAdd.images,
          amenities: propertyToAdd.amenities,
          agent_id: propertyToAdd.agent?.id || seedAgents[0].id,
        },
      ]);
    } catch (e) {
      console.warn("Supabase property insert failed, stored in memory:", e);
    }
  }

  memoryProperties.unshift(propertyToAdd);
  return propertyToAdd;
}

export async function deleteProperty(id: string): Promise<boolean> {
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("properties").delete().eq("id", id);
    } catch (e) {
      console.warn("Supabase property delete failed:", e);
    }
  }
  memoryProperties = memoryProperties.filter((p) => p.id !== id);
  return true;
}

export async function loadDemoNigerianListings(): Promise<Property[]> {
  for (const demoProp of demoNigerianProperties) {
    await addProperty(demoProp);
  }
  return memoryProperties;
}

export async function clearAllListings(): Promise<boolean> {
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("properties").delete().neq("id", "keep-placeholder");
    } catch (e) {
      console.warn("Supabase clear failed:", e);
    }
  }
  memoryProperties = [];
  return true;
}

// =========================================================================
// LEADS (Consultations & Viewings)
// =========================================================================

export async function createLead(data: Omit<Lead, "id" | "status" | "createdAt">): Promise<Lead> {
  const newLead: Lead = {
    ...data,
    id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    status: "NEW",
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("leads").insert([
        {
          id: newLead.id,
          property_id: newLead.propertyId || null,
          agent_id: newLead.agentId || null,
          lead_type: newLead.leadType,
          first_name: newLead.firstName,
          last_name: newLead.lastName,
          email: newLead.email,
          phone: newLead.phone,
          message: newLead.message || null,
          preferred_date: newLead.preferredDate || null,
          preferred_time: newLead.preferredTime || null,
          status: newLead.status,
        },
      ]);
    } catch (e) {
      console.warn("Supabase lead insert failed, stored in memory:", e);
    }
  }

  memoryLeads.unshift(newLead);
  return newLead;
}

export async function getLeads(): Promise<Lead[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map((row: any) => ({
          id: row.id,
          propertyId: row.property_id,
          agentId: row.agent_id,
          leadType: row.lead_type,
          firstName: row.first_name,
          lastName: row.last_name,
          email: row.email,
          phone: row.phone,
          message: row.message,
          preferredDate: row.preferred_date,
          preferredTime: row.preferred_time,
          status: row.status,
          createdAt: row.created_at,
        }));
      }
    } catch (e) {
      console.warn("Supabase getLeads failed:", e);
    }
  }

  return memoryLeads;
}

export async function updateLeadStatus(id: string, status: Lead["status"]): Promise<boolean> {
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("leads").update({ status }).eq("id", id);
    } catch (e) {
      console.warn("Supabase update lead status failed:", e);
    }
  }

  const item = memoryLeads.find((l) => l.id === id);
  if (item) item.status = status;
  return true;
}

// =========================================================================
// CLIENT BUY & SELL REQUESTS
// =========================================================================

export async function createClientRequest(
  data: Omit<ClientRequest, "id" | "status" | "createdAt">
): Promise<ClientRequest> {
  const newRequest: ClientRequest = {
    ...data,
    id: `req-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    status: "NEW",
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("client_requests").insert([
        {
          id: newRequest.id,
          request_intent: newRequest.requestIntent,
          property_type: newRequest.propertyType,
          target_location: newRequest.targetLocation,
          budget_min: newRequest.budgetMin || null,
          budget_max: newRequest.budgetMax || null,
          selling_price: newRequest.sellingPrice || null,
          bedrooms: newRequest.bedrooms || null,
          bathrooms: newRequest.bathrooms || null,
          additional_notes: newRequest.additionalNotes || null,
          client_name: newRequest.clientName,
          email: newRequest.email,
          phone: newRequest.phone,
          preferred_timeline: newRequest.preferredTimeline || null,
          status: newRequest.status,
        },
      ]);
    } catch (e) {
      console.warn("Supabase client request insert failed, stored in memory:", e);
    }
  }

  memoryClientRequests.unshift(newRequest);
  return newRequest;
}

export async function getClientRequests(): Promise<ClientRequest[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("client_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map((row: any) => ({
          id: row.id,
          requestIntent: row.request_intent,
          propertyType: row.property_type,
          targetLocation: row.target_location,
          budgetMin: row.budget_min ? Number(row.budget_min) : undefined,
          budgetMax: row.budget_max ? Number(row.budget_max) : undefined,
          sellingPrice: row.selling_price ? Number(row.selling_price) : undefined,
          bedrooms: row.bedrooms,
          bathrooms: row.bathrooms,
          additionalNotes: row.additional_notes,
          clientName: row.client_name,
          email: row.email,
          phone: row.phone,
          preferredTimeline: row.preferred_timeline,
          status: row.status,
          createdAt: row.created_at,
        }));
      }
    } catch (e) {
      console.warn("Supabase getClientRequests failed:", e);
    }
  }

  return memoryClientRequests;
}

export async function updateClientRequestStatus(
  id: string,
  status: ClientRequest["status"]
): Promise<boolean> {
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("client_requests").update({ status }).eq("id", id);
    } catch (e) {
      console.warn("Supabase update request status failed:", e);
    }
  }

  const item = memoryClientRequests.find((r) => r.id === id);
  if (item) item.status = status;
  return true;
}

// =========================================================================
// PROPERTY VALUATIONS
// =========================================================================

export async function createValuation(
  data: Omit<ValuationRequest, "id" | "estimatedMinValue" | "estimatedMaxValue" | "createdAt">
): Promise<ValuationRequest> {
  // Nigerian luxury real estate valuation algorithm (in Naira per square foot)
  // Baseline ~₦350,000/sqft in prime Ikoyi/Maitama with condition weighting
  const baseRatePerSqFt = 350000;
  const conditionMultipliers = {
    EXCELLENT: 1.35,
    UPDATED: 1.15,
    ORIGINAL: 1.0,
    NEEDS_WORK: 0.85,
  };

  const multiplier = conditionMultipliers[data.condition] || 1.0;
  const baseValue = data.squareFeet * baseRatePerSqFt * multiplier;
  const bedroomBonus = data.bedrooms * 25000000; // ₦25M per bed
  const bathroomBonus = data.bathrooms * 15000000; // ₦15M per bath
  const midEstimate = Math.round(baseValue + bedroomBonus + bathroomBonus);
  const estimatedMinValue = Math.round(midEstimate * 0.93);
  const estimatedMaxValue = Math.round(midEstimate * 1.07);

  const newValuation: ValuationRequest = {
    ...data,
    id: `val-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    estimatedMinValue,
    estimatedMaxValue,
    createdAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from("property_valuations").insert([
        {
          id: newValuation.id,
          address: newValuation.address,
          city: newValuation.city,
          state: newValuation.state,
          postal_code: newValuation.postalCode,
          property_type: newValuation.propertyType,
          bedrooms: newValuation.bedrooms,
          bathrooms: newValuation.bathrooms,
          square_feet: newValuation.squareFeet,
          property_condition: newValuation.condition,
          estimated_min_value: newValuation.estimatedMinValue,
          estimated_max_value: newValuation.estimatedMaxValue,
          owner_name: newValuation.ownerName,
          email: newValuation.email,
          phone: newValuation.phone,
        },
      ]);
    } catch (e) {
      console.warn("Supabase valuation insert failed, stored in memory:", e);
    }
  }

  memoryValuations.unshift(newValuation);
  return newValuation;
}

export async function getValuations(): Promise<ValuationRequest[]> {
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from("property_valuations")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data.map((row: any) => ({
          id: row.id,
          address: row.address,
          city: row.city,
          state: row.state,
          postalCode: row.postal_code,
          propertyType: row.property_type,
          bedrooms: row.bedrooms,
          bathrooms: row.bathrooms,
          squareFeet: row.square_feet,
          condition: row.property_condition,
          estimatedMinValue: Number(row.estimated_min_value),
          estimatedMaxValue: Number(row.estimated_max_value),
          ownerName: row.owner_name,
          email: row.email,
          phone: row.phone,
          createdAt: row.created_at,
        }));
      }
    } catch (e) {
      console.warn("Supabase getValuations failed:", e);
    }
  }

  return memoryValuations;
}
