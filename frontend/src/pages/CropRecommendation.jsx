import React, { useState, useEffect } from "react";
import { Sprout, Beaker, MapPin, Wind, Thermometer, Droplets } from "lucide-react";
import { motion } from "framer-motion";

const CropRecommendation = () => {
    const [formData, setFormData] = useState({
        location: "",
        soilType: "Alluvial",
        season: "Kharif",
    });

    const [recommendation, setRecommendation] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 900);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const soilTypes = ["Alluvial", "Black", "Red", "Laterite", "Desert", "Mountain"];
    const seasons = ["Kharif", "Rabi", "Zaid"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getRecommendation = (e) => {
        e.preventDefault();

        let crops = [];
        let fertilizers = "";
        let yield_est = "";

        if (formData.season === "Kharif") {
            if (formData.soilType === "Alluvial" || formData.soilType === "Black") {
                crops = ["Rice", "Cotton", "Maize"];
                fertilizers = "Urea, DAP, Potash";
                yield_est = "25-30 Quintals/Acre";
            } else {
                crops = ["Bajra", "Jowar", "Pulses"];
                fertilizers = "NPK 12:32:16";
                yield_est = "15-20 Quintals/Acre";
            }
        } else if (formData.season === "Rabi") {
            if (formData.soilType === "Alluvial") {
                crops = ["Wheat", "Mustard", "Gram"];
                fertilizers = "NPK 19:19:19, Zinc";
                yield_est = "20-25 Quintals/Acre";
            } else {
                crops = ["Barley", "Linseed"];
                fertilizers = "Organic Manure, SSP";
                yield_est = "12-18 Quintals/Acre";
            }
        } else {
            crops = ["Watermelon", "Cucumber", "Moong Dal"];
            fertilizers = "Liquid Fertilizers, Compost";
            yield_est = "10-15 Quintals/Acre";
        }

        setRecommendation({ crops, fertilizers, yield_est });
    };

    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.header
                style={{ textAlign: "center", marginBottom: isMobile ? 32 : 48 }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <h1 style={{ fontSize: isMobile ? "1.8rem" : "2.8rem", color: "var(--primary-dark)", margin: "0 0 12px" }}>
                    Krishi<span style={{ color: "var(--primary)", fontWeight: 900 }}>Sathi</span> AI Advisory
                </h1>
                <p style={{ fontSize: isMobile ? "1rem" : "1.2rem", color: "var(--text-muted)", maxWidth: 600, margin: "0 auto" }}>
                    Expert advice for your farm. Optimize your crop selection with AI.
                </p>
            </motion.header>

            {/* STACK VERTICALLY ON MOBILE */}
            <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : (recommendation ? "1fr 1fr" : "1fr"),
                gap: isMobile ? 24 : 40,
                alignItems: "start"
            }}>
                <motion.form
                    onSubmit={getRecommendation}
                    className="premium-card"
                    style={{ padding: isMobile ? 24 : 40, border: "1px solid var(--border)" }}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div style={{ marginBottom: 24 }}>
                        <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: 8 }}>
                            <MapPin size={18} color="var(--primary)" /> Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            placeholder="e.g. Punjab, Maharashtra"
                            value={formData.location}
                            onChange={handleChange}
                            style={{ width: "100%", padding: 14, boxSizing: "border-box" }}
                            required
                        />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20, marginBottom: 32 }}>
                        <div>
                            <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: 8 }}>
                                <Beaker size={18} color="var(--primary)" /> Soil Type
                            </label>
                            <select name="soilType" value={formData.soilType} onChange={handleChange} style={{ width: "100%", padding: 14 }}>
                                {soilTypes.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label style={{ ...labelStyle, display: "flex", alignItems: "center", gap: 8 }}>
                                <Wind size={18} color="var(--primary)" /> Season
                            </label>
                            <select name="season" value={formData.season} onChange={handleChange} style={{ width: "100%", padding: 14 }}>
                                {seasons.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        style={{ ...btnStyle, background: "linear-gradient(135deg, var(--primary), var(--primary-light))", boxShadow: "0 10px 20px rgba(46, 125, 50, 0.2)" }}
                        whileHover={{ scale: 1.02, boxShadow: "0 15px 30px rgba(46, 125, 50, 0.3)" }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Generate AI Analysis
                    </motion.button>
                </motion.form>

                {recommendation && (
                    <motion.div
                        className="premium-card"
                        style={{
                            padding: isMobile ? 24 : 40,
                            background: "linear-gradient(135deg, #f1f8e9 0%, #e8f5e9 100%)",
                            borderColor: "var(--primary-light)",
                            boxShadow: "var(--shadow-lg)"
                        }}
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                            <motion.div
                                style={{ background: "var(--primary)", padding: 10, borderRadius: 12, color: "white" }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.3 }}
                            >
                                <Sprout size={24} />
                            </motion.div>
                            <h2 style={{ color: "var(--primary-dark)", margin: 0, fontSize: isMobile ? "1.3rem" : "1.5rem" }}>Optimally Suggested</h2>
                        </div>

                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
                            {recommendation.crops.map((crop, i) => (
                                <motion.span
                                    key={crop}
                                    style={{ ...badgeStyle, background: "white", color: "var(--primary-dark)", border: "1.5px solid var(--primary-light)", fontSize: 15, padding: "10px 20px" }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                >
                                    {crop}
                                </motion.span>
                            ))}
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                            <motion.div
                                style={{ background: "white", padding: isMobile ? 16 : 20, borderRadius: 16, border: "1px solid rgba(0,0,0,0.05)" }}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                    <Thermometer size={18} color="var(--secondary)" />
                                    <h4 style={{ margin: 0, color: "var(--text-muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Target Nutrient Profile</h4>
                                </div>
                                <p style={{ margin: 0, fontWeight: 700, fontSize: isMobile ? "1rem" : "1.2rem" }}>{recommendation.fertilizers}</p>
                            </motion.div>

                            <motion.div
                                style={{ background: "white", padding: isMobile ? 16 : 20, borderRadius: 16, border: "1px solid rgba(0,0,0,0.05)" }}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                    <Droplets size={18} color="#1976d2" />
                                    <h4 style={{ margin: 0, color: "var(--text-muted)", fontSize: 12, textTransform: "uppercase", letterSpacing: 1 }}>Forecasted Harvest</h4>
                                </div>
                                <p style={{ margin: 0, fontWeight: 700, fontSize: isMobile ? "1rem" : "1.2rem", color: "var(--primary-dark)" }}>{recommendation.yield_est}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

const labelStyle = { display: "block", marginBottom: 8, fontWeight: 600, color: "var(--text-muted)" };

const btnStyle = {
    width: "100%",
    padding: 16,
    color: "white",
    border: "none",
    borderRadius: "var(--radius-sm)",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 10
};

const badgeStyle = {
    padding: "8px 16px",
    borderRadius: 20,
    fontSize: 14,
    fontWeight: 600
};

export default CropRecommendation;
