import { useState, useEffect } from "react";
import MobileHeader from "@/components/mobile/MobileHeader";
import BottomTabBar from "@/components/mobile/BottomTabBar";
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
    <div className="min-h-screen bg-gradient-to-br from-dore-clair via-vert-pale/30 to-orange-lyloo/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header with Enhanced Brand Colors */}
        <div className="mb-8 bg-gradient-to-r from-dore-clair/90 to-orange-lyloo/80 rounded-3xl p-8 shadow-xl border border-dore-clair/50">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src="/src/assets/physical-wellness-icon.png" alt="Physical wellness" className="h-12 w-12" />
            <h1 className="text-4xl font-playfair font-bold text-anthracite">
              Bien-être physique
            </h1>
          </div>
          <p className="text-anthracite text-lg mb-6">
            Transformez votre corps et votre esprit avec nos programmes personnalisés
          </p>
          
          {/* Hero Images Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/src/assets/lyloo-yoga-nature.jpg" 
                alt="Yoga en pleine nature - bien-être physique" 
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/src/assets/lyloo-yoga-studio.jpg" 
                alt="Séance de yoga en studio - exercice physique" 
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher un programme, exercice..."
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="meals">Nutrition</TabsTrigger>
            <TabsTrigger value="exercises">Exercices</TabsTrigger>
          </TabsList>

          <TabsContent value="meals" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mealPlans.slice(0, 3).map((plan) => (
                 <Card key={plan.id} className="overflow-hidden hover-scale border border-vert-pale/30">
                   <div className="aspect-video bg-gradient-to-r from-vert-pale to-dore-clair rounded-t-lg relative">
                     <img
                       src="/src/assets/lyloo-healthy-salad.jpg"
                       alt={plan.title}
                       className="w-full h-full object-cover"
                     />
                     <Badge className="absolute top-3 right-3 bg-terracotta-lyloo/90 text-white">
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
                       <Button size="sm" className="btn-physical">
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
               {exercises.slice(0, 3).map((exercise) => (
                 <Card key={exercise.id} className="overflow-hidden hover-scale border border-orange-lyloo/30">
                   <div className="aspect-video bg-gradient-to-r from-orange-lyloo to-vert-pale rounded-t-lg relative">
                     <img
                       src="/src/assets/lyloo-yoga-nature.jpg"
                       alt={exercise.title}
                       className="w-full h-full object-cover"
                     />
                     <Badge className="absolute top-3 right-3 bg-marron-chaud/90 text-white">
                       {exercise.duration}
                     </Badge>
                     <Badge className="absolute top-3 left-3 bg-dore-clair/90 text-marron-chaud">
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