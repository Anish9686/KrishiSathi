const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const router = express.Router();

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

const MOCK_ANSWERS = [
    "Integrating organic fertilizers like Neem Cake can improve soil aeration and reduce pest attacks effectively.",
    "For rabi crops, ensuring the first irrigation occurs exactly 21 days after sowing (CRI stage) is critical for yield.",
    "Maintaining a soil pH between 6.0 and 7.5 is ideal for most agricultural crops in Bharat.",
    "Rotating leguminous crops like Moong with cereals helps in natural nitrogen fixation of the soil.",
    "Always check the weather forecast on your Agriसेतु dashboard before applying pesticides to avoid wash-off."
];

router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }

        // --- Demo Mode Fallback ---
        if (!genAI) {
            console.warn("GEMINI_API_KEY missing. Operating in Agriसेतु AI Demo Mode.");
            const randomReply = MOCK_ANSWERS[Math.floor(Math.random() * MOCK_ANSWERS.length)];
            return res.json({
                reply: `[Demo Mode] ${randomReply}`,
                isDemo: true
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `You are "Agriसेतु AI", a helpful agricultural assistant for Indian farmers. 
        Answer the following question in a simple, practical, and helpful way: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (err) {
        console.error("AI Chat Error:", err);
        res.status(500).json({ message: "Agriसेतु AI is currently busy tending to other farms. Please try later." });
    }
});

module.exports = router;
