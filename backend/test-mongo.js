require("dotenv").config();
const mongoose = require("mongoose");

console.log("Testing MongoDB Connection...");
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("Connection string starts with:", process.env.MONGO_URI?.substring(0, 20) + "...");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connection Successful!");
        console.log("Connected to:", mongoose.connection.host);
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ MongoDB Connection Failed!");
        console.error("Error:", error.message);
        console.error("\n🔧 Common Solutions:");
        console.error("1. Check if password in MONGO_URI is correct");
        console.error("2. Verify database user exists in MongoDB Atlas");
        console.error("3. Ensure IP address is whitelisted (allow 0.0.0.0/0 for testing)");
        console.error("4. Check if cluster is paused in MongoDB Atlas");
        process.exit(1);
    });
