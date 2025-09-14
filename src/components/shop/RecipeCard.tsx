import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Zap, Eye } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Recipe = Database['public']['Tables']['recipes']['Row'];

interface RecipeCardProps {
  recipe: Recipe;
  onView: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onView }: RecipeCardProps) => {
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  return (
    <Card className="group overflow-hidden hover-scale cursor-pointer" onClick={() => onView(recipe)}>
      <div className="aspect-[4/3] bg-gradient-primary rounded-t-lg relative overflow-hidden">
        {recipe.image_url ? (
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-subtle flex items-center justify-center">
            <div className="text-4xl opacity-50">🍽️</div>
          </div>
        )}
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {recipe.tags && recipe.tags.length > 0 && (
            <>
              {recipe.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </>
          )}
        </div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <Button
            size="sm" 
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onView(recipe);
            }}
          >
            <Eye className="h-4 w-4 mr-1" />
            Voir la recette
          </Button>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg line-clamp-2">{recipe.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {recipe.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatTime(recipe.prep_time_minutes)}</span>
          </div>
          {recipe.calories && (
            <div className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              <span>{recipe.calories} cal</span>
            </div>
          )}
        </div>

        {recipe.tags && recipe.tags.length > 2 && (
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(2, 5).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {recipe.tags.length > 5 && (
              <Badge variant="outline" className="text-xs">
                +{recipe.tags.length - 5} autres
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeCard;