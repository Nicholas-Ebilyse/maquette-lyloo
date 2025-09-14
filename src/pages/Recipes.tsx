import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import RecipeCard from "@/components/shop/RecipeCard";
import RecipeModal from "@/components/shop/RecipeModal";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Recipe = Database['public']['Tables']['recipes']['Row'];

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [recipesLoading, setRecipesLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRecipes(data || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setRecipesLoading(false);
    }
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsRecipeModalOpen(true);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-vert-pale/10 via-background to-dore-clair/5">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-gradient-physical mb-4">
            Recettes bien-être
          </h1>
          <p className="text-marron-chaud/80 text-lg mb-6">
            Découvrez nos recettes saines et délicieuses pour accompagner votre parcours bien-être
          </p>
          
          {/* Featured Recipe Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl overflow-hidden shadow-md">
              <img 
                src="/src/assets/lyloo-healthy-salad.jpg" 
                alt="Salade healthy - recette bien-être" 
                className="w-full h-32 object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-md">
              <img 
                src="/src/assets/lyloo-fresh-vegetables.jpg" 
                alt="Légumes frais - nutrition saine" 
                className="w-full h-32 object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden shadow-md">
              <img 
                src="/src/assets/lyloo-grapefruit-drink.jpg" 
                alt="Boisson détox au pamplemousse" 
                className="w-full h-32 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher une recette..."
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

        {/* Recipes grid */}
        {recipesLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Chargement des recettes...</p>
          </div>
        ) : filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchTerm ? "Aucune recette trouvée pour votre recherche." : "Aucune recette disponible pour le moment."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onView={handleViewRecipe}
              />
            ))}
          </div>
        )}

        {/* Recipe Modal */}
        <RecipeModal
          recipe={selectedRecipe}
          isOpen={isRecipeModalOpen}
          onClose={() => setIsRecipeModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Recipes;