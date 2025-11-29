export interface UserProfile {
  id: string;
  prenom: string;
  email: string;
  objectifs: string[];
  tempsParJourMinutes: number;
  notifications: {
    matin: boolean;
    midi: boolean;
    soir: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  onboardingComplete: boolean;
}

export interface Activity {
  id: string;
  type: 'mental' | 'physique';
  categorie: string;
  titre: string;
  description: string;
  dureeMinutes: number;
  niveau?: 'débutant' | 'intermédiaire' | 'avancé';
  imageUrl: string;
  couleurPrincipale: string;
  tags: string[];
  estFavori: boolean;
}

export interface Session {
  id: string;
  activityId: string;
  userId: string;
  date: string;
  statut: 'terminee' | 'en cours' | 'abandonnee';
}

export interface MoodEntry {
  id: string;
  userId: string;
  date: string;
  niveau: 1 | 2 | 3 | 4 | 5;
  noteTexte?: string;
}

export interface QuoteOfTheDay {
  date: string;
  texte: string;
  auteur: string;
}
