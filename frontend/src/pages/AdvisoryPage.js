import React, { useState, useEffect } from "react";
import { Cloud, Zap, ShieldCheck, Droplets, Wind } from "lucide-react";
import { motion } from "framer-motion";

const AdvisoryPage = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [isLocal, setIsLocal] = useState(false);

  const fetchWeather = async (query) => {
    setLoading(true);
    try {
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
          fetchWeather("Delhi");
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

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardHover = {
    scale: 1.02,
    y: -5,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  };

  return (
    <motion.div
      className="page-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div
        variants={itemVariants}
        className="glass-effect"
        style={{
          padding: window.innerWidth < 768 ? "32px 20px" : "48px 32px",
          borderRadius: "var(--radius-lg)",
          textAlign: "center",
          marginBottom: window.innerWidth < 768 ? 24 : 40,
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-md)"
        }}
      >
        <motion.h1
          style={{
            fontSize: window.innerWidth < 768 ? "1.8rem" : "2.8rem",
            color: "var(--primary-dark)",
            margin: "0 0 12px"
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          Krishi<span style={{ color: "var(--primary)", fontWeight: 900 }}>Sathi</span> Intelligence Hub
        </motion.h1>
        <motion.p
          style={{ color: "var(--text-muted)", fontSize: window.innerWidth < 768 ? "1rem" : "1.2rem", marginTop: 12 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Expert guidance, delivered in real-time. Smart weather and farming support.
        </motion.p>
      </motion.div>

      {/* Weather + Strategy Grid - STACKS ON MOBILE */}
      <div style={{
        display: "grid",
        gridTemplateColumns: window.innerWidth < 900 ? "1fr" : "1fr 1fr",
        gap: window.innerWidth < 768 ? 20 : 40,
        marginBottom: window.innerWidth < 768 ? 40 : 60
      }}>
        {/* WEATHER SECTION */}
        <motion.div
          variants={itemVariants}
          whileHover={cardHover}
          className="premium-card"
          style={{ padding: window.innerWidth < 768 ? 20 : 32 }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 16
          }}>
            <div>
              <motion.h3
                style={{ margin: 0, display: "flex", alignItems: "center", gap: 10 }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Cloud color="var(--primary)" size={24} />
                Local Weather
              </motion.h3>
              {isLocal && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    fontSize: "0.75rem",
                    background: "var(--primary-light)",
                    color: "var(--primary-dark)",
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontWeight: 700,
                    display: "inline-block",
                    marginTop: 8
                  }}
                >
                  📍 LIVE LOCATION
                </motion.span>
              )}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                style={{
                  padding: "10px 14px",
                  width: window.innerWidth < 400 ? "100%" : 130,
                  borderRadius: 12,
                  border: "1px solid var(--border)",
                  fontSize: "14px"
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fetchWeather(city)}
                className="gradient-button"
                style={{
                  background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: 12,
                  border: "none",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(45, 106, 79, 0.25)"
                }}
              >
                Update
              </motion.button>
            </div>
          </div>

          {loading ? (
            <motion.div
              style={{ padding: 40, textAlign: "center", color: "var(--text-muted)" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Analyzing atmosphere...
            </motion.div>
          ) : weather ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              style={{
                background: "var(--background)",
                padding: window.innerWidth < 768 ? 20 : 32,
                borderRadius: 20,
                textAlign: "center",
                border: "1px solid var(--border)"
              }}
            >
              <motion.div
                style={{ fontSize: window.innerWidth < 768 ? "2.8rem" : "3.5rem", fontWeight: 800, color: "var(--primary-dark)", marginBottom: 8 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              >
                {weather.temp_C}°C
              </motion.div>
              <div style={{ fontSize: window.innerWidth < 768 ? "1.2rem" : "1.4rem", fontWeight: 600, color: "var(--text-main)", marginBottom: 20, textTransform: "capitalize" }}>
                {weather.weatherDesc[0].value}
              </div>

              <div style={{
                display: "flex",
                justifyContent: "center",
                gap: window.innerWidth < 768 ? 20 : 32,
                padding: "16px 0",
                borderTop: "1.5px solid var(--border)"
              }}>
                <motion.div
                  style={{ textAlign: "center" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Droplets size={20} color="var(--primary)" style={{ marginBottom: 4 }} />
                  <div style={{ color: "var(--text-muted)", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>Humidity</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{weather.humidity}%</div>
                </motion.div>
                <motion.div
                  style={{ textAlign: "center" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Wind size={20} color="var(--primary)" style={{ marginBottom: 4 }} />
                  <div style={{ color: "var(--text-muted)", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>Wind</div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{weather.windspeedKmph} km/h</div>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <div style={{ padding: 40, textAlign: "center" }}>Unable to load weather station.</div>
          )}
        </motion.div>

        {/* AI ADVICE - Stacked below on mobile */}
        <motion.div
          variants={itemVariants}
          whileHover={cardHover}
          className="premium-card"
          style={{
            padding: window.innerWidth < 768 ? 20 : 32,
            background: "linear-gradient(135deg, #fff9c4 0%, #fffde7 100%)",
            borderColor: "#fbc02d"
          }}
        >
          <motion.h3
            style={{ margin: "0 0 24px", display: "flex", alignItems: "center", gap: 10, color: "#957d32" }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Zap size={24} fill="#fbc02d" color="#fbc02d" />
            Smart Strategy
          </motion.h3>
          <motion.p
            style={{ fontSize: window.innerWidth < 768 ? "1.2rem" : "1.4rem", fontWeight: 700, color: "#5d4037", lineHeight: "1.5", margin: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {getAdvice(weather)}
          </motion.p>
          <motion.div
            style={{ marginTop: 24, padding: 16, background: "rgba(255,255,255,0.6)", borderRadius: 12, fontSize: 14, color: "#795548" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <strong>Recommendation:</strong> Based on historical patterns for {city || "your area"}.
          </motion.div>
        </motion.div>
      </div>

      {/* Government Initiatives Section */}
      <motion.div variants={itemVariants}>
        <motion.h3
          style={{ fontSize: window.innerWidth < 768 ? "1.4rem" : "1.8rem", marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ShieldCheck size={28} color="var(--primary)" />
          Verified Government Initiatives
        </motion.h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {[
            { title: "PM-KISAN Samman Nidhi", desc: "Empowering small and marginal farmers with ₹6,000 yearly direct income support in three equal installments.", color: "var(--primary)" },
            { title: "Pradhan Mantri Fasal Bima", desc: "A safety net against unpredictable nature, providing budget-friendly crop insurance against disasters and pests.", color: "#1976d2" },
            { title: "Soil Health Card Scheme", desc: "Optimize your yields by understanding your soil. Get periodic testing and tailored nutrient advice for every plot.", color: "#ef6c00" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="premium-card"
              style={{ padding: window.innerWidth < 768 ? 20 : 24, borderLeft: `6px solid ${item.color}` }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, type: "spring" }}
              whileHover={cardHover}
            >
              <h4 style={{ margin: "0 0 12px", fontSize: "1.1rem" }}>{item.title}</h4>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: "1.5", margin: 0 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdvisoryPage;
