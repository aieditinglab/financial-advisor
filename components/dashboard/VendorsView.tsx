"use client";

import { useState } from "react";

interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  minOrder: string;
  shipping: string;
  description: string;
  tags: string[];
  verified: boolean;
}

const VENDORS: Vendor[] = [
  {
    id: "1",
    name: "PremiumReps Direct",
    category: "Sneakers & Streetwear",
    rating: 4.8,
    minOrder: "$150",
    shipping: "7-14 days",
    description: "Top-tier replica sneakers and streetwear. Known for consistent quality and fast QC photos.",
    tags: ["Sneakers", "Streetwear", "Fast QC"],
    verified: true,
  },
  {
    id: "2",
    name: "LuxeFinds Wholesale",
    category: "Designer Accessories",
    rating: 4.6,
    minOrder: "$200",
    shipping: "10-18 days",
    description: "High-quality designer bags, wallets, and accessories. Excellent packaging and discrete shipping.",
    tags: ["Bags", "Accessories", "Designer"],
    verified: true,
  },
  {
    id: "3",
    name: "StreetKingz Supply",
    category: "Clothing & Apparel",
    rating: 4.5,
    minOrder: "$100",
    shipping: "8-15 days",
    description: "Budget-friendly streetwear and casual clothing. Great margins for resellers starting out.",
    tags: ["Clothing", "Budget", "Bulk"],
    verified: true,
  },
  {
    id: "4",
    name: "TechFlip Source",
    category: "Electronics & Gadgets",
    rating: 4.4,
    minOrder: "$250",
    shipping: "5-10 days",
    description: "Refurbished electronics and accessories. AirPods, cases, chargers at wholesale prices.",
    tags: ["Electronics", "Accessories", "Refurb"],
    verified: false,
  },
  {
    id: "5",
    name: "VintageVault Co.",
    category: "Vintage & Thrift",
    rating: 4.7,
    minOrder: "$75",
    shipping: "3-7 days (domestic)",
    description: "Curated vintage bundles from estate sales and warehouse clearouts. Perfect for Depop/Poshmark sellers.",
    tags: ["Vintage", "Thrift", "Curated"],
    verified: true,
  },
];

const GUIDE_STEPS = [
  {
    step: 1,
    title: "Research Your Niche",
    description: "Start with a category you know well. Sneakers, vintage clothing, electronics — pick what excites you and where you can spot value.",
    icon: "1",
  },
  {
    step: 2,
    title: "Find Reliable Vendors",
    description: "Use our verified vendor list below. Start small with minimum orders to test quality before committing to bulk purchases.",
    icon: "2",
  },
  {
    step: 3,
    title: "Calculate Your Margins",
    description: "Use the Fee Calculator to ensure profitability. Factor in COGS, platform fees, shipping, and your time. Aim for 40%+ margins.",
    icon: "3",
  },
  {
    step: 4,
    title: "List Across Platforms",
    description: "Cross-list on eBay, Depop, and Facebook Marketplace. Different platforms attract different buyers. More exposure = faster sales.",
    icon: "4",
  },
  {
    step: 5,
    title: "Track Everything",
    description: "Use Bolt Resell AI to track every flip. The AI insights will show you what's working and where to focus your energy.",
    icon: "5",
  },
];

export default function VendorsView() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["all", ...Array.from(new Set(VENDORS.map((v) => v.category)))];

  const filtered = VENDORS.filter((v) => {
    const matchesCategory = activeCategory === "all" || v.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: "920px", margin: "0 auto", padding: "1.75rem 1rem 3rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <h1
          className="serif"
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2rem)",
            fontWeight: 500,
            margin: 0,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
          }}
        >
          Vendors & Reselling Guide
        </h1>
        <p style={{ color: "var(--text-secondary)", margin: "6px 0 0", fontSize: "0.92rem" }}>
          Find quality suppliers and learn the reselling process from sourcing to selling.
        </p>
      </div>

      {/* Quick-start Guide */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--espresso, #3D2B1F), var(--ink, #212529))",
          borderRadius: 16,
          padding: "1.75rem",
          marginBottom: "2rem",
          color: "#FFFDD0",
        }}
      >
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, margin: "0 0 1.25rem", letterSpacing: "-0.01em" }}>
          How to Start Reselling
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
          }}
        >
          {GUIDE_STEPS.map((step) => (
            <div
              key={step.step}
              style={{
                background: "rgba(255,253,208,0.06)",
                border: "1px solid rgba(255,253,208,0.12)",
                borderRadius: 12,
                padding: "1rem",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--accent, #E2725B)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  color: "#fff",
                  marginBottom: "0.6rem",
                }}
              >
                {step.icon}
              </div>
              <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.35rem" }}>
                {step.title}
              </div>
              <div style={{ fontSize: "0.78rem", opacity: 0.72, lineHeight: 1.5 }}>
                {step.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vendor Directory */}
      <div style={{ marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", margin: "0 0 0.85rem" }}>
          Verified Vendor Directory
        </h2>

        {/* Filters */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="fl-input"
            style={{ maxWidth: 200, padding: "0.45rem 0.75rem", fontSize: "0.85rem" }}
          />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.4rem 0.85rem",
                borderRadius: 20,
                fontSize: "0.78rem",
                fontWeight: 500,
                border: "1px solid var(--border)",
                background: activeCategory === cat ? "var(--espresso, #3D2B1F)" : "var(--surface)",
                color: activeCategory === cat ? "#FFFDD0" : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 160ms ease",
                fontFamily: "inherit",
              }}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vendor Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {filtered.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
        {filtered.length === 0 && (
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center", padding: "2rem 0" }}>
            No vendors match your search.
          </p>
        )}
      </div>

      {/* Disclaimer */}
      <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "2rem", textAlign: "center", lineHeight: 1.6 }}>
        Vendor listings are community-sourced. Always order samples before bulk purchasing.
        Bolt Resell AI does not guarantee vendor quality or authenticity.
      </p>
    </div>
  );
}

function VendorCard({ vendor }: { vendor: Vendor }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="fl-lift"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "1.15rem 1.4rem",
        cursor: "pointer",
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
            <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--ink)" }}>
              {vendor.name}
            </span>
            {vendor.verified && (
              <span
                style={{
                  fontSize: "0.68rem",
                  background: "var(--sage-soft, #E8EDDA)",
                  color: "var(--sage-deep, #5A6B3B)",
                  padding: "2px 7px",
                  borderRadius: 12,
                  fontWeight: 600,
                }}
              >
                Verified
              </span>
            )}
          </div>
          <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
            {vendor.category}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--accent, #E2725B)" }}>
            {"★".repeat(Math.round(vendor.rating))} {vendor.rating}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Min: {vendor.minOrder}
          </div>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: "0.85rem", paddingTop: "0.85rem", borderTop: "1px solid var(--border)" }}>
          <p style={{ fontSize: "0.88rem", color: "var(--ink)", lineHeight: 1.6, margin: "0 0 0.6rem" }}>
            {vendor.description}
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
            {vendor.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.72rem",
                  background: "var(--paper-soft)",
                  border: "1px solid var(--border)",
                  padding: "3px 9px",
                  borderRadius: 12,
                  color: "var(--text-secondary)",
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Shipping: {vendor.shipping}
          </div>
        </div>
      )}
    </div>
  );
}
