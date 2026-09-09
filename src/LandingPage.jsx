import { useState, useRef } from "react";
import Hero3DCanvas from "./Hero3DCanvas.jsx";
import Calculator3DCanvas from "./Calculator3DCanvas.jsx";
import { use3DTilt } from "./use3DTilt.js";

// ─── Reusable 3D Perspective Card Wrapper ──────────────────────────
function Tilt3DWrapper({ children, maxTilt = 12, scale = 1.02, style, className }) {
  const { ref, style: tiltStyle, glareStyle, onMouseMove, onMouseLeave } = use3DTilt({ maxTilt, scale });
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        ...tiltStyle,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
      className={className}
    >
      {children}
      <div style={glareStyle} />
    </div>
  );
}

// ─── Icons Matching Reference Design ──────────────────────────────
function AppleGaugeLogo({ size = 36 }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: size, height: size }}>
      <img
        src="/apple-gauge-logo.svg"
        alt="Calory Calculator"
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/apple-gauge-logo.png";
        }}
      />
    </div>
  );
}

function FlameIcon({ size = 26, color = "#237a44" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A4.5 4.5 0 0 0 13 19a4.5 4.5 0 0 0 4.5-4.5c0-3-2.5-5.5-3.5-7.5-.5 1.5-1.5 2.5-2.5 3C10.5 8 10 5 10 5c0 0-4.5 4-1.5 9.5z" />
    </svg>
  );
}

function BarChartIcon({ size = 26, color = "#237a44" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function TargetIcon({ size = 26, color = "#237a44" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ShieldCheckIcon({ size = 26, color = "#237a44" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

// ─── Main Landing Page Component ──────────────────────────────────
export default function LandingPage({ onOpenAuth, onOpenAdmin, onDemoLogin, themeKey, onSelectTheme, COLORS, S, isMobile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const calcSectionRef = useRef(null);

  // Live Calculator State
  const [calcGender, setCalcGender] = useState("male");
  const [calcAge, setCalcAge] = useState(26);
  const [calcWeight, setCalcWeight] = useState(70); // kg
  const [calcHeight, setCalcHeight] = useState(175); // cm
  const [calcActivity, setCalcActivity] = useState(1.375); // Lightly active
  const [calcGoal, setCalcGoal] = useState("maintain"); // lose, maintain, gain
  const [calcViewMode, setCalcViewMode] = useState("3d"); // "3d" | "2d"

  // Interactive Mifflin-St Jeor Calculation
  const calculateDailyNeeds = () => {
    let bmr = 10 * calcWeight + 6.25 * calcHeight - 5 * calcAge;
    bmr += calcGender === "male" ? 5 : -161;
    const tdee = Math.round(bmr * calcActivity);
    let target = tdee;
    if (calcGoal === "lose") target -= 450;
    if (calcGoal === "gain") target += 350;
    if (target < 1200) target = 1200;

    const proteinGrams = Math.round((target * 0.28) / 4);
    const carbsGrams = Math.round((target * 0.48) / 4);
    const fatGrams = Math.round((target * 0.24) / 9);

    return { tdee, target, protein: proteinGrams, carbs: carbsGrams, fat: fatGrams };
  };

  const results = calculateDailyNeeds();

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCalculateNow = () => {
    if (calcSectionRef.current) {
      calcSectionRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      scrollToSection("calculator");
    }
  };

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      background: "#f6f1eb",
      color: "#18181b",
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      overflowX: "hidden",
    }}>
      {/* ─── Modern Top Header / Navbar ─── */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(246, 241, 235, 0.94)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        padding: isMobile ? "12px 20px" : "18px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 1360,
        margin: "0 auto",
      }}>
        {/* Brand Logo & Name */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}
        >
          <AppleGaugeLogo size={36} />
          <span style={{
            fontSize: isMobile ? 19 : 22,
            fontWeight: 800,
            fontFamily: "'Outfit', sans-serif",
            color: "#18181b",
            letterSpacing: "-0.025em"
          }}>
            Calory Calculator
          </span>
        </a>

        {/* Center Nav Links (Desktop) */}
        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center", gap: 34 }}>
            {[
              ["Home", () => window.scrollTo({ top: 0, behavior: "smooth" })],
              ["Features", () => scrollToSection("features")],
              ["How It Works", () => scrollToSection("how-it-works")],
              ["About Us", () => scrollToSection("about")],
            ].map(([label, action]) => (
              <button
                key={label}
                onClick={action}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#27272a",
                  cursor: "pointer",
                  padding: "6px 0",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#237a44")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#27272a")}
              >
                {label}
              </button>
            ))}
          </nav>
        )}

        {/* Right CTA Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Admin Panel Button */}
          <button
            onClick={() => onOpenAdmin && onOpenAdmin()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(35, 122, 68, 0.08)",
              border: "1px solid rgba(35, 122, 68, 0.28)",
              color: "#237a44",
              borderRadius: 9999,
              padding: isMobile ? "7px 12px" : "8px 16px",
              fontSize: isMobile ? 12 : 13,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#237a44";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(35, 122, 68, 0.08)";
              e.currentTarget.style.color = "#237a44";
            }}
            title="Open Admin Panel to manage users in Supabase"
          >
            <span>🛡️</span>
            <span>Admin Panel</span>
          </button>

          {!isMobile && (
            <button
              onClick={() => onOpenAuth("login")}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 14,
                fontWeight: 600,
                color: "#52525b",
                cursor: "pointer",
                padding: "8px 16px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#18181b")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#52525b")}
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => onOpenAuth("register")}
            style={{
              background: "#237a44",
              color: "#ffffff",
              border: "none",
              borderRadius: 9999,
              padding: isMobile ? "9px 18px" : "11px 26px",
              fontSize: isMobile ? 13 : 15,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(35, 122, 68, 0.25)",
              transition: "transform 0.15s ease, background 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1e683a";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#237a44";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Get Started
          </button>

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 24,
                cursor: "pointer",
                padding: 4,
                color: "#18181b",
              }}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobile && mobileMenuOpen && (
        <div style={{
          position: "fixed",
          top: 60,
          left: 0,
          right: 0,
          background: "#f6f1eb",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          padding: "20px 24px",
          zIndex: 49,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}>
          <button
            onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{ background: "none", border: "none", textAlign: "left", fontSize: 16, fontWeight: 600, color: "#18181b" }}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("features")}
            style={{ background: "none", border: "none", textAlign: "left", fontSize: 16, fontWeight: 600, color: "#18181b" }}
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            style={{ background: "none", border: "none", textAlign: "left", fontSize: 16, fontWeight: 600, color: "#18181b" }}
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("about")}
            style={{ background: "none", border: "none", textAlign: "left", fontSize: 16, fontWeight: 600, color: "#18181b" }}
          >
            About Us
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenAdmin && onOpenAdmin(); }}
            style={{ background: "none", border: "none", textAlign: "left", fontSize: 16, fontWeight: 700, color: "#237a44", display: "flex", alignItems: "center", gap: 8 }}
          >
            <span>🛡️</span>
            <span>Admin Panel (Supabase Users)</span>
          </button>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenAuth("login"); }}
            style={{ background: "none", border: "none", textAlign: "left", fontSize: 16, fontWeight: 600, color: "#18181b" }}
          >
            Sign In to Existing Account
          </button>
        </div>
      )}

      {/* ─── Hero Section (Exact Match to Image with 3D WebGL Core) ─── */}
      <section style={{
        maxWidth: 1360,
        margin: "0 auto",
        padding: isMobile ? "24px 20px 40px" : "44px 48px 60px",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.05fr 1fr",
        alignItems: "center",
        gap: isMobile ? 32 : 36,
        position: "relative",
      }}>
        {/* Ambient 3D Depth Glow Orbs */}
        <div style={{
          position: "absolute",
          top: -60,
          left: -80,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(35, 122, 68, 0.09) 0%, rgba(35, 122, 68, 0) 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }} />
        <div style={{
          position: "absolute",
          top: 80,
          right: -80,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0) 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        {/* Left Column Content */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {/* Main Headline */}
          <h1 style={{
            fontSize: isMobile ? 36 : 60,
            fontWeight: 800,
            fontFamily: "'Outfit', sans-serif",
            color: "#18181b",
            lineHeight: 1.1,
            letterSpacing: "-0.035em",
            margin: "0 0 18px 0",
          }}>
            Track Calories. <br />
            <span style={{ color: "#237a44" }}>Fuel Better. Live Better.</span>
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: isMobile ? 16 : 18,
            color: "#3f3f46",
            lineHeight: 1.6,
            maxWidth: 510,
            margin: "0 0 32px 0",
            fontWeight: 400,
          }}>
            Easily calculate your daily calorie needs, track your meals, and achieve your health goals.
          </p>

          {/* Two Hero Action Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
            <button
              onClick={handleCalculateNow}
              style={{
                background: "#237a44",
                color: "#ffffff",
                border: "none",
                borderRadius: 9999,
                padding: "14px 28px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 6px 20px rgba(35, 122, 68, 0.28)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1e683a";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#237a44";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Calculate Now <span>→</span>
            </button>

            <button
              onClick={() => scrollToSection("features")}
              style={{
                background: "#ffffff",
                color: "#18181b",
                border: "1px solid rgba(0, 0, 0, 0.05)",
                borderRadius: 9999,
                padding: "14px 28px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 6px 22px rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.04)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Learn More
            </button>
          </div>

          {/* 4 Feature Badges in a Row (Exact match to reference) */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: 12,
            maxWidth: 580,
          }}>
            {[
              { icon: <FlameIcon size={26} color="#237a44" />, title: "Accurate\nCalorie Count" },
              { icon: <BarChartIcon size={26} color="#237a44" />, title: "Track Daily\nProgress" },
              { icon: <TargetIcon size={26} color="#237a44" />, title: "Achieve Your\nGoals" },
              { icon: <ShieldCheckIcon size={26} color="#237a44" />, title: "Healthy\nLifestyle" },
            ].map((badge, idx) => (
              <Tilt3DWrapper key={idx} maxTilt={15} scale={1.05} style={{ borderRadius: 18 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "10px 6px",
                    cursor: "pointer",
                    background: "rgba(255, 255, 255, 0.4)",
                    borderRadius: 18,
                    border: "1px solid rgba(255, 255, 255, 0.6)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {/* Icon Container with soft rounded card shape */}
                  <div style={{
                    width: 58,
                    height: 58,
                    borderRadius: 16,
                    background: "rgba(255, 255, 255, 0.85)",
                    border: "1px solid rgba(255, 255, 255, 0.95)",
                    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 8,
                  }}>
                    {badge.icon}
                  </div>
                  <div style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#18181b",
                    lineHeight: 1.3,
                    whiteSpace: "pre-line",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    {badge.title}
                  </div>
                </div>
              </Tilt3DWrapper>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive 3D WebGL Core & 3D Spatial Mockup */}
        <div style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
        }}>
          {/* 3D Scene Status Indicator */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            padding: "0 4px",
          }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(35, 122, 68, 0.08)",
              padding: "4px 12px",
              borderRadius: 20,
              border: "1px solid rgba(35, 122, 68, 0.2)",
              fontSize: isMobile ? 11 : 12,
              fontWeight: 700,
              color: "#237a44",
            }}>
              <span>🍏</span>
              <span>3D Interactive Nutrition Core</span>
            </div>

            <div style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#237a44",
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(35, 122, 68, 0.08)",
              padding: "4px 12px",
              borderRadius: 20,
              border: "1px solid rgba(35, 122, 68, 0.2)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#237a44", display: "inline-block" }}></span>
              <span>WebGL 3D Active</span>
            </div>
          </div>

          <div style={{
            position: "relative",
            width: "100%",
            height: isMobile ? 330 : 490,
            minHeight: isMobile ? 330 : 490,
            background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(246, 241, 235, 0.6) 80%)",
            borderRadius: isMobile ? 20 : 28,
            border: "1px solid rgba(0, 0, 0, 0.06)",
            boxShadow: "0 24px 60px -15px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0,0,0,0.1)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            touchAction: "pan-y",
          }}>
            {/* Three.js 3D WebGL Canvas */}
            <Hero3DCanvas style={{ width: "100%", height: isMobile ? 330 : 490 }} />

            {/* Floating 3D Badge 1: Daily Target Calorie */}
            <div style={{
              position: "absolute",
              top: isMobile ? 12 : 20,
              left: isMobile ? 12 : 20,
              background: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              padding: isMobile ? "6px 10px" : "10px 14px",
              borderRadius: isMobile ? 12 : 16,
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 6 : 10,
              pointerEvents: "none",
            }}>
              <div style={{
                width: isMobile ? 26 : 32,
                height: isMobile ? 26 : 32,
                borderRadius: "50%",
                background: "rgba(35, 122, 68, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#237a44",
                fontSize: isMobile ? 13 : 16,
              }}>
                🍏
              </div>
              <div>
                <div style={{ fontSize: isMobile ? 9 : 10, fontWeight: 700, color: "#71717a", textTransform: "uppercase" }}>Daily Target</div>
                <div style={{ fontSize: isMobile ? 12 : 14, fontWeight: 800, color: "#18181b" }}>2,150 kcal</div>
              </div>
            </div>

            {/* Floating 3D Badge 2: Orbiting Macro Rings */}
            <div style={{
              position: "absolute",
              top: isMobile ? 12 : 20,
              right: isMobile ? 12 : 20,
              background: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              padding: isMobile ? "6px 10px" : "10px 14px",
              borderRadius: isMobile ? 12 : 16,
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              pointerEvents: "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: isMobile ? 9 : 11, fontWeight: 700, color: "#18181b" }}>
                <span style={{ width: isMobile ? 6 : 8, height: isMobile ? 6 : 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
                <span>Protein: 145g</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: isMobile ? 9 : 11, fontWeight: 700, color: "#18181b" }}>
                <span style={{ width: isMobile ? 6 : 8, height: isMobile ? 6 : 8, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
                <span>Carbs: 230g</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: isMobile ? 9 : 11, fontWeight: 700, color: "#18181b" }}>
                <span style={{ width: isMobile ? 6 : 8, height: isMobile ? 6 : 8, borderRadius: "50%", background: "#f43f5e", display: "inline-block" }} />
                <span>Fats: 58g</span>
              </div>
            </div>

            {/* Bottom Interactive Hint */}
            <div style={{
              position: "absolute",
              bottom: isMobile ? 10 : 16,
              background: "rgba(24, 24, 27, 0.75)",
              color: "#ffffff",
              backdropFilter: "blur(8px)",
              padding: isMobile ? "4px 10px" : "6px 14px",
              borderRadius: 20,
              fontSize: isMobile ? 10 : 11,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 5,
              pointerEvents: "none",
            }}>
              <span>✨ {isMobile ? "Touch & swipe to rotate 3D core" : "Move cursor to rotate & tilt 3D calorie core"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interactive "Calculate Now" Section ─── */}
      <section
        id="calculator"
        ref={calcSectionRef}
        style={{
          background: "#ffffff",
          borderTop: "1px solid rgba(0, 0, 0, 0.05)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
          padding: isMobile ? "50px 20px" : "80px 48px",
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(35, 122, 68, 0.08)",
              color: "#237a44",
              fontWeight: 700,
              fontSize: 12,
              padding: "6px 14px",
              borderRadius: 30,
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}>
              <AppleGaugeLogo size={18} />
              Instant Daily Calorie Engine
            </div>
            <h2 style={{
              fontSize: isMobile ? 28 : 42,
              fontWeight: 800,
              fontFamily: "'Outfit', sans-serif",
              color: "#18181b",
              letterSpacing: "-0.03em",
              margin: 0,
            }}>
              Calculate Your Exact Daily Calorie Needs
            </h2>
            <p style={{ fontSize: 16, color: "#52525b", maxWidth: 620, margin: "10px auto 0" }}>
              Personalized based on your age, body metrics, and activity level using the clinical Mifflin-St Jeor formula.
            </p>
          </div>

          {/* Calculator Grid: Inputs on Left, Result Ring on Right */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
            gap: 32,
            background: "#fbf9f6",
            borderRadius: 24,
            padding: isMobile ? 20 : 36,
            border: "1px solid rgba(0, 0, 0, 0.06)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          }}>
            {/* Left Inputs */}
            <div>
              {/* Gender Toggle */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#27272a", marginBottom: 8 }}>
                  Gender
                </label>
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    ["male", "👨 Male"],
                    ["female", "👩 Female"],
                  ].map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => setCalcGender(val)}
                      style={{
                        flex: 1,
                        padding: "10px 14px",
                        borderRadius: 12,
                        border: calcGender === val ? "2px solid #237a44" : "1px solid #e4e4e7",
                        background: calcGender === val ? "rgba(35, 122, 68, 0.08)" : "#ffffff",
                        color: calcGender === val ? "#237a44" : "#3f3f46",
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Age, Weight, Height Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#27272a", marginBottom: 6 }}>
                    Age (yrs)
                  </label>
                  <input
                    type="number"
                    min="14"
                    max="100"
                    value={calcAge}
                    onChange={(e) => setCalcAge(Number(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid #d4d4d8",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#18181b",
                      background: "#ffffff",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#27272a", marginBottom: 6 }}>
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="250"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(Number(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid #d4d4d8",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#18181b",
                      background: "#ffffff",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#27272a", marginBottom: 6 }}>
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="230"
                    value={calcHeight}
                    onChange={(e) => setCalcHeight(Number(e.target.value))}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid #d4d4d8",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#18181b",
                      background: "#ffffff",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              </div>

              {/* Activity Level */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#27272a", marginBottom: 8 }}>
                  Activity Level
                </label>
                <select
                  value={calcActivity}
                  onChange={(e) => setCalcActivity(Number(e.target.value))}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #d4d4d8",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#18181b",
                    background: "#ffffff",
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                >
                  <option value={1.2}>Sedentary (Desk job, minimal exercise)</option>
                  <option value={1.375}>Lightly Active (Workouts 1-3 days/week)</option>
                  <option value={1.55}>Moderately Active (Workouts 3-5 days/week)</option>
                  <option value={1.725}>Very Active (Hard workouts 6-7 days/week)</option>
                  <option value={1.9}>Extremely Active (Athletic physical training)</option>
                </select>
              </div>

              {/* Fitness Goal */}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#27272a", marginBottom: 8 }}>
                  Your Health Goal
                </label>
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    ["lose", "🔥 Lose Weight"],
                    ["maintain", "⚖️ Maintain"],
                    ["gain", "💪 Build Muscle"],
                  ].map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => setCalcGoal(val)}
                      style={{
                        flex: 1,
                        padding: "10px 8px",
                        borderRadius: 10,
                        border: calcGoal === val ? "2px solid #237a44" : "1px solid #e4e4e7",
                        background: calcGoal === val ? "rgba(35, 122, 68, 0.08)" : "#ffffff",
                        color: calcGoal === val ? "#237a44" : "#3f3f46",
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Results: Interactive 3D Torus Gauge / Matching Phone Screen */}
            <Tilt3DWrapper maxTilt={8} scale={1.01} style={{ borderRadius: 20 }}>
              <div style={{
                background: "#ffffff",
                borderRadius: 20,
                padding: "22px 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
                minHeight: 400,
              }}>
                {/* Header with 3D / 2D Toggle */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  marginBottom: 8,
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Daily Calorie Target
                  </div>
                  <div style={{
                    display: "inline-flex",
                    background: "#f4efe9",
                    borderRadius: 20,
                    padding: 2,
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}>
                    <button
                      type="button"
                      onClick={() => setCalcViewMode("3d")}
                      style={{
                        padding: "3px 10px",
                        borderRadius: 20,
                        border: "none",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                        background: calcViewMode === "3d" ? "#237a44" : "transparent",
                        color: calcViewMode === "3d" ? "#ffffff" : "#71717a",
                        transition: "all 0.15s ease",
                      }}
                    >
                      3D Torus
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcViewMode("2d")}
                      style={{
                        padding: "3px 10px",
                        borderRadius: 20,
                        border: "none",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                        background: calcViewMode === "2d" ? "#237a44" : "transparent",
                        color: calcViewMode === "2d" ? "#ffffff" : "#71717a",
                        transition: "all 0.15s ease",
                      }}
                    >
                      2D Flat
                    </button>
                  </div>
                </div>

                {calcViewMode === "3d" ? (
                  <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {/* Real-time 3D Torus WebGL Canvas */}
                    <Calculator3DCanvas
                      targetCalories={results.target}
                      tdee={results.tdee}
                      goal={calcGoal}
                      protein={results.protein}
                      carbs={results.carbs}
                      fat={results.fat}
                      style={{ height: 180, width: "100%" }}
                    />
                    <div style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      pointerEvents: "none",
                    }}>
                      <div style={{
                        fontSize: 32,
                        fontWeight: 800,
                        fontFamily: "'Outfit', sans-serif",
                        color: "#18181b",
                        lineHeight: 1,
                        textShadow: "0 2px 10px rgba(255,255,255,0.9)",
                      }}>
                        {results.target}
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#237a44", marginTop: 2 }}>
                        kcal / day
                      </div>
                    </div>
                    <div style={{ fontSize: 10, color: "#a1a1aa", fontWeight: 600, marginTop: -6, marginBottom: 10 }}>
                      ✨ Move cursor over 3D torus to tilt ring
                    </div>
                  </div>
                ) : (
                  /* Circular Gauge Ring (identical to phone mockup) */
                  <div style={{
                    position: "relative",
                    width: 170,
                    height: 170,
                    margin: "16px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <svg width="170" height="170" viewBox="0 0 170 170">
                      <circle cx="85" cy="85" r="72" fill="none" stroke="#f4f4f5" strokeWidth="14" />
                      <circle
                        cx="85"
                        cy="85"
                        r="72"
                        fill="none"
                        stroke="#237a44"
                        strokeWidth="14"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 72}
                        strokeDashoffset={2 * Math.PI * 72 * 0.28}
                        transform="rotate(-90 85 85)"
                      />
                    </svg>

                    <div style={{ position: "absolute", textAlign: "center" }}>
                      <div style={{
                        fontSize: 34,
                        fontWeight: 800,
                        fontFamily: "'Outfit', sans-serif",
                        color: "#18181b",
                        lineHeight: 1,
                      }}>
                        {results.target}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#71717a", marginTop: 4 }}>
                        / {results.target} kcal
                      </div>
                    </div>
                  </div>
                )}

              {/* Macro Nutrients Row */}
              <div style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                padding: "12px 0",
                borderTop: "1px solid #f4f4f5",
                borderBottom: "1px solid #f4f4f5",
                marginBottom: 16,
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#71717a" }}>Carbs</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#18181b" }}>{results.carbs}g</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#71717a" }}>Protein</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#237a44" }}>{results.protein}g</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#71717a" }}>Fats</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#18181b" }}>{results.fat}g</div>
                </div>
              </div>

              {/* Save & Start Tracking CTA */}
              <button
                onClick={() => onOpenAuth("register")}
                style={{
                  width: "100%",
                  background: "#237a44",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 12,
                  padding: "13px 0",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(35, 122, 68, 0.25)",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#1e683a")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#237a44")}
              >
                Save My Plan & Track Meals →
              </button>
            </div>
            </Tilt3DWrapper>
          </div>
        </div>
      </section>

      {/* ─── Features Section ─── */}
      <section
        id="features"
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: isMobile ? "50px 20px" : "80px 48px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div style={{ color: "#237a44", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
            Core Capabilities
          </div>
          <h2 style={{ fontSize: isMobile ? 28 : 42, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: "#18181b", letterSpacing: "-0.02em" }}>
            Everything You Need To Fuel Better
          </h2>
          <p style={{ color: "#52525b", fontSize: 16, maxWidth: 580, margin: "10px auto 0" }}>
            Engineered to remove friction from daily calorie counting with instant smart logging and deep nutritional insights.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}>
          {[
            {
              icon: "📸",
              title: "AI Camera Food Recognition",
              desc: "Snap dishes or grocery items with your smartphone camera. Smart computer vision calculates calories, protein, carbs, and fats instantly.",
              badge: "Computer Vision",
            },
            {
              icon: "📅",
              title: "Past & Future Calendar Logs",
              desc: "Seamless date-by-date SQLite persistence. Easily view yesterday's food log, plan tomorrow's meals, and analyze 30-day weight trends.",
              badge: "Private SQLite",
            },
            {
              icon: "🥗",
              title: "Tailored Diet Schedules",
              desc: "Generate full-day diet plans for Vegetarian, Non-Vegetarian, Vegan, Keto, or High-Protein regimes tailored to your exact caloric target.",
              badge: "Smart Diet",
            },
            {
              icon: "💧",
              title: "Hydration & Water Counter",
              desc: "Log glasses and bottles of water with a single tap. Stay hydrated with visual progress dials synced directly to your daily goal.",
              badge: "Hydration",
            },
            {
              icon: "⚡",
              title: "1-Tap Whole Food Presets",
              desc: "Quickly record healthy whole food staples including grilled chicken, boiled eggs, avocado toast, oatmeal, and fresh fruits.",
              badge: "Quick Log",
            },
            {
              icon: "🛡️",
              title: "Non-Food Edible Guard",
              desc: "Built-in intelligent edible food validation rejects non-food items (keys, remotes, laptops) and verifies genuine culinary ingredients.",
              badge: "Smart Guard",
            },
          ].map((ft, i) => (
            <Tilt3DWrapper key={i} maxTilt={10} scale={1.02} style={{ borderRadius: 20 }}>
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  borderRadius: 20,
                  padding: "26px 22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.04)",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: "rgba(35, 122, 68, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                    }}>
                      {ft.icon}
                    </div>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: 20,
                      background: "rgba(0,0,0,0.04)",
                      color: "#237a44",
                    }}>
                      {ft.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: "#18181b", marginBottom: 8 }}>
                    {ft.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "#52525b", lineHeight: 1.6 }}>
                    {ft.desc}
                  </p>
                </div>
              </div>
            </Tilt3DWrapper>
          ))}
        </div>
      </section>

      {/* ─── How It Works Section ─── */}
      <section
        id="how-it-works"
        style={{
          background: "#fbf9f6",
          borderTop: "1px solid rgba(0, 0, 0, 0.05)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
          padding: isMobile ? "50px 20px" : "80px 48px",
        }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: "#237a44", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
            Simple 3-Step Process
          </div>
          <h2 style={{ fontSize: isMobile ? 28 : 40, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: "#18181b", marginBottom: 44 }}>
            How Calory Calculator Works
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 24 }}>
            {[
              {
                step: "01",
                title: "Calculate or Snap",
                desc: "Calculate your daily baseline target in seconds, or snap a photo of your breakfast, lunch, or dinner.",
              },
              {
                step: "02",
                title: "Instant Macro Calculation",
                desc: "Get instant breakdown of calories, protein, carbs, and fats verified against nutritional benchmarks.",
              },
              {
                step: "03",
                title: "Achieve Your Goal",
                desc: "Watch your daily progress ring fill up and maintain effortless momentum week after week.",
              },
            ].map((st, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  borderRadius: 20,
                  padding: "32px 24px",
                  textAlign: "left",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{
                  fontSize: 32,
                  fontWeight: 900,
                  fontFamily: "'Outfit', sans-serif",
                  color: "#237a44",
                  marginBottom: 12,
                }}>
                  {st.step}
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#18181b", marginBottom: 8 }}>
                  {st.title}
                </div>
                <div style={{ fontSize: 14, color: "#52525b", lineHeight: 1.6 }}>
                  {st.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About Us / Social Proof Section ─── */}
      <section
        id="about"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "50px 20px" : "80px 48px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ color: "#237a44", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
            Our Mission & Impact
          </div>
          <h2 style={{ fontSize: isMobile ? 28 : 42, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: "#18181b", letterSpacing: "-0.02em" }}>
            Fuel Better. Live Better.
          </h2>
          <p style={{ color: "#52525b", fontSize: 16, maxWidth: 620, margin: "10px auto 0" }}>
            Calory Calculator was created with a single mission: to empower everyone to understand what they put in their body without complex counting or tedious spreadsheets.
          </p>
        </div>

        {/* 3 Metric Badges */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 44,
        }}>
          {[
            { num: "50,000+", label: "Meals Logged" },
            { num: "99.2%", label: "Calorie Accuracy" },
            { num: "10,000+", label: "Active Users" },
            { num: "4.9 / 5.0", label: "User Satisfaction" },
          ].map((stat, i) => (
            <div key={i} style={{
              background: "#ffffff",
              padding: "24px 18px",
              borderRadius: 18,
              textAlign: "center",
              border: "1px solid rgba(0,0,0,0.06)",
            }}>
              <div style={{ fontSize: 30, fontWeight: 800, fontFamily: "'Outfit', sans-serif", color: "#237a44" }}>
                {stat.num}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#71717a", marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bottom Call to Action Banner ─── */}
      <section style={{
        maxWidth: 1200,
        margin: "0 auto 80px",
        padding: isMobile ? "0 20px" : "0 48px",
      }}>
        <div style={{
          background: "linear-gradient(135deg, #237a44 0%, #17542d 100%)",
          borderRadius: 28,
          padding: isMobile ? "40px 24px" : "60px 48px",
          color: "#ffffff",
          textAlign: "center",
          boxShadow: "0 20px 50px -10px rgba(35, 122, 68, 0.35)",
        }}>
          <h2 style={{
            fontSize: isMobile ? 28 : 44,
            fontWeight: 800,
            fontFamily: "'Outfit', sans-serif",
            marginBottom: 14,
            lineHeight: 1.15,
          }}>
            Start Your Calorie Journey Today
          </h2>
          <p style={{
            fontSize: isMobile ? 15 : 17,
            color: "rgba(255, 255, 255, 0.88)",
            maxWidth: 580,
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}>
            Calculate your needs, track your daily nutrition, and build lifelong healthy eating habits with Calory Calculator.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() => onOpenAuth("register")}
              style={{
                background: "#ffffff",
                color: "#237a44",
                border: "none",
                borderRadius: 9999,
                padding: "15px 36px",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
                transition: "transform 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Get Started Free →
            </button>
            <button
              onClick={() => onOpenAuth("login")}
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: 9999,
                padding: "15px 30px",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                backdropFilter: "blur(8px)",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)")}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer style={{
        background: "#f1ebe4",
        borderTop: "1px solid rgba(0, 0, 0, 0.06)",
        padding: isMobile ? "32px 20px" : "44px 48px",
        color: "#52525b",
        fontSize: 14,
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <AppleGaugeLogo size={28} />
            <span style={{ fontSize: 18, fontWeight: 800, color: "#18181b", fontFamily: "'Outfit', sans-serif" }}>
              Calory Calculator
            </span>
          </div>

          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontSize: 13, fontWeight: 500 }}>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ background: "none", border: "none", color: "#52525b", cursor: "pointer" }}>Home</button>
            <button onClick={() => scrollToSection("features")} style={{ background: "none", border: "none", color: "#52525b", cursor: "pointer" }}>Features</button>
            <button onClick={() => scrollToSection("how-it-works")} style={{ background: "none", border: "none", color: "#52525b", cursor: "pointer" }}>How It Works</button>
            <button onClick={() => scrollToSection("about")} style={{ background: "none", border: "none", color: "#52525b", cursor: "pointer" }}>About Us</button>
            <button onClick={() => onOpenAdmin && onOpenAdmin()} style={{ background: "none", border: "none", color: "#237a44", fontWeight: 700, cursor: "pointer" }}>🛡️ Admin Panel</button>
          </div>

          <div style={{ fontSize: 13, color: "#71717a" }}>
            © {new Date().getFullYear()} Calory Calculator. Fuel Better. Live Better.
          </div>
        </div>
      </footer>
    </div>
  );
}
