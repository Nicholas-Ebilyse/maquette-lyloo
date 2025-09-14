import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Clock, Activity } from 'lucide-react';
import { getDifficultyBadgeClasses } from '@/lib/difficulty-colors';

type Exercise = Database['public']['Tables']['exercises']['Row'];

interface AdminExerciseListProps {
  onEdit: (exercise: Exercise) => void;
}

const AdminExerciseList: React.FC<AdminExerciseListProps> = ({ onEdit }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: exercisesData, error: exercisesError } = await supabase
        .from('exercises')
        .select('*')
        .order('created_at', { ascending: false });

      if (exercisesError) throw exercisesError;

      setExercises(exercisesData || []);
    } catch (error) {
      console.error('Error fetching exercises:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les exercices",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet exercice ?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('exercises')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Exercice supprimé avec succès",
      });

      fetchData();
    } catch (error) {
      console.error('Error deleting exercise:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'exercice",
        variant: "destructive",
      });
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (exercises.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Aucun exercice trouvé.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {exercises.map((exercise) => (
        <Card key={exercise.id} className="hover:shadow-md transition-shadow">
          {exercise.thumbnail_url && (
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <img 
                src={exercise.thumbnail_url} 
                alt={exercise.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold mb-2">
                  {exercise.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {exercise.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span>{exercise.exercise_type}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(exercise.duration_minutes)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Badge className={getDifficultyBadgeClasses(exercise.difficulty_level)}>
                {exercise.difficulty_level}
              </Badge>
            </div>

            {exercise.equipment_needed && exercise.equipment_needed.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-1">Équipement :</p>
                <div className="flex flex-wrap gap-1">
                  {exercise.equipment_needed.map((equipment, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {equipment}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(exercise)}
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-1" />
                Modifier
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(exercise.id)}
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

export default AdminExerciseList;