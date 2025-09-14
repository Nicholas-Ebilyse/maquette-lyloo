import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

type MealPlan = Database['public']['Tables']['meal_plans']['Row'];
type DifficultyLevel = Database['public']['Enums']['difficulty_level'];

interface AdminMealPlanFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editMealPlan?: MealPlan | null;
}

const AdminMealPlanForm: React.FC<AdminMealPlanFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
  editMealPlan
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Débutant');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (editMealPlan) {
      setTitle(editMealPlan.title);
      setDescription(editMealPlan.description || '');
      setInstructions(editMealPlan.instructions || '');
      setDurationDays(editMealPlan.duration_days.toString());
      setDifficulty(editMealPlan.difficulty);
    } else {
      // Reset form
      setTitle('');
      setDescription('');
      setInstructions('');
      setDurationDays('');
      setDifficulty('Débutant');
      setImageFile(null);
    }
  }, [editMealPlan, isOpen]);

  const handleFileUpload = async (file: File, bucket: string): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = editMealPlan?.image_url || null;

      // Upload image file if provided
      if (imageFile) {
        imageUrl = await handleFileUpload(imageFile, 'wellness-images');
        if (!imageUrl) {
          throw new Error('Erreur lors du téléchargement de l\'image');
        }
      }

      const mealPlanData = {
        title,
        description,
        instructions,
        duration_days: parseInt(durationDays),
        difficulty,
        image_url: imageUrl,
      };

      if (editMealPlan) {
        const { error } = await supabase
          .from('meal_plans')
          .update(mealPlanData)
          .eq('id', editMealPlan.id);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Plan de repas modifié avec succès",
        });
      } else {
        const { error } = await supabase
          .from('meal_plans')
          .insert([mealPlanData]);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Plan de repas ajouté avec succès",
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error submitting meal plan:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le plan de repas",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editMealPlan ? 'Modifier le plan de repas' : 'Ajouter un plan de repas'}
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations du plan alimentaire
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Durée (jours) *</Label>
              <Input
                id="duration"
                type="number"
                value={durationDays}
                onChange={(e) => setDurationDays(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="difficulty">Niveau de difficulté *</Label>
              <Select 
                value={difficulty} 
                onValueChange={(value: DifficultyLevel) => setDifficulty(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Débutant">Débutant</SelectItem>
                  <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                  <SelectItem value="Avancé">Avancé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="image">Image du plan</Label>
            <div className="flex items-center gap-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              <Upload className="h-4 w-4" />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting} className="btn-sage">
              {isSubmitting ? 'Enregistrement...' : (editMealPlan ? 'Modifier' : 'Ajouter')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminMealPlanForm;