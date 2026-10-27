"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Property, Lead, ClientRequest, ValuationRequest } from "@/types";
import { formatCurrency, formatCompactCurrency } from "@/lib/utils";
import {
  Building2,
  Lock,
  PlusCircle,
  Trash2,
  CheckCircle,
  Clock,
  Home,
  UserCheck,
  TrendingUp,
  Database,
  RefreshCw,
  LogOut,
  ExternalLink,
  Phone,
  Mail,
  AlertCircle,
  Eye,
  Check,
  Shield,
  Key,
  Settings,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("precolat@gmail.com");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [currentAdminEmail, setCurrentAdminEmail] = useState("");

  const [activeTab, setActiveTab] = useState<"listings" | "consultations" | "requests" | "valuations" | "settings" | "supabase">("listings");

  // Settings & Password Change States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Data states
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [clientRequests, setClientRequests] = useState<ClientRequest[]>([]);
  const [valuations, setValuations] = useState<ValuationRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  // New Listing Form Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newLocationCity, setNewLocationCity] = useState("Ikoyi");
  const [newLocationState, setNewLocationState] = useState("Lagos");
  const [newAddress, setNewAddress] = useState("");
  const [newPropertyType, setNewPropertyType] = useState("DETACHED_DUPLEX");
  const [newStatus, setNewStatus] = useState("FOR_SALE");
  const [newBedrooms, setNewBedrooms] = useState("5");
  const [newBathrooms, setNewBathrooms] = useState("5.5");
  const [newSquareFeet, setNewSquareFeet] = useState("5500");
  const [newDescription, setNewDescription] = useState("");
  const [newPrimaryImage, setNewPrimaryImage] = useState("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80");
  const [isFeatured, setIsFeatured] = useState(true);
  const [isExclusive, setIsExclusive] = useState(true);

  // Check persisted auth session
  useEffect(() => {
    const saved = localStorage.getItem("pdb_admin_auth");
    const savedEmail = localStorage.getItem("pdb_admin_email");
    if (saved === "true") {
      setIsAuthenticated(true);
      if (savedEmail) setCurrentAdminEmail(savedEmail);
      fetchAllData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/auth?action=login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        const email = data.data.email;
        setCurrentAdminEmail(email);
        localStorage.setItem("pdb_admin_auth", "true");
        localStorage.setItem("pdb_admin_email", email);
        fetchAllData();
      } else {
        setLoginError(data.error || "Invalid admin credentials.");
      }
    } catch (err: any) {
      setLoginError(err.message || "Failed to log in.");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage("");
    setPasswordError("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch("/api/admin/auth?action=change_password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentAdminEmail || adminEmail,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPasswordMessage("Password updated successfully! Keep your new credentials safe.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordError(data.error || "Failed to update password.");
      }
    } catch (err: any) {
      setPasswordError(err.message || "An error occurred.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("pdb_admin_auth");
    localStorage.removeItem("pdb_admin_email");
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [resProps, resLeads, resReqs, resVals] = await Promise.all([
        fetch("/api/properties"),
        fetch("/api/leads"),
        fetch("/api/requests"),
        fetch("/api/valuations"),
      ]);

      const dataProps = await resProps.json();
      const dataLeads = await resLeads.json();
      const dataReqs = await resReqs.json();
      const dataVals = await resVals.json();

      if (dataProps.success) setProperties(dataProps.data);
      if (dataLeads.success) setLeads(dataLeads.data);
      if (dataReqs.success) setClientRequests(dataReqs.data);
      if (dataVals.success) setValuations(dataVals.data);
    } catch (e) {
      console.error("Failed to load admin data", e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle,
          price: Number(newPrice),
          city: newLocationCity,
          state: newLocationState,
          address: newAddress || `${newLocationCity}, ${newLocationState}`,
          propertyType: newPropertyType,
          listingStatus: newStatus,
          bedrooms: Number(newBedrooms),
          bathrooms: Number(newBathrooms),
          squareFeet: Number(newSquareFeet),
          description: newDescription || "Exclusive Nigerian luxury estate listed by PDB Homes.",
          primaryImage: newPrimaryImage,
          isFeatured,
          isExclusive,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setShowAddModal(false);
        setActionMessage("Property listing published successfully.");
        // Reset form
        setNewTitle("");
        setNewPrice("");
        setNewAddress("");
        setNewDescription("");
        fetchAllData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListing = async (id: string) => {
    if (!confirm("Are you sure you want to remove this property listing?")) return;
    try {
      await fetch(`/api/properties?id=${id}`, { method: "DELETE" });
      setActionMessage("Property deleted from listings.");
      fetchAllData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleLoadDemoListings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "LOAD_DEMO" }),
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage("Demo Nigerian luxury properties populated successfully.");
        fetchAllData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAllListings = async () => {
    if (!confirm("Are you sure you want to remove all properties from public display?")) return;
    setLoading(true);
    try {
      await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "CLEAR_ALL" }),
      });
      setActionMessage("All listings cleared.");
      fetchAllData();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLeadStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      fetchAllData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateRequestStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      fetchAllData();
    } catch (e) {
      console.error(e);
    }
  };

  // 1. Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 space-y-6">
          <div className="text-center space-y-3">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden mx-auto shadow-md border border-slate-200">
              <Image
                src="/pdb-logo.jpeg"
                alt="PDB Homes Logo"
                fill
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl font-extrabold text-brand-navy font-display">
              PDB Homes Admin Portal
            </h1>
            <p className="text-xs text-slate-500">
              Authorized personnel only. Access listings, viewings, and client mandates.
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="precolat@gmail.com or info@pdbhomes.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-navy"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="font-bold text-slate-700">Seeded Admin Accounts:</div>
            <div>• <strong>precolat@gmail.com</strong></div>
            <div>• <strong>info@pdbhomes.com</strong></div>
            <div className="text-[10px] text-slate-400 pt-1">
              Passwords can be updated anytime inside Dashboard Settings.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-16">
      {/* Top Admin Header Bar */}
      <header className="bg-brand-navy text-white px-6 py-4 border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-white/20 shrink-0">
              <Image
                src="/pdb-logo.jpeg"
                alt="PDB Homes Logo"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight">PDB Homes Admin Control Desk</div>
              <div className="text-[10px] text-slate-400">Nigeria Luxury Operations & Client Mandates</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchAllData}
              title="Refresh Data"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-red-900/60 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {actionMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center justify-between">
            <span>{actionMessage}</span>
            <button onClick={() => setActionMessage("")} className="text-emerald-600 hover:text-emerald-900">
              &times;
            </button>
          </div>
        )}

        {/* Metric Overview Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Public Listings</span>
            <div className="text-3xl font-extrabold text-brand-navy font-display">{properties.length}</div>
            <span className="text-[11px] text-slate-500">Only admin-listed homes appear</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Viewings & Consultations</span>
            <div className="text-3xl font-extrabold text-brand-navy font-display">{leads.length}</div>
            <span className="text-[11px] text-emerald-600 font-semibold">{leads.filter(l => l.status === "NEW").length} new requests</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Buy / Sell Mandates</span>
            <div className="text-3xl font-extrabold text-brand-navy font-display">{clientRequests.length}</div>
            <span className="text-[11px] text-blue-600 font-semibold">{clientRequests.filter(r => r.status === "NEW").length} pending match</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Valuation Inquiries</span>
            <div className="text-3xl font-extrabold text-brand-navy font-display">{valuations.length}</div>
            <span className="text-[11px] text-slate-500">Seller equity assessments</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("listings")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "listings"
                ? "bg-brand-navy text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Manage Listings ({properties.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("consultations")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "consultations"
                ? "bg-brand-navy text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Consultations & Viewings ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "requests"
                ? "bg-brand-navy text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-200"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Client Buy / Sell Mandates ({clientRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("valuations")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "valuations"
                ? "bg-brand-navy text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-200"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Valuations ({valuations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("supabase")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "supabase"
                ? "bg-brand-navy text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Supabase Sync</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "settings"
                ? "bg-brand-navy text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Admin Settings & Security</span>
          </button>
        </div>

        {/* TAB 1: LISTINGS MANAGEMENT */}
        {activeTab === "listings" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">Published Real Estate Listings</h2>
                <p className="text-xs text-slate-500">
                  Per strict instructions, no property appears publicly until explicitly added or loaded by the admin here.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
                >
                  <PlusCircle className="w-4 h-4 text-emerald-400" />
                  <span>Add New Listing</span>
                </button>

                <button
                  onClick={handleLoadDemoListings}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors"
                  title="Populates Banana Island, Ikoyi, Lekki & Maitama demo estates"
                >
                  <span>Load Demo Nigerian Estates</span>
                </button>

                {properties.length > 0 && (
                  <button
                    onClick={handleClearAllListings}
                    className="p-2.5 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 text-xs font-bold"
                    title="Clear All Listings"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {properties.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">No Properties Currently Listed</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  The public site currently displays zero listings until you create your first listing or click &ldquo;Load Demo Nigerian Estates&rdquo;.
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-slate-800 transition-colors"
                >
                  Create First Listing
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Property</th>
                        <th className="py-3.5 px-4">Price (NGN)</th>
                        <th className="py-3.5 px-4">Location</th>
                        <th className="py-3.5 px-4">Specs</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {properties.map((prop) => (
                        <tr key={prop.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4 flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                              <Image src={prop.primaryImage} alt={prop.title} fill className="object-cover" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 line-clamp-1">{prop.title}</div>
                              <div className="text-[11px] text-slate-400 font-mono">MLS #{prop.mlsId}</div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-brand-navy">
                            {formatCurrency(prop.price)}
                            {prop.listingStatus === "FOR_RENT" && <span className="text-[10px] text-slate-400 font-normal">/yr</span>}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {prop.city}, {prop.state}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {prop.bedrooms} Beds &bull; {prop.bathrooms} Baths &bull; {prop.squareFeet} sqft
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                              {prop.listingStatus}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <Link
                              href={`/properties/${prop.id}`}
                              target="_blank"
                              className="p-1.5 rounded-lg text-slate-500 hover:text-brand-navy hover:bg-slate-100 inline-block"
                              title="View Public Page"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteListing(prop.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 inline-block"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CONSULTATIONS & VIEWINGS */}
        {activeTab === "consultations" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Client Viewing & Consultation Inquiries</h2>
              <p className="text-xs text-slate-500">Real-time appointments booked by prospective buyers and renters.</p>
            </div>

            {leads.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No viewing requests submitted yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Client</th>
                        <th className="py-3.5 px-4">Contact</th>
                        <th className="py-3.5 px-4">Preferred Slot</th>
                        <th className="py-3.5 px-4">Notes</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leads.map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50/60">
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            <div className="flex items-center gap-1.5 flex-wrap"><span>{l.firstName} {l.lastName}</span>{(l.leadType === "CONSULTATION" || l.message?.includes("CONSULTATION")) && (<span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-extrabold text-[9px] uppercase tracking-wider border border-emerald-300">₦10k Consultation</span>)}</div>
                          </td>
                          <td className="py-3.5 px-4 space-y-0.5">
                            <div className="flex items-center gap-1 text-slate-700">
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <a href={`tel:${l.phone}`} className="hover:underline">{l.phone}</a>
                            </div>
                            <div className="flex items-center gap-1 text-slate-500">
                              <Mail className="w-3 h-3 text-emerald-600" />
                              <a href={`mailto:${l.email}`} className="hover:underline">{l.email}</a>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {l.preferredDate || "Anytime"} &bull; {l.preferredTime || "Flexible"}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">
                            {l.message || "Viewing scheduled"}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              l.status === "NEW" ? "bg-blue-100 text-blue-800" : "bg-emerald-100 text-emerald-800"
                            }`}>
                              {l.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <select
                              value={l.status}
                              onChange={(e) => handleUpdateLeadStatus(l.id, e.target.value as any)}
                              className="px-2 py-1 rounded border border-slate-200 text-xs bg-white"
                            >
                              <option value="NEW">New</option>
                              <option value="CONTACTED">Contacted</option>
                              <option value="QUALIFIED">Qualified</option>
                              <option value="CLOSED">Completed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CLIENT BUY & SELL MANDATES */}
        {activeTab === "requests" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Client Buy / Sell House Mandates</h2>
              <p className="text-xs text-slate-500">
                Direct submissions where clients specified the exact type of home they are looking to buy or sell.
              </p>
            </div>

            {clientRequests.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <UserCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No client mandates received yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Intent</th>
                        <th className="py-3.5 px-4">Client</th>
                        <th className="py-3.5 px-4">Property Type Requested</th>
                        <th className="py-3.5 px-4">Location</th>
                        <th className="py-3.5 px-4">Budget / Price</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {clientRequests.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60">
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              r.requestIntent === "BUY" ? "bg-blue-100 text-blue-800" : r.requestIntent === "RENT" ? "bg-emerald-100 text-emerald-800" : "bg-purple-100 text-purple-800"
                            }`}>
                              {r.requestIntent}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{r.clientName}</div>
                            <div className="text-[11px] text-slate-500">{r.phone}</div>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-800">
                            {r.propertyType} ({r.bedrooms || 4} Beds)
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">{r.targetLocation}</td>
                          <td className="py-3.5 px-4 font-bold text-brand-navy">
                            {r.sellingPrice ? formatCurrency(r.sellingPrice) : r.budgetMin ? `${formatCompactCurrency(r.budgetMin)} - ${formatCompactCurrency(r.budgetMax || 0)}` : "Competitive"}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-800">
                              {r.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <select
                              value={r.status}
                              onChange={(e) => handleUpdateRequestStatus(r.id, e.target.value as any)}
                              className="px-2 py-1 rounded border border-slate-200 text-xs bg-white"
                            >
                              <option value="NEW">New</option>
                              <option value="REVIEWING">Reviewing</option>
                              <option value="MATCHED">Matched</option>
                              <option value="CLOSED">Closed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: VALUATIONS */}
        {activeTab === "valuations" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Seller Home Valuation Assessments</h2>
              <p className="text-xs text-slate-500">Calculated algorithmic equity estimates for homeowner leads.</p>
            </div>

            {valuations.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <TrendingUp className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No valuation inquiries received yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Owner</th>
                        <th className="py-3.5 px-4">Property Address</th>
                        <th className="py-3.5 px-4">Specs & Condition</th>
                        <th className="py-3.5 px-4">Estimated Range (NGN)</th>
                        <th className="py-3.5 px-4">Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {valuations.map((v) => (
                        <tr key={v.id} className="hover:bg-slate-50/60">
                          <td className="py-3.5 px-4 font-bold text-slate-900">{v.ownerName}</td>
                          <td className="py-3.5 px-4 text-slate-700">{v.address}, {v.city}</td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {v.bedrooms} Beds &bull; {v.squareFeet} sqft &bull; {v.condition}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-brand-navy">
                            {formatCurrency(v.estimatedMinValue)} – {formatCurrency(v.estimatedMaxValue)}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">
                            {v.phone} | {v.email}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: SUPABASE INTEGRATION */}
        {activeTab === "supabase" && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">Supabase Cloud Database Connection</h2>
                <p className="text-xs text-slate-500">Tracks real-time consultations, property listings, and client buy/sell requests.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-3">
              <div className="font-bold text-slate-800">Connection Checklist:</div>
              <div className="space-y-1.5 text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span><strong>Supabase Client Installed:</strong> <code>@supabase/supabase-js</code> integrated.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span><strong>Database DDL Ready:</strong> <code>db/supabase_schema.sql</code> includes tables for <code>properties</code>, <code>leads</code>, <code>client_requests</code>, and <code>property_valuations</code>.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span><strong>Zero-Downtime Fallback:</strong> If Supabase credentials are not provided in <code>.env.local</code>, the application safely stores data in memory so the app never crashes.</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900">How to Connect Your Supabase Project:</h3>
              <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <li>Create a free project at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-brand-navy underline font-bold">supabase.com</a>.</li>
                <li>Go to the <strong>SQL Editor</strong> in your Supabase dashboard, copy the contents of <code>db/supabase_schema.sql</code>, and click <strong>Run</strong>.</li>
                <li>In your Supabase project settings &rarr; API, copy your <strong>Project URL</strong> and <strong>anon public key</strong>.</li>
                <li>Add them to your <code>.env.local</code> file (or your hosting platform like Vercel/Render):</li>
              </ol>

              <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl text-xs overflow-x-auto font-mono mt-3">
{`NEXT_PUBLIC_SUPABASE_URL=https://tsilssuugqcbkgkcdipz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_115NCNZpqYI5kOpXN6dTqA_qKqxXGX7`}
              </pre>
            </div>
          </div>
        )}

        {/* TAB 6: ADMIN SETTINGS & SECURITY */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Admin Account & Security Settings</h2>
              <p className="text-xs text-slate-500">
                Manage your credentials, update your access password, and review authorized administrators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Change Password Card */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-brand-navy font-bold text-sm">
                  <Key className="w-4 h-4 text-blue-600" />
                  <span>Change Your Admin Password</span>
                </div>

                {passwordMessage && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{passwordMessage}</span>
                  </div>
                )}

                {passwordError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-semibold text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{passwordError}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold uppercase text-slate-600 mb-1">
                      Account Email
                    </label>
                    <input
                      type="email"
                      disabled
                      value={currentAdminEmail || "precolat@gmail.com"}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-600 mb-1">
                      Current Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-brand-navy"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-600 mb-1">
                      New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-brand-navy"
                    />
                  </div>

                  <div>
                    <label className="block font-bold uppercase text-slate-600 mb-1">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-brand-navy"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="w-full py-2.5 px-4 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                  >
                    {passwordLoading ? "Updating Password..." : "Update Password"}
                  </button>
                </form>
              </div>

              {/* Authorized Administrators & Security Guidance */}
              <div className="space-y-6 text-xs">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-brand-navy font-bold text-sm">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    <span>Configured Admin Accounts</span>
                  </div>
                  <p className="text-slate-500 leading-relaxed">
                    The platform is configured with two Super Admin accounts for executive oversight and operations:
                  </p>
                  <div className="space-y-2 pt-1">
                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">precolat@gmail.com</div>
                        <div className="text-[11px] text-emerald-700 font-bold">Super Admin</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Active
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900">info@pdbhomes.com</div>
                        <div className="text-[11px] text-emerald-700 font-bold">Super Admin</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/60 text-slate-700 space-y-1.5">
                  <div className="font-bold text-brand-navy">Supabase Persistent Storage</div>
                  <p className="leading-relaxed text-[11px]">
                    When you run the <code>db/supabase_schema.sql</code> script in your Supabase SQL editor and connect your project URL and keys in Vercel, password updates will persist directly into your cloud database across all deployments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CREATE LISTING MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-bold text-slate-900 font-display">Create & Publish Property Listing</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700 text-lg">
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-600 mb-1">Property Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. 5-Bedroom Luxury Waterfront Detached Duplex"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-navy text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">Price in Nigerian Naira (NGN) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="e.g. 650000000 (for ₦650 Million)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-navy text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">Listing Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="FOR_SALE">For Sale</option>
                    <option value="FOR_RENT">For Rent</option>
                    <option value="SHORTLET">Serviced Shortlet</option>
                    <option value="PENDING">Pending Escrow</option>
                    <option value="SOLD">Sold</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">City / Enclave *</label>
                  <input
                    type="text"
                    required
                    value={newLocationCity}
                    onChange={(e) => setNewLocationCity(e.target.value)}
                    placeholder="Ikoyi / Lekki / VI / Ajah / Mainland"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={newLocationState}
                    onChange={(e) => setNewLocationState(e.target.value)}
                    placeholder="Lagos / Abuja FCT"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">Property Type</label>
                  <select
                    value={newPropertyType}
                    onChange={(e) => setNewPropertyType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="SHORTLET_STUDIO">Serviced Shortlet / Studio</option>
                    <option value="SERVICED_APARTMENT">Serviced Apartment</option>
                    <option value="TERRACE">Terrace Duplex</option>
                    <option value="DETACHED_DUPLEX">Detached Duplex</option>
                    <option value="MANSION">Waterfront Mansion</option>
                    <option value="PENTHOUSE">Sky Penthouse</option>
                    <option value="TERRACE">Terrace Duplex</option>
                    <option value="MAISONETTE">Maisonette</option>
                    <option value="APARTMENT">Apartment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-600 mb-1">Exact Street Address</label>
                <input
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="e.g. Off Admiralty Way, Lekki Phase 1"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={newBedrooms}
                    onChange={(e) => setNewBedrooms(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">Bathrooms</label>
                  <input
                    type="number"
                    step="0.5"
                    value={newBathrooms}
                    onChange={(e) => setNewBathrooms(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-600 mb-1">Square Feet</label>
                  <input
                    type="number"
                    value={newSquareFeet}
                    onChange={(e) => setNewSquareFeet(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-600 mb-1">Primary Image URL</label>
                <input
                  type="url"
                  value={newPrimaryImage}
                  onChange={(e) => setNewPrimaryImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-600 mb-1">Description / Architectural Highlights</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe title (e.g. Governor's consent), cinema room, swimming pool, water treatment, solar system..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-brand-navy"
                  />
                  <span>Featured on Home Page</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isExclusive}
                    onChange={(e) => setIsExclusive(e.target.checked)}
                    className="rounded text-brand-navy"
                  />
                  <span>Mark as Exclusive</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-brand-navy text-white font-bold uppercase tracking-wider hover:bg-slate-800 disabled:opacity-50"
                >
                  {loading ? "Publishing..." : "Publish Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
