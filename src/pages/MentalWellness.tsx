import { useState, useEffect } from "react";
import Navigation from "@/components/layout/Navigation";
import ContentCard from "@/components/wellness/ContentCard";
import MediaPlayer from "@/components/media/MediaPlayer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { getImageUrl } from "@/components/admin/ImageMapping";
import { 
  Search, 
  Filter,
  Brain,
  Wind,
  Moon,
  Heart,
  Smile,
  Zap
} from "lucide-react";

type WellnessContent = Database["public"]["Tables"]["wellness_content"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];

interface WellnessContentWithCategory extends WellnessContent {
  categories?: {
    name: string;
    icon: string | null;
  } | null;
}

const MentalWellness = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [contents, setContents] = useState<WellnessContentWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<WellnessContentWithCategory | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchContents();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching categories:', error);
    } else if (data) {
      setCategories(data);
    }
  };

  const fetchContents = async () => {
    const { data, error } = await supabase
      .from('wellness_content')
      .select(`
        *,
        categories (
          name,
          icon
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching content:', error);
    } else if (data) {
      setContents(data);
    }
    setLoading(false);
  };

  const getCategoriesWithCount = () => {
    const categoryCount = categories.map(category => {
      const count = contents.filter(content => content.category_id === category.id).length;
      return { ...category, count };
    });

    const totalCount = contents.length;
    return [
      { id: 'all', name: "Tous", icon: "Brain", count: totalCount },
      ...categoryCount
    ];
  };

  const filteredContents = contents.filter(content => {
    const categoryName = content.categories?.name || '';
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "Tous" || categoryName === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Limiter à 3 éléments par catégorie
  const limitedContents = activeFilter === "Tous" 
    ? categories.reduce((acc, category) => {
        const categoryContents = filteredContents
          .filter(content => content.categories?.name === category.name)
          .slice(0, 3);
        return [...acc, ...categoryContents];
      }, [] as WellnessContentWithCategory[])
    : filteredContents.slice(0, 3);

  const handlePlay = (contentId: string) => {
    const content = contents.find(c => c.id === contentId);
    if (content) {
      setSelectedContent(content);
      setIsPlayerOpen(true);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Brain, Wind, Moon, Heart, Smile, Zap
    };
    return icons[iconName] || Brain;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vert-eau via-marron-chaud/20 to-terracotta-lyloo/30">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8 fade-in-up bg-gradient-to-r from-terracotta-lyloo/90 to-terracotta-lyloo/80 rounded-3xl p-8 shadow-xl border border-terracotta-lyloo/30">
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src="/src/assets/mental-wellness-icon.png" alt="Mental wellness" className="h-12 w-12" />
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-anthracite">
              Bien-être Mental
            </h1>
          </div>
          <p className="text-anthracite text-lg max-w-2xl mx-auto">
            Découvrez nos contenus audio et vidéo pour cultiver votre sérénité intérieure
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-8 fade-in-up-delay-1">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un contenu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {getCategoriesWithCount().map((category) => {
              const IconComponent = getIconComponent(category.icon);
              const isActiveCat = activeFilter === category.name;
              const isTous = category.name === "Tous";
              return (
                <Button
                  key={category.id || category.name}
                  variant={isActiveCat || isTous ? "default" : "outline"}
                  onClick={() => setActiveFilter(category.name)}
                  className={`rounded-full ${
                    isTous
                      ? "bg-vert-eau text-anthracite hover:bg-vert-eau/90"
                      : isActiveCat
                        ? "bg-marron-chaud text-anthracite hover:bg-marron-chaud/90"
                        : "border-marron-chaud text-marron-chaud hover:bg-marron-chaud/10"
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {category.name}
                  <Badge variant="secondary" className="ml-2 text-xs bg-anthracite/10 text-anthracite">
                    {category.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-up-delay-2">
          {limitedContents.map((content) => (
            <ContentCard
              key={content.id}
              title={content.title}
              duration={`${content.duration_minutes} min`}
              type={content.content_type}
              category={content.categories?.name || 'Non catégorisé'}
              level={content.difficulty_level}
              isPremium={content.is_premium}
              rating={content.rating || undefined}
              image={getImageUrl(content.thumbnail_url, content.categories?.name, content.content_type)}
              onPlay={() => handlePlay(content.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {limitedContents.length === 0 && (
          <div className="text-center py-12">
            <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-playfair text-xl font-semibold mb-2">
              Aucun contenu trouvé
            </h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </main>

      {/* Media Player */}
      {selectedContent && (
        <MediaPlayer
          isOpen={isPlayerOpen}
          onClose={() => setIsPlayerOpen(false)}
          title={selectedContent.title}
          type={selectedContent.content_type}
          src={selectedContent.content_type === 'video' 
            ? selectedContent.video_url || 'https://www.w3schools.com/html/mov_bbb.mp4'
            : selectedContent.audio_url || 'https://www.w3schools.com/html/horse.mp3'}
          thumbnailSrc={getImageUrl(selectedContent.thumbnail_url, selectedContent.categories?.name, selectedContent.content_type)}
        />
      )}
    </div>
  );
};

export default MentalWellness;