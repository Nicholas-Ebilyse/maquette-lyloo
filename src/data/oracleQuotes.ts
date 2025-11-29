// Phrases d'inspiration fixes (concept "oracle")
// Une phrase différente pour chaque jour de la semaine

export const oracleQuotes = [
  {
    day: 0, // Dimanche
    texte: "Le repos est une action, non une absence d'action. Aujourd'hui, prends le temps de te ressourcer.",
    auteur: "Oracle LYLOO"
  },
  {
    day: 1, // Lundi
    texte: "Chaque nouveau départ est une opportunité de créer la vie que tu mérites. Commence doucement.",
    auteur: "Oracle LYLOO"
  },
  {
    day: 2, // Mardi
    texte: "Ta force réside dans ta capacité à persévérer, même dans les petits gestes du quotidien.",
    auteur: "Oracle LYLOO"
  },
  {
    day: 3, // Mercredi
    texte: "À mi-chemin de la semaine, rappelle-toi : chaque respiration est une victoire sur le stress.",
    auteur: "Oracle LYLOO"
  },
  {
    day: 4, // Jeudi
    texte: "L'équilibre n'est pas un état, c'est un chemin. Continue d'avancer à ton rythme.",
    auteur: "Oracle LYLOO"
  },
  {
    day: 5, // Vendredi
    texte: "Célèbre les petites victoires de cette semaine. Tu as fait de ton mieux, et c'est suffisant.",
    auteur: "Oracle LYLOO"
  },
  {
    day: 6, // Samedi
    texte: "Le week-end est le moment de nourrir ton corps et ton esprit. Prends soin de toi.",
    auteur: "Oracle LYLOO"
  }
];

export const getOracleQuoteOfTheDay = () => {
  const today = new Date().getDay(); // 0 = Dimanche, 1 = Lundi, etc.
  return oracleQuotes[today];
};
