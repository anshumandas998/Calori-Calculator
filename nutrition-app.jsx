import { useState, useEffect, useCallback, useRef } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// ─── Theme System ─────────────────────────────────────────────────
const THEMES = {
  emerald: {
    id: "emerald",
    name: "Cyber Emerald",
    icon: "⚡",
    primary: "#10b981",
    primaryLight: "#34d399",
    primaryDark: "#059669",
    primaryGradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    primaryGlow: "0 0 28px rgba(16, 185, 129, 0.4)",
    accent: "#f59e0b",
    accentLight: "#fbbf24",
    accentGradient: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
    purple: "#a855f7",
    blue: "#38bdf8",
    cyan: "#06b6d4",
    rose: "#f43f5e",
    yellow: "#eab308",
    red: "#ef4444",
    bg: "#070a12",
    bgGradient: "radial-gradient(circle at 10% 15%, rgba(16, 185, 129, 0.12) 0%, transparent 45%), radial-gradient(circle at 90% 85%, rgba(56, 189, 248, 0.08) 0%, transparent 45%), #070a12",
    bgCard: "rgba(15, 23, 42, 0.72)",
    bgCardSolid: "#0f172a",
    bgCardHover: "rgba(24, 34, 56, 0.85)",
    border: "rgba(255, 255, 255, 0.08)",
    borderHover: "rgba(52, 211, 153, 0.35)",
    borderActive: "rgba(52, 211, 153, 0.6)",
    text: "#f8fafc",
    textMuted: "#94a3b8",
    textDim: "#64748b",
    cardShadow: "0 12px 32px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
    pieColors: ["#10b981", "#38bdf8", "#f59e0b", "#a855f7", "#eab308"],
  },
  aurora: {
    id: "aurora",
    name: "Midnight Indigo",
    icon: "🌌",
    primary: "#6366f1",
    primaryLight: "#818cf8",
    primaryDark: "#4f46e5",
    primaryGradient: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    primaryGlow: "0 0 28px rgba(99, 102, 241, 0.4)",
    accent: "#ec4899",
    accentLight: "#f472b6",
    accentGradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
    purple: "#c084fc",
    blue: "#38bdf8",
    cyan: "#22d3ee",
    rose: "#f43f5e",
    yellow: "#fbbf24",
    red: "#ef4444",
    bg: "#050714",
    bgGradient: "radial-gradient(circle at 15% 15%, rgba(99, 102, 241, 0.15) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(236, 72, 153, 0.1) 0%, transparent 45%), #050714",
    bgCard: "rgba(18, 20, 48, 0.72)",
    bgCardSolid: "#131638",
    bgCardHover: "rgba(28, 32, 72, 0.85)",
    border: "rgba(255, 255, 255, 0.09)",
    borderHover: "rgba(129, 140, 248, 0.4)",
    borderActive: "rgba(129, 140, 248, 0.6)",
    text: "#f8fafc",
    textMuted: "#a5b4fc",
    textDim: "#6366f1",
    cardShadow: "0 12px 32px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
    pieColors: ["#6366f1", "#ec4899", "#38bdf8", "#a855f7", "#fbbf24"],
  },
  crimson: {
    id: "crimson",
    name: "Sunset Lava",
    icon: "🔥",
    primary: "#f43f5e",
    primaryLight: "#fb7185",
    primaryDark: "#e11d48",
    primaryGradient: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)",
    primaryGlow: "0 0 28px rgba(244, 63, 94, 0.4)",
    accent: "#f59e0b",
    accentLight: "#fbbf24",
    accentGradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    purple: "#e879f9",
    blue: "#38bdf8",
    cyan: "#2dd4bf",
    rose: "#f43f5e",
    yellow: "#eab308",
    red: "#ef4444",
    bg: "#0c070e",
    bgGradient: "radial-gradient(circle at 10% 20%, rgba(244, 63, 94, 0.14) 0%, transparent 45%), radial-gradient(circle at 90% 80%, rgba(245, 158, 11, 0.1) 0%, transparent 45%), #0c070e",
    bgCard: "rgba(30, 16, 26, 0.72)",
    bgCardSolid: "#1f101c",
    bgCardHover: "rgba(45, 24, 40, 0.85)",
    border: "rgba(255, 255, 255, 0.08)",
    borderHover: "rgba(251, 113, 133, 0.4)",
    borderActive: "rgba(251, 113, 133, 0.6)",
    text: "#fdf2f4",
    textMuted: "#fbcfe8",
    textDim: "#9f1239",
    cardShadow: "0 12px 32px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
    pieColors: ["#f43f5e", "#f59e0b", "#38bdf8", "#c084fc", "#34d399"],
  },
  slate: {
    id: "slate",
    name: "Stealth Titanium",
    icon: "💎",
    primary: "#38bdf8",
    primaryLight: "#7dd3fc",
    primaryDark: "#0284c7",
    primaryGradient: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
    primaryGlow: "0 0 28px rgba(56, 189, 248, 0.4)",
    accent: "#10b981",
    accentLight: "#34d399",
    accentGradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    purple: "#c084fc",
    blue: "#60a5fa",
    cyan: "#22d3ee",
    rose: "#f43f5e",
    yellow: "#fbbf24",
    red: "#ef4444",
    bg: "#080c14",
    bgGradient: "radial-gradient(circle at 15% 15%, rgba(56, 189, 248, 0.12) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(16, 185, 129, 0.08) 0%, transparent 45%), #080c14",
    bgCard: "rgba(15, 23, 42, 0.75)",
    bgCardSolid: "#0f172a",
    bgCardHover: "rgba(30, 41, 59, 0.85)",
    border: "rgba(255, 255, 255, 0.09)",
    borderHover: "rgba(125, 211, 252, 0.4)",
    borderActive: "rgba(125, 211, 252, 0.6)",
    text: "#f8fafc",
    textMuted: "#94a3b8",
    textDim: "#475569",
    cardShadow: "0 12px 32px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
    pieColors: ["#38bdf8", "#10b981", "#fbbf24", "#a855f7", "#f43f5e"],
  }
};

const API_BASE = "";

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
    throw new Error("Unable to connect to server. Please check that the server is running on http://localhost:5173.");
  }

  if (!response.ok) {
    let error = "Request failed";
    try {
      const errData = await response.json();
      error = errData.error || errData.message || error;
    } catch {
      try {
        const text = await response.text();
        if (text) error = text;
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
  const response = await fetch(`${API_BASE}/api/nutrition/image`, {
    method: "POST",
    headers,
    body: formData,
  });
  if (!response.ok) {
    let error = "Request failed";
    try {
      const errData = await response.json();
      error = errData.error || errData.message || error;
    } catch {}
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
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    borderRight: `1px solid ${COLORS.border}`,
    display: "flex",
    flexDirection: "column",
    padding: "24px 0",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 100,
    boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
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
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
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
    borderRadius: 12,
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
    background: "rgba(255, 255, 255, 0.04)",
    color: COLORS.text,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 12,
    padding: "11px 20px",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: 14,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "all 0.2s ease",
  },
  input: {
    background: "rgba(5, 8, 16, 0.6)",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 12,
    color: COLORS.text,
    padding: "12px 16px",
    fontSize: 14,
    width: "100%",
    outline: "none",
    transition: "all 0.2s ease",
  },
  label: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginBottom: 8,
    display: "block",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  metricCard: {
    background: COLORS.bgCard,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 16,
    padding: "18px 20px",
    boxShadow: COLORS.cardShadow,
    transition: "transform 0.2s ease, border-color 0.2s ease",
  },
  tag: {
    background: `rgba(255, 255, 255, 0.05)`,
    color: COLORS.primaryLight,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 20,
    padding: "4px 12px",
    fontSize: 12,
    fontWeight: 600,
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
    background: active ? `linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)` : "transparent",
    color: active ? COLORS.primaryLight : COLORS.textMuted,
    fontWeight: active ? 700 : 500,
    fontSize: 14,
    transition: "all 0.2s ease",
    borderLeft: active ? `3px solid ${COLORS.primaryLight}` : "3px solid transparent",
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
      <VibeLogoIcon size={44} COLORS={COLORS} />
      <div>
        <div style={{ fontSize: 20, fontWeight: 900, fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.03em", color: "#fff", display: "flex", alignItems: "center", gap: 5 }}>
          <span>NUTR<span style={{ color: COLORS.primaryLight }}>I</span></span>
          <span style={{
            background: `linear-gradient(135deg, ${COLORS.primaryLight}, ${COLORS.blueLight})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 900,
          }}>
            AI
          </span>
          <span style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: COLORS.primaryLight,
            boxShadow: `0 0 10px ${COLORS.primaryLight}`,
          }} />
        </div>
        <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2, fontWeight: 500 }}>
          AI Nutrition Engine
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
                background: active ? t.primaryGradient : "rgba(255,255,255,0.04)",
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
      <div style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 8, overflow: "hidden", position: "relative" }}>
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
      <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: "#fff", letterSpacing: "-0.02em" }}>
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
        <div style={{ fontSize: 18, fontWeight: 900, fontFamily: "'Outfit', sans-serif", color: "#fff", display: "flex", alignItems: "center", gap: 4 }}>
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

function MobileBottomNav({ page, setPage, COLORS }) {
  const items = [
    ["dashboard", "🏠", "Dashboard"],
    ["calculator", "📊", "Calculator"],
    ["planner", "📅", "Planner"],
    ["recommendations", "💡", "AI Recs"],
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
            onClick={() => setPage(key)}
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

// ─── AUTH MODAL / POPUP ───────────────────────────────────────────
function AuthModal({ onLogin, onClose, initialMode = "login", COLORS, S, isMobile }) {
  const [mode, setMode] = useState(initialMode);
  const [form, setForm] = useState({ name: "", email: "", password: "", age: "", weight: "", height: "", goal: "maintain" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleDemoLogin = async () => {
    setErr("");
    setLoading(true);
    try {
      const result = await apiLogin({
        email: "demo@nutriai.com",
        password: "demo123",
      });
      setStoredToken(result.token);
      setStoredUser(result.user);
      onLogin(result.user);
    } catch (error) {
      setErr(error.message || "Failed to sign in with demo account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(3, 7, 18, 0.85)",
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
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "rgba(255,255,255,0.06)",
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
        )}

        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: 12 }}>
            <VibeLogoIcon size={56} COLORS={COLORS} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, fontFamily: "'Outfit', sans-serif", color: "#fff", letterSpacing: "-0.03em", display: "flex", justifyContent: "center", alignItems: "center", gap: 4 }}>
            <span>NUTR<span style={{ color: COLORS.primaryLight }}>I</span></span>
            <span style={{
              background: `linear-gradient(135deg, ${COLORS.primaryLight}, ${COLORS.blueLight})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>AI</span>
          </div>
          <div style={{ color: COLORS.textMuted, fontSize: 13, marginTop: 4 }}>
            {mode === "login" ? "Sign in to access your nutrition dashboard" : "Create an account to start tracking nutrition"}
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", background: "rgba(5,8,16,0.6)", borderRadius: 14, padding: 4, marginBottom: 20, border: `1px solid ${COLORS.border}` }}>
          {["login", "register"].map(m => (
            <button key={m} type="button" onClick={() => { setMode(m); setErr(""); }} style={{
              flex: 1, padding: "10px 0", border: "none", cursor: "pointer", borderRadius: 10,
              background: mode === m ? COLORS.primaryGradient : "transparent",
              color: mode === m ? "#fff" : COLORS.textMuted,
              fontWeight: mode === m ? 600 : 500, fontSize: 14,
              boxShadow: mode === m ? COLORS.primaryGlow : "none",
              transition: "all 0.2s ease",
            }}>
              {m === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
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

        {mode === "login" && (
          <div style={{ marginTop: 12 }}>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              style={{
                ...S.btnOutline,
                width: "100%",
                padding: "11px 0",
                fontSize: 13,
                border: `1px solid ${COLORS.borderHover}`,
                background: "rgba(255, 255, 255, 0.04)",
                color: COLORS.primaryLight,
              }}
            >
              <span>⚡</span> One-Click Instant Demo Login
            </button>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 11, color: COLORS.textMuted }}>
              Demo user: <span style={{ color: COLORS.primaryLight }}>demo@nutriai.com</span> (Password: demo123)
            </div>
          </div>
        )}

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
  );
}

// ─── LANDING PAGE COMPONENT ───────────────────────────────────────
function LandingPage({ onOpenAuth, onDemoLogin, themeKey, onSelectTheme, COLORS, S, isMobile }) {
  const heroFoods = [
    { name: "Avocado & Poached Egg Toast", cals: "340 kcal", p: "18g", c: "28g", f: "18g", img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=300&q=80" },
    { name: "Pan-Seared Salmon & Quinoa", cals: "480 kcal", p: "42g", c: "32g", f: "20g", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80" },
    { name: "Greek Yogurt & Fresh Berries", cals: "210 kcal", p: "22g", c: "24g", f: "3g", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=300&q=80" },
  ];

  const features = [
    {
      icon: "📸",
      title: "Live Camera Food Scanner",
      desc: "Snap food photos with your smartphone camera. AI recognizes dish ingredients and instantly calculates calories & macros with real culinary photography.",
      badge: "Vision AI",
      color: COLORS.primaryLight
    },
    {
      icon: "🥗",
      title: "Veg & Non-Veg Meal Planner",
      desc: "Generate personalized vegetarian, non-vegetarian, high-protein, keto, vegan, or eggetarian diet schedules tailored to your exact caloric targets.",
      badge: "Smart Diet",
      color: COLORS.blue
    },
    {
      icon: "📅",
      title: "Date-wise Database Storage",
      desc: "All meals and daily hydration logs are saved date-by-date in a SQLite database with past-only calendar navigation and 30-day analytics.",
      badge: "SQLite DB",
      color: COLORS.accent
    },
    {
      icon: "⚡",
      title: "1-Click Real Food Presets",
      desc: "Log whole food staples (Apples, Grilled Chicken, Oatmeal Bowls, Boiled Eggs) with a single tap to the database for today or any past date.",
      badge: "Instant Log",
      color: COLORS.yellow
    },
    {
      icon: "🎨",
      title: "4 Ultra-Modern Themes",
      desc: "Switch between Cyber Emerald, Midnight Indigo, Sunset Lava, and Stealth Titanium themes with modern glassmorphism styling.",
      badge: "Custom UI",
      color: COLORS.purple
    },
    {
      icon: "🛡️",
      title: "Smart Non-Food Validator",
      desc: "Built-in edible food detector rejects non-food items (cars, laptops, tables, gibberish) and guides users to enter valid ingredients.",
      badge: "Food Guard",
      color: COLORS.rose
    }
  ];

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bgGradient, color: COLORS.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* ─── Navigation Header ─── */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(5, 8, 16, 0.8)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${COLORS.border}`,
        padding: isMobile ? "12px 16px" : "16px 36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <VibeLogoIcon size={38} COLORS={COLORS} />
          <div>
            <span style={{ fontSize: 20, fontWeight: 900, fontFamily: "'Outfit', sans-serif", color: "#fff", letterSpacing: "-0.03em" }}>
              NUTR<span style={{ color: COLORS.primaryLight }}>I</span>
              <span style={{
                background: `linear-gradient(135deg, ${COLORS.primaryLight}, ${COLORS.blueLight})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>AI</span>
            </span>
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 14, fontWeight: 500, color: COLORS.textMuted }}>
            <a href="#features" style={{ color: COLORS.textMuted, textDecoration: "none", transition: "color 0.2s" }}>Features</a>
            <a href="#camera" style={{ color: COLORS.textMuted, textDecoration: "none", transition: "color 0.2s" }}>AI Scanner</a>
            <a href="#planner" style={{ color: COLORS.textMuted, textDecoration: "none", transition: "color 0.2s" }}>Meal Planner</a>
            <a href="#history" style={{ color: COLORS.textMuted, textDecoration: "none", transition: "color 0.2s" }}>Datewise Logs</a>
          </div>
        )}

        {/* Right CTA Area */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ThemeSwitcher currentTheme={themeKey} onSelectTheme={onSelectTheme} COLORS={COLORS} />
          
          <button
            onClick={() => onOpenAuth("login")}
            style={{
              ...S.btnOutline,
              padding: isMobile ? "7px 12px" : "9px 18px",
              fontSize: isMobile ? 12 : 13,
            }}
          >
            Sign In
          </button>

          <button
            onClick={() => onOpenAuth("register")}
            style={{
              ...S.btn,
              padding: isMobile ? "7px 14px" : "9px 20px",
              fontSize: isMobile ? 12 : 13,
            }}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* ─── Hero Section ─── */}
      <section style={{
        padding: isMobile ? "40px 16px 60px" : "80px 36px 100px",
        maxWidth: 1200,
        margin: "0 auto",
        textAlign: "center",
      }}>
        {/* Glowing Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${COLORS.border}`,
          padding: "6px 16px",
          borderRadius: 30,
          fontSize: 12,
          fontWeight: 600,
          color: COLORS.primaryLight,
          marginBottom: 20,
          boxShadow: "0 0 20px rgba(16,185,129,0.1)",
        }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.primaryLight, display: "inline-block", boxShadow: COLORS.primaryGlow }} />
          NEXT-GEN AI CALORIE & NUTRITION INTELLIGENCE
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: isMobile ? 32 : 56,
          fontWeight: 800,
          fontFamily: "'Outfit', sans-serif",
          color: "#fff",
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          maxWidth: 900,
          margin: "0 auto 20px",
        }}>
          Smart Nutrition. Real Results. <br />
          <span style={{
            background: `linear-gradient(135deg, #fff 30%, ${COLORS.primaryLight} 70%, ${COLORS.blueLight} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Powered by AI Camera Vision.
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: isMobile ? 15 : 18,
          color: COLORS.textMuted,
          lineHeight: 1.6,
          maxWidth: 680,
          margin: "0 auto 36px",
        }}>
          Snap food photos with your phone camera, generate tailored Veg & Non-Veg meal plans, and track your daily nutrition date-by-date in a private SQLite database.
        </p>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
          <button
            onClick={() => onOpenAuth("register")}
            style={{
              ...S.btn,
              padding: "14px 34px",
              fontSize: 16,
              fontWeight: 700,
              boxShadow: COLORS.primaryGlow,
            }}
          >
            Get Started Free ➔
          </button>

          <button
            onClick={onDemoLogin}
            style={{
              ...S.btnOutline,
              padding: "14px 28px",
              fontSize: 15,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: `1px solid ${COLORS.borderHover}`,
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <span>⚡</span> Instant 1-Click Demo
          </button>
        </div>

        {/* Live Visual Showcase Mockup */}
        <div style={{
          ...S.card,
          maxWidth: 960,
          margin: "0 auto",
          padding: isMobile ? 16 : 28,
          borderRadius: 24,
          border: `1px solid ${COLORS.border}`,
          boxShadow: "0 30px 80px -20px rgba(0,0,0,0.8), 0 0 60px rgba(16,185,129,0.12)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Header in Mockup */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981" }} />
              <span style={{ fontSize: 12, color: COLORS.textMuted, marginLeft: 8, fontFamily: "monospace" }}>nutriai.app/dashboard</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: COLORS.primaryLight, fontWeight: 600 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.primaryLight, display: "inline-block" }} />
              Live Database Connected
            </div>
          </div>

          {/* Cards Row in Mockup */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 14 }}>
            {heroFoods.map((f, i) => (
              <div key={i} style={{
                background: "rgba(5, 8, 16, 0.6)",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: 12,
                display: "flex",
                gap: 12,
                alignItems: "center",
                textAlign: "left",
              }}>
                <img
                  src={f.img}
                  alt={f.name}
                  style={{ width: 64, height: 64, borderRadius: 12, objectFit: "cover", flexShrink: 0, border: `1px solid ${COLORS.border}` }}
                />
                <div style={{ overflow: "hidden", flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{f.name}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.accent, fontFamily: "'Outfit', sans-serif", margin: "2px 0" }}>{f.cals}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>
                    P: <strong style={{ color: COLORS.text }}>{f.p}</strong> | C: <strong style={{ color: COLORS.text }}>{f.c}</strong> | F: <strong style={{ color: COLORS.text }}>{f.f}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Live Metrics in Mockup */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 10, marginTop: 14 }}>
            {[
              { label: "Daily Calorie Target", val: "2,050 / 2,200", icon: "🔥", color: COLORS.accent },
              { label: "Protein Intake", val: "148g (98%)", icon: "💪", color: COLORS.primaryLight },
              { label: "Hydration Log", val: "2,250ml", icon: "💧", color: COLORS.blueLight },
              { label: "Date Stored", val: "Saved to DB", icon: "💾", color: COLORS.yellow },
            ].map((m, idx) => (
              <div key={idx} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "10px 14px", textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: COLORS.textMuted }}>
                  <span>{m.icon}</span> {m.label}
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: m.color, marginTop: 4 }}>
                  {m.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bento Grid Features Section ─── */}
      <section id="features" style={{
        padding: isMobile ? "40px 16px" : "80px 36px",
        maxWidth: 1200,
        margin: "0 auto",
      }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ color: COLORS.primaryLight, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
            Intelligent Health Features
          </div>
          <h2 style={{ fontSize: isMobile ? 26 : 38, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: "#fff", letterSpacing: "-0.02em" }}>
            Everything You Need To Master Your Diet
          </h2>
          <p style={{ color: COLORS.textMuted, fontSize: 15, maxWidth: 560, margin: "10px auto 0" }}>
            Engineered with modern AI tools, SQLite persistence, and camera vision for seamless nutrition management.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
          {features.map((ft, i) => (
            <div
              key={i}
              style={{
                ...S.card,
                padding: "24px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                transition: "all 0.2s ease",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${COLORS.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                  }}>
                    {ft.icon}
                  </div>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: 20,
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${COLORS.border}`,
                    color: ft.color,
                  }}>
                    {ft.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff", marginBottom: 8 }}>
                  {ft.title}
                </h3>
                <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6 }}>
                  {ft.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── How It Works 3-Step Timeline ─── */}
      <section style={{
        padding: isMobile ? "40px 16px" : "60px 36px 80px",
        maxWidth: 1000,
        margin: "0 auto",
        textAlign: "center",
      }}>
        <h2 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: "#fff", marginBottom: 36 }}>
          How NutriAI Works in 3 Simple Steps
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
          {[
            { step: "01", title: "Snap or Search Food", desc: "Take a picture with your phone camera or type the name of any dish, ingredient, or recipe." },
            { step: "02", title: "AI Calculates Macros", desc: "AI computes exact calories, protein, carbs, fats, fiber, and sugar with verified food databases." },
            { step: "03", title: "Track Date-wise", desc: "Log to SQLite for any selected calendar date and monitor your progress over time." },
          ].map((st, i) => (
            <div key={i} style={{ ...S.card, padding: "24px 20px", textAlign: "left" }}>
              <div style={{ fontSize: 28, fontWeight: 900, fontFamily: "'Outfit', sans-serif", color: COLORS.primaryLight, marginBottom: 12 }}>
                {st.step}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{st.title}</div>
              <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6 }}>{st.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bottom CTA Banner ─── */}
      <section style={{
        padding: isMobile ? "40px 16px 80px" : "60px 36px 100px",
        maxWidth: 960,
        margin: "0 auto",
        textAlign: "center",
      }}>
        <div style={{
          background: `linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(5,8,16,0.9) 100%)`,
          border: `1px solid ${COLORS.borderHover}`,
          borderRadius: 24,
          padding: isMobile ? "36px 20px" : "56px 40px",
          boxShadow: COLORS.primaryGlow,
        }}>
          <h2 style={{ fontSize: isMobile ? 26 : 40, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: "#fff", marginBottom: 16 }}>
            Ready to Take Control of Your Nutrition?
          </h2>
          <p style={{ color: COLORS.textMuted, fontSize: 15, maxWidth: 540, margin: "0 auto 28px", lineHeight: 1.6 }}>
            Join thousands tracking their calories, generating AI meal plans, and achieving their fitness targets effortlessly.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() => onOpenAuth("register")}
              style={{ ...S.btn, padding: "14px 36px", fontSize: 15, fontWeight: 700 }}
            >
              Create Free Account ➔
            </button>
            <button
              onClick={() => onOpenAuth("login")}
              style={{ ...S.btnOutline, padding: "14px 28px", fontSize: 15, fontWeight: 600 }}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{
        borderTop: `1px solid ${COLORS.border}`,
        padding: "24px 36px",
        textAlign: "center",
        fontSize: 13,
        color: COLORS.textMuted,
        background: "rgba(5, 8, 16, 0.9)",
      }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontWeight: 700, color: "#fff" }}>NutriAI</span> — Intelligent Nutrition & Calorie Assistant
        </div>
        <div>© {new Date().getFullYear()} NutriAI Platform. All rights reserved.</div>
      </footer>
    </div>
  );
}

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
          <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: "#fff", letterSpacing: "-0.02em" }}>
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
              <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff" }}>
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
                      background: active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
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
      <div style={{ ...S.card, padding: "16px 20px", marginBottom: 24, background: "rgba(255,255,255,0.03)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff", textTransform: "uppercase", letterSpacing: "0.05em" }}>
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
                background: "rgba(255,255,255,0.04)",
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
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff" }}>7-Day Calorie Trend</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>Intake around {currentDate}</div>
            </div>
          </div>
          <div style={{ height: 210, width: "100%", minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
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
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff", marginBottom: 4 }}>Macronutrient Ratio</div>
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
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff", marginBottom: 18 }}>
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
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff", marginBottom: 4 }}>
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
              background: `conic-gradient(${COLORS.blue} ${Math.round((currentWater / 2500) * 360)}deg, rgba(255,255,255,0.06) 0deg)`,
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
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff" }}>
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

  const processAndAnalyzeFile = async (file) => {
    if (!file) return;
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setLoading(true); setError(""); setResult(null); setAiTip(""); setSaved(false);
    try {
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
    }
  };

  const startLiveCamera = async (facing = cameraFacing) => {
    try {
      setError("");
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: facing }, width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      setIsLiveCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
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
    if (!result) return;
    try {
      const mealDate = new Date((logDate || new Date().toISOString().split('T')[0]) + "T12:00:00").toISOString();
      await apiAddMeal({ ...result, date: mealDate });
      onSave && onSave();
      setSaved(true);
    } catch (err) {
      console.error("Error saving meal:", err);
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
        <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: "#fff", letterSpacing: "-0.02em" }}>
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
              <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff" }}>
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
              <span style={{ fontSize: 12, fontWeight: 600, color: "#fff", background: "rgba(0,0,0,0.6)", padding: "4px 10px", borderRadius: 12 }}>
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
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, fontFamily: "'Outfit', sans-serif" }}>
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
                  background: "rgba(255,255,255,0.04)",
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
              <div style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: 2 }}>
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
        <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff", marginBottom: 14 }}>
          Or Search / Type Any Food
        </div>

        {/* Filter Chips */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "7px 14px", borderRadius: 20,
              border: `1px solid ${filter === f ? COLORS.primaryLight : COLORS.border}`,
              background: filter === f ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)",
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
              <strong style={{ color: "#fff" }}>Invalid Food Item: </strong>
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
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <span>🔍</span> AI Recognized Dish Ingredients:
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : `repeat(${Math.min(3, result.foods.length)}, 1fr)`, gap: 10 }}>
                {result.foods.map((f, idx) => (
                  <div key={idx} style={{ ...S.metricCard, padding: 12, background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", gap: 10 }}>
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
                      <div style={{ fontWeight: 600, color: "#fff", fontSize: 13, whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{f.name}</div>
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
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff", marginBottom: 16 }}>
                Macronutrient Ratio — {result.name}
              </div>
              <div style={{ height: 210, width: "100%", minWidth: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={macroChart} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
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
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff", marginBottom: 4 }}>
                🤖 AI Nutrition Insight
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 12 }}>Personalized recommendation</div>
              {tipLoading ? <Spinner COLORS={COLORS} /> : aiTip ? (
                <div style={{ fontSize: 14, lineHeight: 1.7, color: COLORS.text, background: "rgba(255,255,255,0.05)", border: `1px solid ${COLORS.border}`, padding: "14px", borderRadius: 12, borderLeft: `4px solid ${COLORS.primaryLight}` }}>
                  {aiTip}
                </div>
              ) : null}
              <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 13, color: COLORS.textMuted }}>Serving: <span style={{ color: "#fff", fontWeight: 600 }}>{result.serving}</span></div>
                {result.sodium !== undefined && <div style={{ fontSize: 13, color: COLORS.textMuted }}>Sodium: <span style={{ color: "#fff", fontWeight: 600 }}>{Math.round(result.sodium)}mg</span></div>}
              </div>

              {/* Log Date Selector */}
              <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", padding: "8px 12px", borderRadius: 10, border: `1px solid ${COLORS.border}` }}>
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
                <button style={{ ...S.btn, width: "100%" }} onClick={save} disabled={saved}>
                  {saved ? "✓ Meal Saved to Database!" : `💾 Save for ${logDate === new Date().toISOString().split('T')[0] ? "Today" : logDate}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div style={S.card}>
          <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff", marginBottom: 12 }}>
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
        <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: "#fff", letterSpacing: "-0.02em" }}>
          AI Meal Planner — Veg & Non-Veg
        </div>
        <div style={{ color: COLORS.textMuted, marginTop: 4, fontSize: 14 }}>
          Generate customized, macro-calculated daily meal plans tailored to your food choices
        </div>
      </div>

      <div style={S.card}>
        <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff", marginBottom: 14 }}>
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
                    background: calGoal === c ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.02)",
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
            <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff" }}>
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
                  <div key={i} style={{ color: COLORS.primaryLight, fontWeight: 800, marginTop: 16, marginBottom: 8, fontSize: 16, fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.04)", padding: "8px 12px", borderRadius: 8 }}>
                    {line}
                  </div>
                );
              }
              if (line.match(/^(🍳 Breakfast|🍎 Morning Snack|🥗 Lunch|🥜 Afternoon Snack|🍽️ Dinner)/i)) {
                return (
                  <div key={i} style={{ color: "#fff", fontWeight: 600, marginTop: 12, marginBottom: 4, fontSize: 14, display: "flex", alignItems: "flex-start", gap: 8 }}>
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
        <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: "#fff", letterSpacing: "-0.02em" }}>
          AI Health & Nutrition Advisor
        </div>
        <div style={{ color: COLORS.textMuted, marginTop: 4, fontSize: 14 }}>
          Data-backed calorie targets and nutrition insights tailored to your physiology
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", gap: 16 }}>
        <div>
          <div style={S.card}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff", marginBottom: 14 }}>
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
                <span style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{value}</span>
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
              <div style={{ marginTop: 18, padding: 14, background: "rgba(255,255,255,0.04)", border: `1px solid ${COLORS.border}`, borderRadius: 12 }}>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>Estimated Maintenance (TDEE)</div>
                <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: COLORS.primaryLight }}>{tdee} kcal</div>
              </div>
            )}
          </div>
        </div>

        <div style={S.card}>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#fff", marginBottom: 14 }}>
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
          onOpenAuth={(m) => setAuthModalMode(m || "login")}
          onDemoLogin={handleDemoDirectLogin}
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
            ].map(([key, icon, label]) => (
              <div
                key={key}
                style={S.navItem(page === key)}
                onClick={() => setPage(key)}
              >
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span>{label}</span>
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
        </div>

        {/* Mobile Bottom Navigation */}
        {isMobile && <MobileBottomNav page={page} setPage={setPage} COLORS={currentTheme} />}
      </div>
    </div>
  );
}
