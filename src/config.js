require("dotenv").config();
module.exports = {
  BOT_TOKEN:  process.env.BOT_TOKEN  || "",
  BOT_NAME:   process.env.BOT_NAME   || "NATSUTECH BOT",
  DEV_NAME:   process.env.DEV_NAME   || "NatsuTech's 🇨🇬",
  OWNER_ID:   parseInt(process.env.OWNER_ID) || 0,
  TIMEZONE:   process.env.TIMEZONE   || "Africa/Brazzaville",
  PREFIX:     process.env.PREFIX     || "/",
  VERSION:    "1.0.0",
};