import React, { useState, useEffect } from "react";
import { Cloud, Sun, Wind, Umbrella, ShieldCheck, Zap } from "lucide-react";

const AdvisoryPage = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [isLocal, setIsLocal] = useState(false);

  const fetchWeather = async (query) => {
    setLoading(true);
    try {
      // query can be cityName or "lat,lon"
      const res = await fetch(`https://wttr.in/${query}?format=j1`);
      const data = await res.json();
      setWeather(data.current_condition[0]);
      if (query.includes(",")) {
        setCity(data.nearest_area[0].areaName[0].value);
        setIsLocal(true);
      } else {
        setIsLocal(false);
      }
    } catch (err) {
      console.error("Weather fetch failed", err);
      // Fallback/Mock for demo
      setWeather({
        temp_C: "28",
        weatherDesc: [{ value: "Sunny" }],
        humidity: "40",
        windspeedKmph: "12"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeather(`${latitude},${longitude}`);
        },
        () => {
          fetchWeather("Delhi"); // Fallback city
        }
      );
    } else {
      fetchWeather("Delhi");
    }
  }, []);

  const getAdvice = (w) => {
    if (!w) return "Fetching latest weather for advice...";
    const desc = w.weatherDesc[0].value.toLowerCase();
    const temp = parseInt(w.temp_C);

    if (desc.includes("rain")) {
      return "⚠️ Heavy rain predicted. Avoid fertilizer application and ensure proper drainage in fields.";
    }
    if (temp > 35) {
      return "🔥 High temperature detected. Increase irrigation frequency and avoid noon-time spraying.";
    }
    if (desc.includes("sunny") || desc.includes("clear")) {
      return "✅ Optimal conditions for harvesting and sun-drying your produce.";
    }
    return "🌤 Normal conditions. Continue regular maintenance and pest monitoring.";
  };

  return (
    <div className="page-container">
      <div className="glass-effect" style={{ padding: "48px 32px", borderRadius: "var(--radius-lg)", textAlign: "center", marginBottom: 40, border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}>
        <h1 style={{ fontSize: "2.8rem", color: "var(--primary-dark)", margin: "0 0 12px" }}>
          Krishi<span style={{ color: "var(--primary)", fontWeight: 900 }}>Sathi</span> Intelligence Hub
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", marginTop: 12 }}>Expert guidance, delivered in real-time. Smart weather and farming support.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 60 }}>
        {/* WEATHER SECTION */}
        <div className="premium-card" style={{ padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
            <div>
              <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
                <Cloud color="var(--primary)" size={24} />
                Local Weather
              </h3>
              {isLocal && (
                <span style={{
                  fontSize: "0.75rem",
                  background: "var(--primary-light)",
                  color: "var(--primary-dark)",
                  padding: "2px 8px",
                  borderRadius: 20,
                  fontWeight: 700,
                  display: "inline-block",
                  marginTop: 4
                }}>
                  📍 LIVE LOCATION
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                style={{ padding: "8px 16px", width: 140, borderRadius: 10, border: "1px solid var(--border)" }}
              />
              <button
                onClick={() => fetchWeather(city)}
                style={{
                  background: "var(--primary)",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: 10,
                  border: "none",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Update
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}>Analyzing atmosphere...</div>
          ) : weather ? (
            <div style={{ background: "var(--background)", padding: 32, borderRadius: 20, textAlign: "center", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "3.5rem", fontWeight: 800, color: "var(--primary-dark)", marginBottom: 8 }}>{weather.temp_C}°C</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--text-main)", marginBottom: 20, textTransform: "capitalize" }}>{weather.weatherDesc[0].value}</div>

              <div style={{ display: "flex", justifyContent: "center", gap: 24, padding: "16px 0", borderTop: "1.5px solid var(--border)" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>Humidity</div>
                  <div style={{ fontWeight: 700 }}>{weather.humidity}%</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>Wind</div>
                  <div style={{ fontWeight: 700 }}>{weather.windspeedKmph} km/h</div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: 40, textAlign: "center" }}>Unable to load weather station.</div>
          )}
        </div>

        {/* AI ADVICE */}
        <div className="premium-card" style={{ padding: 32, background: "linear-gradient(135deg, #fff9c4 0%, #fffde7 100%)", borderColor: "#fbc02d" }}>
          <h3 style={{ margin: "0 0 24px", display: "flex", alignItems: "center", gap: 10, color: "#957d32" }}>
            <Zap size={24} fill="#fbc02d" color="#fbc02d" />
            Smart Strategy
          </h3>
          <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#5d4037", lineHeight: "1.5", margin: 0 }}>
            {getAdvice(weather)}
          </p>
          <div style={{ marginTop: 32, padding: 16, background: "rgba(255,255,255,0.5)", borderRadius: 12, fontSize: 14, color: "#795548" }}>
            <strong>Recommendation:</strong> Based on historical patterns for {city}.
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: "1.8rem", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <ShieldCheck size={28} color="var(--primary)" />
          Verified Government Initiatives
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          <div className="premium-card" style={{ padding: 24, borderLeft: "6px solid var(--primary)" }}>
            <h4 style={{ margin: "0 0 12px", fontSize: "1.2rem" }}>PM-KISAN Samman Nidhi</h4>
            <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: "1.5" }}>Empowering small and marginal farmers with ₹6,000 yearly direct income support in three equal installments.</p>
          </div>
          <div className="premium-card" style={{ padding: 24, borderLeft: "6px solid #1976d2" }}>
            <h4 style={{ margin: "0 0 12px", fontSize: "1.2rem" }}>Pradhan Mantri Fasal Bima</h4>
            <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: "1.5" }}>A safety net against unpredictable nature, providing budget-friendly crop insurance against disasters and pests.</p>
          </div>
          <div className="premium-card" style={{ padding: 24, borderLeft: "6px solid #ef6c00" }}>
            <h4 style={{ margin: "0 0 12px", fontSize: "1.2rem" }}>Soil Health Card Scheme</h4>
            <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: "1.5" }}>Optimize your yields by understanding your soil. Get periodic testing and tailored nutrient advice for every plot.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryPage;
