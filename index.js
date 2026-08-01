require("dotenv").config();
const { Telegraf, session } = require("telegraf");
const { mainMenu } = require("./src/menus");
const { registerCommands } = require("./src/commands");
const { registerCallbacks } = require("./src/callbacks");
const config = require("./src/config");

const bot = new Telegraf(config.BOT_TOKEN);
bot.use(session());

registerCommands(bot);
registerCallbacks(bot);

bot.launch().then(() => {
  console.log(`
\x1b[36m
╔══════════════════════════════════════╗
║    NATSUTECH TELEGRAM BOT            ║
║    by ${config.DEV_NAME.padEnd(27)}║
║    ✅ Bot en ligne !                 ║
╚══════════════════════════════════════╝
\x1b[0m`);
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));