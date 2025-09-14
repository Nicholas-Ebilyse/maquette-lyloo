import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';

type Recipe = Database['public']['Tables']['recipes']['Row'];

interface AdminRecipeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editRecipe?: Recipe | null;
}

const AdminRecipeForm: React.FC<AdminRecipeFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
  editRecipe
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [calories, setCalories] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [tags, setTags] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (editRecipe) {
      setTitle(editRecipe.title);
      setDescription(editRecipe.description || '');
      setInstructions(editRecipe.instructions || '');
      setPrepTime(editRecipe.prep_time_minutes.toString());
      setCalories(editRecipe.calories?.toString() || '');
      setIngredients(editRecipe.ingredients ? JSON.stringify(editRecipe.ingredients, null, 2) : '');
      setTags(editRecipe.tags?.join(', ') || '');
    } else {
      // Reset form
      setTitle('');
      setDescription('');
      setInstructions('');
      setPrepTime('');
      setCalories('');
      setIngredients('');
      setTags('');
      setImageFile(null);
    }
  }, [editRecipe, isOpen]);

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
      let imageUrl = editRecipe?.image_url || null;

      // Upload image file if provided
      if (imageFile) {
        imageUrl = await handleFileUpload(imageFile, 'wellness-images');
        if (!imageUrl) {
          throw new Error('Erreur lors du téléchargement de l\'image');
        }
      }

      // Parse ingredients JSON
      let parsedIngredients = null;
      if (ingredients.trim()) {
        try {
          parsedIngredients = JSON.parse(ingredients);
        } catch (error) {
          throw new Error('Le format des ingrédients doit être un JSON valide');
        }
      }

      const recipeData = {
        title,
        description,
        instructions,
        prep_time_minutes: parseInt(prepTime),
        calories: calories ? parseInt(calories) : null,
        ingredients: parsedIngredients,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        image_url: imageUrl,
      };

      if (editRecipe) {
        const { error } = await supabase
          .from('recipes')
          .update(recipeData)
          .eq('id', editRecipe.id);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Recette modifiée avec succès",
        });
      } else {
        const { error } = await supabase
          .from('recipes')
          .insert([recipeData]);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Recette ajoutée avec succès",
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error submitting recipe:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de sauvegarder la recette",
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
            {editRecipe ? 'Modifier la recette' : 'Ajouter une recette'}
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations de la recette
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
              <Label htmlFor="prepTime">Temps de préparation (minutes) *</Label>
              <Input
                id="prepTime"
                type="number"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="calories">Calories (optionnel)</Label>
              <Input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="ingredients">Ingrédients (format JSON)</Label>
            <Textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows={4}
              placeholder='{"ingredient1": "quantité", "ingredient2": "quantité"}'
            />
          </div>

          <div>
            <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="végétarien, sans gluten, dessert..."
            />
          </div>

          <div>
            <Label htmlFor="image">Image de la recette</Label>
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
              {isSubmitting ? 'Enregistrement...' : (editRecipe ? 'Modifier' : 'Ajouter')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminRecipeForm;