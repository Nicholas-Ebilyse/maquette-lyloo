export const getDifficultyBadgeClasses = (level: string) => {
  switch (level) {
    case "Débutant":
      return "bg-difficulty-beginner-bg text-difficulty-beginner-foreground border-difficulty-beginner";
    case "Intermédiaire":
      return "bg-difficulty-intermediate-bg text-difficulty-intermediate-foreground border-difficulty-intermediate";
    case "Avancé":
      return "bg-difficulty-advanced-bg text-difficulty-advanced-foreground border-difficulty-advanced";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const getDifficultyColor = (level: string) => {
  switch (level) {
    case "Débutant":
      return "difficulty-beginner";
    case "Intermédiaire":
      return "difficulty-intermediate";
    case "Avancé":
      return "difficulty-advanced";
    default:
      return "muted";
  }
};