import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Heart, RefreshCw } from "lucide-react";

interface Quote {
  text: string;
  author: string;
  category: string;
}

const DailyQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const quotes: Quote[] = [
    {
      text: "Le bonheur n'est pas une destination, c'est un mode de voyage.",
      author: "Margaret Lee Runbeck",
      category: "Bonheur"
    },
    {
      text: "Prendre soin de soi n'est pas de l'égoïsme, c'est une priorité.",
      author: "Anonyme",
      category: "Bien-être"
    },
    {
      text: "La paix vient de l'intérieur. Ne la cherchez pas à l'extérieur.",
      author: "Bouddha",
      category: "Sérénité"
    },
    {
      text: "Vous êtes plus fort que vous ne le pensez et plus capable que vous ne l'imaginez.",
      author: "Anonyme",
      category: "Confiance"
    },
    {
      text: "Chaque jour est une nouvelle chance de grandir et de briller.",
      author: "Anonyme",
      category: "Croissance"
    }
  ];

  const getRandomQuote = () => {
    setLoading(true);
    setTimeout(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  const handleShare = () => {
    if (quote) {
      const shareText = `"${quote.text}" - ${quote.author}`;
      if (navigator.share) {
        navigator.share({
          title: 'Citation inspirante',
          text: shareText,
        });
      } else {
        navigator.clipboard.writeText(shareText);
        alert('Citation copiée dans le presse-papier !');
      }
    }
  };

  if (!quote) {
    return (
      <div className="wellness-card p-8 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-light via-primary to-sage-dark opacity-10"></div>
      
      <div className="wellness-card relative p-8 md:p-12 text-center space-y-6">
        {/* Category Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          {quote.category}
        </div>

        {/* Quote */}
        <blockquote className={`space-y-4 ${loading ? 'opacity-50' : 'fade-in-up'}`}>
          <p className="font-playfair text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-foreground italic">
            "{quote.text}"
          </p>
          <footer className="text-muted-foreground text-lg">
            — {quote.author}
          </footer>
        </blockquote>

        {/* Actions */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className={`rounded-full transition-colors ${
              isLiked ? 'bg-red-50 border-red-200 text-red-600' : ''
            }`}
          >
            <Heart 
              className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} 
            />
            {isLiked ? 'Aimée' : 'Aimer'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="rounded-full"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={getRandomQuote}
            disabled={loading}
            className="rounded-full"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Nouvelle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DailyQuote;