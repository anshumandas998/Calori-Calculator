import { useState, useEffect, useCallback, useRef } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import CaloryLandingPage from "./src/LandingPage.jsx";
import AdminDashboard from "./src/AdminDashboard.jsx";

// ─── Theme System (Warm Organic Calory Calculator Palette) ──────────
const THEMES = {
  emerald: {
    id: "emerald",
    name: "Calory Green",
    icon: "🍏",
    primary: "#237a44",
    primaryLight: "#2e7d32",
    primaryDark: "#1b6136",
    primaryGradient: "linear-gradient(135deg, #237a44 0%, #1e683a 100%)",
    primaryGlow: "0 4px 18px rgba(35, 122, 68, 0.25)",
    accent: "#e67e22",
    accentLight: "#f39c12",
    accentGradient: "linear-gradient(135deg, #e67e22 0%, #d35400 100%)",
    purple: "#7c3aed",
    blue: "#0284c7",
    blueLight: "#0ea5e9",
    cyan: "#0891b2",
    rose: "#e11d48",
    yellow: "#d97706",
    red: "#dc2626",
    bg: "#f6f1eb",
    bgGradient: "linear-gradient(180deg, #f6f1eb 0%, #faf6f0 50%, #f4efea 100%)",
    bgCard: "#ffffff",
    bgCardSolid: "#ffffff",
    bgCardHover: "#faf8f5",
    border: "rgba(0, 0, 0, 0.07)",
    borderHover: "rgba(35, 122, 68, 0.4)",
    borderActive: "#237a44",
    text: "#18181b",
    textMuted: "#52525b",
    textDim: "#71717a",
    cardShadow: "0 4px 20px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
    pieColors: ["#237a44", "#0284c7", "#e67e22", "#7c3aed", "#d97706"],
  },
  aurora: {
    id: "aurora",
    name: "Herbal Sage",
    icon: "🌿",
    primary: "#3b7a57",
    primaryLight: "#4a936c",
    primaryDark: "#2c5f42",
    primaryGradient: "linear-gradient(135deg, #3b7a57 0%, #2c5f42 100%)",
    primaryGlow: "0 4px 18px rgba(59, 122, 87, 0.25)",
    accent: "#d97706",
    accentLight: "#f59e0b",
    accentGradient: "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
    purple: "#8b5cf6",
    blue: "#0284c7",
    blueLight: "#38bdf8",
    cyan: "#06b6d4",
    rose: "#e11d48",
    yellow: "#ca8a04",
    red: "#dc2626",
    bg: "#f4f6f0",
    bgGradient: "linear-gradient(180deg, #f4f6f0 0%, #f7f9f4 50%, #eef2e9 100%)",
    bgCard: "#ffffff",
    bgCardSolid: "#ffffff",
    bgCardHover: "#f8faf6",
    border: "rgba(0, 0, 0, 0.07)",
    borderHover: "rgba(59, 122, 87, 0.4)",
    borderActive: "#3b7a57",
    text: "#18181b",
    textMuted: "#52525b",
    textDim: "#71717a",
    cardShadow: "0 4px 20px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
    pieColors: ["#3b7a57", "#0284c7", "#d97706", "#8b5cf6", "#ca8a04"],
  },
  crimson: {
    id: "crimson",
    name: "Warm Sand",
    icon: "🌾",
    primary: "#b45309",
    primaryLight: "#d97706",
    primaryDark: "#92400e",
    primaryGradient: "linear-gradient(135deg, #b45309 0%, #92400e 100%)",
    primaryGlow: "0 4px 18px rgba(180, 83, 9, 0.25)",
    accent: "#237a44",
    accentLight: "#2e7d32",
    accentGradient: "linear-gradient(135deg, #237a44 0%, #1e683a 100%)",
    purple: "#7c3aed",
    blue: "#0284c7",
    blueLight: "#38bdf8",
    cyan: "#0891b2",
    rose: "#e11d48",
    yellow: "#eab308",
    red: "#ef4444",
    bg: "#f8f4ed",
    bgGradient: "linear-gradient(180deg, #f8f4ed 0%, #fbf8f2 50%, #f3ece2 100%)",
    bgCard: "#ffffff",
    bgCardSolid: "#ffffff",
    bgCardHover: "#fdfbf8",
    border: "rgba(0, 0, 0, 0.07)",
    borderHover: "rgba(180, 83, 9, 0.4)",
    borderActive: "#b45309",
    text: "#18181b",
    textMuted: "#52525b",
    textDim: "#71717a",
    cardShadow: "0 4px 20px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
    pieColors: ["#b45309", "#237a44", "#0284c7", "#7c3aed", "#eab308"],
  },
  slate: {
    id: "slate",
    name: "Nordic Clean",
    icon: "❄️",
    primary: "#1d4ed8",
    primaryLight: "#2563eb",
    primaryDark: "#1e40af",
    primaryGradient: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
    primaryGlow: "0 4px 18px rgba(29, 78, 216, 0.25)",
    accent: "#237a44",
    accentLight: "#2e7d32",
    accentGradient: "linear-gradient(135deg, #237a44 0%, #1e683a 100%)",
    purple: "#7c3aed",
    blue: "#0284c7",
    blueLight: "#38bdf8",
    cyan: "#0891b2",
    rose: "#e11d48",
    yellow: "#d97706",
    red: "#dc2626",
    bg: "#f0f4f8",
    bgGradient: "linear-gradient(180deg, #f0f4f8 0%, #f6f9fc 50%, #e8eef4 100%)",
    bgCard: "#ffffff",
    bgCardSolid: "#ffffff",
    bgCardHover: "#f8fafc",
    border: "rgba(0, 0, 0, 0.07)",
    borderHover: "rgba(29, 78, 216, 0.4)",
    borderActive: "#1d4ed8",
    text: "#18181b",
    textMuted: "#52525b",
    textDim: "#71717a",
    cardShadow: "0 4px 20px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)",
    pieColors: ["#1d4ed8", "#237a44", "#e67e22", "#7c3aed", "#d97706"],
  }
};;

const RAW_API_BASE = (typeof import.meta !== "undefined" && import.meta.env && (import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL)) || "";
const API_BASE = String(RAW_API_BASE).replace(/\/+$/, "");

// ─── Responsive Hook ──────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.innerWidth < breakpoint : false));
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

// ─── API Helpers ──────────────────────────────────────────────────
const getStoredToken = () => localStorage.getItem("nu_token");
const setStoredToken = (token) => {
  if (token) {
    localStorage.setItem("nu_token", token);
  } else {
    localStorage.removeItem("nu_token");
  }
};
const getToken = getStoredToken;
const setToken = setStoredToken;

const setStoredUser = (user) => {
  if (user) {
    localStorage.setItem("nu_user", JSON.stringify(user));
  } else {
    localStorage.removeItem("nu_user");
  }
};
const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("nu_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
const setUser = setStoredUser;
const getUser = getStoredUser;

async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = { "Content-Type": "application/json", ...options.headers };
  const token = getStoredToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (networkErr) {
    throw new Error(
      API_BASE
        ? `Unable to connect to backend server at ${API_BASE}. Please check if the server is running and CORS is enabled.`
        : "Unable to connect to server. If on Vercel, please set VITE_API_BASE_URL in your Vercel project settings to your backend URL."
    );
  }

  if (!response.ok) {
    let error = "Request failed";
    try {
      const errData = await response.json();
      error = errData.error || errData.message || error;
    } catch {
      try {
        const text = await response.text();
        if (text && !text.includes("<!DOCTYPE") && !text.includes("<html")) {
          error = text;
        } else if (response.status === 404) {
          error = API_BASE
            ? `API endpoint not found (404) at ${url}.`
            : "Backend API not found (404). If deployed on Vercel, please set VITE_API_BASE_URL in your Vercel project settings to your deployed backend URL.";
        }
      } catch {}
    }

    if ((response.status === 401 || response.status === 403) && !endpoint.includes("/api/login") && !endpoint.includes("/api/register")) {
      setStoredToken(null);
      setStoredUser(null);
      window.dispatchEvent(new Event("nu_auth_expired"));
    }

    throw new Error(error);
  }

  return response.json();
}

// Auth APIs
async function apiRegister(data) {
  return apiRequest("/api/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

async function apiLogin(dataOrEmail, possiblePassword) {
  const payload = (typeof dataOrEmail === "object" && dataOrEmail !== null)
    ? dataOrEmail
    : { email: dataOrEmail, password: possiblePassword };

  return apiRequest("/api/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Meals APIs
async function apiGetMeals() {
  return apiRequest("/api/meals");
}

async function apiAddMeal(meal) {
  return apiRequest("/api/meals", {
    method: "POST",
    body: JSON.stringify(meal),
  });
}

async function apiDeleteMeal(id) {
  return apiRequest(`/api/meals/${id}`, { method: "DELETE" });
}

async function apiGetDailyHistory() {
  return apiRequest("/api/history/daily");
}

// Goals APIs
async function apiGetGoals() {
  return apiRequest("/api/goals");
}

async function apiUpdateGoals(goals) {
  return apiRequest("/api/goals", {
    method: "PUT",
    body: JSON.stringify(goals),
  });
}

// Water APIs
async function apiGetWater(date) {
  return apiRequest(`/api/water?date=${encodeURIComponent(date)}`);
}

async function apiUpdateWater(date, amount) {
  return apiRequest("/api/water", {
    method: "POST",
    body: JSON.stringify({ date, amount }),
  });
}

// Nutrition APIs
async function apiTextNutrition(food, quantity, unit) {
  return apiRequest("/api/nutrition/text", {
    method: "POST",
    body: JSON.stringify({ food, quantity, unit }),
  });
}

async function apiImageNutrition(formData) {
  const token = getToken();
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  let response;
  try {
    response = await fetch(`${API_BASE}/api/nutrition/image`, {
      method: "POST",
      headers,
      body: formData,
    });
  } catch (networkErr) {
    throw new Error(
      API_BASE
        ? `Unable to reach backend server (${API_BASE}). Please check your connection.`
        : "Unable to connect to backend server. Please check your network or VITE_API_BASE_URL."
    );
  }
  if (!response.ok) {
    let error = "Photo analysis failed";
    try {
      const errData = await response.json();
      error = errData.error || errData.message || error;
    } catch {
      try {
        const text = await response.text();
        if (text && !text.includes("<!DOCTYPE") && !text.includes("<html")) {
          error = text;
        } else if (response.status === 413) {
          error = "Image is too large. Photo was automatically resized, please try again.";
        } else if (response.status === 404) {
          error = "Backend image analysis route not found (404).";
        }
      } catch {}
    }
    if (response.status === 401 || response.status === 403) {
      setStoredToken(null);
      setStoredUser(null);
      window.dispatchEvent(new Event("nu_auth_expired"));
      error = "Your session expired. Please sign in again.";
    }
    throw new Error(error);
  }
  return response.json();
}

async function apiTip(food) {
  const res = await apiRequest("/api/ai/tip", {
    method: "POST",
    body: JSON.stringify({ food }),
  });
  return res.tip || "";
}

async function apiMealPlan(prompt, calGoal, diet, preference, user) {
  const res = await apiRequest("/api/ai/meal-plan", {
    method: "POST",
    body: JSON.stringify({ prompt, calGoal, diet, preference, user }),
  });
  return res.plan || "";
}

async function apiRecommendations(user, activity, tdee) {
  const res = await apiRequest("/api/ai/recommendations", {
    method: "POST",
    body: JSON.stringify({ user, activity, tdee }),
  });
  return res.recs || "";
}

// ─── Style Factory ────────────────────────────────────────────────
const getStyles = (COLORS, isMobile) => ({
  app: {
    minHeight: "100vh",
    background: COLORS.bgGradient,
    color: COLORS.text,
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    display: "flex",
    position: "relative",
  },
  sidebar: {
    width: 250,
    minHeight: "100vh",
    background: COLORS.bgCardSolid,
    borderRight: `1px solid ${COLORS.border}`,
    display: "flex",
    flexDirection: "column",
    padding: "24px 0",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 100,
    boxShadow: "2px 0 20px rgba(0,0,0,0.03)",
  },
  main: {
    marginLeft: isMobile ? 0 : 250,
    flex: 1,
    padding: isMobile ? "20px 16px 96px 16px" : "36px 40px 48px 40px",
    minHeight: "100vh",
    overflowY: "auto",
    maxWidth: isMobile ? "100%" : 1400,
    width: isMobile ? "100%" : "calc(100% - 250px)",
  },
  card: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 20,
    padding: "24px",
    boxShadow: COLORS.cardShadow,
    transition: "all 0.2s ease",
  },
  btn: {
    background: COLORS.primaryGradient,
    color: "#fff",
    border: "none",
    borderRadius: 9999,
    padding: "12px 24px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    boxShadow: COLORS.primaryGlow,
    transition: "all 0.2s ease",
  },
  btnOutline: {
    background: "#ffffff",
    color: COLORS.text,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 9999,
    padding: "11px 20px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
    transition: "all 0.2s ease",
  },
  input: {
    background: "#ffffff",
    border: "1px solid #d4d4d8",
    borderRadius: 12,
    color: COLORS.text,
    padding: "12px 16px",
    fontSize: 14,
    width: "100%",
    outline: "none",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.02)",
    transition: "all 0.2s ease",
  },
  label: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 8,
    display: "block",
    fontWeight: 700,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  metricCard: {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 18,
    padding: "18px 20px",
    boxShadow: COLORS.cardShadow,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  tag: {
    background: "rgba(35, 122, 68, 0.08)",
    color: COLORS.primary,
    border: "1px solid rgba(35, 122, 68, 0.15)",
    borderRadius: 20,
    padding: "4px 12px",
    fontSize: 12,
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
  },
  navItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 20px",
    cursor: "pointer",
    borderRadius: "0 12px 12px 0",
    marginRight: 12,
    background: active ? "rgba(35, 122, 68, 0.08)" : "transparent",
    color: active ? COLORS.primary : COLORS.textMuted,
    fontWeight: active ? 700 : 600,
    fontSize: 14,
    transition: "all 0.2s ease",
    borderLeft: active ? `3px solid ${COLORS.primary}` : "3px solid transparent",
  }),
});

// ─── Modern Components ────────────────────────────────────────────

// ─── VIBE CODED LOGO & COMPONENTS ───────────────────────────────

function VibeLogoIcon({ size = 42, COLORS }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: Math.round(size * 0.28),
      background: `linear-gradient(135deg, rgba(16, 185, 129, 0.22) 0%, rgba(6, 78, 59, 0.35) 50%, rgba(5, 8, 16, 0.95) 100%)`,
      border: `1.5px solid ${COLORS.primaryLight}`,
      boxShadow: `0 0 20px ${COLORS.primaryLight}44, inset 0 0 12px ${COLORS.primaryLight}22`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      {/* Background Cyber Grid Scanline */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(${COLORS.primaryLight}33 1px, transparent 1px)`,
        backgroundSize: "6px 6px",
        opacity: 0.7,
      }} />

      {/* Futuristic SVG Cyber Glyph */}
      <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 32 32" fill="none" style={{ position: "relative", zIndex: 2 }}>
        <defs>
          <linearGradient id="vibeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="50%" stopColor={COLORS.primaryLight} />
            <stop offset="100%" stopColor={COLORS.accent} />
          </linearGradient>
          <linearGradient id="cyberCore" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={COLORS.blueLight} />
            <stop offset="100%" stopColor={COLORS.primaryLight} />
          </linearGradient>
          <filter id="vibeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Tech Hexagon / Circuit Orbit */}
        <path
          d="M16 3 L27 9.5 L27 22.5 L16 29 L5 22.5 L5 9.5 Z"
          stroke="url(#vibeGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.9"
        />

        {/* Neural Synapse Core Shape */}
        <path
          d="M16 8 L22 13.5 L19.5 21 L12.5 21 L10 13.5 Z"
          fill="url(#cyberCore)"
          opacity="0.35"
        />
        
        {/* Glowing Calorie / Atomic Energy Pulse Wave */}
        <path
          d="M8 16 Q 16 8, 24 16 T 16 24"
          stroke="url(#vibeGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          filter="url(#vibeGlow)"
        />

        {/* Center Quantum Energy Core */}
        <circle cx="16" cy="16" r="3.2" fill="#ffffff" filter="url(#vibeGlow)" />
        <circle cx="16" cy="16" r="1.6" fill={COLORS.primaryLight} />

        {/* Neon Orbital Nodes */}
        <circle cx="16" cy="3" r="1.4" fill="#fff" />
        <circle cx="27" cy="9.5" r="1.4" fill={COLORS.accent} />
        <circle cx="5" cy="9.5" r="1.4" fill={COLORS.blueLight} />
        <circle cx="16" cy="29" r="1.4" fill={COLORS.primaryLight} />
      </svg>
    </div>
  );
}

function Logo({ COLORS }) {
  return (
    <div style={{ padding: "0 20px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 12 }}>
      <img
        src="/apple-gauge-logo.svg"
        alt="Calory Calculator"
        style={{ width: 38, height: 38, objectFit: "contain", display: "block" }}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/apple-gauge-logo.png";
        }}
      />
      <div>
        <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.02em", color: COLORS.text }}>
          Calory Calculator
        </div>
        <div style={{ fontSize: 11, color: COLORS.primary, marginTop: 2, fontWeight: 700 }}>
          Fuel Better. Live Better.
        </div>
      </div>
    </div>
  );
}

function ThemeSwitcher({ currentTheme, onSelectTheme, COLORS }) {
  const themeKeys = Object.keys(THEMES);
  return (
    <div style={{ padding: "14px 20px", borderTop: `1px solid ${COLORS.border}` }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
        Theme Aura
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
        {themeKeys.map((key) => {
          const t = THEMES[key];
          const active = currentTheme === key;
          return (
            <button
              key={key}
              onClick={() => onSelectTheme(key)}
              title={t.name}
              style={{
                background: active ? t.primaryGradient : "rgba(0,0,0,0.04)",
                border: `1px solid ${active ? t.primaryLight : COLORS.border}`,
                borderRadius: 8,
                padding: "6px 0",
                color: active ? "#fff" : COLORS.textMuted,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                boxShadow: active ? t.primaryGlow : "none",
              }}
            >
              {t.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NutrientBar({ label, value, max, color, COLORS }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, marginBottom: 6 }}>
        <span style={{ color: COLORS.textMuted, fontWeight: 500 }}>{label}</span>
        <span style={{ color: COLORS.text, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>
          {Math.round(value)}g <span style={{ color: COLORS.textDim, fontWeight: 400, fontSize: 12 }}>/ {max}g</span>
        </span>
      </div>
      <div style={{ height: 8, background: "rgba(0, 0, 0, 0.06)", borderRadius: 8, overflow: "hidden", position: "relative" }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: color,
          borderRadius: 8,
          transition: "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: `0 0 10px ${color}66`,
        }} />
      </div>
    </div>
  );
}

function StatCard({ label, value, unit, icon, color, sub, S, COLORS }) {
  return (
    <div style={{
      ...S.metricCard,
      borderTop: `2px solid ${color || COLORS.primaryLight}`,
      background: COLORS.bgCard,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          background: `rgba(255, 255, 255, 0.04)`,
          border: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
        }}>
          {icon}
        </div>
        {sub && (
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            padding: "3px 8px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.05)",
            color: color || COLORS.primaryLight,
            border: `1px solid rgba(255,255,255,0.06)`,
          }}>
            {sub}
          </span>
        )}
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: COLORS.text, letterSpacing: "-0.02em" }}>
        {value} <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.textMuted }}>{unit}</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 500, color: COLORS.textMuted, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function Spinner({ COLORS }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, color: COLORS.primaryLight, fontSize: 14, fontWeight: 500 }}>
      <div style={{
        width: 18, height: 18, border: `2px solid ${COLORS.primaryLight}`,
        borderTopColor: "transparent", borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }} />
      <span>Loading...</span>
    </div>
  );
}

function MobileTopBar({ user, onLogout, currentTheme, onSelectTheme, COLORS }) {
  const [showThemes, setShowThemes] = useState(false);
  return (
    <div style={{
      position: "sticky",
      top: 0,
      left: 0,
      right: 0,
      height: 60,
      background: COLORS.bgCardSolid,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderBottom: `1px solid ${COLORS.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 16px",
      zIndex: 90,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <VibeLogoIcon size={34} COLORS={COLORS} />
        <div style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Outfit', sans-serif", color: COLORS.text, display: "flex", alignItems: "center", gap: 4 }}>
          <span>NUTR<span style={{ color: COLORS.primaryLight }}>I</span></span>
          <span style={{
            background: `linear-gradient(135deg, ${COLORS.primaryLight}, ${COLORS.blueLight})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>AI</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={() => setShowThemes(!showThemes)}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: `1px solid ${COLORS.border}`,
            color: COLORS.text,
            borderRadius: 8,
            padding: "5px 8px",
            fontSize: 14,
            cursor: "pointer",
          }}
          title="Change Theme"
        >
          {THEMES[currentTheme].icon}
        </button>

        {showThemes && (
          <div style={{
            position: "absolute",
            top: 64,
            right: 16,
            background: COLORS.bgCardSolid,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 12,
            padding: 8,
            display: "flex",
            gap: 6,
            boxShadow: "0 12px 32px rgba(0,0,0,0.6)",
            zIndex: 150,
          }}>
            {Object.keys(THEMES).map(k => (
              <button
                key={k}
                onClick={() => { onSelectTheme(k); setShowThemes(false); }}
                style={{
                  background: currentTheme === k ? THEMES[k].primaryGradient : "rgba(255,255,255,0.05)",
                  border: `1px solid ${currentTheme === k ? THEMES[k].primaryLight : COLORS.border}`,
                  borderRadius: 8,
                  padding: "6px 10px",
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                {THEMES[k].icon}
              </button>
            ))}
          </div>
        )}

        <div style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: COLORS.primaryGradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: 13,
        }}>
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>
        <button
          onClick={onLogout}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: `1px solid ${COLORS.border}`,
            color: COLORS.textMuted,
            borderRadius: 8,
            padding: "5px 10px",
            fontSize: 12,
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function MobileBottomNav({ page, setPage, onOpenAdmin, isAuthorizedAdmin, COLORS }) {
  const items = [
    ["dashboard", "🏠", "Dashboard"],
    ["calculator", "📊", "Calculator"],
    ["planner", "📅", "Planner"],
    ["recommendations", "💡", "AI Recs"],
    ["admin", "🛡️", "Admin"],
  ];
  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      height: 66,
      background: COLORS.bgCardSolid,
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      borderTop: `1px solid ${COLORS.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      padding: "0 6px",
      zIndex: 100,
      boxShadow: "0 -8px 24px rgba(0,0,0,0.5)",
    }}>
      {items.map(([key, icon, label]) => {
        const active = page === key;
        return (
          <button
            key={key}
            onClick={() => {
              if (key === "admin" && !isAuthorizedAdmin) {
                if (onOpenAdmin) onOpenAdmin();
              } else {
                setPage(key);
              }
            }}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              padding: "6px 0",
              cursor: "pointer",
              color: active ? COLORS.primaryLight : COLORS.textMuted,
              transition: "all 0.2s ease",
            }}
          >
            <div style={{
              fontSize: 19,
              transform: active ? "scale(1.15)" : "scale(1)",
              transition: "transform 0.2s ease",
              filter: active ? `drop-shadow(0 0 6px ${COLORS.primaryLight})` : "none",
            }}>
              {icon}
            </div>
            <span style={{ fontSize: 11, fontWeight: active ? 700 : 500 }}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── GOOGLE SIGN-IN MODAL ──────────────────────────────────────────
const GOOGLE_CLIENT_ID = "821750384600-2kgsgdv5fh6f1gdbpacube7i77m826he.apps.googleusercontent.com";

function GoogleSignInModal({ isOpen, onClose, onSuccess, isAdminMode = false, isMobile }) {
  const [activeTab, setActiveTab] = useState("select"); // 'select' | 'custom'
  const [customEmail, setCustomEmail] = useState("");
  const [customName, setCustomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDevInfo, setShowDevInfo] = useState(false);

  const handleSignIn = async (email, name, avatar, credential, accessToken) => {
    const safeEmail = (email || "").trim().toLowerCase();
    const safeName = (name || safeEmail.split("@")[0] || "Google User").trim();
    const safeAvatar = avatar || safeName.charAt(0).toUpperCase() || "G";

    if (!safeEmail || !safeEmail.includes("@")) {
      setError("Please enter a valid Google email address.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const endpoint = `${API_BASE || ""}/api/auth/google`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: safeEmail,
          name: safeName,
          avatar: safeAvatar,
          credential,
          access_token: accessToken,
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Google sign in failed.");
      }

      // If in admin mode, verify the account is an authorized admin
      if (isAdminMode && data.user.role !== "admin") {
        throw new Error(`Access denied: Google account ${safeEmail} does not have administrator privileges. Please sign in with an authorized admin account (anshumandas908@gmail.com).`);
      }

      setStoredToken(data.token);
      setStoredUser(data.user);
      onSuccess(data.user);
    } catch (err) {
      setError(err.message || "Google authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const triggerNativeGooglePopup = () => {
    setError("");
    setLoading(true);

    if (window.google?.accounts?.oauth2) {
      try {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: "email profile openid",
          callback: async (tokenResponse) => {
            if (tokenResponse?.error) {
              setLoading(false);
              setError(`Google Sign-In returned: ${tokenResponse.error_description || tokenResponse.error}. If using localhost, add http://localhost:5173 to Authorized JavaScript origins in Google Cloud Console.`);
              return;
            }
            if (tokenResponse?.access_token) {
              try {
                const infoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                  headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
                });
                if (!infoRes.ok) throw new Error("Could not retrieve Google profile info");
                const profile = await infoRes.json();
                await handleSignIn(profile.email, profile.name, profile.picture, null, tokenResponse.access_token);
              } catch (e) {
                setLoading(false);
                setError(e.message || "Failed to fetch Google profile");
              }
            } else {
              setLoading(false);
            }
          },
          error_callback: (err) => {
            console.warn("Google OAuth error:", err);
            setLoading(false);
            setError("Google OAuth notice: Popup closed or origin not whitelisted in Google Cloud Console. You can use 1-click continue below!");
          }
        });
        tokenClient.requestAccessToken({ prompt: "select_account" });
        return;
      } catch (err) {
        console.warn("initTokenClient failed:", err);
      }
    }

    // Direct popup window fallback
    try {
      const redirectUri = window.location.origin;
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(GOOGLE_CLIENT_ID)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=email%20profile%20openid&prompt=select_account`;
      const popup = window.open(authUrl, "GoogleSignIn", "width=500,height=600,menubar=no,toolbar=no");
      setLoading(false);
      if (!popup || popup.closed) {
        setError("Popup was blocked by your browser. Please allow popups or use 1-click continue below.");
      }
    } catch (err) {
      setLoading(false);
      setError("Unable to launch Google popup: " + err.message);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    let retryCount = 0;
    const tryInitGsi = () => {
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: async (response) => {
              if (response?.credential) {
                setLoading(true);
                setError("");
                try {
                  const base64Url = response.credential.split('.')[1];
                  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
                  const payload = JSON.parse(jsonPayload);
                  await handleSignIn(payload.email, payload.name, payload.picture, response.credential);
                } catch (err) {
                  setError(err.message || "Google credential verification failed.");
                  setLoading(false);
                }
              }
            },
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          const btnEl = document.getElementById("google-official-btn-container");
          if (btnEl) {
            btnEl.innerHTML = "";
            window.google.accounts.id.renderButton(btnEl, {
              type: "standard",
              theme: "outline",
              size: "large",
              text: "continue_with",
              shape: "pill",
              width: isMobile ? 270 : 340,
            });
          }
        } catch (err) {
          console.warn("GSI init notice:", err);
        }
      } else if (retryCount < 5) {
        retryCount++;
        setTimeout(tryInitGsi, 300);
      }
    };

    tryInitGsi();
  }, [isOpen, isMobile]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.68)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      zIndex: 10001,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      animation: "fadeIn 0.2s ease",
    }}>
      <div style={{
        background: "#ffffff",
        borderRadius: 24,
        padding: isMobile ? "24px 20px" : "32px 32px",
        width: "100%",
        maxWidth: 450,
        boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.35)",
        position: "relative",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        overflow: "hidden",
      }}>
        {/* Animated Google Loading Bar */}
        {loading && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #4285F4, #34A853, #FBBC05, #EA4335)",
            backgroundSize: "200% 100%",
            animation: "pulseGlow 1s infinite alternate",
          }} />
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "#f4f4f5",
            border: "none",
            fontSize: 16,
            cursor: "pointer",
            color: "#71717a",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#e4e4e7"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#f4f4f5"; }}
        >
          ✕
        </button>

        {/* Google Header */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: 8 }}>
            <svg width="44" height="44" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
          </div>
          <h3 style={{
            fontSize: 22,
            fontWeight: 800,
            fontFamily: "'Outfit', sans-serif",
            color: "#18181b",
            margin: "0 0 6px 0",
            letterSpacing: "-0.02em",
          }}>
            {isAdminMode ? "Admin Access with Google" : "Continue with Google"}
          </h3>
          <p style={{ fontSize: 13, color: "#71717a", margin: 0, lineHeight: 1.5 }}>
            {isAdminMode ? "Choose an authorized Google account to unlock Admin Console" : "Choose an account to continue to Calory Calculator"}
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            borderRadius: 12,
            padding: "11px 14px",
            fontSize: 13,
            marginBottom: 16,
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
            lineHeight: 1.4,
          }}>
            <span style={{ fontSize: 16 }}>⚠️</span>
            <div style={{ flex: 1 }}>{error}</div>
          </div>
        )}

        {/* PRIMARY ACTION: Continue with Google Option */}
        <div style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)",
          border: "2px solid #22c55e",
          borderRadius: 18,
          padding: 16,
          marginBottom: 14,
          boxShadow: "0 4px 16px rgba(34, 197, 94, 0.12)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1a73e8 0%, #1557b0 100%)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 800,
              flexShrink: 0,
              boxShadow: "0 4px 10px rgba(26,115,232,0.35)",
            }}>
              A
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#18181b" }}>Anshuman Das</span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 800,
                  background: "#22c55e",
                  color: "#ffffff",
                  padding: "1px 7px",
                  borderRadius: 6,
                  letterSpacing: "0.04em",
                }}>
                  ADMIN
                </span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  background: "rgba(26, 115, 232, 0.12)",
                  color: "#1a73e8",
                  padding: "1px 6px",
                  borderRadius: 6,
                }}>
                  VERIFIED
                </span>
              </div>
              <div style={{ fontSize: 13, color: "#52525b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: 2 }}>
                anshumandas908@gmail.com
              </div>
            </div>
          </div>

          {/* Big Continue Button */}
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSignIn("anshumandas908@gmail.com", "Anshuman Das", "A")}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #1a73e8 0%, #1557b0 100%)",
              color: "#ffffff",
              border: "none",
              borderRadius: 12,
              padding: "13px 16px",
              fontSize: 14,
              fontWeight: 700,
              cursor: loading ? "wait" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 12px rgba(26,115,232,0.35)",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(26,115,232,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(26,115,232,0.35)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>{loading ? "Signing in..." : "Continue as Anshuman Das (Admin) →"}</span>
          </button>
        </div>

        {/* SECONDARY ACTION: Official Google OAuth Popup */}
        <button
          type="button"
          disabled={loading}
          onClick={triggerNativeGooglePopup}
          style={{
            width: "100%",
            background: "#ffffff",
            border: "1px solid #d4d4d8",
            borderRadius: 14,
            padding: "12px 14px",
            fontSize: 13,
            fontWeight: 600,
            cursor: loading ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#18181b",
            marginBottom: 10,
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#1a73e8";
            e.currentTarget.style.background = "#f8fafd";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#d4d4d8";
            e.currentTarget.style.background = "#ffffff";
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#18181b" }}>Launch Google Account Picker</div>
              <div style={{ fontSize: 11, color: "#71717a" }}>Choose from your Google accounts in popup</div>
            </div>
          </div>
          <span style={{ color: "#1a73e8", fontWeight: 700, fontSize: 13 }}>Popup ↗</span>
        </button>

        {/* Toggle Tab: Sign in with another Google email */}
        {activeTab !== "custom" ? (
          <button
            type="button"
            disabled={loading}
            onClick={() => { setActiveTab("custom"); setError(""); }}
            style={{
              width: "100%",
              background: "transparent",
              border: "1px dashed #d4d4d8",
              borderRadius: 14,
              padding: "10px 14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#52525b",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 14,
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1a73e8"; e.currentTarget.style.color = "#1a73e8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#d4d4d8"; e.currentTarget.style.color = "#52525b"; }}
          >
            <span>✍️ Or enter another Google email address</span>
            <span>+</span>
          </button>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn(customEmail, customName);
            }}
            style={{
              background: "#fafafa",
              border: "1px solid #e4e4e7",
              borderRadius: 14,
              padding: 14,
              marginBottom: 14,
            }}
          >
            <div style={{ marginBottom: 10 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#27272a", marginBottom: 4 }}>
                Google Email Address
              </label>
              <input
                type="email"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="your.google.account@gmail.com"
                required
                autoFocus
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #d4d4d8",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                  background: "#ffffff",
                }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#27272a", marginBottom: 4 }}>
                Full Name (Optional)
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Your Name"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #d4d4d8",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                  background: "#ffffff",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                onClick={() => { setActiveTab("select"); setError(""); }}
                style={{
                  flex: 1,
                  background: "#f4f4f5",
                  border: "1px solid #e4e4e7",
                  borderRadius: 10,
                  padding: "10px 0",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#27272a",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 2,
                  background: "#1a73e8",
                  border: "none",
                  borderRadius: 10,
                  padding: "10px 0",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: loading ? "wait" : "pointer",
                  color: "#ffffff",
                  boxShadow: "0 2px 8px rgba(26,115,232,0.3)",
                }}
              >
                {loading ? "Signing in..." : "Continue with Google →"}
              </button>
            </div>
          </form>
        )}

        {/* Official Google Button Render Container (if available) */}
        <div id="google-official-btn-container" style={{ display: "flex", justifyContent: "center", marginBottom: 10 }} />

        {/* Collapsible Google Cloud Config Notice */}
        <div style={{ borderTop: "1px solid #f4f4f5", paddingTop: 10, marginTop: 4 }}>
          <button
            type="button"
            onClick={() => setShowDevInfo(!showDevInfo)}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              fontSize: 11,
              color: "#a1a1aa",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <span>⚙️ Google OAuth Client Details</span>
            <span>{showDevInfo ? "▲" : "▼"}</span>
          </button>

          {showDevInfo && (
            <div style={{
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              padding: "10px 12px",
              fontSize: 11,
              color: "#64748b",
              marginTop: 8,
              lineHeight: 1.5,
            }}>
              <div><strong>Client ID:</strong> <code style={{ fontSize: 10, background: "#e2e8f0", padding: "1px 4px", borderRadius: 4 }}>821750384600-...apps.googleusercontent.com</code></div>
              <div style={{ marginTop: 4 }}>
                <strong>Tip for live popup on localhost:</strong> In Google Cloud Console, add <code style={{ fontSize: 10, color: "#1a73e8" }}>http://localhost:5173</code> to <em>Authorized JavaScript origins</em> and <em>Authorized redirect URIs</em>.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 11,
          color: "#a1a1aa",
        }}>
          <span>English (United States)</span>
          <div style={{ display: "flex", gap: 12 }}>
            <span style={{ cursor: "pointer" }}>Help</span>
            <span style={{ cursor: "pointer" }}>Privacy</span>
            <span style={{ cursor: "pointer" }}>Terms</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── AUTH MODAL / POPUP ───────────────────────────────────────────
function AuthModal({ onLogin, onClose, initialMode = "login", COLORS, S, isMobile }) {
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: "", email: "", password: "", age: "", weight: "", height: "", goal: "maintain" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);

  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    if (e) e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      let result;
      if (mode === "register") {
        if (!form.name.trim() || !form.email.trim() || !form.password) {
          setErr("Name, email, and password are required");
          setLoading(false);
          return;
        }
        result = await apiRegister({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          age: form.age ? parseInt(form.age) : null,
          weight: form.weight ? parseFloat(form.weight) : null,
          height: form.height ? parseFloat(form.height) : null,
          goal: form.goal,
        });
      } else {
        if (!form.email.trim() || !form.password) {
          setErr("Please enter both email and password");
          setLoading(false);
          return;
        }
        result = await apiLogin({
          email: form.email.trim().toLowerCase(),
          password: form.password,
        });
      }
      setStoredToken(result.token);
      setStoredUser(result.user);
      onLogin(result.user);
    } catch (error) {
      setErr(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(24, 24, 27, 0.45)",
      backdropFilter: "blur(12px)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    }}>
      <div style={{
        ...S.card,
        width: "min(440px, 100%)",
        animation: "fadeUp 0.3s ease",
        border: `1px solid ${COLORS.border}`,
        boxShadow: "0 25px 60px -15px rgba(0,0,0,0.8), 0 0 40px rgba(16,185,129,0.15)",
        position: "relative",
      }}>
        {/* Back / Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(0,0,0,0.04)",
            border: `1px solid ${COLORS.border}`,
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.textMuted,
            cursor: "pointer",
            fontSize: 14,
          }}
          title="Back to Landing Page"
        >
          ✕
        </button>

        <div>
          <div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: 10 }}>
                <img src="/apple-gauge-logo.svg" alt="Calory Calculator" style={{ width: 44, height: 44 }} />
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: COLORS.text, letterSpacing: "-0.02em" }}>
                Calory Calculator
              </div>
              <div style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 4 }}>
                {mode === "login" ? "Sign in to access your nutrition dashboard" : "Create an account to start tracking nutrition"}
              </div>
            </div>

            {/* Tab Switcher */}
            <div style={{ display: "flex", background: "#f4efe9", borderRadius: 14, padding: 4, marginBottom: 18, border: `1px solid ${COLORS.border}` }}>
              {["login", "register"].map(m => (
                <button key={m} type="button" onClick={() => { setMode(m); setErr(""); }} style={{
                  flex: 1, padding: "10px 0", border: "none", cursor: "pointer", borderRadius: 10,
                  background: mode === m ? COLORS.primaryGradient : "transparent",
                  color: mode === m ? "#fff" : COLORS.textMuted,
                  fontWeight: mode === m ? 700 : 500, fontSize: 14,
                  boxShadow: mode === m ? COLORS.primaryGlow : "none",
                  transition: "all 0.2s ease",
                }}>
                  {m === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            {/* Continue with Google Option */}
            <button
              type="button"
              onClick={() => setGoogleModalOpen(true)}
              disabled={loading}
              style={{
                width: "100%",
                background: "#ffffff",
                border: "1px solid #e4e4e7",
                borderRadius: 12,
                padding: "12px 16px",
                fontSize: 14,
                fontWeight: 700,
                color: "#18181b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                marginBottom: 16,
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.08)";
                e.currentTarget.style.borderColor = "#237a44";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                e.currentTarget.style.borderColor = "#e4e4e7";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>{loading ? "Signing in..." : "Continue with Google"}</span>
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
              <span style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 500 }}>or continue with email</span>
              <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.08)" }} />
            </div>

            <form onSubmit={submit}>
              {mode === "register" && (
                <div style={{ marginBottom: 14 }}>
                  <label style={S.label}>Full Name</label>
                  <input style={S.input} placeholder="Alex Morgan" value={form.name} onChange={f("name")} required />
                </div>
              )}
              <div style={{ marginBottom: 14 }}>
                <label style={S.label}>Email Address</label>
                <input style={S.input} placeholder="you@email.com" value={form.email} onChange={f("email")} type="email" required />
              </div>
              <div style={{ marginBottom: mode === "register" ? 14 : 18 }}>
                <label style={S.label}>Password</label>
                <input style={S.input} placeholder="••••••••" value={form.password} onChange={f("password")} type="password" required />
              </div>

              {mode === "register" && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
                  <div>
                    <label style={S.label}>Age</label>
                    <input style={S.input} placeholder="25" value={form.age} onChange={f("age")} type="number" />
                  </div>
                  <div>
                    <label style={S.label}>Weight (kg)</label>
                    <input style={S.input} placeholder="70" value={form.weight} onChange={f("weight")} type="number" />
                  </div>
                  <div>
                    <label style={S.label}>Height (cm)</label>
                    <input style={S.input} placeholder="175" value={form.height} onChange={f("height")} type="number" />
                  </div>
                </div>
              )}

              {mode === "register" && (
                <div style={{ marginBottom: 18 }}>
                  <label style={S.label}>Primary Fitness Goal</label>
                  <select style={{ ...S.input }} value={form.goal} onChange={f("goal")}>
                    <option value="lose">Lose Weight & Lean Out</option>
                    <option value="maintain">Maintain Current Weight</option>
                    <option value="gain">Gain Muscle & Bulk</option>
                  </select>
                </div>
              )}

              {err && (
                <div style={{ color: COLORS.red, fontSize: 13, marginBottom: 14, background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)", padding: "10px 14px", borderRadius: 10 }}>
                  {err}
                </div>
              )}

              <button type="submit" style={{ ...S.btn, width: "100%", padding: "14px 0", fontSize: 15 }} disabled={loading}>
                {loading ? "Please wait..." : mode === "login" ? "Sign In to NutriAI" : "Create My Account"}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: COLORS.textMuted }}>
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <span style={{ color: COLORS.primaryLight, cursor: "pointer", fontWeight: 600 }} onClick={() => { setMode("register"); setErr(""); }}>Sign up free</span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span style={{ color: COLORS.primaryLight, cursor: "pointer", fontWeight: 600 }} onClick={() => { setMode("login"); setErr(""); }}>Sign in</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dedicated Google Sign In Modal */}
        <GoogleSignInModal
          isOpen={googleModalOpen}
          onClose={() => setGoogleModalOpen(false)}
          onSuccess={(u) => {
            setGoogleModalOpen(false);
            onLogin(u);
          }}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}

// ─── LANDING PAGE COMPONENT ───────────────────────────────────────
// Calory Calculator landing page matching the custom reference design
const LandingPage = CaloryLandingPage;


// ─── REAL-WORLD FOOD PHOTOGRAPHY LIBRARY ──────────────────────────
const FOOD_PHOTOS = {
  apple: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=240&q=80",
  banana: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=240&q=80",
  orange: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&w=240&q=80",
  chicken: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=240&q=80",
  egg: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=240&q=80",
  oats: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=240&q=80",
  oatmeal: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=240&q=80",
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=240&q=80",
  salmon: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=240&q=80",
  fish: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=240&q=80",
  paneer: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=240&q=80",
  tofu: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=240&q=80",
  salad: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=240&q=80",
  broccoli: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=240&q=80",
  avocado: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=240&q=80",
  yogurt: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=240&q=80",
  milk: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=240&q=80",
  pasta: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=240&q=80",
  bread: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=240&q=80",
  toast: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=240&q=80",
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=240&q=80",
  burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=240&q=80",
  steak: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=240&q=80",
  beef: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=240&q=80",
  biryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=240&q=80",
  dal: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=240&q=80",
  lentil: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=240&q=80",
  dosa: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=240&q=80",
  idli: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=240&q=80",
  soup: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=240&q=80",
  smoothie: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=240&q=80",
  quinoa: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=240&q=80",
  potato: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=240&q=80",
  tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=240&q=80",
  almond: "https://images.unsplash.com/photo-1508061252966-ef7fe967c9d2?auto=format&fit=crop&w=240&q=80",
  default: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=240&q=80"
};

function getFoodPhoto(name) {
  if (!name) return FOOD_PHOTOS.default;
  const n = String(name).toLowerCase();
  for (const [key, url] of Object.entries(FOOD_PHOTOS)) {
    if (key !== "default" && n.includes(key)) {
      return url;
    }
  }
  return FOOD_PHOTOS.default;
}

// ─── DASHBOARD ────────────────────────────────────────────────────
function Dashboard({ user, meals = [], goals, water, setWater, selectedDate, setSelectedDate, onSaveQuickMeal, onDeleteMeal, COLORS, S, isMobile }) {
  const [showHistory, setShowHistory] = useState(false);
  const [dailyHistory, setDailyHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const safeGoals = goals || { calories: 2000, protein: 150, carbs: 250, fat: 65 };
  const todayStr = new Date().toISOString().split('T')[0];
  const currentDate = selectedDate || todayStr;

  // Filter meals for the selected date
  const dateMeals = (meals || []).filter(m => {
    if (!m.date) return false;
    try {
      const d = new Date(m.date).toISOString().split('T')[0];
      return d === currentDate || m.date.startsWith(currentDate);
    } catch {
      return m.date.startsWith(currentDate);
    }
  });

  const totals = dateMeals.reduce((a, m) => ({
    calories: a.calories + (m.calories || 0),
    protein: a.protein + (m.protein || 0),
    carbs: a.carbs + (m.carbs || 0),
    fat: a.fat + (m.fat || 0),
    fiber: a.fiber + (m.fiber || 0),
  }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

  // Weekly data relative to selected date
  const weekly = Array.from({ length: 7 }, (_, i) => {
    const base = new Date(currentDate);
    base.setDate(base.getDate() - (6 - i));
    const ds = base.toISOString().split('T')[0];
    const dm = (meals || []).filter(m => {
      try {
        return new Date(m.date).toISOString().split('T')[0] === ds;
      } catch {
        return (m.date || "").startsWith(ds);
      }
    });
    return {
      day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][base.getDay()],
      date: ds,
      calories: Math.round(dm.reduce((s, m) => s + (m.calories || 0), 0)),
      protein: Math.round(dm.reduce((s, m) => s + (m.protein || 0), 0)),
    };
  });

  const macroData = [
    { name: "Protein", value: Math.round(totals.protein * 4), color: COLORS.primary },
    { name: "Carbs", value: Math.round(totals.carbs * 4), color: COLORS.blue },
    { name: "Fat", value: Math.round(totals.fat * 9), color: COLORS.accent },
  ];

  const bmi = user?.weight && user?.height ? (user.weight / ((user.height / 100) ** 2)).toFixed(1) : null;
  const bmiCat = bmi ? (bmi < 18.5 ? "Underweight" : bmi < 25 ? "Healthy" : bmi < 30 ? "Overweight" : "Obese") : null;
  const bmiColor = bmi ? (bmi < 18.5 ? COLORS.yellow : bmi < 25 ? COLORS.primaryLight : bmi < 30 ? COLORS.accent : COLORS.red) : COLORS.primaryLight;

  const currentWater = water?.amount || 0;
  
  const addWater = async (amt = 250) => {
    const newAmount = Math.min(4000, currentWater + amt);
    await apiUpdateWater(currentDate, newAmount);
    setWater({ amount: newAmount });
  };

  const resetWater = async () => {
    await apiUpdateWater(currentDate, 0);
    setWater({ amount: 0 });
  };

  const shiftDate = (offsetDays) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + offsetDays);
    const targetStr = d.toISOString().split('T')[0];
    if (offsetDays > 0 && targetStr > todayStr) return;
    setSelectedDate(targetStr);
  };

  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const data = await apiGetDailyHistory();
      // Only keep records up to today (no future / tomorrow records)
      const pastOnly = (data || []).filter(h => h.date <= todayStr);
      setDailyHistory(pastOnly);
      setShowHistory(true);
    } catch (err) {
      console.error("Error fetching daily history:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const quickPresets = [
    { name: "1 Medium Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4, img: FOOD_PHOTOS.apple },
    { name: "Grilled Chicken Breast (100g)", calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, img: FOOD_PHOTOS.chicken },
    { name: "Oats with Milk & Berries", calories: 220, protein: 8, carbs: 36, fat: 4, fiber: 4, img: FOOD_PHOTOS.oats },
    { name: "2 Hard Boiled Eggs", calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, img: FOOD_PHOTOS.egg },
  ];

  const isToday = currentDate >= todayStr;
  const displayFormattedDate = new Date(currentDate + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      {/* Header & Date Navigation Bar */}
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", flexDirection: isMobile ? "column" : "row", gap: 14 }}>
        <div>
          <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: COLORS.text, letterSpacing: "-0.02em" }}>
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, {user?.name?.split(" ")[0]} 👋
          </div>
          <div style={{ color: COLORS.textMuted, marginTop: 4, fontSize: 14 }}>
            {isToday ? `Today — ${displayFormattedDate}` : displayFormattedDate}
          </div>
        </div>

        {/* Date Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", width: isMobile ? "100%" : "auto" }}>
          <button
            onClick={() => shiftDate(-1)}
            style={{ ...S.btnOutline, padding: "8px 12px", fontSize: 13 }}
            title="Previous Day"
          >
            ◀
          </button>

          <div style={{ position: "relative" }}>
            <input
              type="date"
              value={currentDate}
              max={todayStr}
              onChange={(e) => {
                const val = e.target.value;
                if (val) {
                  // Clamp to today if user picks future date
                  setSelectedDate(val > todayStr ? todayStr : val);
                }
              }}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                color: "#fff",
                padding: "8px 14px",
                fontSize: 13,
                fontFamily: "inherit",
                cursor: "pointer",
                outline: "none",
              }}
            />
          </div>

          <button
            onClick={() => shiftDate(1)}
            disabled={isToday}
            style={{
              ...S.btnOutline,
              padding: "8px 12px",
              fontSize: 13,
              opacity: isToday ? 0.3 : 1,
              cursor: isToday ? "not-allowed" : "pointer"
            }}
            title={isToday ? "Future / Tomorrow records disabled" : "Next Day"}
          >
            ▶
          </button>

          {!isToday && (
            <button
              onClick={() => setSelectedDate(todayStr)}
              style={{ ...S.btn, padding: "8px 14px", fontSize: 12 }}
            >
              Today
            </button>
          )}

          <button
            onClick={() => {
              if (showHistory) setShowHistory(false);
              else fetchHistory();
            }}
            style={{
              ...S.btnOutline,
              padding: "8px 14px",
              fontSize: 12,
              border: `1px solid ${showHistory ? COLORS.primaryLight : COLORS.border}`,
              background: showHistory ? "rgba(255,255,255,0.08)" : "transparent",
            }}
          >
            {showHistory ? "✕ Close History" : "📅 Previous History Log"}
          </button>
        </div>
      </div>

      {/* Date-wise Historical Log Section (Expandable) */}
      {showHistory && (
        <div style={{ ...S.card, marginBottom: 24, animation: "fadeUp 0.3s ease", border: `1px solid ${COLORS.primaryLight}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text }}>
                📅 Date-Wise Activity & Nutrition History
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>Tap any past date to load its full nutritional records</div>
            </div>
            <button onClick={() => setShowHistory(false)} style={{ ...S.btnOutline, padding: "4px 10px", fontSize: 12 }}>
              ✕
            </button>
          </div>

          {historyLoading ? (
            <div style={{ padding: "20px 0", display: "flex", justifyContent: "center" }}><Spinner COLORS={COLORS} /></div>
          ) : dailyHistory.length === 0 ? (
            <div style={{ color: COLORS.textMuted, fontSize: 13, padding: 10 }}>No recorded logs found in database.</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 12, maxHeight: 320, overflowY: "auto" }}>
              {dailyHistory.map((h) => {
                const active = h.date === currentDate;
                return (
                  <div
                    key={h.date}
                    onClick={() => { setSelectedDate(h.date); setShowHistory(false); }}
                    style={{
                      ...S.metricCard,
                      cursor: "pointer",
                      padding: 14,
                      border: `1px solid ${active ? COLORS.primaryLight : COLORS.border}`,
                      background: active ? "rgba(255,255,255,0.08)" : "transparent",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontWeight: 700, fontSize: 13, color: active ? COLORS.primaryLight : "#fff" }}>
                        {h.displayDate || h.date}
                      </span>
                      <span style={{ fontSize: 11, color: COLORS.textMuted }}>{h.meals.length} meals</span>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.accent, fontFamily: "'Outfit', sans-serif", marginBottom: 4 }}>
                      {Math.round(h.calories)} kcal
                    </div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>
                      P: {Math.round(h.protein)}g | C: {Math.round(h.carbs)}g | F: {Math.round(h.fat)}g | 💧 {h.water}ml
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Stats Row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: isMobile ? 12 : 16,
        marginBottom: 24,
      }}>
        <StatCard label="Selected Date Calories" value={Math.round(totals.calories)} unit={`/ ${safeGoals.calories} kcal`} icon="🔥" color={COLORS.accent} sub={`${Math.round((totals.calories / safeGoals.calories) * 100)}%`} S={S} COLORS={COLORS} />
        <StatCard label="Protein Intake" value={Math.round(totals.protein)} unit={`/ ${safeGoals.protein}g`} icon="💪" color={COLORS.primaryLight} S={S} COLORS={COLORS} />
        <StatCard label="Carbohydrates" value={Math.round(totals.carbs)} unit={`/ ${safeGoals.carbs}g`} icon="🌾" color={COLORS.blue} S={S} COLORS={COLORS} />
        <StatCard label="Healthy Fats" value={Math.round(totals.fat)} unit={`/ ${safeGoals.fat}g`} icon="🥑" color={COLORS.purple} S={S} COLORS={COLORS} />
      </div>

      {/* Quick Add Presets Bar (Logs to Selected Date) */}
      <div style={{ ...S.card, padding: "16px 20px", marginBottom: 24, background: "#fbf9f6" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            ⚡ 1-Click Quick Log Presets (for {isToday ? "Today" : currentDate})
          </div>
          <span style={{ fontSize: 12, color: COLORS.textMuted }}>Tap to log instantly to database</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 10 }}>
          {quickPresets.map((p) => (
            <button
              key={p.name}
              onClick={() => onSaveQuickMeal && onSaveQuickMeal(p, currentDate)}
              style={{
                background: "rgba(0,0,0,0.04)",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 12,
                padding: "8px 10px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                textAlign: "left",
                color: COLORS.text,
                transition: "all 0.2s ease",
              }}
            >
              <img
                src={p.img}
                alt={p.name}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  objectFit: "cover",
                  flexShrink: 0,
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              />
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{p.name}</div>
                <div style={{ fontSize: 11, color: COLORS.accent, fontWeight: 700 }}>+{p.calories} kcal</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Charts Row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
        gap: 16,
        marginBottom: 24,
      }}>
        <div style={{ ...S.card, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text }}>7-Day Calorie Trend</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>Intake around {currentDate}</div>
            </div>
          </div>
          <div style={{ height: 210, width: "100%", minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: COLORS.textMuted, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: COLORS.bgCardSolid, border: `1px solid ${COLORS.border}`, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.6)" }} labelStyle={{ color: COLORS.text, fontWeight: 600 }} itemStyle={{ color: COLORS.primaryLight }} />
                <Bar dataKey="calories" fill="url(#themeBarGrad)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="themeBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS.primaryLight} />
                    <stop offset="100%" stopColor={COLORS.primaryDark} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ ...S.card, minWidth: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text, marginBottom: 4 }}>Macronutrient Ratio</div>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 12 }}>Distribution for {currentDate}</div>
          <div style={{ height: 180, width: "100%", minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={macroData} cx="50%" cy="50%" innerRadius={52} outerRadius={78} dataKey="value" paddingAngle={4}>
                  {macroData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: COLORS.bgCardSolid, border: `1px solid ${COLORS.border}`, borderRadius: 12 }} itemStyle={{ color: COLORS.text }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {macroData.map(d => (
              <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color }} />
                <span style={{ color: COLORS.textMuted }}>{d.name} <strong style={{ color: COLORS.text }}>{d.value / (d.name === "Fat" ? 9 : 4)}g</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
        gap: 16,
      }}>
        {/* Nutrient Progress */}
        <div style={S.card}>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text, marginBottom: 18 }}>
            Daily Targets ({currentDate})
          </div>
          <NutrientBar label="Calories" value={totals.calories} max={safeGoals.calories} color={COLORS.accent} COLORS={COLORS} />
          <NutrientBar label="Protein" value={totals.protein} max={safeGoals.protein} color={COLORS.primaryLight} COLORS={COLORS} />
          <NutrientBar label="Carbs" value={totals.carbs} max={safeGoals.carbs} color={COLORS.blue} COLORS={COLORS} />
          <NutrientBar label="Fat" value={totals.fat} max={safeGoals.fat} color={COLORS.purple} COLORS={COLORS} />
          <NutrientBar label="Fiber" value={totals.fiber} max={30} color={COLORS.yellow} COLORS={COLORS} />
        </div>

        {/* Water Tracker (Specific to Selected Date) */}
        <div style={S.card}>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text, marginBottom: 4 }}>
            💧 Water Log ({currentDate})
          </div>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 16 }}>Saved in database for this date</div>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: COLORS.blueLight }}>{currentWater}</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted }}>ml / 2500ml</div>
            <div style={{
              margin: "14px auto",
              width: 86,
              height: 86,
              borderRadius: "50%",
              background: `conic-gradient(${COLORS.blue} ${Math.round((currentWater / 2500) * 360)}deg, rgba(0, 0, 0, 0.06) 0deg)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 16px ${COLORS.blue}44`,
            }}>
              <div style={{ width: 68, height: 68, borderRadius: "50%", background: COLORS.bgCardSolid, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>
                {Math.min(100, Math.round((currentWater / 2500) * 100))}%
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <button style={{ ...S.btn, background: COLORS.primaryGradient, padding: "10px 0", fontSize: 13 }} onClick={() => addWater(250)}>+ 250ml</button>
            <button style={{ ...S.btnOutline, padding: "10px 0", fontSize: 13 }} onClick={resetWater}>Reset</button>
          </div>
        </div>

        {/* Meals Logged on Selected Date */}
        <div style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text }}>
              Logged Meals
            </div>
            <span style={{ fontSize: 12, color: COLORS.textMuted }}>{dateMeals.length} items</span>
          </div>

          <div style={{ maxHeight: 240, overflowY: "auto", paddingRight: 4 }}>
            {dateMeals.slice().reverse().map((m) => (
              <div key={m.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden", flex: 1, paddingRight: 8 }}>
                  <img
                    src={getFoodPhoto(m.name)}
                    alt={m.name}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 8,
                      objectFit: "cover",
                      flexShrink: 0,
                      border: `1px solid ${COLORS.border}`,
                    }}
                  />
                  <div style={{ overflow: "hidden" }}>
                    <div style={{ color: COLORS.text, fontWeight: 600, fontSize: 13, textTransform: "capitalize", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                      {m.name}
                    </div>
                    <div style={{ color: COLORS.textMuted, fontSize: 11 }}>
                      P: {Math.round(m.protein || 0)}g | C: {Math.round(m.carbs || 0)}g | F: {Math.round(m.fat || 0)}g
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <span style={{ color: COLORS.accent, fontWeight: 700, fontSize: 13, fontFamily: "'Outfit', sans-serif" }}>
                    {Math.round(m.calories)} kcal
                  </span>
                  {onDeleteMeal && (
                    <button
                      onClick={() => onDeleteMeal(m.id)}
                      style={{
                        background: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.2)",
                        color: COLORS.red,
                        borderRadius: 6,
                        padding: "4px 8px",
                        fontSize: 11,
                        cursor: "pointer",
                      }}
                      title="Delete from database"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            ))}
            {dateMeals.length === 0 && (
              <div style={{ color: COLORS.textMuted, fontSize: 13, textAlign: "center", padding: "28px 0" }}>
                No meals logged for {currentDate}.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── NUTRITION CALCULATOR ─────────────────────────────────────────
function NutritionCalc({ onSave, selectedDate, COLORS, S, isMobile }) {
  const [food, setFood] = useState("");
  const [qty, setQty] = useState("100");
  const [unit, setUnit] = useState("g");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aiTip, setAiTip] = useState("");
  const [tipLoading, setTipLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [logDate, setLogDate] = useState(() => selectedDate || new Date().toISOString().split('T')[0]);

  // Live Camera states
  const [isLiveCamera, setIsLiveCamera] = useState(false);
  const [cameraFacing, setCameraFacing] = useState("environment");
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

  const filters = ["all", "high-protein", "low-fat", "vegan", "keto"];

  const calculate = async () => {
    if (!food.trim()) return;
    setLoading(true); setError(""); setResult(null); setAiTip(""); setSaved(false);
    try {
      const data = await apiTextNutrition(food.trim(), qty, unit);
      setResult(data);
      setSearchHistory(h => [{ food: food.trim(), qty, unit, ...data }, ...h.slice(0, 4)]);
      setTipLoading(true);
      const tip = await apiTip(food);
      setAiTip(tip);
    } catch (err) {
      setError(err.message || "Could not get nutrition data. Try a more specific food name.");
    } finally {
      setLoading(false);
      setTipLoading(false);
    }
  };

  const compressImageForAnalysis = (file) => {
    return new Promise((resolve) => {
      if (!file || !file.type || !file.type.startsWith("image/")) {
        return resolve(file);
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const MAX_DIM = 1280;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_DIM) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            }
          } else {
            if (height > MAX_DIM) {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressed = new File([blob], file.name ? file.name.replace(/\.[^/.]+$/, ".jpg") : "food-scan.jpg", {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                resolve(compressed);
              } else {
                resolve(file);
              }
            },
            "image/jpeg",
            0.82
          );
        };
        img.onerror = () => resolve(file);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(file);
      reader.readAsDataURL(file);
    });
  };

  const processAndAnalyzeFile = async (rawFile) => {
    if (!rawFile) return;
    setLoading(true); setError(""); setResult(null); setAiTip(""); setSaved(false);
    try {
      // Auto-compress high-res mobile photos so upload is instant and fits payload limits
      const file = await compressImageForAnalysis(rawFile);
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append("image", file);
      const data = await apiImageNutrition(formData);
      const combinedNutrition = {
        name: data.foods?.map(f => f.name).join(", ") || "Analyzed Meal",
        foods: data.foods || [],
        calories: data.totalCalories || 0,
        protein: data.totalProtein || 0,
        carbs: data.totalCarbs || 0,
        fat: data.totalFat || 0,
        fiber: data.totalFiber || 0,
        sugar: data.totalSugar || 0,
        sodium: data.sodium || 0,
        healthScore: data.healthScore || 8,
        serving: "1 meal plate"
      };
      setResult(combinedNutrition);
      setAiTip(data.tip || "Balanced meal with wholesome ingredients.");
    } catch (err) {
      setError(err.message || "Could not analyze photo. Please try another shot.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndAnalyzeFile(file);
      e.target.value = "";
    }
  };

  const startLiveCamera = async (facing = cameraFacing) => {
    try {
      setError("");
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing === "environment" ? { ideal: "environment" } : "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      setIsLiveCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        videoRef.current.setAttribute("webkit-playsinline", "true");
        videoRef.current.play().catch(e => console.warn("Video autoplay notice:", e));
      }
    } catch (err) {
      console.warn("Could not access live webcam/camera directly:", err);
      // Fallback to triggering native mobile phone camera capture
      document.getElementById('mobile-native-camera')?.click();
    }
  };

  const stopLiveCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsLiveCamera(false);
  };

  const switchCameraFacing = () => {
    const next = cameraFacing === "environment" ? "user" : "environment";
    setCameraFacing(next);
    startLiveCamera(next);
  };

  const snapAndAnalyzeLive = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `meal-snap-${Date.now()}.jpg`, { type: "image/jpeg" });
        stopLiveCamera();
        processAndAnalyzeFile(file);
      }
    }, "image/jpeg", 0.9);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const save = async () => {
    if (!result || isSaving) return;
    setIsSaving(true);
    setSaveError("");
    try {
      const todayISO = new Date().toISOString().split('T')[0];
      const targetDateStr = logDate || selectedDate || todayISO;
      const mealDate = new Date(targetDateStr + "T12:00:00").toISOString();
      await apiAddMeal({
        name: result.name || food || "Logged Meal",
        calories: Math.round(Number(result.calories) || 0),
        protein: parseFloat((Number(result.protein) || 0).toFixed(1)),
        carbs: parseFloat((Number(result.carbs) || 0).toFixed(1)),
        fat: parseFloat((Number(result.fat) || 0).toFixed(1)),
        fiber: parseFloat((Number(result.fiber) || 0).toFixed(1)),
        sugar: parseFloat((Number(result.sugar) || 0).toFixed(1)),
        sodium: Math.round(Number(result.sodium) || 0),
        serving: result.serving || `${qty}${unit}`,
        date: mealDate,
      });
      if (onSave) onSave();
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 4000);
    } catch (err) {
      console.error("Error saving meal:", err);
      setSaveError(err.message || "Could not save meal. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const macroChart = result ? [
    { name: "Protein", value: parseFloat((result.protein || 0).toFixed(1)) },
    { name: "Carbs", value: parseFloat((result.carbs || 0).toFixed(1)) },
    { name: "Fat", value: parseFloat((result.fat || 0).toFixed(1)) },
    { name: "Fiber", value: parseFloat((result.fiber || 0).toFixed(1)) },
  ] : [];

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {/* Hidden file inputs for direct camera and gallery upload */}
      <input
        id="mobile-native-camera"
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={handleImageFileChange}
      />
      <input
        id="gallery-upload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageFileChange}
      />

      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: COLORS.text, letterSpacing: "-0.02em" }}>
          Nutrition Calculator & Phone Scanner
        </div>
        <div style={{ color: COLORS.textMuted, marginTop: 4, fontSize: 14 }}>
          Click a photo from your phone or type ingredients to instantly calculate calories and macros
        </div>
      </div>

      {/* ─── Direct Camera & Photo Scanner Card ─── */}
      <div style={{ ...S.card, marginBottom: 24, border: `1px solid ${COLORS.borderHover}`, position: "relative", overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.primaryGradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
              📸
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text }}>
                AI Visual Food Scanner
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>Snap a picture of your food plate to calculate calories</div>
            </div>
          </div>
          <span style={S.tag}>⚡ Live AI Vision</span>
        </div>

        {/* Live Camera Viewfinder Stream */}
        {isLiveCamera ? (
          <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "#000", border: `1px solid ${COLORS.primaryLight}`, marginBottom: 14 }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: "100%", maxHeight: 360, objectFit: "cover", display: "block" }}
            />
            {/* Viewfinder Target Reticle Overlay */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "75%",
              height: "70%",
              border: `2px dashed ${COLORS.primaryLight}`,
              borderRadius: 16,
              pointerEvents: "none",
              boxShadow: `0 0 20px ${COLORS.primaryGlow}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.text, background: "rgba(0,0,0,0.6)", padding: "4px 10px", borderRadius: 12 }}>
                🎯 Center your meal inside frame
              </span>
            </div>

            {/* Viewfinder Action Controls */}
            <div style={{
              position: "absolute",
              bottom: 14,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
              padding: "0 16px",
            }}>
              <button
                type="button"
                onClick={switchCameraFacing}
                style={{
                  background: "rgba(0,0,0,0.7)",
                  border: `1px solid ${COLORS.border}`,
                  color: "#fff",
                  borderRadius: "50%",
                  width: 44,
                  height: 44,
                  fontSize: 18,
                  cursor: "pointer",
                }}
                title="Flip Camera"
              >
                🔄
              </button>

              <button
                type="button"
                onClick={snapAndAnalyzeLive}
                style={{
                  ...S.btn,
                  padding: "12px 28px",
                  fontSize: 15,
                  fontWeight: 700,
                  boxShadow: `0 0 20px ${COLORS.primaryLight}`,
                }}
              >
                📸 Snap & Calculate
              </button>

              <button
                type="button"
                onClick={stopLiveCamera}
                style={{
                  background: "rgba(0,0,0,0.7)",
                  border: `1px solid ${COLORS.border}`,
                  color: "#fff",
                  borderRadius: "50%",
                  width: 44,
                  height: 44,
                  fontSize: 18,
                  cursor: "pointer",
                }}
                title="Close Camera"
              >
                ✕
              </button>
            </div>
          </div>
        ) : imagePreview ? (
          <div>
            <div style={{ position: "relative", marginBottom: 14, borderRadius: 16, overflow: "hidden", border: `1px solid ${COLORS.border}`, maxHeight: 300 }}>
              <img src={imagePreview} alt="Scanned Meal" style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }} />
              {loading && (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0.75)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                }}>
                  <Spinner COLORS={COLORS} />
                  <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 15, fontFamily: "'Outfit', sans-serif" }}>
                    Scanning food items & calculating macros...
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: 10, flexDirection: isMobile ? "column" : "row" }}>
              <button
                style={{ ...S.btn, flex: 1 }}
                onClick={() => processAndAnalyzeFile(selectedImage)}
                disabled={loading}
              >
                {loading ? "Analyzing Photo..." : "🔬 Re-Scan Nutrition"}
              </button>
              <button
                style={{ ...S.btnOutline, padding: "12px 20px" }}
                onClick={() => { setSelectedImage(null); setImagePreview(null); setResult(null); }}
              >
                ✕ Snap Another Photo
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Direct Dual Phone Trigger Buttons */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <button
                type="button"
                onClick={() => {
                  if (isMobile) {
                    document.getElementById('mobile-native-camera').click();
                  } else {
                    startLiveCamera();
                  }
                }}
                style={{
                  ...S.btn,
                  padding: "16px",
                  fontSize: 15,
                  borderRadius: 14,
                  boxShadow: COLORS.primaryGlow,
                }}
              >
                <span style={{ fontSize: 22 }}>📷</span>
                <span>Click Photo from Phone Camera</span>
              </button>

              <button
                type="button"
                onClick={() => document.getElementById('gallery-upload').click()}
                style={{
                  ...S.btnOutline,
                  padding: "16px",
                  fontSize: 15,
                  borderRadius: 14,
                  background: "rgba(0,0,0,0.04)",
                }}
              >
                <span style={{ fontSize: 22 }}>🖼️</span>
                <span>Upload From Photo Library</span>
              </button>
            </div>

            {/* Drag & Drop / Click Zone */}
            <div
              style={{
                border: `2px dashed ${COLORS.borderHover}`,
                borderRadius: 14,
                padding: "24px 16px",
                textAlign: "center",
                cursor: "pointer",
                background: "rgba(255, 255, 255, 0.02)",
                transition: "all 0.2s ease",
              }}
              onClick={() => document.getElementById('gallery-upload').click()}
            >
              <div style={{ fontSize: 32, marginBottom: 6 }}>🥗 ➔ 📊</div>
              <div style={{ color: COLORS.text, fontWeight: 600, fontSize: 14, marginBottom: 2 }}>
                Point camera at your meal plate, breakfast bowl, or restaurant dish
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>
                AI visual engine recognizes items and calculates total calories, protein, carbs, fat, fiber & sodium
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── Search by Text Card ─── */}
      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text, marginBottom: 14 }}>
          Or Search / Type Any Food
        </div>

        {/* Filter Chips */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "7px 14px", borderRadius: 20,
              border: `1px solid ${filter === f ? COLORS.primaryLight : COLORS.border}`,
              background: filter === f ? "rgba(255,255,255,0.08)" : "transparent",
              color: filter === f ? COLORS.primaryLight : COLORS.textMuted,
              fontSize: 12, fontWeight: filter === f ? 700 : 500, cursor: "pointer",
              whiteSpace: "nowrap", transition: "all 0.2s ease",
            }}>
              {f === "all" ? "🌟 All Categories" : f.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")}
            </button>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 110px 110px auto",
          gap: 12,
          alignItems: "end",
        }}>
          <div>
            <label style={S.label}>Food or Meal Description</label>
            <input style={S.input} placeholder="e.g. Grilled salmon, brown rice, avocado toast..." value={food} onChange={e => setFood(e.target.value)} onKeyDown={e => e.key === "Enter" && calculate()} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr", gap: isMobile ? 10 : 0 }}>
            <div>
              <label style={S.label}>Quantity</label>
              <input style={S.input} value={qty} onChange={e => setQty(e.target.value)} type="number" min="1" />
            </div>
            {isMobile && (
              <div>
                <label style={S.label}>Unit</label>
                <select style={S.input} value={unit} onChange={e => setUnit(e.target.value)}>
                  <option value="g">grams (g)</option>
                  <option value="ml">milliliters (ml)</option>
                  <option value="oz">ounces (oz)</option>
                  <option value="cup">cup</option>
                  <option value="tbsp">tbsp</option>
                  <option value="piece">piece</option>
                </select>
              </div>
            )}
          </div>
          {!isMobile && (
            <div>
              <label style={S.label}>Unit</label>
              <select style={S.input} value={unit} onChange={e => setUnit(e.target.value)}>
                <option value="g">grams (g)</option>
                <option value="ml">milliliters (ml)</option>
                <option value="oz">ounces (oz)</option>
                <option value="cup">cup</option>
                <option value="tbsp">tbsp</option>
                <option value="piece">piece</option>
              </select>
            </div>
          )}
          <div>
            <button style={{ ...S.btn, width: isMobile ? "100%" : "auto", padding: "12px 28px" }} onClick={calculate} disabled={loading}>
              {loading ? "Analyzing..." : "🔍 Analyze Food"}
            </button>
          </div>
        </div>
        {loading && <div style={{ marginTop: 16 }}><Spinner COLORS={COLORS} /></div>}
        {error && (
          <div style={{
            marginTop: 16,
            color: "#fca5a5",
            fontSize: 13,
            background: "rgba(239, 68, 68, 0.12)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            padding: "12px 16px",
            borderRadius: 12,
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            animation: "fadeUp 0.2s ease"
          }}>
            <span style={{ fontSize: 18 }}>⚠️</span>
            <div style={{ lineHeight: 1.5 }}>
              <strong style={{ color: COLORS.text }}>Invalid Food Item: </strong>
              <span>{error}</span>
            </div>
          </div>
        )}
      </div>

      {/* ─── Calculated Results Section ─── */}
      {result && (
        <div style={{ animation: "fadeUp 0.4s ease" }}>
          {/* Recognized Food Components (from photo scanning) */}
          {result.foods && result.foods.length > 0 && (
            <div style={{ ...S.card, marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span>🔍</span> AI Recognized Dish Ingredients:
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : `repeat(${Math.min(3, result.foods.length)}, 1fr)`, gap: 10 }}>
                {result.foods.map((f, idx) => (
                  <div key={idx} style={{ ...S.metricCard, padding: 12, background: "#fbf9f6", display: "flex", alignItems: "center", gap: 10 }}>
                    <img
                      src={getFoodPhoto(f.name)}
                      alt={f.name}
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        objectFit: "cover",
                        flexShrink: 0,
                        border: `1px solid ${COLORS.border}`,
                      }}
                    />
                    <div style={{ overflow: "hidden", flex: 1 }}>
                      <div style={{ fontWeight: 600, color: COLORS.text, fontSize: 13, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{f.name}</div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.accent, fontFamily: "'Outfit', sans-serif" }}>{f.calories} kcal</div>
                      <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>
                        P: {f.protein}g | C: {f.carbs}g | F: {f.fat}g
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Overall Metrics Row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : "repeat(6, 1fr)",
            gap: 10,
            marginBottom: 16,
          }}>
            {[
              { label: "Total Calories", value: Math.round(result.calories), unit: "kcal", icon: "🔥", color: COLORS.accent },
              { label: "Protein", value: parseFloat((result.protein || 0).toFixed(1)), unit: "g", icon: "💪", color: COLORS.primaryLight },
              { label: "Carbs", value: parseFloat((result.carbs || 0).toFixed(1)), unit: "g", icon: "🌾", color: COLORS.blue },
              { label: "Fat", value: parseFloat((result.fat || 0).toFixed(1)), unit: "g", icon: "🥑", color: COLORS.purple },
              { label: "Fiber", value: parseFloat((result.fiber || 0).toFixed(1)), unit: "g", icon: "🌿", color: COLORS.yellow },
              { label: "Sugar", value: parseFloat((result.sugar || 0).toFixed(1)), unit: "g", icon: "🍬", color: COLORS.rose },
            ].map(s => (
              <div key={s.label} style={{ ...S.metricCard, borderTop: `2px solid ${s.color}`, padding: "14px" }}>
                <div style={{ fontSize: 18 }}>{s.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: s.color, marginTop: 4 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>{s.unit}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div style={{ ...S.card, minWidth: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text, marginBottom: 16 }}>
                Macronutrient Ratio — {result.name}
              </div>
              <div style={{ height: 210, width: "100%", minWidth: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={macroChart} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
                    <XAxis type="number" tick={{ fill: COLORS.textMuted, fontSize: 12 }} axisLine={false} />
                    <YAxis dataKey="name" type="category" tick={{ fill: COLORS.textMuted, fontSize: 12 }} axisLine={false} tickLine={false} width={55} />
                    <Tooltip contentStyle={{ background: COLORS.bgCardSolid, border: `1px solid ${COLORS.border}`, borderRadius: 10 }} itemStyle={{ color: COLORS.primaryLight }} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                      {macroChart.map((_, i) => <Cell key={i} fill={COLORS.pieColors[i % COLORS.pieColors.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={S.card}>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text, marginBottom: 4 }}>
                🤖 AI Nutrition Insight
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 12 }}>Personalized recommendation</div>
              {tipLoading ? <Spinner COLORS={COLORS} /> : aiTip ? (
                <div style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.text, background: "#fbf9f6", border: `1px solid ${COLORS.border}`, padding: "14px", borderRadius: 12, borderLeft: `4px solid ${COLORS.primaryLight}` }}>
                  {aiTip}
                </div>
              ) : null}
              <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 13, color: COLORS.textMuted }}>Serving: <span style={{ color: COLORS.text, fontWeight: 600 }}>{result.serving}</span></div>
                {result.sodium !== undefined && <div style={{ fontSize: 13, color: COLORS.textMuted }}>Sodium: <span style={{ color: COLORS.text, fontWeight: 600 }}>{Math.round(result.sodium)}mg</span></div>}
              </div>

              {/* Log Date Selector */}
              <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fbf9f6", padding: "8px 12px", borderRadius: 10, border: `1px solid ${COLORS.border}` }}>
                <span style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 600 }}>📅 Save to Date:</span>
                <input
                  type="date"
                  value={logDate}
                  max={new Date().toISOString().split('T')[0]}
                  onChange={(e) => {
                    const todayStr = new Date().toISOString().split('T')[0];
                    const val = e.target.value;
                    setLogDate(val > todayStr ? todayStr : val);
                  }}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 8,
                    color: "#fff",
                    padding: "4px 8px",
                    fontSize: 12,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ marginTop: 14 }}>
                <button
                  style={{
                    ...S.btn,
                    width: "100%",
                    opacity: isSaving ? 0.75 : 1,
                    cursor: isSaving ? "wait" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                  onClick={save}
                  disabled={isSaving || saved}
                >
                  {isSaving
                    ? "⏳ Saving Meal to Database..."
                    : saved
                    ? "✓ Meal Saved to Database!"
                    : `💾 Save for ${logDate === new Date().toISOString().split('T')[0] ? "Today" : logDate}`}
                </button>
                {saveError && (
                  <div style={{
                    marginTop: 10,
                    background: "#fef2f2",
                    color: "#b91c1c",
                    border: "1px solid #fecaca",
                    padding: "8px 12px",
                    borderRadius: 8,
                    fontSize: 12,
                    textAlign: "center"
                  }}>
                    {saveError}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div style={S.card}>
          <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text, marginBottom: 12 }}>
            Recent Searches
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 10 }}>
            {searchHistory.map((h, i) => (
              <div
                key={i}
                style={{
                  ...S.metricCard,
                  cursor: "pointer",
                  padding: "10px 12px",
                  background: "rgba(5,8,16,0.5)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
                onClick={() => { setFood(h.food); setQty(h.qty); setUnit(h.unit); }}
              >
                <img
                  src={getFoodPhoto(h.name || h.food)}
                  alt={h.name}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    objectFit: "cover",
                    flexShrink: 0,
                    border: `1px solid ${COLORS.border}`,
                  }}
                />
                <div style={{ overflow: "hidden", flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, textTransform: "capitalize", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{h.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.accent, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>{Math.round(h.calories)} kcal</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>{h.qty}{h.unit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MEAL PLANNER ─────────────────────────────────────────────────
function MealPlanner({ user, COLORS, S, isMobile }) {
  const [preference, setPreference] = useState("veg"); // 'veg' | 'nonveg' | 'both' | 'eggetarian' | 'vegan'
  const [diet, setDiet] = useState("balanced");
  const [calGoal, setCalGoal] = useState(user?.goal === "lose" ? 1600 : user?.goal === "gain" ? 2400 : 2000);
  const [prompt, setPrompt] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const preferences = [
    { id: "veg", label: "🌱 Pure Vegetarian (Veg)", short: "🌱 Veg" },
    { id: "nonveg", label: "🥩 Non-Vegetarian (Non-Veg)", short: "🥩 Non-Veg" },
    { id: "both", label: "🔀 Compare Both (Veg & Non-Veg)", short: "🔀 Both Plans" },
    { id: "eggetarian", label: "🥚 Eggetarian (Veg + Eggs)", short: "🥚 Eggetarian" },
    { id: "vegan", label: "🌿 100% Strict Vegan", short: "🌿 Vegan" },
  ];

  const calPresets = [1500, 1800, 2000, 2200, 2500];
  const diets = [
    { id: "balanced", name: "🥗 Balanced Diet" },
    { id: "high-protein", name: "💪 High Protein" },
    { id: "low-carb", name: "🥑 Low Carb" },
    { id: "keto", name: "🔥 Keto (High Fat)" },
    { id: "mediterranean", name: "🫒 Mediterranean" },
  ];

  const generate = async () => {
    setLoading(true); setPlan("");
    try {
      const p = await apiMealPlan(prompt, calGoal, diet, preference, user);
      setPlan(p);
    } catch (err) {
      console.error("Error generating meal plan:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: COLORS.text, letterSpacing: "-0.02em" }}>
          AI Meal Planner — Veg & Non-Veg
        </div>
        <div style={{ color: COLORS.textMuted, marginTop: 4, fontSize: 14 }}>
          Generate customized, macro-calculated daily meal plans tailored to your food choices
        </div>
      </div>

      <div style={S.card}>
        <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text, marginBottom: 14 }}>
          1. Select Dietary Preference
        </div>

        {/* Veg / Non-Veg / Both Switcher */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
          {preferences.map((p) => {
            const active = preference === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPreference(p.id)}
                style={{
                  background: active ? COLORS.primaryGradient : "rgba(255,255,255,0.03)",
                  border: `1px solid ${active ? COLORS.primaryLight : COLORS.border}`,
                  color: active ? "#fff" : COLORS.textMuted,
                  borderRadius: 12,
                  padding: "10px 16px",
                  fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  cursor: "pointer",
                  boxShadow: active ? COLORS.primaryGlow : "none",
                  transition: "all 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {isMobile ? p.short : p.label}
              </button>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 20 }}>
          {/* Calorie Goal */}
          <div>
            <label style={S.label}>Daily Target Calories</label>
            <input
              style={S.input}
              type="number"
              value={calGoal}
              onChange={(e) => setCalGoal(e.target.value)}
              placeholder="2000"
            />
            <div style={{ display: "flex", gap: 6, marginTop: 8, overflowX: "auto" }}>
              {calPresets.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCalGoal(c)}
                  style={{
                    background: calGoal === c ? "rgba(255,255,255,0.12)" : "transparent",
                    border: `1px solid ${calGoal === c ? COLORS.primaryLight : COLORS.border}`,
                    color: calGoal === c ? COLORS.primaryLight : COLORS.textMuted,
                    borderRadius: 8,
                    padding: "4px 8px",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {c} kcal
                </button>
              ))}
            </div>
          </div>

          {/* Diet Preference */}
          <div>
            <label style={S.label}>Dietary Style</label>
            <select style={S.input} value={diet} onChange={(e) => setDiet(e.target.value)}>
              {diets.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Custom prompt notes */}
        <div style={{ marginBottom: 20 }}>
          <label style={S.label}>Custom Ingredients / Allergies / Notes (Optional)</label>
          <input
            style={S.input}
            placeholder="e.g. Include paneer/tofu for veg, Indian spices, no dairy, high fiber..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <button style={{ ...S.btn, width: isMobile ? "100%" : "auto" }} onClick={generate} disabled={loading}>
          {loading ? "Generating Custom Meal Plan..." : preference === "both" ? "✨ Generate Both Veg & Non-Veg Plans" : `✨ Generate ${preference.toUpperCase()} Meal Plan`}
        </button>
      </div>

      {/* Generated Meal Plan Display */}
      {plan && (
        <div style={{ ...S.card, marginTop: 20, animation: "fadeUp 0.4s ease" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text }}>
              {preference === "both" ? "Veg vs Non-Veg Comparative Meal Plans" : preference === "veg" ? "🌱 Your Custom Vegetarian Meal Plan" : preference === "nonveg" ? "🥩 Your Custom Non-Vegetarian Meal Plan" : "Personalized Daily Nutrition Plan"}
            </div>
            <span style={S.tag}>✨ AI Optimized</span>
          </div>

          <div style={{ fontSize: 14, lineHeight: 1.85, color: COLORS.text }}>
            {plan.split("\n").map((line, i) => {
              if (line.includes("═══")) {
                return <div key={i} style={{ margin: "24px 0", borderTop: `2px dashed ${COLORS.borderHover}` }} />;
              }
              if (line.match(/^(🟢|🌱|🥩|🥚|🌿)/i) || line.includes("MEAL PLAN") || line.includes("PLAN (")) {
                return (
                  <div key={i} style={{ color: COLORS.primaryLight, fontWeight: 800, marginTop: 16, marginBottom: 8, fontSize: 16, fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", gap: 6, background: "#fbf9f6", padding: "8px 12px", borderRadius: 8 }}>
                    {line}
                  </div>
                );
              }
              if (line.match(/^(🍳 Breakfast|🍎 Morning Snack|🥗 Lunch|🥜 Afternoon Snack|🍽️ Dinner)/i)) {
                return (
                  <div key={i} style={{ color: COLORS.text, fontWeight: 600, marginTop: 12, marginBottom: 4, fontSize: 14, display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span>{line}</span>
                  </div>
                );
              }
              if (line.match(/^(📊 Daily Target|⚡ Macros|Total|Summary)/i)) {
                return (
                  <div key={i} style={{ color: COLORS.accent, fontWeight: 700, marginTop: 14, padding: "10px 14px", background: "rgba(245,158,11,0.08)", border: `1px solid ${COLORS.border}`, borderRadius: 10, fontSize: 13 }}>
                    {line}
                  </div>
                );
              }
              return <div key={i} style={{ color: COLORS.textMuted, paddingLeft: 8 }}>{line}</div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AI RECOMMENDATIONS ───────────────────────────────────────────
function AIRecommendations({ user, COLORS, S, isMobile }) {
  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState(null);
  const [tdee, setTdee] = useState(null);
  const [activity, setActivity] = useState("moderate");

  const calcTDEE = () => {
    if (!user?.weight || !user?.height || !user?.age) return null;
    const bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;
    const mults = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9 };
    return Math.round(bmr * (mults[activity] || 1.55));
  };

  const getRecommendations = async () => {
    setLoading(true); setRecs(null);
    try {
      const t = calcTDEE();
      setTdee(t);
      const p = await apiRecommendations(user, activity, t);
      setRecs(p);
    } catch (err) {
      console.error("Error getting recommendations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getRecommendations(); }, [activity]);

  return (
    <div style={{ animation: "fadeUp 0.3s ease" }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: COLORS.text, letterSpacing: "-0.02em" }}>
          AI Health & Nutrition Advisor
        </div>
        <div style={{ color: COLORS.textMuted, marginTop: 4, fontSize: 14 }}>
          Data-backed calorie targets and nutrition insights tailored to your physiology
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", gap: 16 }}>
        <div>
          <div style={S.card}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text, marginBottom: 14 }}>
              User Profile
            </div>
            {[
              ["Age", user?.age ? `${user.age} years` : "—"],
              ["Weight", user?.weight ? `${user.weight} kg` : "—"],
              ["Height", user?.height ? `${user.height} cm` : "—"],
              ["Goal", user?.goal ? user.goal.charAt(0).toUpperCase() + user.goal.slice(1) : "Maintain"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <span style={{ color: COLORS.textMuted, fontSize: 13 }}>{label}</span>
                <span style={{ color: COLORS.text, fontWeight: 600, fontSize: 13 }}>{value}</span>
              </div>
            ))}
            <div style={{ marginTop: 18 }}>
              <label style={S.label}>Daily Activity Level</label>
              <select style={{ ...S.input }} value={activity} onChange={e => setActivity(e.target.value)}>
                <option value="sedentary">Sedentary (Desk Job)</option>
                <option value="light">Lightly Active (1-3 days/wk)</option>
                <option value="moderate">Moderately Active (3-5 days/wk)</option>
                <option value="active">Very Active (6-7 days/wk)</option>
              </select>
            </div>
            {tdee && (
              <div style={{ marginTop: 18, padding: 14, background: "#fbf9f6", border: `1px solid ${COLORS.border}`, borderRadius: 12 }}>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>Estimated Maintenance (TDEE)</div>
                <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: COLORS.primaryLight }}>{tdee} kcal</div>
              </div>
            )}
          </div>
        </div>

        <div style={S.card}>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: COLORS.text, marginBottom: 14 }}>
            Tailored Nutrition Strategy
          </div>
          {loading ? (
            <div style={{ padding: "40px 0", display: "flex", justifyContent: "center" }}>
              <Spinner COLORS={COLORS} />
            </div>
          ) : recs ? (
            <div style={{ fontSize: 14, lineHeight: 1.85, color: COLORS.text }}>
              {recs.split("\n").map((line, i) => (
                <div key={i} style={{ marginBottom: 10, display: "flex", gap: 8 }}>
                  <span style={{ color: COLORS.primaryLight }}>✦</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN AUTHENTICATION MODAL ──────────────────────────────────
function AdminAuthModal({ isOpen, onClose, onAdminSuccess, isMobile }) {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleModalOpen, setGoogleModalOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminId.trim() || !password) {
      setError("Please provide both Admin User ID and Password.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: adminId.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Admin authentication failed.");
      }
      setStoredToken(data.token);
      setStoredUser(data.user);
      onAdminSuccess(data.user);
    } catch (err) {
      setError(err.message || "Invalid Admin User ID or Password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.65)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: 16,
      animation: "fadeIn 0.2s ease",
    }}>
      <div style={{
        background: "#ffffff",
        borderRadius: 24,
        padding: isMobile ? 24 : 36,
        width: "100%",
        maxWidth: 440,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        position: "relative",
        border: "1px solid rgba(0, 0, 0, 0.08)",
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "none",
            border: "none",
            fontSize: 20,
            cursor: "pointer",
            color: "#71717a",
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            background: "rgba(35, 122, 68, 0.1)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            marginBottom: 12,
            border: "1px solid rgba(35, 122, 68, 0.2)",
          }}>
            🛡️
          </div>
          <h3 style={{
            fontSize: 22,
            fontWeight: 800,
            fontFamily: "'Outfit', sans-serif",
            color: "#18181b",
            margin: "0 0 6px 0",
          }}>
            Admin Panel Access
          </h3>
          <p style={{ fontSize: 13, color: "#71717a", margin: 0, lineHeight: 1.5 }}>
            Restricted area. Please enter your Administrator User ID and Password to continue.
          </p>
        </div>

        {error && (
          <div style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            borderRadius: 12,
            padding: "10px 14px",
            fontSize: 13,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#27272a", marginBottom: 6 }}>
              Admin User ID / Email
            </label>
            <input
              type="text"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              placeholder="e.g. anshumandas908@gmail.com or admin"
              autoFocus
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: 12,
                border: "1px solid #d4d4d8",
                fontSize: 14,
                fontFamily: "inherit",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#27272a", marginBottom: 6 }}>
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: 12,
                border: "1px solid #d4d4d8",
                fontSize: 14,
                fontFamily: "inherit",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 6,
              background: "#237a44",
              color: "#ffffff",
              border: "none",
              borderRadius: 12,
              padding: "13px 0",
              fontSize: 14,
              fontWeight: 700,
              cursor: loading ? "wait" : "pointer",
              boxShadow: "0 4px 14px rgba(35, 122, 68, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {loading ? "Verifying Credentials..." : "Unlock Admin Console →"}
          </button>
        </form>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          margin: "18px 0 14px",
        }}>
          <div style={{ flex: 1, height: 1, background: "#e4e4e7" }} />
          <span style={{ fontSize: 11, color: "#a1a1aa", textTransform: "uppercase", fontWeight: 700 }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "#e4e4e7" }} />
        </div>

        <button
          type="button"
          onClick={() => setGoogleModalOpen(true)}
          disabled={loading}
          style={{
            width: "100%",
            background: "#ffffff",
            border: "1px solid #d4d4d8",
            borderRadius: 12,
            padding: "11px 0",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            color: "#18181b",
            transition: "background 0.15s ease",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continue with Google (Admin)</span>
        </button>

        {/* Dedicated Google Admin Sign In Modal */}
        <GoogleSignInModal
          isOpen={googleModalOpen}
          onClose={() => setGoogleModalOpen(false)}
          onSuccess={(adminUser) => {
            setGoogleModalOpen(false);
            onAdminSuccess(adminUser);
          }}
          isAdminMode={true}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────
export default function NutritionApp() {
  const isMobile = useIsMobile();
  const [themeKey, setThemeKey] = useState(() => localStorage.getItem("nu_theme") || "emerald");
  const currentTheme = THEMES[themeKey] || THEMES.emerald;
  const S = getStyles(currentTheme, isMobile);

  const handleSelectTheme = (k) => {
    if (THEMES[k]) {
      setThemeKey(k);
      localStorage.setItem("nu_theme", k);
    }
  };

  const [user, setUserState] = useState(null);
  const [authModalMode, setAuthModalMode] = useState(null); // null | 'login' | 'register'
  const [page, setPage] = useState("dashboard");
  const [meals, setMeals] = useState([]);
  const [goals, setGoals] = useState({ calories: 2000, protein: 150, carbs: 250, fat: 65 });
  const [water, setWater] = useState({ amount: 0 });
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuthExpired = () => {
      setUserState(null);
      setMeals([]);
      setLoading(false);
    };
    window.addEventListener("nu_auth_expired", handleAuthExpired);
    return () => window.removeEventListener("nu_auth_expired", handleAuthExpired);
  }, []);

  useEffect(() => {
    const savedUser = getStoredUser();
    if (savedUser && getStoredToken()) {
      setUserState(savedUser);
      loadData(selectedDate);
    } else {
      setLoading(false);
    }
  }, []);

  // Sync water whenever selectedDate changes
  useEffect(() => {
    if (user && getStoredToken()) {
      apiGetWater(selectedDate).then(w => setWater(w || { amount: 0 })).catch(() => {});
    }
  }, [selectedDate, user]);

  const loadData = async (dateForWater = selectedDate) => {
    try {
      const [mealsData, goalsData, waterData] = await Promise.all([
        apiGetMeals(),
        apiGetGoals(),
        apiGetWater(dateForWater),
      ]);
      setMeals(mealsData || []);
      setGoals(goalsData || { calories: 2000, protein: 150, carbs: 250, fat: 65 });
      setWater(waterData || { amount: 0 });
    } catch (err) {
      console.error("Error loading data:", err);
      if (err.message && (err.message.includes("Unauthorized") || err.message.includes("expired") || err.message.includes("token"))) {
        setStoredToken(null);
        setStoredUser(null);
        setUserState(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setAuthModalMode(null);
    setStoredUser(userData);
    setUserState(userData);
    loadData(selectedDate);
  };

  const handleDemoDirectLogin = async () => {
    setLoading(true);
    try {
      const result = await apiLogin({
        email: "demo@nutriai.com",
        password: "demo123",
      });
      setStoredToken(result.token);
      setStoredUser(result.user);
      handleLogin(result.user);
    } catch (error) {
      console.error("Direct demo login error:", error);
      setAuthModalMode("login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setStoredToken(null);
    setStoredUser(null);
    setUserState(null);
    setMeals([]);
    setPage("dashboard");
  };

  const handleMealSaved = () => {
    loadData(selectedDate);
  };

  const handleDeleteMeal = async (id) => {
    try {
      await apiDeleteMeal(id);
      loadData(selectedDate);
    } catch (err) {
      console.error("Error deleting meal:", err);
    }
  };

  const handleQuickLog = async (preset, targetDate) => {
    try {
      const effectiveDate = targetDate || selectedDate || new Date().toISOString().split('T')[0];
      await apiAddMeal({
        name: preset.name,
        calories: preset.calories,
        protein: preset.protein || 0,
        carbs: preset.carbs || 0,
        fat: preset.fat || 0,
        fiber: preset.fiber || 0,
        serving: "1 serving",
        date: new Date(effectiveDate + "T12:00:00").toISOString(),
      });
      loadData(selectedDate);
    } catch (err) {
      console.error("Error quick logging:", err);
    }
  };

  const [adminAuthModalOpen, setAdminAuthModalOpen] = useState(false);
  const [googleAuthModalOpen, setGoogleAuthModalOpen] = useState(false);
  const isAuthorizedAdmin = Boolean(
    user && (user.role === "admin" || user.email === "anshumandas908@gmail.com" || user.email === "anshumand108@gmail.com" || user.email === "admin@nutriai.com")
  );

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#admin" || window.location.pathname === "/admin") {
        if (isAuthorizedAdmin) {
          setPage("admin");
        } else {
          setAdminAuthModalOpen(true);
        }
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [isAuthorizedAdmin]);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: currentTheme.bgGradient }}>
        <Spinner COLORS={currentTheme} />
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <LandingPage
          onOpenAuth={(m) => {
            if (m === "google") {
              setGoogleAuthModalOpen(true);
            } else {
              setAuthModalMode(m || "login");
            }
          }}
          onOpenAdmin={() => {
            setAdminAuthModalOpen(true);
          }}
          themeKey={themeKey}
          onSelectTheme={handleSelectTheme}
          COLORS={currentTheme}
          S={S}
          isMobile={isMobile}
        />
        {authModalMode && (
          <AuthModal
            initialMode={authModalMode}
            onLogin={handleLogin}
            onClose={() => setAuthModalMode(null)}
            COLORS={currentTheme}
            S={S}
            isMobile={isMobile}
          />
        )}
        <GoogleSignInModal
          isOpen={googleAuthModalOpen}
          onClose={() => setGoogleAuthModalOpen(false)}
          onSuccess={(u) => {
            setGoogleAuthModalOpen(false);
            handleLogin(u);
          }}
          isMobile={isMobile}
        />
        <AdminAuthModal
          isOpen={adminAuthModalOpen}
          onClose={() => {
            setAdminAuthModalOpen(false);
            if (window.location.hash === "#admin") {
              window.history.pushState(null, "", window.location.pathname);
            }
          }}
          onAdminSuccess={(adminUser) => {
            handleLogin(adminUser);
            setPage("admin");
            setAdminAuthModalOpen(false);
          }}
          isMobile={isMobile}
        />
      </>
    );
  }

  return (
    <div style={S.app}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div style={S.sidebar}>
          <Logo COLORS={currentTheme} />
          <div style={{ flex: 1, paddingTop: 20 }}>
            {[
              ["dashboard", "🏠", "Dashboard"],
              ["calculator", "📊", "Calculator"],
              ["planner", "📅", "Meal Planner"],
              ["recommendations", "💡", "AI Recs"],
              ["admin", "🛡️", "Admin Panel"],
            ].map(([key, icon, label]) => (
              <div
                key={key}
                style={{
                  ...S.navItem(page === key),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onClick={() => {
                  if (key === "admin" && !isAuthorizedAdmin) {
                    setAdminAuthModalOpen(true);
                  } else {
                    setPage(key);
                  }
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <span>{label}</span>
                </div>
                {key === "admin" && (
                  <span style={{
                    fontSize: 10,
                    fontWeight: 800,
                    background: "rgba(35, 122, 68, 0.12)",
                    color: "#237a44",
                    border: "1px solid rgba(35, 122, 68, 0.3)",
                    padding: "2px 7px",
                    borderRadius: 9999,
                    letterSpacing: "0.04em",
                  }}>
                    SUPABASE
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Theme Switcher in Sidebar */}
          <ThemeSwitcher currentTheme={themeKey} onSelectTheme={handleSelectTheme} COLORS={currentTheme} />

          {/* User Profile Footer */}
          <div style={{ padding: "16px 20px", borderTop: `1px solid ${currentTheme.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: currentTheme.primaryGradient, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15, boxShadow: currentTheme.primaryGlow }}>
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ color: currentTheme.text, fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{user.name}</div>
                <div style={{ color: currentTheme.textMuted, fontSize: 12, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{user.email}</div>
              </div>
            </div>
            <button style={{ ...S.btnOutline, width: "100%", fontSize: 12, padding: "8px 0" }} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, width: isMobile ? "100%" : "calc(100% - 250px)" }}>
        {/* Mobile Top Bar */}
        {isMobile && (
          <MobileTopBar
            user={user}
            onLogout={handleLogout}
            currentTheme={themeKey}
            onSelectTheme={handleSelectTheme}
            COLORS={currentTheme}
          />
        )}

        <div style={S.main}>
          {page === "dashboard" && (
            <Dashboard
              user={user}
              meals={meals}
              goals={goals}
              water={water}
              setWater={setWater}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              onSaveQuickMeal={handleQuickLog}
              onDeleteMeal={handleDeleteMeal}
              COLORS={currentTheme}
              S={S}
              isMobile={isMobile}
            />
          )}
          {page === "calculator" && <NutritionCalc onSave={handleMealSaved} selectedDate={selectedDate} COLORS={currentTheme} S={S} isMobile={isMobile} />}
          {page === "planner" && <MealPlanner user={user} COLORS={currentTheme} S={S} isMobile={isMobile} />}
          {page === "recommendations" && <AIRecommendations user={user} COLORS={currentTheme} S={S} isMobile={isMobile} />}
          {page === "admin" && (
            isAuthorizedAdmin ? (
              <AdminDashboard user={user} COLORS={currentTheme} S={S} isMobile={isMobile} />
            ) : (
              <div style={{
                maxWidth: 580,
                margin: "48px auto",
                padding: isMobile ? 24 : 36,
                background: currentTheme.bgCardSolid,
                borderRadius: 24,
                border: `1px solid ${currentTheme.border}`,
                textAlign: "center",
                boxShadow: currentTheme.cardGlow,
              }}>
                <div style={{ fontSize: 44, marginBottom: 12 }}>🔒</div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: currentTheme.text, marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>
                  Administrator Access Required
                </h2>
                <p style={{ color: currentTheme.textMuted, fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                  The Admin Console is restricted to authorized administrative credentials. You are currently logged in as <strong>{user?.email}</strong>.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <button
                    onClick={() => setPage("dashboard")}
                    style={{ ...S.btnOutline, padding: "10px 20px" }}
                  >
                    ← Back to Dashboard
                  </button>
                  <button
                    onClick={() => setAdminAuthModalOpen(true)}
                    style={{ ...S.btnPrimary, padding: "10px 22px" }}
                  >
                    Unlock with Admin ID & Password
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <MobileBottomNav
            page={page}
            setPage={setPage}
            onOpenAdmin={() => setAdminAuthModalOpen(true)}
            isAuthorizedAdmin={isAuthorizedAdmin}
            COLORS={currentTheme}
          />
        )}
      </div>

      {/* Admin Auth Modal for inside the app */}
      <AdminAuthModal
        isOpen={adminAuthModalOpen}
        onClose={() => {
          setAdminAuthModalOpen(false);
          if (window.location.hash === "#admin") {
            window.history.pushState(null, "", window.location.pathname);
          }
        }}
        onAdminSuccess={(adminUser) => {
          handleLogin(adminUser);
          setPage("admin");
          setAdminAuthModalOpen(false);
        }}
        isMobile={isMobile}
      />
    </div>
  );
}
