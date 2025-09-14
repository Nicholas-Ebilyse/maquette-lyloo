import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Calendar, Utensils } from 'lucide-react';
import { getDifficultyBadgeClasses } from '@/lib/difficulty-colors';

type MealPlan = Database['public']['Tables']['meal_plans']['Row'];

interface AdminMealPlanListProps {
  onEdit: (mealPlan: MealPlan) => void;
}

const AdminMealPlanList: React.FC<AdminMealPlanListProps> = ({ onEdit }) => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: mealPlansData, error: mealPlansError } = await supabase
        .from('meal_plans')
        .select('*')
        .order('created_at', { ascending: false });

      if (mealPlansError) throw mealPlansError;

      setMealPlans(mealPlansData || []);
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les plans de repas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce plan de repas ?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('meal_plans')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Plan de repas supprimé avec succès",
      });

      fetchData();
    } catch (error) {
      console.error('Error deleting meal plan:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le plan de repas",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (mealPlans.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Aucun plan de repas trouvé.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {mealPlans.map((mealPlan) => (
        <Card key={mealPlan.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold mb-2">
                  {mealPlan.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {mealPlan.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{mealPlan.duration_days} jour{mealPlan.duration_days > 1 ? 's' : ''}</span>
            </div>

            <div className="flex items-center gap-2">
              <Badge className={getDifficultyBadgeClasses(mealPlan.difficulty)}>
                {mealPlan.difficulty}
              </Badge>
            </div>

            {mealPlan.image_url && (
              <div className="w-full h-32 bg-muted rounded-md overflow-hidden">
                <img 
                  src={mealPlan.image_url} 
                  alt={mealPlan.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(mealPlan)}
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-1" />
                Modifier
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(mealPlan.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminMealPlanList;