import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import api from "../utils/api";
import { Leaf, Send, X, MessageCircle, Sparkles, Mic, RefreshCw } from "lucide-react";

// Quick question suggestions
const QUICK_QUESTIONS = [
    "Best fertilizer for wheat?",
    "How to control pests naturally?",
    "Ideal soil pH for rice?",
    "Water-saving irrigation tips",
    "Organic farming methods",
    "Weather-based crop selection"
];

// Memoized message bubble for performance
const MessageBubble = memo(({ message }) => (
    <div style={message.role === "ai" ? aiMsg : userMsg}>
        {message.text}
    </div>
));

const KrishiSathiAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "ai", text: "🙏 Namaste! I'm KrishiSathi AI, your intelligent farming companion.\n\nI can help you with:\n• Crop recommendations\n• Fertilizer & pesticide advice\n• Soil health tips\n• Weather-based farming\n• Organic methods\n\nAsk me anything!" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [showQuestions, setShowQuestions] = useState(true);
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            inputRef.current?.focus();
        }
    }, [messages, isOpen, scrollToBottom]);

    const sendMessage = useCallback(async (messageText) => {
        const text = messageText || input.trim();
        if (!text || loading) return;

        const userMsg = { role: "user", text };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);
        setShowQuestions(false);

        try {
            const res = await api.post("/ai/chat", { message: text });
            setMessages(prev => [...prev, { role: "ai", text: res.data.reply || res.data.message }]);
        } catch (err) {
            setMessages(prev => [...prev, {
                role: "ai",
                text: "🔄 I'm experiencing a brief network hiccup. Please try again in a moment!"
            }]);
        } finally {
            setLoading(false);
        }
    }, [input, loading]);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage();
    };

    const handleQuickQuestion = (question) => {
        sendMessage(question);
    };

    const resetChat = () => {
        setMessages([
            { role: "ai", text: "🙏 Namaste! I'm KrishiSathi AI, your intelligent farming companion.\n\nI can help you with:\n• Crop recommendations\n• Fertilizer & pesticide advice\n• Soil health tips\n• Weather-based farming\n• Organic methods\n\nAsk me anything!" }
        ]);
        setShowQuestions(true);
    };

    return (
        <>
            {/* FLOAT BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    ...fabStyle,
                    transform: isOpen ? "scale(0.9)" : "scale(1)",
                }}
            >
                {isOpen ? <X size={24} /> : (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Sparkles size={20} />
                        <span>Ask KrishiSathi AI</span>
                    </div>
                )}
            </button>

            {/* CHAT WINDOW */}
            {isOpen && (
                <div className="glass-effect animate-scale-in" style={chatWindow}>
                    <div style={chatHeader}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div style={{ background: "rgba(255,255,255,0.2)", padding: 10, borderRadius: 14 }}>
                                <Leaf size={22} color="white" />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: "1.2rem", display: "flex", alignItems: "center", gap: 6 }}>
                                    KrishiSathi AI
                                    <span style={{ background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: 8, fontSize: 10, fontWeight: 600 }}>BETA</span>
                                </h3>
                                <small style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
                                    {loading ? "Thinking..." : "Online • Ready to help"}
                                </small>
                            </div>
                        </div>
                        <button onClick={resetChat} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: 8, cursor: "pointer" }}>
                            <RefreshCw size={18} color="white" />
                        </button>
                    </div>

                    <div style={chatBody}>
                        {messages.map((m, i) => (
                            <MessageBubble key={i} message={m} />
                        ))}

                        {loading && (
                            <div style={{ ...aiMsgStyle, display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ display: "flex", gap: 4 }}>
                                    <span className="animate-pulse" style={{ width: 8, height: 8, background: "var(--primary)", borderRadius: "50%", animationDelay: "0ms" }}></span>
                                    <span className="animate-pulse" style={{ width: 8, height: 8, background: "var(--primary)", borderRadius: "50%", animationDelay: "150ms" }}></span>
                                    <span className="animate-pulse" style={{ width: 8, height: 8, background: "var(--primary)", borderRadius: "50%", animationDelay: "300ms" }}></span>
                                </div>
                                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Thinking...</span>
                            </div>
                        )}

                        {/* Quick Questions */}
                        {showQuestions && !loading && (
                            <div style={{ marginTop: 8 }}>
                                <small style={{ color: "var(--text-muted)", fontWeight: 600, marginBottom: 8, display: "block" }}>💡 Quick Questions:</small>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {QUICK_QUESTIONS.map((q, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleQuickQuestion(q)}
                                            style={{
                                                background: "var(--background)",
                                                border: "1px solid var(--border)",
                                                borderRadius: 20,
                                                padding: "8px 14px",
                                                fontSize: 12,
                                                color: "var(--primary)",
                                                cursor: "pointer",
                                                fontWeight: 500,
                                                transition: "all 0.2s"
                                            }}
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div ref={chatEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} style={chatFooter}>
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about crops, soil, weather..."
                            style={chatInput}
                            disabled={loading}
                        />
                        <button type="submit" disabled={loading || !input.trim()} style={{ ...sendBtn, opacity: loading || !input.trim() ? 0.6 : 1 }}>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

const fabStyle = {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    padding: "14px 24px",
    background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
    color: "white",
    border: "none",
    borderRadius: "var(--radius-lg)",
    fontSize: "15px",
    fontWeight: "700",
    boxShadow: "0 8px 32px rgba(45, 106, 79, 0.35)",
    cursor: "pointer",
    zIndex: 2000,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
};

const chatWindow = {
    position: "fixed",
    bottom: "100px",
    right: "30px",
    width: "400px",
    height: "600px",
    maxWidth: "calc(100vw - 60px)",
    maxHeight: "calc(100vh - 150px)",
    borderRadius: "var(--radius-md)",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    zIndex: 2000,
    overflow: "hidden",
    border: "1px solid var(--border)"
};

const chatHeader = {
    background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
    padding: "20px 24px",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
};

const chatBody = {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    background: "var(--background)"
};

const aiMsgStyle = {
    background: "white",
    padding: "14px 18px",
    borderRadius: "18px 18px 18px 4px",
    maxWidth: "88%",
    fontSize: "14px",
    alignSelf: "flex-start",
    lineHeight: "1.65",
    color: "var(--text-main)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    border: "1px solid var(--border)",
    whiteSpace: "pre-line"
};

const aiMsg = aiMsgStyle;

const userMsg = {
    background: "var(--primary)",
    color: "white",
    padding: "14px 18px",
    borderRadius: "18px 18px 4px 18px",
    maxWidth: "88%",
    fontSize: "14px",
    alignSelf: "flex-end",
    lineHeight: "1.65",
    boxShadow: "0 4px 12px rgba(45, 106, 79, 0.25)"
};

const chatFooter = {
    padding: "16px 20px",
    display: "flex",
    gap: "12px",
    background: "white",
    borderTop: "1px solid var(--border)"
};

const chatInput = {
    flex: 1,
    padding: "14px 18px",
    border: "1px solid var(--border)",
    borderRadius: "14px",
    outline: "none",
    fontSize: "14px",
    background: "var(--background)"
};

const sendBtn = {
    background: "var(--primary)",
    color: "white",
    border: "none",
    borderRadius: "14px",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s"
};

export default KrishiSathiAI;

