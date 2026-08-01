const { Markup } = require("telegraf");

const mainMenu = () => Markup.inlineKeyboard([
  [
    Markup.button.callback("🎉 Fun", "menu_fun"),
    Markup.button.callback("🔢 Utilitaires", "menu_utils"),
  ],
  [
    Markup.button.callback("🛡️ Modération", "menu_mod"),
    Markup.button.callback("👑 Owner", "menu_owner"),
  ],
  [
    Markup.button.callback("🎮 Jeux", "menu_games"),
    Markup.button.callback("ℹ️ Infos", "menu_info"),
  ],
  [Markup.button.callback("❌ Fermer", "menu_close")],
]);

const funMenu = () => Markup.inlineKeyboard([
  [
    Markup.button.callback("😂 Blague", "cmd_blague"),
    Markup.button.callback("💡 Conseil", "cmd_conseil"),
  ],
  [
    Markup.button.callback("✨ Citation", "cmd_citation"),
    Markup.button.callback("🤯 Fait", "cmd_fait"),
  ],
  [
    Markup.button.callback("⚡ Défi", "cmd_defi"),
    Markup.button.callback("🎯 Vérité", "cmd_verite"),
  ],
  [Markup.button.callback("⬅️ Retour", "menu_main")],
]);

const modMenu = () => Markup.inlineKeyboard([
  [
    Markup.button.callback("🚫 Ban", "info_ban"),
    Markup.button.callback("👢 Kick", "info_kick"),
  ],
  [
    Markup.button.callback("🔇 Mute", "info_mute"),
    Markup.button.callback("⚠️ Warn", "info_warn"),
  ],
  [
    Markup.button.callback("🔓 Unban", "info_unban"),
    Markup.button.callback("🔊 Unmute", "info_unmute"),
  ],
  [Markup.button.callback("⬅️ Retour", "menu_main")],
]);

const gamesMenu = () => Markup.inlineKeyboard([
  [
    Markup.button.callback("🪙 Pile ou Face", "cmd_pile"),
    Markup.button.callback("🎲 Lancer Dé", "cmd_des"),
  ],
  [
    Markup.button.callback("🎱 8Ball", "info_8ball"),
    Markup.button.callback("✂️ Pierre-Feuille", "cmd_pfc"),
  ],
  [Markup.button.callback("⬅️ Retour", "menu_main")],
]);

const utilsMenu = () => Markup.inlineKeyboard([
  [
    Markup.button.callback("🧮 Calculatrice", "info_calc"),
    Markup.button.callback("🔤 Inverser", "info_inv"),
  ],
  [
    Markup.button.callback("📊 Compter mots", "info_count"),
    Markup.button.callback("🔐 Base64", "info_b64"),
  ],
  [Markup.button.callback("⬅️ Retour", "menu_main")],
]);

const infoMenu = () => Markup.inlineKeyboard([
  [
    Markup.button.callback("🤖 À propos", "cmd_about"),
    Markup.button.callback("🏓 Ping", "cmd_ping"),
  ],
  [
    Markup.button.callback("🕐 Heure", "cmd_temps"),
    Markup.button.callback("📋 Commandes", "cmd_cmds"),
  ],
  [Markup.button.callback("⬅️ Retour", "menu_main")],
]);

module.exports = { mainMenu, funMenu, modMenu, gamesMenu, utilsMenu, infoMenu };