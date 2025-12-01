import { useState, useEffect } from "react";
import MobileHeader from "@/components/mobile/MobileHeader";
import BottomTabBar from "@/components/mobile/BottomTabBar";
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
      <div className="min-h-screen bg-background pb-20">
        <MobileHeader title="Bien-être mental" />
        <main className="px-4 py-8">
          <div className="text-center">
            <p className="text-[hsl(var(--anthracite))]/70">Chargement...</p>
          </div>
        </main>
        <BottomTabBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileHeader 
        title="Bien-être Mental" 
        subtitle="Contenus vidéo pour cultiver ta sérénité"
      />
      
      <main className="px-4 py-6 space-y-6">

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[hsl(var(--anthracite))]/50" />
            <Input
              placeholder="Rechercher un contenu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 rounded-full h-12 bg-[hsl(var(--beige))] border-2 border-[hsl(var(--vert-eau))]/20"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {getCategoriesWithCount().map((category) => {
              const IconComponent = getIconComponent(category.icon);
              const isActiveCat = activeFilter === category.name;
              const isTous = category.name === "Tous";
              return (
                <button
                  key={category.id || category.name}
                  onClick={() => setActiveFilter(category.name)}
                  className={`category-pill ${isActiveCat ? 'active' : ''} ${
                    isTous
                      ? isActiveCat 
                        ? "bg-[hsl(var(--marron-chaud))] text-[hsl(var(--anthracite))]"
                        : "bg-[hsl(var(--marron-chaud))]/10 text-[hsl(var(--marron-chaud))] border-2 border-[hsl(var(--marron-chaud))]/30"
                      : isActiveCat
                        ? "bg-[hsl(var(--marron-chaud))] text-[hsl(var(--anthracite))]"
                        : "bg-[hsl(var(--beige))] text-[hsl(var(--anthracite))] border-2 border-[hsl(var(--marron-chaud))]/20"
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2 inline" />
                  {category.name}
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold">
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-4">
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
            <Brain className="h-16 w-16 text-[hsl(var(--anthracite))]/50 mx-auto mb-4" />
            <h3 className="font-playfair text-xl font-semibold text-[hsl(var(--anthracite))] mb-2">
              Aucun contenu trouvé
            </h3>
            <p className="text-[hsl(var(--anthracite))]/70">
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
      
      <BottomTabBar />
    </div>
  );
};

export default MentalWellness;