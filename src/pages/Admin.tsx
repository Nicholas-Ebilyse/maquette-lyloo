import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import Navigation from "@/components/layout/Navigation";
import AdminContentList from "@/components/admin/AdminContentList";
import AdminContentForm from "@/components/admin/AdminContentForm";
import AdminExerciseList from "@/components/admin/AdminExerciseList";
import AdminExerciseForm from "@/components/admin/AdminExerciseForm";
import AdminMealPlanList from "@/components/admin/AdminMealPlanList";
import AdminMealPlanForm from "@/components/admin/AdminMealPlanForm";
import AdminRecipeList from "@/components/admin/AdminRecipeList";
import AdminRecipeForm from "@/components/admin/AdminRecipeForm";
import { Plus, Video, ChefHat, Utensils, Activity } from "lucide-react";

type Category = Database["public"]["Tables"]["categories"]["Row"];
type WellnessContent = Database["public"]["Tables"]["wellness_content"]["Row"];
type Exercise = Database["public"]["Tables"]["exercises"]["Row"];
type MealPlan = Database["public"]["Tables"]["meal_plans"]["Row"];
type Recipe = Database["public"]["Tables"]["recipes"]["Row"];

const Admin = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Wellness content state
  const [isWellnessFormOpen, setIsWellnessFormOpen] = useState(false);
  const [editWellnessContent, setEditWellnessContent] = useState<WellnessContent | null>(null);
  
  // Exercise state
  const [isExerciseFormOpen, setIsExerciseFormOpen] = useState(false);
  const [editExercise, setEditExercise] = useState<Exercise | null>(null);
  
  // Meal plan state
  const [isMealPlanFormOpen, setIsMealPlanFormOpen] = useState(false);
  const [editMealPlan, setEditMealPlan] = useState<MealPlan | null>(null);
  
  // Recipe state
  const [isRecipeFormOpen, setIsRecipeFormOpen] = useState(false);
  const [editRecipe, setEditRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching categories:', error);
    } else if (data) {
      setCategories(data);
    }
  };

  // Wellness content handlers
  const handleAddWellnessContent = () => {
    setEditWellnessContent(null);
    setIsWellnessFormOpen(true);
  };

  const handleEditWellnessContent = (content: WellnessContent) => {
    setEditWellnessContent(content);
    setIsWellnessFormOpen(true);
  };

  const handleCloseWellnessForm = () => {
    setIsWellnessFormOpen(false);
    setEditWellnessContent(null);
  };

  // Exercise handlers
  const handleAddExercise = () => {
    setEditExercise(null);
    setIsExerciseFormOpen(true);
  };

  const handleEditExercise = (exercise: Exercise) => {
    setEditExercise(exercise);
    setIsExerciseFormOpen(true);
  };

  const handleCloseExerciseForm = () => {
    setIsExerciseFormOpen(false);
    setEditExercise(null);
  };

  // Meal plan handlers
  const handleAddMealPlan = () => {
    setEditMealPlan(null);
    setIsMealPlanFormOpen(true);
  };

  const handleEditMealPlan = (mealPlan: MealPlan) => {
    setEditMealPlan(mealPlan);
    setIsMealPlanFormOpen(true);
  };

  const handleCloseMealPlanForm = () => {
    setIsMealPlanFormOpen(false);
    setEditMealPlan(null);
  };

  // Recipe handlers
  const handleAddRecipe = () => {
    setEditRecipe(null);
    setIsRecipeFormOpen(true);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditRecipe(recipe);
    setIsRecipeFormOpen(true);
  };

  const handleCloseRecipeForm = () => {
    setIsRecipeFormOpen(false);
    setEditRecipe(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gradient-sage mb-4">
            Administration
          </h1>
          <p className="text-muted-foreground text-lg">
            Gérez votre contenu de bien-être
          </p>
        </div>

        <Tabs defaultValue="wellness" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="wellness" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Bien-être Mental
            </TabsTrigger>
            <TabsTrigger value="meals" className="flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              Nutrition
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Exercices
            </TabsTrigger>
            <TabsTrigger value="recipes" className="flex items-center gap-2">
              <ChefHat className="h-4 w-4" />
              Recettes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wellness">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gestion du contenu de bien-être mental</CardTitle>
                      <CardDescription>
                        Gérez vos vidéos et audios de méditation, hypnose, sophrologie, etc.
                      </CardDescription>
                    </div>
                    <Button onClick={handleAddWellnessContent} className="btn-sage">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un contenu
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <AdminContentList onEdit={handleEditWellnessContent} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="meals">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gestion des plans de repas</CardTitle>
                      <CardDescription>
                        Gérez vos plans alimentaires et programmes nutritionnels
                      </CardDescription>
                    </div>
                    <Button onClick={handleAddMealPlan} className="btn-sage">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un plan
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <AdminMealPlanList onEdit={handleEditMealPlan} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exercises">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gestion des exercices</CardTitle>
                      <CardDescription>
                        Gérez vos exercices physiques et routines d'entraînement
                      </CardDescription>
                    </div>
                    <Button onClick={handleAddExercise} className="btn-sage">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter un exercice
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <AdminExerciseList onEdit={handleEditExercise} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recipes">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gestion des recettes</CardTitle>
                      <CardDescription>
                        Gérez vos recettes saines et équilibrées
                      </CardDescription>
                    </div>
                    <Button onClick={handleAddRecipe} className="btn-sage">
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter une recette
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <AdminRecipeList onEdit={handleEditRecipe} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <AdminContentForm
          isOpen={isWellnessFormOpen}
          onClose={handleCloseWellnessForm}
          onSuccess={() => {
            // Content list will refresh automatically
          }}
          editContent={editWellnessContent}
          categories={categories}
        />

        <AdminExerciseForm
          isOpen={isExerciseFormOpen}
          onClose={handleCloseExerciseForm}
          onSuccess={() => {
            // Exercise list will refresh automatically
          }}
          editExercise={editExercise}
        />

        <AdminMealPlanForm
          isOpen={isMealPlanFormOpen}
          onClose={handleCloseMealPlanForm}
          onSuccess={() => {
            // Meal plan list will refresh automatically
          }}
          editMealPlan={editMealPlan}
        />

        <AdminRecipeForm
          isOpen={isRecipeFormOpen}
          onClose={handleCloseRecipeForm}
          onSuccess={() => {
            // Recipe list will refresh automatically
          }}
          editRecipe={editRecipe}
        />
      </main>
    </div>
  );
};

export default Admin;