import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Utensils, 
  Activity, 
  ShoppingCart, 
  Calendar,
  Search,
  Filter,
  Clock,
  Users,
  Star
} from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import ExerciseCalendar from "@/components/calendar/ExerciseCalendar";
import { getDifficultyBadgeClasses } from "@/lib/difficulty-colors";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Recipe = Database["public"]["Tables"]["recipes"]["Row"];

const PhysicalWellness = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching recipes:', error);
    } else if (data) {
      setRecipes(data);
    }
    setLoading(false);
  };

  const mealPlans = [
    {
      id: 1,
      title: "Détox 7 jours",
      description: "Plan alimentaire pour purifier votre organisme",
      duration: "7 jours",
      difficulty: "Débutant",
      image: "photo-1500673922987-e212871fec22"
    },
    {
      id: 2,
      title: "Energie & Vitalité",
      description: "Boostez votre énergie avec des repas équilibrés",
      duration: "14 jours",
      difficulty: "Intermédiaire",
      image: "photo-1465146344425-f00d5f5c8f07"
    }
  ];

  const exercises = [
    {
      id: 1,
      title: "Yoga matinal",
      description: "Réveillez votre corps en douceur",
      duration: "20 min",
      level: "Débutant",
      type: "Vidéo",
      image: "photo-1581091226825-a6a2a5aee158"
    },
    {
      id: 2,
      title: "Cardio intense",
      description: "Brûlez des calories efficacement",
      duration: "30 min",
      level: "Avancé",
      type: "Vidéo",
      image: "photo-1518770660439-4636190af475"
    }
  ];

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}min` : ''}`;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-gradient-physical mb-4">
            Bien-être physique
          </h1>
          <p className="text-lg text-muted-foreground">
            Transformez votre corps et votre esprit avec nos programmes personnalisés
          </p>
        </div>

        {/* Search and filters */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher un programme, exercice ou recette..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
        </div>

        <Tabs defaultValue="meals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="meals">Nutrition</TabsTrigger>
            <TabsTrigger value="exercises">Exercices</TabsTrigger>
            <TabsTrigger value="recipes">Recettes</TabsTrigger>
          </TabsList>

          <TabsContent value="meals" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mealPlans.map((plan) => (
                <Card key={plan.id} className="overflow-hidden hover-scale">
                  <div className="aspect-video bg-gradient-to-r from-vert-pale to-dore-clair rounded-t-lg relative">
                    <img
                      src={`https://images.unsplash.com/${plan.image}?w=400&h=200&fit=crop`}
                      alt={plan.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-white/90 text-sage-dark">
                      {plan.duration}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Utensils className="h-5 w-5 text-primary" />
                      {plan.title}
                    </CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Badge className={getDifficultyBadgeClasses(plan.difficulty)}>
                        {plan.difficulty}
                      </Badge>
                      <Button size="sm">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Démarrer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="exercises" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise) => (
                <Card key={exercise.id} className="overflow-hidden hover-scale">
                  <div className="aspect-video bg-gradient-to-r from-orange-lyloo to-vert-pale rounded-t-lg relative">
                    <img
                      src={`https://images.unsplash.com/${exercise.image}?w=400&h=200&fit=crop`}
                      alt={exercise.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-white/90 text-sage-dark">
                      {exercise.duration}
                    </Badge>
                    <Badge className="absolute top-3 left-3 bg-primary/90 text-white">
                      {exercise.type}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      {exercise.title}
                    </CardTitle>
                    <CardDescription>{exercise.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Badge className={getDifficultyBadgeClasses(exercise.level)}>
                        {exercise.level}
                      </Badge>
                      <Button 
                        size="sm"
                        onClick={() => setIsCalendarOpen(true)}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Planifier
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recipes" className="space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Chargement des recettes...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <Card key={recipe.id} className="overflow-hidden hover-scale">
                    <div className="aspect-video bg-gradient-to-r from-dore-clair to-orange-lyloo rounded-t-lg relative">
                      <img
                        src={recipe.image_url || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=200&fit=crop'}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-3 right-3 bg-white/90 text-sage-dark">
                        {recipe.calories} cal
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Utensils className="h-5 w-5 text-primary" />
                        {recipe.title}
                      </CardTitle>
                      <CardDescription>{recipe.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatTime(recipe.prep_time_minutes)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {recipe.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm" className="w-full">
                        <Star className="h-4 w-4 mr-2" />
                        Voir la recette
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Calendrier d'exercices */}
      <ExerciseCalendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        exercises={exercises.map(exercise => ({ 
          id: exercise.id.toString(), 
          title: exercise.title,
          duration: exercise.duration,
          level: exercise.level,
          type: exercise.type
        }))}
      />
    </div>
  );
};

export default PhysicalWellness;