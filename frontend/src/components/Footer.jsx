import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

const Footer = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const currentYear = new Date().getFullYear();

    const handleNewsletter = (e) => {
        e.preventDefault();
        if (!email) return;
        // TODO: Implement newsletter API call
        toast.success(`Thank you for subscribing! Welcome to the KrishiSathi community.`);
        setEmail("");
    };

    return (
        <footer style={footerStyle}>
            {/* Main Footer Content */}
            <div style={footerContainer}>
                <div style={footerGrid}>
                    {/* Company Info */}
                    <div>
                        <h3 style={footerHeading}>
                            Krishi<span style={{ color: "var(--primary)", fontWeight: 900 }}>Sathi</span>
                        </h3>
                        <p style={footerText}>
                            Modern technology bridging traditional agriculture. Empowering Bharat's farmers with premium quality products and intelligent farming solutions.
                        </p>
                        <div style={{ marginTop: 20 }}>
                            <div style={contactItem}>
                                <Phone size={16} style={{ color: "var(--primary)" }} />
                                <span>+91 1800-XXX-XXXX</span>
                            </div>
                            <div style={contactItem}>
                                <Mail size={16} style={{ color: "var(--primary)" }} />
                                <span>support@krishisathi.com</span>
                            </div>
                            <div style={contactItem}>
                                <MapPin size={16} style={{ color: "var(--primary)" }} />
                                <span>Agricultural Hub, New Delhi, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={footerHeading}>Quick Links</h4>
                        <ul style={linkList}>
                            <li><a onClick={() => navigate("/")} style={footerLink}>Shop Products</a></li>
                            <li><a onClick={() => navigate("/recommendation")} style={footerLink}>AI Advisory</a></li>
                            <li><a onClick={() => navigate("/advisory")} style={footerLink}>Weather Intelligence</a></li>
                            <li><a onClick={() => navigate("/my-orders")} style={footerLink}>Track Order</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 style={footerHeading}>Company</h4>
                        <ul style={linkList}>
                            <li><a href="#about" style={footerLink}>About Us</a></li>
                            <li><a href="#careers" style={footerLink}>Careers</a></li>
                            <li><a href="#blog" style={footerLink}>Blog</a></li>
                            <li><a href="#contact" style={footerLink}>Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 style={footerHeading}>Legal</h4>
                        <ul style={linkList}>
                            <li><a href="#privacy" style={footerLink}>Privacy Policy</a></li>
                            <li><a href="#terms" style={footerLink}>Terms & Conditions</a></li>
                            <li><a href="#return" style={footerLink}>Return Policy</a></li>
                            <li><a href="#shipping" style={footerLink}>Shipping Policy</a></li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div style={newsletterSection}>
                    <h4 style={{ ...footerHeading, marginBottom: 12 }}>Stay Updated</h4>
                    <p style={{ ...footerText, marginBottom: 16 }}>
                        Subscribe to receive farming insights, product launches, and exclusive offers.
                    </p>
                    <form onSubmit={handleNewsletter} style={newsletterForm}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            style={newsletterInput}
                            required
                        />
                        <button type="submit" style={newsletterButton}>
                            <Send size={18} />
                        </button>
                    </form>
                </div>

                {/* Social Media & Trust Badges */}
                <div style={bottomSection}>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ ...footerHeading, marginBottom: 12 }}>Follow Us</h4>
                        <div style={socialIcons}>
                            <a href="#facebook" style={socialIcon}><Facebook size={20} /></a>
                            <a href="#twitter" style={socialIcon}><Twitter size={20} /></a>
                            <a href="#instagram" style={socialIcon}><Instagram size={20} /></a>
                            <a href="#linkedin" style={socialIcon}><Linkedin size={20} /></a>
                        </div>
                    </div>
                    <div style={trustBadges}>
                        <div style={badge}>🔒 Secure Payment</div>
                        <div style={badge}>✓ Government Certified</div>
                        <div style={badge}>🚚 Pan-India Delivery</div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div style={copyrightBar}>
                <p style={{ margin: 0 }}>
                    © {currentYear} KrishiSathi. All rights reserved. Empowering Bharat's Agriculture
                </p>
                <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.7 }}>
                    Made with 💚 for Indian Farmers
                </p>
            </div>
        </footer>
    );
};

// Styles
const footerStyle = {
    background: "linear-gradient(180deg, var(--surface) 0%, #0a3d2c 100%)",
    color: "white",
    marginTop: "auto"
};

const footerContainer = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "60px 24px 40px"
};

const footerGrid = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: 40,
    marginBottom: 50
};

const footerHeading = {
    fontSize: "1.2rem",
    fontWeight: 700,
    marginBottom: 16,
    color: "white"
};

const footerText = {
    color: "rgba(255,255,255,0.8)",
    fontSize: "0.95rem",
    lineHeight: 1.6
};

const contactItem = {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    fontSize: "0.9rem",
    color: "rgba(255,255,255,0.8)"
};

const linkList = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10
};

const footerLink = {
    color: "rgba(255,255,255,0.8)",
    textDecoration: "none",
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "color 0.2s ease",
    display: "inline-block"
};

const newsletterSection = {
    background: "rgba(255,255,255,0.05)",
    padding: 30,
    borderRadius: 16,
    marginBottom: 40
};

const newsletterForm = {
    display: "flex",
    gap: 8
};

const newsletterInput = {
    flex: 1,
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    outline: "none",
    fontSize: "0.95rem"
};

const newsletterButton = {
    background: "var(--primary)",
    color: "white",
    border: "none",
    borderRadius: 12,
    padding: "12px 20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.2s"
};

const bottomSection = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 30,
    paddingTop: 30,
    borderTop: "1px solid rgba(255,255,255,0.1)"
};

const socialIcons = {
    display: "flex",
    gap: 12
};

const socialIcon = {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    transition: "all 0.3s ease",
    cursor: "pointer"
};

const trustBadges = {
    display: "flex",
    gap: 16
};

const badge = {
    background: "rgba(255,255,255,0.1)",
    padding: "8px 16px",
    borderRadius: 20,
    fontSize: "0.85rem",
    fontWeight: 600,
    whiteSpace: "nowrap"
};

const copyrightBar = {
    borderTop: "1px solid rgba(255,255,255,0.1)",
    padding: "24px",
    textAlign: "center",
    background: "rgba(0,0,0,0.2)",
    fontSize: "0.9rem"
};

export default Footer;
