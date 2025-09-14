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

type Exercise = Database['public']['Tables']['exercises']['Row'];
type DifficultyLevel = Database['public']['Enums']['difficulty_level'];

interface AdminExerciseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editExercise?: Exercise | null;
}

const AdminExerciseForm: React.FC<AdminExerciseFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
  editExercise
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [duration, setDuration] = useState('');
  const [exerciseType, setExerciseType] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Débutant');
  const [equipmentNeeded, setEquipmentNeeded] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (editExercise) {
      setTitle(editExercise.title);
      setDescription(editExercise.description || '');
      setInstructions(editExercise.instructions || '');
      setDuration(editExercise.duration_minutes.toString());
      setExerciseType(editExercise.exercise_type);
      setDifficulty(editExercise.difficulty_level);
      setEquipmentNeeded(editExercise.equipment_needed?.join(', ') || '');
    } else {
      // Reset form
      setTitle('');
      setDescription('');
      setInstructions('');
      setDuration('');
      setExerciseType('');
      setDifficulty('Débutant');
      setEquipmentNeeded('');
      setVideoFile(null);
      setThumbnailFile(null);
    }
  }, [editExercise, isOpen]);

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
      let videoUrl = editExercise?.video_url || null;
      let thumbnailUrl = editExercise?.thumbnail_url || null;

      // Upload video file if provided
      if (videoFile) {
        videoUrl = await handleFileUpload(videoFile, 'wellness-videos');
        if (!videoUrl) {
          throw new Error('Erreur lors du téléchargement de la vidéo');
        }
      }

      // Upload thumbnail file if provided
      if (thumbnailFile) {
        thumbnailUrl = await handleFileUpload(thumbnailFile, 'wellness-images');
        if (!thumbnailUrl) {
          throw new Error('Erreur lors du téléchargement de la miniature');
        }
      }

      const exerciseData = {
        title,
        description,
        instructions,
        duration_minutes: parseInt(duration),
        exercise_type: exerciseType,
        difficulty_level: difficulty,
        equipment_needed: equipmentNeeded ? equipmentNeeded.split(',').map(item => item.trim()) : [],
        video_url: videoUrl,
        thumbnail_url: thumbnailUrl,
      };

      if (editExercise) {
        const { error } = await supabase
          .from('exercises')
          .update(exerciseData)
          .eq('id', editExercise.id);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Exercice modifié avec succès",
        });
      } else {
        const { error } = await supabase
          .from('exercises')
          .insert([exerciseData]);

        if (error) throw error;

        toast({
          title: "Succès",
          description: "Exercice ajouté avec succès",
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error submitting exercise:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'exercice",
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
            {editExercise ? 'Modifier l\'exercice' : 'Ajouter un exercice'}
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations de l'exercice physique
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="exerciseType">Type d'exercice *</Label>
              <Input
                id="exerciseType"
                value={exerciseType}
                onChange={(e) => setExerciseType(e.target.value)}
                placeholder="Cardio, Musculation, Yoga..."
                required
              />
            </div>
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
              <Label htmlFor="duration">Durée (minutes) *</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
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
            <Label htmlFor="equipment">Équipement nécessaire (séparé par des virgules)</Label>
            <Input
              id="equipment"
              value={equipmentNeeded}
              onChange={(e) => setEquipmentNeeded(e.target.value)}
              placeholder="Tapis, Haltères, Bande élastique..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="video">Vidéo d'exercice</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                />
                <Upload className="h-4 w-4" />
              </div>
            </div>
            <div>
              <Label htmlFor="thumbnail">Miniature</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                />
                <Upload className="h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting} className="btn-sage">
              {isSubmitting ? 'Enregistrement...' : (editExercise ? 'Modifier' : 'Ajouter')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminExerciseForm;