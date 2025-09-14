import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getDifficultyBadgeClasses } from "@/lib/difficulty-colors";
import { 
  Play, 
  Heart, 
  Clock, 
  Star,
  Volume2,
  Video
} from "lucide-react";

interface ContentCardProps {
  title: string;
  duration: string;
  type: "audio" | "video";
  category: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  isPremium?: boolean;
  isLiked?: boolean;
  rating?: number;
  image?: string;
  onPlay: () => void;
  onLike?: () => void;
}

const ContentCard = ({
  title,
  duration,
  type,
  category,
  level,
  isPremium = false,
  isLiked = false,
  rating,
  image,
  onPlay,
  onLike
}: ContentCardProps) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = () => {
    setLiked(!liked);
    onLike?.();
  };

  return (
    <div className="wellness-card group overflow-hidden">
      {/* Image Header */}
      <div className="relative h-48 bg-gradient-to-br from-sage-light to-sage overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-white/80 text-6xl">
              {type === "audio" ? <Volume2 /> : <Video />}
            </div>
          </div>
        )}
        
        {/* Premium Badge */}
        {isPremium && (
          <Badge className="absolute top-3 left-3 bg-terracotta text-white">
            Premium
          </Badge>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            onClick={onPlay}
            size="lg"
            className="btn-sage rounded-full h-16 w-16 shadow-2xl"
          >
            <Play className="h-6 w-6 ml-1" fill="currentColor" />
          </Button>
        </div>

        {/* Like Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2"
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${
              liked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </Button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
            <Badge className={`text-xs ${getDifficultyBadgeClasses(level)}`}>
              {level}
            </Badge>
          </div>
          
          <h3 className="font-playfair font-semibold text-lg leading-tight line-clamp-2">
            {title}
          </h3>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          
          <div className="flex items-center gap-1">
            {type === "audio" ? <Volume2 className="h-4 w-4" /> : <Video className="h-4 w-4" />}
            <span className="capitalize">{type}</span>
          </div>
        </div>

        {rating && (
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({rating}/5)
            </span>
          </div>
        )}

        <Button 
          onClick={onPlay}
          className="w-full btn-sage"
        >
          <Play className="h-4 w-4 mr-2" />
          Commencer la séance
        </Button>
      </div>
    </div>
  );
};

export default ContentCard;