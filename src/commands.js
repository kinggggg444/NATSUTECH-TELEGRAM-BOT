const { mainMenu, funMenu, modMenu, gamesMenu, utilsMenu, infoMenu } = require("./menus");
const { rand, now, BLAGUES, CONSEILS, CITATIONS, FAITS, DEFIS, VERITES } = require("./helpers");
const config = require("./config");

const isOwner = (ctx) => ctx.from.id === config.OWNER_ID;
const isAdmin = async (ctx) => {
  try {
    const member = await ctx.getChatMember(ctx.from.id);
    return ["administrator","creator"].includes(member.status);
  } catch { return false; }
};

const footer = `\n\n╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌\n🤖 *${config.BOT_NAME}* | by ${config.DEV_NAME}`;

function registerCommands(bot) {

  // ── /start ────────────────────────────────────────────────────────
  bot.start(async (ctx) => {
    const name = ctx.from.first_name || "là";
    await ctx.replyWithMarkdownV2(
      `╔══════════════════════════╗\n` +
      `║  🤖 *${config.BOT_NAME}*  ║\n` +
      `║  by *${config.DEV_NAME}*  ║\n` +
      `╚══════════════════════════╝\n\n` +
      `Salut *${name}* \\! Je suis ton bot Telegram ultime\\.\\n` +
      `Utilise le menu ci\\-dessous pour explorer mes fonctionnalités\\.`,
      mainMenu()
    );
  });

  // ── /menu ─────────────────────────────────────────────────────────
  bot.command("menu", async (ctx) => {
    await ctx.replyWithMarkdownV2(
      `🎛️ *MENU PRINCIPAL*\n\n` +
      `Choisis une catégorie ci\\-dessous \\:`,
      mainMenu()
    );
  });

  // ── /ping ─────────────────────────────────────────────────────────
  bot.command("ping", async (ctx) => {
    const start = Date.now();
    const m = await ctx.reply("🏓 Calcul...");
    const ms = Date.now() - start;
    await ctx.telegram.editMessageText(
      ctx.chat.id, m.message_id, undefined,
      `🏓 *Pong\\!*\nLatence : *${ms}ms*${footer}`,
      { parse_mode: "MarkdownV2" }
    );
  });

  // ── /info ─────────────────────────────────────────────────────────
  bot.command("info", async (ctx) => {
    await ctx.replyWithMarkdownV2(
      `🤖 *${config.BOT_NAME}*\n` +
      `👨‍💻 Dev : *${config.DEV_NAME}*\n` +
      `📌 Version : *${config.VERSION}*\n` +
      `🌍 Plateforme : *Telegram \\+ Node\\.js*\n` +
      `⚡ Bibliothèque : *Telegraf v4*` +
      footer
    );
  });

  // ── /temps ────────────────────────────────────────────────────────
  bot.command("temps", async (ctx) => {
    const t = now();
    await ctx.replyWithMarkdownV2(
      `🕐 *Date \\& Heure*\n` +
      `📅 ${t.format("dddd DD MMMM YYYY").replace(/-/g,"\\-")}\n` +
      `⏰ ${t.format("HH:mm:ss")}\n` +
      `🌍 Fuseau : *${config.TIMEZONE}*` +
      footer
    );
  });

  // ── /blague ───────────────────────────────────────────────────────
  bot.command("blague", async (ctx) => {
    await ctx.reply(`😂 *Blague*\n\n${rand(BLAGUES)}${footer}`, { parse_mode: "Markdown" });
  });

  // ── /conseil ──────────────────────────────────────────────────────
  bot.command("conseil", async (ctx) => {
    await ctx.reply(`💡 *Conseil du jour*\n\n${rand(CONSEILS)}${footer}`, { parse_mode: "Markdown" });
  });

  // ── /citation ─────────────────────────────────────────────────────
  bot.command("citation", async (ctx) => {
    await ctx.reply(`✨ *Citation*\n\n${rand(CITATIONS)}${footer}`, { parse_mode: "Markdown" });
  });

  // ── /fait ─────────────────────────────────────────────────────────
  bot.command("fait", async (ctx) => {
    await ctx.reply(`🤯 *Fait insolite*\n\n${rand(FAITS)}${footer}`, { parse_mode: "Markdown" });
  });

  // ── /defi ─────────────────────────────────────────────────────────
  bot.command("defi", async (ctx) => {
    await ctx.reply(`⚡ *Défi aléatoire*\n\n${rand(DEFIS)}${footer}`, { parse_mode: "Markdown" });
  });

  // ── /verite ───────────────────────────────────────────────────────
  bot.command("verite", async (ctx) => {
    await ctx.reply(`🎯 *Question Vérité*\n\n${rand(VERITES)}${footer}`, { parse_mode: "Markdown" });
  });

  // ── /pile ─────────────────────────────────────────────────────────
  bot.command("pile", async (ctx) => {
    const r = Math.random() < 0.5 ? "🪙 PILE" : "🪙 FACE";
    await ctx.reply(`*Résultat :* ${r}${footer}`, { parse_mode: "Markdown" });
  });

  // ── /des ──────────────────────────────────────────────────────────
  bot.command("des", async (ctx) => {
    const v = Math.floor(Math.random() * 6) + 1;
    const f = ["","⚀","⚁","⚂","⚃","⚄","⚅"];
    await ctx.reply(`🎲 *Dé lancé !*\nRésultat : ${f[v]} (${v})${footer}`, { parse_mode: "Markdown" });
  });

  // ── /pfc ──────────────────────────────────────────────────────────
  bot.command("pfc", async (ctx) => {
    const choices = ["✊ Pierre","✋ Feuille","✌️ Ciseaux"];
    const bot_choice = rand(choices);
    await ctx.reply(`🤖 J'ai choisi : *${bot_choice}*\nA toi de jouer !${footer}`, { parse_mode: "Markdown" });
  });

  // ── /8ball ────────────────────────────────────────────────────────
  bot.command("8ball", async (ctx) => {
    const q = ctx.message.text.split(" ").slice(1).join(" ");
    if (!q) return ctx.reply("❓ Pose une question !\nEx: /8ball Est-ce que ça va aller ?");
    const reps = ["Oui, absolument !","Non, certainement pas.","Peut-être...","Je ne suis pas sûr.","Les signes indiquent oui.","Ne compte pas dessus.","C'est très probable !","Réessaie plus tard.","Sans aucun doute !","Mes sources disent non."];
    await ctx.reply(`🎱 *8Ball*\n❓ ${q}\n💬 ${rand(reps)}${footer}`, { parse_mode: "Markdown" });
  });

  // ── /calc ─────────────────────────────────────────────────────────
  bot.command("calc", async (ctx) => {
    const expr = ctx.message.text.split(" ").slice(1).join("").replace(/[^0-9+\-*/().%]/g,"");
    if (!expr) return ctx.reply("🧮 Usage: /calc 2+2");
    try {
      const result = Function(`"use strict"; return (${expr})`)();
      await ctx.reply(`🧮 *Calculatrice*\n📝 ${expr}\n✅ = ${result}${footer}`, { parse_mode: "Markdown" });
    } catch { await ctx.reply("❌ Expression invalide."); }
  });

  // ── /inverser ─────────────────────────────────────────────────────
  bot.command("inverser", async (ctx) => {
    const t = ctx.message.text.split(" ").slice(1).join(" ");
    if (!t) return ctx.reply("Usage: /inverser ton texte");
    await ctx.reply(t.split("").reverse().join(""));
  });

  // ── /count ────────────────────────────────────────────────────────
  bot.command("count", async (ctx) => {
    const t = ctx.message.text.split(" ").slice(1).join(" ");
    if (!t) return ctx.reply("Usage: /count ton texte");
    await ctx.reply(`📊 *Comptage*\n📝 Caractères : ${t.length}\n🔤 Mots : ${t.split(/\s+/).filter(Boolean).length}${footer}`, { parse_mode: "Markdown" });
  });

  // ── /ban ──────────────────────────────────────────────────────────
  bot.command("ban", async (ctx) => {
    if (!await isAdmin(ctx)) return ctx.reply("❌ Réservé aux admins.");
    if (!ctx.message.reply_to_message) return ctx.reply("❌ Réponds au message du membre à bannir.");
    const target = ctx.message.reply_to_message.from;
    await ctx.banChatMember(target.id);
    await ctx.reply(`🚫 *${target.first_name}* a été banni.${footer}`, { parse_mode: "Markdown" });
  });

  // ── /kick ─────────────────────────────────────────────────────────
  bot.command("kick", async (ctx) => {
    if (!await isAdmin(ctx)) return ctx.reply("❌ Réservé aux admins.");
    if (!ctx.message.reply_to_message) return ctx.reply("❌ Réponds au message du membre à exclure.");
    const target = ctx.message.reply_to_message.from;
    await ctx.banChatMember(target.id);
    await ctx.unbanChatMember(target.id);
    await ctx.reply(`👢 *${target.first_name}* a été exclu.${footer}`, { parse_mode: "Markdown" });
  });

  // ── /mute ─────────────────────────────────────────────────────────
  bot.command("mute", async (ctx) => {
    if (!await isAdmin(ctx)) return ctx.reply("❌ Réservé aux admins.");
    if (!ctx.message.reply_to_message) return ctx.reply("❌ Réponds au message du membre à muter.");
    const target = ctx.message.reply_to_message.from;
    await ctx.restrictChatMember(target.id, {
      permissions: { can_send_messages: false, can_send_audios: false, can_send_documents: false, can_send_photos: false, can_send_videos: false, can_send_voice_notes: false, can_send_video_notes: false, can_send_polls: false, can_send_other_messages: false }
    });
    await ctx.reply(`🔇 *${target.first_name}* a été mis en sourdine.${footer}`, { parse_mode: "Markdown" });
  });

  // ── /unmute ───────────────────────────────────────────────────────
  bot.command("unmute", async (ctx) => {
    if (!await isAdmin(ctx)) return ctx.reply("❌ Réservé aux admins.");
    if (!ctx.message.reply_to_message) return ctx.reply("❌ Réponds au message du membre à démuter.");
    const target = ctx.message.reply_to_message.from;
    await ctx.restrictChatMember(target.id, {
      permissions: { can_send_messages: true, can_send_audios: true, can_send_documents: true, can_send_photos: true, can_send_videos: true, can_send_voice_notes: true, can_send_video_notes: true, can_send_polls: true, can_send_other_messages: true }
    });
    await ctx.reply(`🔊 *${target.first_name}* peut de nouveau parler.${footer}`, { parse_mode: "Markdown" });
  });

  // ── /unban ────────────────────────────────────────────────────────
  bot.command("unban", async (ctx) => {
    if (!await isAdmin(ctx)) return ctx.reply("❌ Réservé aux admins.");
    if (!ctx.message.reply_to_message) return ctx.reply("❌ Réponds au message du membre à débannir.");
    const target = ctx.message.reply_to_message.from;
    await ctx.unbanChatMember(target.id);
    await ctx.reply(`🔓 *${target.first_name}* a été débanni.${footer}`, { parse_mode: "Markdown" });
  });

  // ── /warn ─────────────────────────────────────────────────────────
  const warns = new Map();
  bot.command("warn", async (ctx) => {
    if (!await isAdmin(ctx)) return ctx.reply("❌ Réservé aux admins.");
    if (!ctx.message.reply_to_message) return ctx.reply("❌ Réponds au message du membre à avertir.");
    const target = ctx.message.reply_to_message.from;
    const key = `${ctx.chat.id}_${target.id}`;
    const count = (warns.get(key) || 0) + 1;
    warns.set(key, count);
    if (count >= 3) {
      await ctx.banChatMember(target.id);
      warns.delete(key);
      return ctx.reply(`🚫 *${target.first_name}* a reçu 3 avertissements et a été banni automatiquement.${footer}`, { parse_mode: "Markdown" });
    }
    await ctx.reply(`⚠️ *${target.first_name}* — Avertissement *${count}/3*\n${count === 2 ? "⚠️ Encore un et c'est le ban !" : ""}${footer}`, { parse_mode: "Markdown" });
  });

  // ── /tagall ───────────────────────────────────────────────────────
  bot.command("tagall", async (ctx) => {
    if (!await isAdmin(ctx)) return ctx.reply("❌ Réservé aux admins.");
    try {
      const admins = await ctx.getChatAdministrators();
      const mentions = admins.map(a => `[${a.user.first_name}](tg://user?id=${a.user.id})`).join(" ");
      await ctx.reply(`📢 *Tag admins*\n${mentions}`, { parse_mode: "Markdown" });
    } catch { await ctx.reply("❌ Impossible de récupérer les membres."); }
  });

  // ── /bc ───────────────────────────────────────────────────────────
  bot.command("bc", async (ctx) => {
    if (!isOwner(ctx)) return ctx.reply("❌ Réservé au propriétaire.");
    const msg = ctx.message.text.split(" ").slice(1).join(" ");
    if (!msg) return ctx.reply("Usage: /bc ton message");
    await ctx.reply(`📢 *Broadcast*\n\n${msg}${footer}`, { parse_mode: "Markdown" });
  });

  // ── /help ─────────────────────────────────────────────────────────
  bot.command("help", async (ctx) => {
    await ctx.reply(
      `📋 *LISTE DES COMMANDES*\n\n` +
      `*Général :*\n/start /menu /ping /info /temps /help\n\n` +
      `*Fun :*\n/blague /conseil /citation /fait /defi /verite\n\n` +
      `*Jeux :*\n/pile /des /pfc /8ball\n\n` +
      `*Utilitaires :*\n/calc /inverser /count\n\n` +
      `*Modération (admin) :*\n/ban /kick /mute /unmute /unban /warn /tagall\n\n` +
      `*Owner :*\n/bc${footer}`,
      { parse_mode: "Markdown" }
    );
  });
}

module.exports = { registerCommands };