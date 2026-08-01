const moment = require("moment-timezone");
const config = require("./config");

const BLAGUES = [
  "Pourquoi les plongeurs plongent-ils toujours en arrière ? Parce que sinon ils tomberaient dans le bateau !",
  "Un homme entre dans une bibliothèque : Un steak frites ! Le bibliothécaire : Monsieur, ici c'est une bibliothèque ! L'homme chuchote : Un steak frites s'il vous plaît.",
  "Qu'est-ce qu'un canif ? Un petit fien !",
  "Comment appelle-t-on un chat tombé dans un pot de peinture ? Un chat-peint !",
  "Pourquoi les girafes ont-elles un long cou ? Parce que leurs pieds sentent mauvais !",
  "Qu'est-ce qu'une sardine ? Un sous-marin de poche !",
  "Pourquoi les mathématiciens n'ont-ils pas peur de l'obscurité ? Il y a des racines carrées !",
  "C'est l'histoire d'une fenêtre qui tombe à l'eau... Plouf ! Défenêtration.",
];

const CONSEILS = [
  "Souris souvent — c'est gratuit et ça change tout. 😊",
  "Bois de l'eau avant chaque repas — ta santé te remerciera. 💧",
  "Apprends quelque chose de nouveau chaque jour. 📚",
  "Écoute plus que tu ne parles. 👂",
  "Dors suffisamment — tout est plus simple avec un cerveau reposé. 💤",
  "Exprime ta gratitude au moins une fois par jour. 🙏",
  "Ne remets pas à demain ce que tu peux faire dans 5 minutes. ⏰",
];

const CITATIONS = [
  "« La vie c'est comme une bicyclette, il faut avancer pour ne pas perdre l'équilibre. » — Einstein",
  "« Le succès c'est d'aller d'échec en échec sans perdre son enthousiasme. » — Churchill",
  "« Soyez le changement que vous voulez voir dans le monde. » — Gandhi",
  "« La seule façon de faire du bon travail est d'aimer ce que vous faites. » — Steve Jobs",
  "« Le meilleur moment pour planter un arbre, c'était il y a 20 ans. Le deuxième c'est maintenant. » — Proverbe",
];

const FAITS = [
  "🐙 Une pieuvre a 3 cœurs et du sang bleu.",
  "🐘 Les éléphants sont les seuls animaux qui ne peuvent pas sauter.",
  "💤 Les humains passent 1/3 de leur vie à dormir.",
  "🐝 Les abeilles peuvent reconnaître les visages humains.",
  "🧠 Le cerveau humain génère environ 70 000 pensées par jour.",
  "🌊 95% des océans terrestres reste inexploré.",
  "🦷 Les dents sont la seule partie du corps qui ne se régénère pas.",
];

const DEFIS = [
  "Fais 20 pompes maintenant ! 💪",
  "Envoie un message sympa à quelqu'un que tu n'as pas contacté depuis longtemps. 📱",
  "Bois un grand verre d'eau immédiatement. 💧",
  "Apprends 5 mots dans une nouvelle langue aujourd'hui. 🌐",
  "Fais 10 minutes de marche sans téléphone. 🚶",
  "Note 3 choses positives dans ta journée. ✍️",
];

const VERITES = [
  "Quelle est ta plus grande peur secrète ?",
  "Quelle est la chose dont tu es le plus fier(e) ?",
  "Si tu pouvais changer une chose de ton passé, laquelle ?",
  "Quel est le mensonge que tu as dit le plus récemment ?",
  "Qui t'a le plus influencé(e) dans ta vie ?",
  "Quelle est ta habitude secrète que personne ne connaît ?",
];

const rand = arr => arr[Math.floor(Math.random() * arr.length)];
const now = () => moment().tz(config.TIMEZONE);

module.exports = { rand, now, BLAGUES, CONSEILS, CITATIONS, FAITS, DEFIS, VERITES };