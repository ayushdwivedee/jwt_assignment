const mongoose = require("mongoose");

const blacklistedTokensSchema = mongoose.Schema({
  token: { type: String, required: true },
},{versionKey:false});

const blacklistedTokensModel = mongoose.model(
  "BlacklistedToken",
  blacklistedTokensSchema
);

module.exports = blacklistedTokensModel;
