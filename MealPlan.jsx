// src/MealPlan.jsx
import { useState, useMemo } from "react";
import { CATEGORIES, RECIPES } from "./data/recipes";

export default function MealPlan({ onSelect }) {
  const [cat, setCat] = useState("all");

  
  const list = useMemo(() => {
    if (cat === "all") return RECIPES;
    return RECIPES.filter(r => r.category === cat);
  }, [cat]);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      {/* Category filter */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            style={{
              padding: "8px 12px",
              borderRadius: 999,
              border: "1px solid #e5e7eb",
              background: c === cat ? "#eef2ff" : "#fff",
              cursor: "pointer"
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Results info */}
      <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 8 }}>
        Showing {list.length} recipe{list.length !== 1 ? "s" : ""} in “{cat}”
      </div>

      {/* Recipe cards */}
      <div style={{ display: "grid", gap: 12 }}>
        {list.map(r => (
          <button
            key={r.id}
            onClick={() => onSelect(r.id)}
            style={{
              textAlign: "left",
              width: "100%",
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 16,
              boxShadow: "0 6px 18px rgba(2,6,23,.06)",
              cursor: "pointer"
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{r.title}</div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>
              {r.time} min • serves {r.servings} • {r.category}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
