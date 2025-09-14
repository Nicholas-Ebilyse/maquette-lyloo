// Image mapping for wellness content
import meditationBreathing from '@/assets/meditation-breathing.jpg';
import hypnosisAnxiety from '@/assets/hypnosis-anxiety.jpg';
import sophrologieStress from '@/assets/sophrologie-stress.jpg';
import breathingExercise from '@/assets/breathing-exercise.jpg';
import natureSoundsForest from '@/assets/nature-sounds-forest.jpg';
import sleepHypnosis from '@/assets/sleep-hypnosis.jpg';
import meditation from '@/assets/meditation.jpg';
import essentialOils from '@/assets/essential-oils.jpg';

export const imageMapping: Record<string, string> = {
  '/src/assets/meditation-breathing.jpg': meditationBreathing,
  '/src/assets/hypnosis-anxiety.jpg': hypnosisAnxiety,
  '/src/assets/sophrologie-stress.jpg': sophrologieStress,
  '/src/assets/breathing-exercise.jpg': breathingExercise,
  '/src/assets/nature-sounds-forest.jpg': natureSoundsForest,
  '/src/assets/sleep-hypnosis.jpg': sleepHypnosis,
  '/src/assets/meditation.jpg': meditation,
  '/src/assets/essential-oils.jpg': essentialOils,
};

// Images par défaut par catégorie
export const defaultImagesByCategory: Record<string, string> = {
  'Sommeil': sleepHypnosis,
  'Yoga du rire': essentialOils,
  'Hypnose': hypnosisAnxiety,
  'Sophrologie': sophrologieStress,
  'Respiration': breathingExercise,
  'Psycho-corporel': meditation,
};

// Images par défaut par type de contenu
export const defaultImagesByType: Record<string, string> = {
  'audio': natureSoundsForest,
  'video': meditation,
};

export const getImageUrl = (thumbnailUrl: string | null, categoryName?: string, contentType?: string): string | null => {
  if (thumbnailUrl && imageMapping[thumbnailUrl]) {
    return imageMapping[thumbnailUrl];
  }
  if (thumbnailUrl && !thumbnailUrl.startsWith('/src/assets/')) {
    return thumbnailUrl;
  }
  
  // Image par défaut selon la catégorie
  if (categoryName && defaultImagesByCategory[categoryName]) {
    return defaultImagesByCategory[categoryName];
  }
  
  // Image par défaut selon le type
  if (contentType && defaultImagesByType[contentType]) {
    return defaultImagesByType[contentType];
  }
  
  // Image par défaut générale
  return meditation;
};