// backend/models/Advisory.js
const mongoose = require("mongoose");

const AdvisorySchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  region: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Advisory", AdvisorySchema);
