import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { Upload, Plus, Save, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type WellnessContent = Database["public"]["Tables"]["wellness_content"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];

interface AdminContentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editContent?: WellnessContent | null;
  categories: Category[];
}

const AdminContentForm = ({ isOpen, onClose, onSuccess, editContent, categories }: AdminContentFormProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration_minutes: "",
    content_type: "",
    category_id: "",
    difficulty_level: "",
    is_premium: false,
    tags: "",
    video_file: null as File | null,
    audio_file: null as File | null,
    thumbnail_file: null as File | null
  });

  // Reset form when dialog opens/closes or edit content changes
  useEffect(() => {
    if (editContent) {
      setFormData({
        title: editContent.title,
        description: editContent.description || "",
        duration_minutes: editContent.duration_minutes.toString(),
        content_type: editContent.content_type,
        category_id: editContent.category_id || "",
        difficulty_level: editContent.difficulty_level,
        is_premium: editContent.is_premium,
        tags: editContent.tags?.join(", ") || "",
        video_file: null,
        audio_file: null,
        thumbnail_file: null
      });
    } else {
      setFormData({
        title: "",
        description: "",
        duration_minutes: "",
        content_type: "",
        category_id: "",
        difficulty_level: "",
        is_premium: false,
        tags: "",
        video_file: null,
        audio_file: null,
        thumbnail_file: null
      });
    }
  }, [editContent, isOpen]);

  const handleFileUpload = async (file: File, bucket: string): Promise<string | null> => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return null;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      // Upload new files if provided
      const videoUrl = formData.video_file 
        ? await handleFileUpload(formData.video_file, 'wellness-videos')
        : editContent?.video_url || null;
      
      const audioUrl = formData.audio_file 
        ? await handleFileUpload(formData.audio_file, 'wellness-audio')
        : editContent?.audio_url || null;
      
      const thumbnailUrl = formData.thumbnail_file 
        ? await handleFileUpload(formData.thumbnail_file, 'wellness-images')
        : editContent?.thumbnail_url || null;

      const contentData = {
        title: formData.title,
        description: formData.description,
        duration_minutes: parseInt(formData.duration_minutes),
        content_type: formData.content_type as Database["public"]["Enums"]["content_type"],
        category_id: formData.category_id || null,
        difficulty_level: formData.difficulty_level as Database["public"]["Enums"]["difficulty_level"],
        is_premium: formData.is_premium,
        video_url: videoUrl,
        audio_url: audioUrl,
        thumbnail_url: thumbnailUrl,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : []
      };

      let error;
      if (editContent) {
        // Update existing content
        ({ error } = await supabase
          .from('wellness_content')
          .update(contentData)
          .eq('id', editContent.id));
      } else {
        // Insert new content
        ({ error } = await supabase
          .from('wellness_content')
          .insert(contentData));
      }

      if (error) throw error;

      toast({
        title: "Succès",
        description: editContent ? "Contenu modifié avec succès !" : "Contenu ajouté avec succès !",
      });

      onSuccess();
      onClose();

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erreur",
        description: editContent ? "Erreur lors de la modification" : "Erreur lors de l'ajout du contenu",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editContent ? "Modifier le contenu" : "Ajouter du contenu"}
          </DialogTitle>
          <DialogDescription>
            {editContent ? "Modifiez les informations du contenu" : "Ajoutez un nouveau contenu de bien-être mental"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Durée (minutes) *</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration_minutes}
                onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Type de contenu *</Label>
              <Select
                value={formData.content_type}
                onValueChange={(value) => setFormData({ ...formData, content_type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Vidéo</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Niveau *</Label>
              <Select
                value={formData.difficulty_level}
                onValueChange={(value) => setFormData({ ...formData, difficulty_level: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Débutant">Débutant</SelectItem>
                  <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                  <SelectItem value="Avancé">Avancé</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select
                value={formData.category_id || "none"}
                onValueChange={(value) => setFormData({ ...formData, category_id: value === "none" ? "" : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Aucune</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="relaxation, méditation, stress"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formData.content_type === 'video' && (
              <div className="space-y-2">
                <Label htmlFor="video">
                  Fichier vidéo {editContent?.video_url && "(remplacer)"}
                </Label>
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    video_file: e.target.files?.[0] || null 
                  })}
                />
                {editContent?.video_url && !formData.video_file && (
                  <p className="text-xs text-muted-foreground">Vidéo actuelle disponible</p>
                )}
              </div>
            )}

            {formData.content_type === 'audio' && (
              <div className="space-y-2">
                <Label htmlFor="audio">
                  Fichier audio {editContent?.audio_url && "(remplacer)"}
                </Label>
                <Input
                  id="audio"
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    audio_file: e.target.files?.[0] || null 
                  })}
                />
                {editContent?.audio_url && !formData.audio_file && (
                  <p className="text-xs text-muted-foreground">Audio actuel disponible</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="thumbnail">
                Image de couverture {editContent?.thumbnail_url && "(remplacer)"}
              </Label>
              <Input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ 
                  ...formData, 
                  thumbnail_file: e.target.files?.[0] || null 
                })}
              />
              {editContent?.thumbnail_url && !formData.thumbnail_file && (
                <p className="text-xs text-muted-foreground">Miniature actuelle disponible</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="premium"
              checked={formData.is_premium}
              onChange={(e) => setFormData({ ...formData, is_premium: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="premium">Contenu premium</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={uploading} className="flex-1">
              {uploading ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-spin" />
                  {editContent ? "Modification..." : "Ajout en cours..."}
                </>
              ) : (
                <>
                  {editContent ? <Save className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                  {editContent ? "Modifier" : "Ajouter"}
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminContentForm;