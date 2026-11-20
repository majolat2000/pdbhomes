"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Property, Lead, ClientRequest, ValuationRequest, NewsletterSubscriber } from "@/types";
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
  MessageCircle,
  UploadCloud,
  X,
  Copy,
  Download,
  Search,
} from "lucide-react";

function getWhatsAppUrl(phone: string, text?: string) {
  const clean = (phone || "").replace(/[^0-9]/g, "");
  const wa = clean.startsWith("0") ? ("234" + clean.slice(1)) : clean;
  return "https://wa.me/" + wa + (text ? ("?text=" + encodeURIComponent(text)) : "");
}

interface UploadedImage {
  id: string;
  url: string;
  isPrimary: boolean;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [currentAdminEmail, setCurrentAdminEmail] = useState("");

  const [activeTab, setActiveTab] = useState<"listings" | "consultations" | "inquiries" | "requests" | "newsletter" | "settings">("listings");

  // Newsletter Subscribers State
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [subscriberSearch, setSubscriberSearch] = useState("");
  const [copiedEmails, setCopiedEmails] = useState(false);

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
  const consultationLeads = leads.filter(
    (l) => l.leadType === "CONSULTATION" || l.message?.includes("CONSULTATION")
  );
  const generalInquiries = leads.filter(
    (l) => l.leadType !== "CONSULTATION" && !l.message?.includes("CONSULTATION")
  );
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
  // 5-Image Direct Upload State
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [imageUploadError, setImageUploadError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  // Consultation Fee Adjustment State
  const [consultationFee, setConsultationFee] = useState<number>(10000);
  const [feeMessage, setFeeMessage] = useState("");
  const [feeLoading, setFeeLoading] = useState(false);
  const [isFeatured, setIsFeatured] = useState(true);
  const [isExclusive, setIsExclusive] = useState(true);

  const getAuthHeaders = (): Record<string, string> => {
    if (typeof window === "undefined") return {};
    const token = localStorage.getItem("pdb_admin_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

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
        if (data.token) {
          localStorage.setItem("pdb_admin_token", data.token);
        }
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

  const handleLogout = async () => {
    setIsAuthenticated(false);
    localStorage.removeItem("pdb_admin_auth");
    localStorage.removeItem("pdb_admin_email");
    localStorage.removeItem("pdb_admin_token");
    try {
      await fetch("/api/admin/auth?action=logout", { method: "POST" });
    } catch {}
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const authHeaders = getAuthHeaders();
      const [resProps, resLeads, resReqs, resVals, resSubs] = await Promise.all([
        fetch("/api/properties"),
        fetch("/api/leads", { headers: authHeaders }),
        fetch("/api/requests", { headers: authHeaders }),
        fetch("/api/valuations", { headers: authHeaders }),
        fetch("/api/newsletter", { headers: authHeaders }),
      ]);

      const dataProps = await resProps.json();
      const dataLeads = await resLeads.json();
      const dataReqs = await resReqs.json();
      const dataVals = await resVals.json();
      const dataSubs = await resSubs.json();

      if (dataProps.success) setProperties(dataProps.data);
      if (dataLeads.success) setLeads(dataLeads.data);
      if (dataReqs.success) setClientRequests(dataReqs.data);
      if (dataVals.success) setValuations(dataVals.data);
      if (dataSubs.success) setSubscribers(dataSubs.data);
    } catch (e) {
      console.error("Failed to load admin data", e);
    } finally {
      setLoading(false);
    }
  };

  // Newsletter Subscriber Handlers
  const handleDeleteSubscriber = async (id: string, email: string) => {
    if (!confirm(`Are you sure you want to remove ${email} from newsletter subscribers?`)) return;
    try {
      const res = await fetch(`/api/newsletter?id=${id}`, { method: "DELETE", headers: getAuthHeaders() });
      const data = await res.json();
      if (data.success) {
        setActionMessage(`Removed ${email} from newsletter subscribers.`);
        setSubscribers((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyAllEmails = () => {
    if (subscribers.length === 0) return;
    const emailList = subscribers.map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emailList);
    setCopiedEmails(true);
    setActionMessage(`Copied ${subscribers.length} subscriber email addresses to clipboard!`);
    setTimeout(() => setCopiedEmails(false), 3000);
  };

  const handleExportSubscribersCSV = () => {
    if (subscribers.length === 0) return;
    const headers = "ID,Email,Source,Status,SubscribedAt\n";
    const rows = subscribers
      .map(
        (s) =>
          `"${s.id}","${s.email}","${s.source || "Footer Property Alerts"}","${s.status || "ACTIVE"}","${s.createdAt}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `pdbhomes-newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Consultation Fee Update
  const handleUpdateConsultationFee = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeeLoading(true);
    setFeeMessage("");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({ consultationFee }),
      });
      const data = await res.json();
      if (data.success) {
        setFeeMessage("Consultation price updated to ₦" + consultationFee.toLocaleString());
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setFeeLoading(false);
    }
  };

  // Image Upload Handler (Max 5 images: 1 Primary + 4 Optional)
  const handleImageFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setImageUploadError("");

    const remainingSlots = 5 - uploadedImages.length;
    if (remainingSlots <= 0) {
      setImageUploadError("You have already uploaded the maximum of 5 images.");
      return;
    }

    const toProcess = files.slice(0, remainingSlots);
    setUploadingImage(true);

    try {
      const newUploads: UploadedImage[] = [];

      for (const file of toProcess) {
        if (!file.type.startsWith("image/")) continue;

        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (ev) => {
            const img = document.createElement("img");
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const maxDim = 1600;
              let width = img.width;
              let height = img.height;

              if (width > maxDim || height > maxDim) {
                if (width > height) {
                  height = Math.round((height * maxDim) / width);
                  width = maxDim;
                } else {
                  width = Math.round((width * maxDim) / height);
                  height = maxDim;
                }
              }

              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL("image/jpeg", 0.85));
              } else {
                resolve(ev.target?.result as string);
              }
            };
            img.onerror = reject;
            img.src = ev.target?.result as string;
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        newUploads.push({
          id: 'img-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
          url: dataUrl,
          isPrimary: uploadedImages.length === 0 && newUploads.length === 0,
        });
      }

      setUploadedImages((prev) => {
        const combined = [...prev, ...newUploads];
        if (!combined.some((img) => img.isPrimary) && combined.length > 0) {
          combined[0].isPrimary = true;
        }
        return combined;
      });
    } catch (err: any) {
      setImageUploadError("Failed to process image. Please try again.");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleSetPrimary = (id: string) => {
    setUploadedImages((prev) =>
      prev.map((img) => ({
        ...img,
        isPrimary: img.id === id,
      }))
    );
  };

  const handleRemoveImage = (id: string) => {
    setUploadedImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      if (filtered.length > 0 && !filtered.some((img) => img.isPrimary)) {
        filtered[0].isPrimary = true;
      }
      return filtered;
    });
  };

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedImages.length === 0) {
      setImageUploadError("Please upload at least 1 image for this property.");
      return;
    }
    setLoading(true);

    try {
      const primaryImgObj = uploadedImages.find((img) => img.isPrimary) || uploadedImages[0];
      const propertyImages = uploadedImages.map((img) => ({
        url: img.url,
        isPrimary: img.id === primaryImgObj.id,
      }));

      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
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
          description: newDescription || "Nigerian property listed by PDB Homes.",
          primaryImage: primaryImgObj.url,
          images: propertyImages,
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
        setUploadedImages([]);
        setImageUploadError("");
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
      await fetch(`/api/properties?id=${id}`, { method: "DELETE", headers: getAuthHeaders() });
      setActionMessage("Property deleted from listings.");
      fetchAllData();
    } catch (e) {
      console.error(e);
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
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
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
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
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
                placeholder="you@example.com"
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

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 text-center">
            Authorized administrator access only.
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
            <span className="text-[11px] text-slate-500">Active public inventory</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">₦10k Consultations</span>
            <div className="text-3xl font-extrabold text-emerald-700 font-display">{consultationLeads.length}</div>
            <span className="text-[11px] text-emerald-600 font-semibold">{consultationLeads.filter(l => l.status === "NEW").length} pending review</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Buy / Rent / Sell Mandates</span>
            <div className="text-3xl font-extrabold text-blue-700 font-display">{clientRequests.length}</div>
            <span className="text-[11px] text-blue-600 font-semibold">{clientRequests.filter(r => r.status === "NEW").length} pending matching</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Viewings & Inquiries</span>
            <div className="text-3xl font-extrabold text-brand-navy font-display">{generalInquiries.length}</div>
            <span className="text-[11px] text-slate-500">{generalInquiries.filter(l => l.status === "NEW").length} new messages</span>
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
            <span>₦10k Consultations ({consultationLeads.length})</span>
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
            <span>Buy / Rent / Sell Mandates ({clientRequests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "inquiries"
                ? "bg-brand-navy text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-200"
            }`}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Viewings & Inquiries ({generalInquiries.length})</span>
          </button>

          

          <button
            onClick={() => setActiveTab("newsletter")}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "newsletter"
                ? "bg-brand-navy text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Newsletter ({subscribers.length})</span>
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
                  The public site currently displays zero listings until you create your first listing.
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

        {/* TAB 2: ₦10K CONSULTATIONS */}
        {activeTab === "consultations" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">Client Consultation Bookings</h2>
                <p className="text-xs text-slate-500">
                  Dedicated 1-on-1 advisory sessions booked by clients for sales, rentals, shortlets, or land acquisition.
                </p>
              </div>
              <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 w-fit">
                {consultationLeads.length} Total Bookings Received
              </div>
            </div>

            {consultationLeads.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No consultation bookings submitted yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Client</th>
                        <th className="py-3.5 px-4">Contact & Direct Action</th>
                        <th className="py-3.5 px-4">Advisory Purpose / Slot</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Update Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {consultationLeads.map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50/60">
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-sm">{l.firstName} {l.lastName}</span>
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-extrabold text-[9px] uppercase tracking-wider border border-emerald-300">
                                ₦10k Consultation
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                              Received: {new Date(l.createdAt || Date.now()).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 space-y-1.5">
                            <div className="flex items-center gap-2">
                              <a
                                href={`tel:${l.phone}`}
                                className="text-slate-800 font-semibold hover:text-emerald-700 hover:underline flex items-center gap-1"
                                title="Call Client Phone"
                              >
                                <Phone className="w-3 h-3 text-emerald-600" />
                                <span>{l.phone}</span>
                              </a>
                              <a
                                href={getWhatsAppUrl(l.phone, `Hello ${l.firstName}, thank you for booking a consultation with PDB Homes. We are following up regarding your session.`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold shadow-xs transition-colors"
                                title="Chat directly on WhatsApp"
                              >
                                <MessageCircle className="w-3 h-3 fill-white" />
                                <span>WhatsApp</span>
                              </a>
                            </div>
                            <div>
                              <a
                                href={`mailto:${l.email}`}
                                className="text-slate-500 hover:text-emerald-700 hover:underline flex items-center gap-1 text-[11px]"
                                title="Email Client"
                              >
                                <Mail className="w-3 h-3 text-emerald-600" />
                                <span>{l.email}</span>
                              </a>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 max-w-sm">
                            <div className="font-medium text-slate-900 mb-0.5">
                              {l.message || "Dedicated Real Estate Consultation"}
                            </div>
                            {(l.preferredDate || l.preferredTime) && (
                              <div className="text-[11px] text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{l.preferredDate || "Anytime"} &bull; {l.preferredTime || "Flexible"}</span>
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              l.status === "NEW"
                                ? "bg-blue-100 text-blue-800 border border-blue-200"
                                : l.status === "CONTACTED"
                                ? "bg-amber-100 text-amber-800 border border-amber-200"
                                : l.status === "QUALIFIED"
                                ? "bg-purple-100 text-purple-800 border border-purple-200"
                                : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            }`}>
                              {l.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <select
                              value={l.status}
                              onChange={(e) => handleUpdateLeadStatus(l.id, e.target.value as any)}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white font-medium shadow-xs focus:outline-none focus:border-brand-navy"
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

        {/* TAB 3: CLIENT BUY, RENT & SELL MANDATES */}
        {activeTab === "requests" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">Client Property Mandates (Buy / Rent / Sell / Shortlet)</h2>
                <p className="text-xs text-slate-500">
                  Custom criteria submitted by clients specifying exact house, apartment, or land requirements.
                </p>
              </div>
              <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-blue-100 text-blue-800 border border-blue-300 w-fit">
                {clientRequests.length} Total Mandates
              </div>
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
                        <th className="py-3.5 px-4">Client & Direct Action</th>
                        <th className="py-3.5 px-4">Property Type & Specs</th>
                        <th className="py-3.5 px-4">Target Location</th>
                        <th className="py-3.5 px-4">Budget / Selling Price</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Update Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {clientRequests.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50/60">
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                              r.requestIntent === "BUY"
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : r.requestIntent === "RENT"
                                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                : r.requestIntent === "SHORTLET"
                                ? "bg-amber-100 text-amber-800 border-amber-200"
                                : "bg-purple-100 text-purple-800 border-purple-200"
                            }`}>
                              {r.requestIntent}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 space-y-1">
                            <div className="font-bold text-slate-900 text-sm">{r.clientName}</div>
                            <div className="flex items-center gap-2">
                              <a
                                href={`tel:${r.phone}`}
                                className="text-slate-700 hover:text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                                title="Call Phone"
                              >
                                <Phone className="w-3 h-3 text-emerald-600" />
                                <span>{r.phone}</span>
                              </a>
                              <a
                                href={getWhatsAppUrl(r.phone, `Hello ${r.clientName}, regarding your ${r.requestIntent} property mandate on PDB Homes...`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold shadow-xs transition-colors"
                                title="Chat directly on WhatsApp"
                              >
                                <MessageCircle className="w-3 h-3 fill-white" />
                                <span>WhatsApp</span>
                              </a>
                            </div>
                            <div>
                              <a
                                href={`mailto:${r.email}`}
                                className="text-slate-500 hover:text-emerald-700 hover:underline flex items-center gap-1 text-[11px]"
                                title="Email Client"
                              >
                                <Mail className="w-3 h-3 text-emerald-600" />
                                <span>{r.email}</span>
                              </a>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-800">{r.propertyType}</div>
                            <div className="text-[11px] text-slate-500">
                              {r.bedrooms ? `${r.bedrooms} Bedrooms` : "Flexible bed count"}
                              {r.bathrooms ? ` &bull; ${r.bathrooms} Baths` : ""}
                            </div>
                            {r.additionalNotes && (
                              <div className="text-[11px] text-slate-600 italic mt-0.5 max-w-xs">
                                &ldquo;{r.additionalNotes}&rdquo;
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 font-medium">
                            {r.targetLocation}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-brand-navy">
                            {r.sellingPrice
                              ? formatCurrency(r.sellingPrice)
                              : r.budgetMin
                              ? `${formatCompactCurrency(r.budgetMin)} - ${formatCompactCurrency(r.budgetMax || 0)}`
                              : "Open / Competitive"}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-800 border border-slate-200">
                              {r.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <select
                              value={r.status}
                              onChange={(e) => handleUpdateRequestStatus(r.id, e.target.value as any)}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white font-medium shadow-xs focus:outline-none focus:border-brand-navy"
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

        {/* TAB 4: PROPERTY VIEWINGS & CONTACT INQUIRIES */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-display">Property Viewings & Contact Inquiries</h2>
                <p className="text-xs text-slate-500">
                  In-person/virtual tour requests and general contact messages submitted across PDB Homes.
                </p>
              </div>
              <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-300 w-fit">
                {generalInquiries.length} Inquiries Received
              </div>
            </div>

            {generalInquiries.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <MessageCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500">No viewing or contact inquiries received yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4">Client</th>
                        <th className="py-3.5 px-4">Contact & Direct Action</th>
                        <th className="py-3.5 px-4">Type & Preferred Window</th>
                        <th className="py-3.5 px-4">Message / Notes</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Update Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {generalInquiries.map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50/60">
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            <div className="text-sm">{l.firstName} {l.lastName}</div>
                            <div className="text-[10px] text-slate-400 font-normal mt-0.5">
                              Received: {new Date(l.createdAt || Date.now()).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 space-y-1">
                            <div className="flex items-center gap-2">
                              <a
                                href={`tel:${l.phone}`}
                                className="text-slate-800 font-semibold hover:text-emerald-700 hover:underline flex items-center gap-1"
                                title="Call Phone"
                              >
                                <Phone className="w-3 h-3 text-emerald-600" />
                                <span>{l.phone}</span>
                              </a>
                              <a
                                href={getWhatsAppUrl(l.phone, `Hello ${l.firstName}, this is PDB Homes following up on your inquiry...`)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold shadow-xs transition-colors"
                                title="Chat directly on WhatsApp"
                              >
                                <MessageCircle className="w-3 h-3 fill-white" />
                                <span>WhatsApp</span>
                              </a>
                            </div>
                            <div>
                              <a
                                href={`mailto:${l.email}`}
                                className="text-slate-500 hover:text-emerald-700 hover:underline flex items-center gap-1 text-[11px]"
                                title="Email Client"
                              >
                                <Mail className="w-3 h-3 text-emerald-600" />
                                <span>{l.email}</span>
                              </a>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                              l.leadType === "SCHEDULE_VIEWING"
                                ? "bg-blue-100 text-blue-800 border border-blue-200"
                                : "bg-slate-100 text-slate-800 border border-slate-200"
                            }`}>
                              {l.leadType === "SCHEDULE_VIEWING" ? "Tour / Viewing" : "Confidential Inquiry"}
                            </span>
                            {(l.preferredDate || l.preferredTime) && (
                              <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{l.preferredDate || "Anytime"} &bull; {l.preferredTime || "Flexible"}</span>
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 max-w-sm truncate" title={l.message}>
                            {l.message || "Viewing appointment requested"}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              l.status === "NEW"
                                ? "bg-blue-100 text-blue-800 border border-blue-200"
                                : l.status === "CONTACTED"
                                ? "bg-amber-100 text-amber-800 border border-amber-200"
                                : l.status === "QUALIFIED"
                                ? "bg-purple-100 text-purple-800 border border-purple-200"
                                : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            }`}>
                              {l.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <select
                              value={l.status}
                              onChange={(e) => handleUpdateLeadStatus(l.id, e.target.value as any)}
                              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white font-medium shadow-xs focus:outline-none focus:border-brand-navy"
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

        {/* TAB 5: NEWSLETTER SUBSCRIBERS */}
        {activeTab === "newsletter" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900 font-display">
                    Newsletter &amp; Property Alert Subscribers
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    {subscribers.length} Total
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  List of all users who subscribed to receive verified property alerts and updates via the website footer.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyAllEmails}
                  disabled={subscribers.length === 0}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-50"
                  title="Copy all subscriber emails separated by commas"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>{copiedEmails ? "Copied!" : "Copy All Emails"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportSubscribersCSV}
                  disabled={subscribers.length === 0}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-xs disabled:opacity-50"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                  Total Subscribers
                </span>
                <span className="text-2xl font-extrabold text-brand-navy font-display mt-0.5 block">
                  {subscribers.length}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                  Active Status
                </span>
                <span className="text-2xl font-extrabold text-emerald-700 font-display mt-0.5 block">
                  {subscribers.filter((s) => s.status !== "UNSUBSCRIBED").length}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                  Latest Subscription
                </span>
                <span className="text-sm font-bold text-slate-800 font-display mt-1.5 block">
                  {subscribers.length > 0
                    ? new Date(subscribers[0].createdAt).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "No subscribers yet"}
                </span>
              </div>
            </div>

            {/* Search Input */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search subscribers by email address..."
                  value={subscriberSearch}
                  onChange={(e) => setSubscriberSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-navy"
                />
              </div>
            </div>

            {/* Subscribers Table */}
            {subscribers.filter(
              (s) =>
                s.email.toLowerCase().includes(subscriberSearch.toLowerCase()) ||
                (s.source && s.source.toLowerCase().includes(subscriberSearch.toLowerCase()))
            ).length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Mail className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">No subscribers found</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {subscriberSearch
                    ? "No subscribers match your search term."
                    : "When visitors enter their email into the 'Get Property Alerts' box at the footer, they will immediately appear here."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Email Address</th>
                      <th className="py-3 px-4">Source</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date Subscribed</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {subscribers
                      .filter(
                        (s) =>
                          s.email.toLowerCase().includes(subscriberSearch.toLowerCase()) ||
                          (s.source && s.source.toLowerCase().includes(subscriberSearch.toLowerCase()))
                      )
                      .map((sub, index) => (
                        <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 text-slate-400 font-mono">{index + 1}</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            <a
                              href={`mailto:${sub.email}`}
                              className="text-brand-navy hover:text-emerald-700 hover:underline"
                            >
                              {sub.email}
                            </a>
                          </td>
                          <td className="py-3 px-4 text-slate-500">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px]">
                              {sub.source || "Footer Property Alerts"}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              Active
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500">
                            {new Date(sub.createdAt).toLocaleDateString("en-NG", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteSubscriber(sub.id, sub.email)}
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                              title="Remove subscriber"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
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
                                {/* Consultation Price Configuration Card */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                  <div className="flex items-center gap-2 text-brand-navy font-bold text-sm">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>Consultation Price Setting</span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Adjust the commitment fee charged to clients for booking a 1-on-1 real estate consultation.
                  </p>

                  {feeMessage && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                      <span>{feeMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleUpdateConsultationFee} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold uppercase text-slate-600 mb-1">
                        Consultation Commitment Fee (₦)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="500"
                        value={consultationFee}
                        onChange={(e) => setConsultationFee(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-brand-navy text-sm font-bold text-slate-900"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={feeLoading}
                      className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                    >
                      {feeLoading ? "Saving Price..." : `Save Consultation Price (₦${consultationFee.toLocaleString()})`}
                    </button>
                  </form>
                </div>

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
                        <div className="font-bold text-slate-900">info@pdbhomes.com.ng</div>
                        <div className="text-[11px] text-emerald-700 font-bold">Super Admin</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        Active
                      </span>
                    </div>
                  </div>
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
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block font-bold uppercase text-slate-700 text-xs">
                    Listing Photos (Up to 5 Images: 1 Primary + 4 Optional) *
                  </label>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {uploadedImages.length} / 5 photos uploaded
                  </span>
                </div>

                {imageUploadError && (
                  <div className="mb-2 p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                    {imageUploadError}
                  </div>
                )}

                {/* Direct Upload Dropzone */}
                {uploadedImages.length < 5 && (
                  <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl cursor-pointer bg-slate-50 hover:bg-emerald-50/40 transition-colors">
                    <UploadCloud className="w-7 h-7 text-emerald-600 mb-1" />
                    <span className="text-xs font-bold text-slate-800">
                      {uploadingImage ? "Processing photo..." : "Click to Upload Photos from Device"}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      Direct upload (JPEG, PNG, WEBP) &bull; Up to {5 - uploadedImages.length} more
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={uploadingImage}
                      onChange={handleImageFiles}
                      className="hidden"
                    />
                  </label>
                )}

                {/* Uploaded Thumbnails Preview Grid */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-3">
                    {uploadedImages.map((img, idx) => (
                      <div
                        key={img.id}
                        className={`relative rounded-xl overflow-hidden border-2 bg-slate-100 group aspect-[4/3] flex flex-col justify-between ${
                          img.isPrimary ? "border-emerald-500 shadow-md ring-2 ring-emerald-500/20" : "border-slate-200"
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={`Photo ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />

                        {/* Primary Badge or Set As Primary */}
                        <div className="absolute top-1.5 left-1.5">
                          {img.isPrimary ? (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-extrabold uppercase tracking-wider shadow">
                              Primary
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetPrimary(img.id)}
                              className="px-1.5 py-0.5 rounded bg-black/60 hover:bg-black/80 text-white text-[9px] font-bold backdrop-blur-xs transition-colors"
                            >
                              Make Primary
                            </button>
                          )}
                        </div>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(img.id)}
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600/90 hover:bg-red-700 text-white shadow transition-colors"
                          title="Remove photo"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-600 mb-1">Description / Architectural Highlights</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe property features, documentation, cinema room, swimming pool, water treatment, solar system..."
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
