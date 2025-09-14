import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Zap, Users } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Recipe = Database['public']['Tables']['recipes']['Row'];

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeModal = ({ recipe, isOpen, onClose }: RecipeModalProps) => {
  if (!recipe) return null;

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const renderIngredients = () => {
    if (!recipe.ingredients) return null;
    
    const ingredients = recipe.ingredients as Record<string, string>;
    return Object.entries(ingredients).map(([ingredient, quantity]) => (
      <div key={ingredient} className="flex justify-between py-1">
        <span className="capitalize">{ingredient}</span>
        <span className="text-muted-foreground">{quantity}</span>
      </div>
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl">{recipe.title}</DialogTitle>
          <DialogDescription>
            Découvrez cette délicieuse recette avec tous les détails nécessaires
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Image et informations principales */}
          <div className="space-y-4">
            {recipe.image_url && (
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatTime(recipe.prep_time_minutes)}</span>
              </div>
              {recipe.calories && (
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4" />
                  <span>{recipe.calories} calories</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>2-4 portions</span>
              </div>
            </div>

            {recipe.tags && recipe.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {recipe.description && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{recipe.description}</p>
              </div>
            )}
          </div>

          {/* Ingrédients et instructions */}
          <div className="space-y-6">
            {recipe.ingredients && (
              <div>
                <h3 className="font-semibold mb-3">Ingrédients</h3>
                <div className="bg-card rounded-lg p-4 space-y-2">
                  {renderIngredients()}
                </div>
              </div>
            )}

            <Separator />

            {recipe.instructions && (
              <div>
                <h3 className="font-semibold mb-3">Instructions</h3>
                <div className="prose prose-sm max-w-none">
                  {recipe.instructions.split('\n').map((step, index) => {
                    if (step.trim()) {
                      return (
                        <div key={index} className="flex gap-3 mb-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">
                            {index + 1}
                          </div>
                          <p className="text-sm leading-relaxed">{step.trim()}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModal;