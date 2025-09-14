import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { Edit, Trash2, Play, Clock, Star, Music, Video } from "lucide-react";
import { getImageUrl } from "./ImageMapping";
import { getDifficultyBadgeClasses } from "@/lib/difficulty-colors";

type WellnessContent = Database["public"]["Tables"]["wellness_content"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];

interface AdminContentListProps {
  onEdit: (content: WellnessContent) => void;
}

const AdminContentList = ({ onEdit }: AdminContentListProps) => {
  const { toast } = useToast();
  const [contents, setContents] = useState<WellnessContent[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch contents
      const { data: contentsData, error: contentsError } = await supabase
        .from('wellness_content')
        .select('*')
        .order('created_at', { ascending: false });

      if (contentsError) throw contentsError;

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*');

      if (categoriesError) throw categoriesError;

      setContents(contentsData || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement des contenus",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('wellness_content')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Contenu supprimé avec succès",
      });

      fetchData(); // Refresh list
    } catch (error) {
      console.error('Error deleting content:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression",
        variant: "destructive"
      });
    }
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return "Sans catégorie";
    const category = categories.find(c => c.id === categoryId);
    return category?.name || "Catégorie inconnue";
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (contents.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Aucun contenu trouvé.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {contents.map((content) => (
        <Card key={content.id} className="hover:shadow-md transition-shadow">
          {content.thumbnail_url && (
            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
              <img 
                src={getImageUrl(content.thumbnail_url)} 
                alt={content.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold mb-2">
                  {content.title}
                </CardTitle>
                {content.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {content.description}
                  </p>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {content.content_type === 'video' && <Video className="h-4 w-4" />}
              {content.content_type === 'audio' && <Music className="h-4 w-4" />}
              <span className="capitalize">{content.content_type}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatDuration(content.duration_minutes)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Badge className={getDifficultyBadgeClasses(content.difficulty_level)}>
                {content.difficulty_level}
              </Badge>
              {content.is_premium && (
                <Badge variant="default" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  Premium
                </Badge>
              )}
            </div>

            <div>
              <Badge variant="outline">
                {getCategoryName(content.category_id)}
              </Badge>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(content)}
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-1" />
                Modifier
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  if (confirm('Êtes-vous sûr de vouloir supprimer ce contenu ?')) {
                    handleDelete(content.id);
                  }
                }}
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

export default AdminContentList;